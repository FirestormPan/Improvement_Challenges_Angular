import { Component, OnInit,Input , Output, EventEmitter } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-contract-pending',
  templateUrl: './contract-pending.component.html',
  styleUrls: ['./contract-pending.component.css']
})
export class ContractPendingComponent implements OnInit {

  status :string = 'pending'
  @Input() contractInfo :any;


  constructor(private dataService: DataService, private userService: UserService) { }

  ngOnInit(): void {
  }

  completeContract(){
    let user = this.userService.getloggedInUser()
    let payload = {
      contract_id : this.contractInfo.id,
      owner_id: user?.id
    }
    this.dataService.completeContract(payload).subscribe({
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
