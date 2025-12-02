import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { User, UserService } from 'src/app/shared/services/user.service';
import { LoginModalService } from 'src/app/shared/services/login-modal.service';
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
  selectedFile: File | null = null;

  @Output() sendLogout = new EventEmitter<any>()

  constructor(private userService: UserService, public loginModal: LoginModalService) {
    this.logedInUser$ = this.userService.loggedInUser$;
   }

  ngOnInit(): void {
  }

  toggleLoginPopup(mode: 'login' | 'register'): void {
    this.loginModal.setMode(mode);
    this.loginModal.open();
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadPfp() {
    if (!this.selectedFile) {
      return;
    }

    const formData = new FormData();
    formData.append('avatar', this.selectedFile);

    this.userService.uploadProfilePicture(this.selectedFile).subscribe({
      next: (res) => console.log('Uploaded:', res),
      error: (err) => console.error(err)
    });
  }

}
