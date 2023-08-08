import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  people = this.myDataservice.people;
  logedInUser = {id:0, name:'', pfp:''};

 @Output() sendLogout = new EventEmitter<any>()

  constructor(private myDataservice: DataService) { }

  ngOnInit(): void {
    let stem = this.myDataservice.getPersonFromID(7)
     if(stem){
      this.logedInUser =  stem
     }
  }


}
