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

  login(): void {
    this.userService.logIn(this.username, this.password);
    // this.close.emit(); // Close after successful login
  }

  closeModal(): void {
    this.close.emit();
  }

  // Keeping this commented code for reference
  // closeOnOutClick():void{
  //   var modal = document.getElementById('id01');
  //   // When the user clicks anywhere outside of the modal, close it
  //   window.onclick = function(event) {
  //       if (event.target == modal) {
  //           modal.style.display = "none";
  //       }
  //   }
  // }
}