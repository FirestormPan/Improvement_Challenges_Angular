import { Component, OnInit } from '@angular/core';
import { Observable, switchMap, combineLatest, of } from 'rxjs';
import { UserService } from 'src/app/shared/services/user.service';
import { DataService, ContractInfo } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-contracts-page',
  templateUrl: './contracts-page.component.html',
  styleUrls: ['./contracts-page.component.css']
})
export class ContractsPageComponent implements OnInit {
  readonly userContracts$: Observable<ContractInfo[]>;

  constructor(private readonly myUserService: UserService, private readonly dataService: DataService) {

    this.userContracts$ = this.myUserService.loggedInUser$.pipe(
      switchMap(user => {
        if (!user) return of([]);
        return this.myUserService.getUserContracts().pipe(
          switchMap((contracts: ContractInfo[]) => {
            if (!contracts || contracts.length === 0) return of([]);
            return combineLatest(
              contracts.map(contract =>
                this.dataService.getContractWithUsers(contract.id)
              )
            );
          })
        );
      })
    );
    
  }

  ngOnInit(): void {

  }

  addContract(contractObject: any): void {
    // TODO: Call service to persist to database
    // After successful creation, userContracts$ will auto-update via switchMap
    console.log('Adding contract:', contractObject);
  }

  removeContract(id: number): void {
    // TODO: Call service to delete from database
    // After successful deletion, userContracts$ will auto-update
    console.log('Removing contract:', id);
  }
}