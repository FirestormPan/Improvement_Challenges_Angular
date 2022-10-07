import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';

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
    this.cardInfo = this.dataservice.getPersonsCards()
  }

}
