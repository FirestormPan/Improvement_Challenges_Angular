import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../../services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { PopupCardComponent } from './popup-card/popup-card.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() cardInfo: any;
  applicables: any = [];

  activatedon: number | string = 0;

  constructor(private myDataService : DataService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.cardInfo.applicableTo?.forEach((id:number) => {
      this.applicables.push(...this.myDataService.getPeopleArrayFromID(id))
    });
    
  }

  getApplicablesString(){
    var applicablesString = '';

    var i=0;
    while(i<3 && this.applicables[i]){
      applicablesString += (this.applicables[i]?.name + ", ")
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

    dialogRef.afterClosed().subscribe(result => { //no Ieda what this is. uselesS?
      this.activatedon = result;
    });
  
  }

}
