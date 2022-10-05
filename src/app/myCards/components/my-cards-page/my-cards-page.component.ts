import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-my-cards-page',
  templateUrl: './my-cards-page.component.html',
  styleUrls: ['./my-cards-page.component.css']
})

export class MyCardsPageComponent implements OnInit {

  cardInfo:any;

  constructor(private dataservice: DataService) { }

  ngOnInit(): void {
    this.cardInfo = this.dataservice.getPersonsCards()
  }

}
