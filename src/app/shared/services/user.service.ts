import { Injectable } from '@angular/core';

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

  private loggedInUser = null;


  getloggedInUser() {
    return this.loggedInUser;
  }

  logIn(username: string, password: string) {
    //todo replace with the commented fetch code to connect to backend
    this.setloggedInUser(username);
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


  setloggedInUser(user: any) {
    this.loggedInUser = user;
  }

  isLoggedIn(): boolean {
    return this.loggedInUser != null;
  }


}
