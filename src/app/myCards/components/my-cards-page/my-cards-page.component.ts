import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService , CardInfo} from 'src/app/shared/services/data.service';
import { User, UserService } from 'src/app/shared/services/user.service';
import { Observable, Subject } from 'rxjs';
import { filter, switchMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-my-cards-page',
  templateUrl: './my-cards-page.component.html',
  styleUrls: ['./my-cards-page.component.css']
})

export class MyCardsPageComponent implements OnInit {

  cards$!: Observable<CardInfo[]>;
  constructor(private dataservice: DataService, private userService: UserService) { }

  ngOnInit(): void {
    // React to the logged-in user stream so we fetch cards when the user becomes available
    this.cards$ = this.userService.loggedInUser$.pipe(
      filter((user): user is User & { id: number } =>   user !== null),
      switchMap(user => {
        return this.dataservice.getPersonsCards(user.id);
      })
    )
  }
}