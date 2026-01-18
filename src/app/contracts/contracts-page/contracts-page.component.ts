import { Component, OnInit } from '@angular/core';
import { Observable, switchMap, combineLatest, of } from 'rxjs';
import { User, UserService } from 'src/app/shared/services/user.service';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-contracts-page',
  templateUrl: './contracts-page.component.html',
  styleUrls: ['./contracts-page.component.css']
})
export class ContractsPageComponent implements OnInit {
  readonly loggedInUser$: Observable<User | null>;
  readonly userContracts$: Observable<Array<any>>;

  constructor(private myUserService: UserService, private dataService: DataService) {
    this.loggedInUser$ = this.myUserService.loggedInUser$;

    this.userContracts$ = this.myUserService.loggedInUser$.pipe(
      switchMap(user => {
        if (!user) return of([] as any[]); // explicitly type empty array

        return this.myUserService.getUserContracts().pipe(
          switchMap((contracts: any[]) => {
            if (!contracts || contracts.length === 0) return of([] as any[]);

            // combineLatest returns Observable<any[]>
            return combineLatest(
              contracts.map(contract =>
                this.dataService.getContractWithUsers(contract.id) as Observable<any>
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