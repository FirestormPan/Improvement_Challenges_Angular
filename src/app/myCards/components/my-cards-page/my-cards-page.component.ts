import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService , CardInfo} from 'src/app/shared/services/data.service';
import { UserService } from 'src/app/shared/services/user.service';
import { Subject } from 'rxjs';
import { filter, switchMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-my-cards-page',
  templateUrl: './my-cards-page.component.html',
  styleUrls: ['./my-cards-page.component.css']
})

export class MyCardsPageComponent implements OnInit, OnDestroy {

  cards: CardInfo[] = [];
  private destroy$ = new Subject<void>();

  constructor(private dataservice: DataService, private userService: UserService) { }

  ngOnInit(): void {
    // React to the logged-in user stream so we fetch cards when the user becomes available
    this.userService.loggedInUser$.pipe(
      filter(user => !!user && !!(user as any).id),
      takeUntil(this.destroy$),
      switchMap(user => {
        return this.dataservice.getPersonsCards(Number((user as any).id));
      })
    ).subscribe({
      next: (fetched_cards:any) => {
        this.cards = fetched_cards;
      },
      error: err => {
        console.error('Failed to fetch cards', err);
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}