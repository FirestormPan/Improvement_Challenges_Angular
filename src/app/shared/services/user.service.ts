import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface User {
  id?: number | string;
  name?: string;
  pfp? : string;
  contracts? : string[];
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor() { }

  // private property to hold the logged-in user. Initiallizes as Null(=not logged in)
  private readonly _userSubject = new BehaviorSubject<User | null>(null);
  // public, read-only Observable for consumers
  readonly loggedInUser$: Observable<User | null> = this._userSubject.asObservable();

  logIn(username: string, password: string) {
    //todo replace with the commented fetch code to connect to backend
    let fakeUser: User = { id: 1, name: username };
    let fakeUserWithPfp: User = { id: 1, name: username, pfp: "moo-ga.jpg" };
    this._userSubject.next(fakeUser);

    // let url = 'http://localhost:3005/users/auth';
    // fetch(url , {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({username: username, password: password})
    // }) .then(response => {
    //   if (!response.ok) {
    //     throw new Error('Network response was not ok');
    //   }
    //   return response.json();
    // })
    // .then(data => {
    //   console.log('Login successful:', data);
    //   // Handle successful login (e.g., redirect, store token, etc.)
    //   this.loggedInUser = data;
    // })
    // .catch(error => {
    //   console.error('There was a problem with the login request:', error);
    //   // Handle login error (e.g., show error message)
    // });
  }


  getloggedInUser(): User | null  {
    return this._userSubject.getValue();
  }


  isLoggedIn(): boolean {
    return this.getloggedInUser() != null;
  }

  logOut() {
    this._userSubject.next(null);
  }
}
