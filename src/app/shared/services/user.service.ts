import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface User {
  id?: number | string;
  username?: string;
  pfp? : string;
  contracts? : string[];
}

interface LoginResponse {
  user: User;
  token: string;
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

  logIn(username: string, password: string) {
    let url = this.baseUrl + '/auth';
    fetch(url , {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username: username, password: password})
    }) .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Login successful:', data);
      // Handle successful login (e.g., redirect, store token, etc.)
      this._userSubject.next(data);
    })
    .catch(error => {
      console.error('There was a problem with the login request:', error);
      // Handle login error (e.g., show error message)
    });
  }

  signUp(username: string, email: string, password: string): Promise<User | null> {
    return new Promise((resolve, reject) => {
      const url = this.baseUrl + '/signup';
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: username, email: email, password: password })
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Sign up successful:', data);
        // Do NOT auto-login the user on sign up. Leave it to the user to explicitly log in.
        resolve(data);
      })
      .catch(error => {
        console.error('There was a problem with the sign up request:', error);
        reject(error);
      });
    });
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
    (this as any)._userSubject.next(updated);
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
