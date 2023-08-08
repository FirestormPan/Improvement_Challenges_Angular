import { Component, OnInit, Inject,  Output, EventEmitter } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-popup-card',
  templateUrl: './popup-card.component.html',
  styleUrls: ['./popup-card.component.css']
})
export class PopupCardComponent implements OnInit {

  @Output() activatedOn :EventEmitter<string> = new EventEmitter<string>();

  finalTarget = ''

  constructor(public dialogRef: MatDialogRef<PopupCardComponent>,
      @Inject(MAT_DIALOG_DATA) public data: {
        targets: any,
        title: string,
        activatedOn: string  
      },
    ) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close(this.finalTarget);
  }


  changeTarget(value:any){
    this.finalTarget = value ;
    console.log(this.finalTarget);
  }  

}
