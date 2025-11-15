import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface User {
  id?: number | string;
  username?: string;
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
    // let fakeUser: User = { id: 1, username: username };
    // let fakeUserWithPfp: User = { id: 1, username: username, pfp: "moo-ga.jpg" };
    // this._userSubject.next(fakeUser);

    let url = 'http://localhost:3005/users/auth';
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
    //todo replace with the actual fetch code to connect to backend
    return new Promise((resolve, reject) => {
      // Simulate signup with fake user for testing
      // const fakeUser: User = { id: Math.floor(Math.random() * 10000), name: username };
      // this._userSubject.next(fakeUser);
      // console.log('Sign up successful for:', username, email);
      // resolve(fakeUser);

      const url = 'http://localhost:3005/users/signup';
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

  logOut() {
    this._userSubject.next(null);
  }
}
