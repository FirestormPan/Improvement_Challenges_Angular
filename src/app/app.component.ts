import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  
  //info
  public name_person = "Jonathan";
  public cardType1 = "normal";
  public cardType2 = "activatable";

  cardInfo1: any = {
    title : 'title is here',
    type : "normal",
    applicableTo : ["kwstanths", 'mairh', "lela"],
    
  }
  cardInfo2: any = {
    title : 'title is here',
    type : "activatable",
    applicableTo : ["kwstanths", 'mairh', "lela"],
    
  }

  title = 'improvementDares';
}
