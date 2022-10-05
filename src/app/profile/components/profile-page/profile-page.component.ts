import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

 loginStatus:boolean = true;

 @Output() sendLogout = new EventEmitter<any>()

  constructor() { }

  ngOnInit(): void {
  }


}
