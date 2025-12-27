import { Component, OnInit,Input , Output, EventEmitter } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-contract-pending',
  templateUrl: './contract-pending.component.html',
  styleUrls: ['./contract-pending.component.css']
})
export class ContractPendingComponent implements OnInit {

  status :string = 'pending'
  @Input() contractInfo :any;


  constructor(private dataService: DataService) { }

  ngOnInit(): void {
  }


  completeContract(){
    this.dataService.deleteContract(this.contractInfo.id).subscribe({
      next: (response) => {
      console.log('Contract completed successfully', response);
      this.status = 'COMPLETED';
    },
    error: (error) => {
      console.error('Error completing contract', error);
    }
    });
  }

  deleteContract(){
    this.dataService.deleteContract(this.contractInfo.id).subscribe({
    next: (response) => {
      console.log('Contract deleted successfully', response);
      this.status = 'deleted';
    },
    error: (error) => {
      console.error('Error deleting contract', error);
    }
  });
  }

}
