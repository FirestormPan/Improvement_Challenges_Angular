import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() cardInfo: any;
  rechievedTitle: string = '';
  cardType: any  = '';

  @Input('name_person') public name_person ='';
 
  public applicableTo = [];


  constructor() { }

  ngOnInit(): void {
    this.rechievedTitle = this.cardInfo.title;
    this.cardType = this.cardInfo.type;
  }

}
