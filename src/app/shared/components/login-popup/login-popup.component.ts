import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login-popup',
  templateUrl: './login-popup.component.html',
  styleUrls: ['./login-popup.component.css']
})
export class LoginPopupComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  @Input() initialMode: 'login' | 'register' | null = 'login';

  // Login form fields
  username: string = 'lego';
  password: string = 'qqqq';
  
  // Register form fields
  registerUsername: string = '';
  registerEmail: string = '';
  registerPassword: string = '';
  registerConfirmPassword: string = '';
  
  // Toggle between login and register
  isLoginMode: boolean = true;
  // Prevent duplicate submissions while a signup is in progress
  isSubmitting: boolean = false;

  constructor(public userService: UserService) { }

  ngOnInit(): void {
    this.isLoginMode = this.initialMode === 'login';
  }
  
  closeModal(): void {
    this.close.emit();
  }

  login(): void {
    this.userService.logIn(this.username, this.password).subscribe({
      next: (user) => {
        //close after successful login
        this.close.emit();
      },
      error: (error) => {
        alert('Login failed: ' + error.message);
      }
    })
    this.close.emit();
  }

  toggleMode(): void {
    this.isLoginMode = !this.isLoginMode;
  }

  register(): void {
    if (this.registerPassword !== this.registerConfirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (this.isSubmitting) {
      // Prevent double submit
      return;
    }


    this.userService.signUp(this.registerUsername, this.registerEmail, this.registerPassword).subscribe({
      next: (user) => {
          this.isSubmitting = true;
          // After a successful sign up, do not auto-login.
          // Switch to login mode and prefill the username so the user can sign in.
          this.isLoginMode = true;
          this.username = this.registerUsername;
          // Clear registration-sensitive fields
          this.registerPassword = '';
          this.registerConfirmPassword = '';
          this.registerEmail = '';
      },
      error: (error) => {
        alert('Sign up failed: ' + error.message);
      },
      complete: () => {
        this.isSubmitting = false;
      }
    })

  }

}