import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
// Service to manage the visibility of the login modal
export class LoginModalService {
  private _showSubject = new BehaviorSubject<boolean>(false);
  readonly show$ = this._showSubject.asObservable();

  private _loginMode = new BehaviorSubject<'login' | 'register'>('login');
  readonly loginMode$: Observable<'login' | 'register' | null> = this._loginMode.asObservable();

  open(): void {
    this._showSubject.next(true);
  }

  close(): void {
    this._showSubject.next(false);
  }

  toggle(): void {
    this._showSubject.next(!this._showSubject.getValue());
  }

  setMode(mode: 'login' | 'register'): void {
    this._loginMode.next(mode);
    }
}
