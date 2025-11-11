import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { User, UserService } from 'src/app/shared/services/user.service';
//aimations on scroll
// import * as AOS from 'aos';
// import 'aos/dist/aos.css'; // Import the CSS as needed

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  logedInUser$: Observable<User | null>;


 @Output() sendLogout = new EventEmitter<any>()

  constructor(private myUserService: UserService) {
    this.logedInUser$ = this.myUserService.loggedInUser$;
   }

  ngOnInit(): void {
    // AOS.init();
  }

}
