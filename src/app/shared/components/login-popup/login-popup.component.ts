import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login-popup',
  templateUrl: './login-popup.component.html',
  styleUrls: ['./login-popup.component.css']
})
export class LoginPopupComponent implements OnInit {
  @Output() close = new EventEmitter<void>();

  username: string = '';
  password: string = '';
  remember: boolean = false;

  constructor(public userService: UserService) { }

  ngOnInit(): void {
  }
  
  closeModal(): void {
    this.close.emit();
  }

  login(): void {
    this.userService.logIn(this.username, this.password);
    this.close.emit(); // Close after login (TODO: should I check if login was successful first?)
  }

}