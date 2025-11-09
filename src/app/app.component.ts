import { Component } from '@angular/core';
import { UserService } from './shared/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showLoginPopup = false;

  constructor(public userService: UserService) {}

  toggleLoginPopup(): void {
    this.showLoginPopup = !this.showLoginPopup;
  }
}
