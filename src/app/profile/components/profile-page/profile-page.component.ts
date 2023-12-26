import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';
//aimations on scroll
import * as AOS from 'aos';
import 'aos/dist/aos.css'; // Import the CSS as needed

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  logedInUser = {id:0, name:'not logged in', pfp:''};

 @Output() sendLogout = new EventEmitter<any>()

  constructor(private myDataservice: DataService) { }

  ngOnInit(): void {
    this.test();
    AOS.init();

  }

  async test(){
    let stem = await this.myDataservice.getUserbyId(7)
    if(stem){
     this.logedInUser =  stem
    }

  }

}
