import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { User, UserService } from 'src/app/shared/services/user.service';
//aimations on scroll
import * as AOS from 'aos';
import 'aos/dist/aos.css'; // Import the CSS as needed

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  logedInUser: User = {};

 @Output() sendLogout = new EventEmitter<any>()

  constructor(private myUserService: UserService) { }

  ngOnInit(): void {
    // this.test();
    AOS.init();

  }

  async test(){
    this.myUserService.logIn('user1', 'password1');
    let stem = this.myUserService.getloggedInUser();
    if(stem){
     this.logedInUser =  stem
    }

  }

  isLoggedIn(){
    return this.logedInUser != null;
  }
}
