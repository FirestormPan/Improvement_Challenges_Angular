import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
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
  showUploadPic = false;
  selectedFile: File | null = null;
  selectedPreview: string | null = null;

  userPfpUrl$ = new BehaviorSubject<string | null>(null);


  @Output() sendLogout = new EventEmitter<any>()

  constructor(private userService: UserService, public loginModal: LoginModalService) {
    this.logedInUser$ = this.userService.loggedInUser$;
   }

  ngOnInit(): void {
   this.logedInUser$.subscribe(user => {
    this.userPfpUrl$.next(user?.pfp ?? null);
  });

  }

  toggleLoginPopup(mode: 'login' | 'register'): void {
    this.loginModal.setMode(mode);
    this.loginModal.open();
  }

  toggleUpload() {
    this.showUploadPic = !this.showUploadPic;
    if (!this.showUploadPic) {
      // clear selected file and preview when cancelling
      this.selectedFile = null;
      this.selectedPreview = null;
    }
  }

  onFileSelected(event: any) {
    const file: File | undefined = event.target.files && event.target.files[0];
    if (!file) {
      this.selectedFile = null;
      this.selectedPreview = null;
      return;
    }

    this.selectedFile = file;

    // Only handle image previews
    if (file.type && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedPreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    } else {
      this.selectedPreview = null;
    }
  }

  uploadPfp() {
    if (!this.selectedFile) return;

    this.userService.uploadProfilePicture(this.selectedFile).subscribe({
      next: (res) => {
        this.userPfpUrl$.next(res.url ?? null);
        // update the in-memory logged-in user so template shows the new pfp immediately
        this.userService.updateUserPfp(res.url ?? null);

        // clear the preview and selection after successful upload
        this.selectedFile = null;
        this.selectedPreview = null;
        this.showUploadPic = false;
      },
      error: (err) => console.error(err)
    });
  }

}
