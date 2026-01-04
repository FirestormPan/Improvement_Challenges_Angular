import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopupCardComponent } from './popup-card/popup-card.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() cardInfo: any;
  applicables: string[] = [];
  activatedon: number | string = 0;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    //get all the users on which the card can be applied on
    this. applicables = this.cardInfo.applicableTo
  }

  //add the display string of the users the card can be applied on
  getApplicablesString(){
    var applicablesString = '';
    var i=0;
    while(i<3 && this.applicables[i]){
      applicablesString += (this.applicables[i]+ ", ")
      i++;
    }
    applicablesString = applicablesString.slice(0, -2)
    if( this.applicables.length  > 3 ){
      applicablesString += " +" + ( this.applicables.length - 3 )
    }
    return applicablesString;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PopupCardComponent,{
      width: '250px',
      data: {
        targets: this.applicables,
        title: this.cardInfo.title,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.activatedon = result;
    });
  
  }

}
