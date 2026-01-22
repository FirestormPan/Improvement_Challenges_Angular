import { Component, OnInit } from '@angular/core';
import { DataService , CardInfo} from 'src/app/shared/services/data.service';
import { User, UserService } from 'src/app/shared/services/user.service';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-my-cards-page',
  templateUrl: './my-cards-page.component.html',
  styleUrls: ['./my-cards-page.component.css']
})

export class MyCardsPageComponent implements OnInit {

  cards$!: Observable<CardInfo[]>;
  refreshList: BehaviorSubject<void> = new BehaviorSubject<void>(undefined);
  constructor(private dataservice: DataService, private userService: UserService) { }

  ngOnInit(): void {
    // React to the logged-in user stream so we fetch cards when the user becomes available
    this.cards$ = combineLatest([
      this.userService.loggedInUser$
      , this.refreshList
    ])
      .pipe(
      filter((value):value is [User & { id: number }, void] =>   value[0] !== null),
      switchMap(([user]) => {
        return this.dataservice.getPersonsCards(user.id);
      })
    )
  }
}

