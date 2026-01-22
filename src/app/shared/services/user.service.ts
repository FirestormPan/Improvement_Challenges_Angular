import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface User {
  id?: number | string;
  username?: string;
  pfp? : string;
  contracts? : string[];
}

interface UploadPicResponse {
  url: string;
}


@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  baseUrl = environment.baseUrl +'users';

  // private property to hold the logged-in user. Initiallizes as Null(=not logged in)
  private readonly _userSubject = new BehaviorSubject<User | null>(null);
  // public, read-only Observable for consumers
  readonly loggedInUser$: Observable<User | null> = this._userSubject.asObservable();

  logIn(username: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/auth`, { username: username, password: password }).pipe(
      tap(user => {
        this._userSubject.next(user);
      })
    )
  }

  signUp(username: string, email: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/signup`, { username: username, email: email, password: password });
  }


  getloggedInUser(): User | null  {
    return this._userSubject.getValue();
  }


  isLoggedIn(): boolean {
    return this.getloggedInUser() != null;
  }

  logOut():void {
    this._userSubject.next(null);
  }
  
  uploadProfilePicture(file: File) : Observable<UploadPicResponse> {
    const formData = new FormData(); //it is needed to send files to multer
    formData.append('avatar', file);
    const user = this.getloggedInUser();
    const userId = user && user.id ? String(user.id) : '';
    formData.append('userId', userId);

    return this.http.post<UploadPicResponse>(`${this.baseUrl}/upload-pfp`, formData);
  }

  /**
   * TODO: did it with Ai (have another look to understand it completely)
   * Update the stored logged-in user's pfp URL and emit the change.
   * This keeps the in-memory user consistent after uploading a new picture.
   */
  updateUserPfp(url: string | null): void {
    const current = this.getloggedInUser();
    if (!current) return;
    const updated: User = { ...current, pfp: url ?? current.pfp };
    // Accessing the private subject to emit the updated user
    this._userSubject.next(updated);
  }

  getUserContracts(): Observable<any> {
    const user = this.getloggedInUser();
    if (!user || !user.username) {
      return of([]);
    }
    const body = { name: user.username };
    return this.http.post(`${this.baseUrl}/contracts`, body);
  }

  //returns all users with this text included in their username
  searchUsers(term: string | null): Observable<User[]> {
    const searchterm = term?.trim() ?? "";
    const url = this.baseUrl + '/search/' + searchterm;
    return this.http.get<User[]>(url);
  }
}
