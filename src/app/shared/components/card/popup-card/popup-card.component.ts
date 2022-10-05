import { Component, OnInit, Inject,  Output, EventEmitter } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-popup-card',
  templateUrl: './popup-card.component.html',
  styleUrls: ['./popup-card.component.css']
})
export class PopupCardComponent implements OnInit {

  @Output() activatedOn = new EventEmitter<number>();

  constructor(public dialogRef: MatDialogRef<PopupCardComponent>,
      @Inject(MAT_DIALOG_DATA) public data: {
        targets: any,
        title: string,
        activatedOn: number
      },
    ) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  sendPerson(selectedPerson: number){
    this.activatedOn.emit(selectedPerson)
  }

  

}
