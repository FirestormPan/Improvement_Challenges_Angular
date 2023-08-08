import { Component, OnInit,Input , Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-contract-pending',
  templateUrl: './contract-pending.component.html',
  styleUrls: ['./contract-pending.component.css']
})
export class ContractPendingComponent implements OnInit {

  status :string = 'pending'
  @Input() contractInfo :any;
  @Output() deleteContractEmitter = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  deleteContract(){
    this.deleteContractEmitter.emit(this.contractInfo.id)
  }

}
