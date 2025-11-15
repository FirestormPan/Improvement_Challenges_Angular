import { Component } from '@angular/core';
import { UserService } from './shared/services/user.service';
import { LoginModalService } from './shared/services/login-modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public userService: UserService, public loginModal: LoginModalService) {}

  toggleLoginPopup(mode: 'login' | 'register'): void {
    this.loginModal.setMode(mode);
    this.loginModal.toggle();
  }
}
