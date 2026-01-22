import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopupCardComponent } from './popup-card/popup-card.component';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() cardInfo: any;
  @Output() refreshList: EventEmitter<void> = new EventEmitter<void>();
  applicables: any[] = [];
  activatedon: number | string = 0;

  constructor(private dialog: MatDialog, private dataService: DataService) { }

  ngOnInit(): void {
    //get all the users on which the card can be applied on
    this.applicables = this.cardInfo.users;
  }

  //add the display string of the users the card can be applied on
  getApplicablesString(){
    var applicablesString = '';
    var i=0;
    while(i<3 && this.applicables[i]){
      applicablesString += (this.applicables[i].name + ", ")
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
      this.activatedon = result.name;
    });
  }

  complete(): void {
    //for simplicity, just delete the card
   this.dataService.deleteCard(this.cardInfo.id).subscribe();  
   // emit the event to the parent component to refresh the list
    this.refreshList.emit();
  }
}