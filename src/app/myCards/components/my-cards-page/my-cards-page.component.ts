import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';
//aimations on scroll
import * as AOS from 'aos';
import 'aos/dist/aos.css'; // Import the CSS as needed

type CardInfo ={
  id :(number | string), title :string, type :string ,applicableTo :number[]
}

@Component({
  selector: 'app-my-cards-page',
  templateUrl: './my-cards-page.component.html',
  styleUrls: ['./my-cards-page.component.css']
})


export class MyCardsPageComponent implements OnInit {

  cardInfo: CardInfo[] = [];

  constructor(private dataservice: DataService) { }

  ngOnInit(): void {
    AOS.init();
    
    this.cardInfo = this.dataservice.getPersonsCards()
  }

}
