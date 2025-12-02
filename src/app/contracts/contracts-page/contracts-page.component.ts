import { Component, OnInit } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { User, UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-contracts-page',
  templateUrl: './contracts-page.component.html',
  styleUrls: ['./contracts-page.component.css']
})
export class ContractsPageComponent implements OnInit {

  //kanonika 8a erxontai diafora apo ton server, epita apo klhsh
  userPendingContracts = [
    {
      id:90,
      title:"  a title",
      description:"Whoever does a backflip wins",
      participants:[{name:'seratonin'}, {name:"Kwstakhs"}],
      challengeLevel:"red"
    },
    {
      id:23,
      title:"  a title",
      description:"Whoever does a backflip wins",
      participants:[{name:'seratonin'}, {name:"sally"}],
      dueDate:"22-10-99",
      challengeLevel:"red"
    },
    {
      id:90,
      title:"  a title",
      description:"Whoever does a backflip wins",
      participants:[{name:'seratonin'}, {name:"Iakinthos"}],
      challengeLevel:"red"
    },
    {
      id:21,
      title:"a title",
      description:"Whoever does a backflip wins",
      participants:[{name:'alessa'}, {name:"Kosmas"}],
      dueDate:"22-10-99",
      challengeLevel:"red"
    },
    {
      id:22,
      title:"Title",
      description:"Whoever raids a goblin village first, wins",
      participants:[{name:'alessandro'}, {name:"Peter"}, {name:"Franko"}, {name:"Millan"},],
      dueDate:"22-10-99",
      challengeLevel:"yellow"
    },
  ];

  loggedInUser$ : Observable<User | null>;
  userContracts$!: Observable<Array<any>>;

  constructor(private myUserService: UserService) {
    this.loggedInUser$ = this.myUserService.loggedInUser$;
  }

  ngOnInit(): void {
  this.userContracts$ = this.loggedInUser$.pipe(
      switchMap(user => this.myUserService.getUserContracts())
    );
  }

  addContract(contractObject:any){
    console.log(contractObject)
    this.userPendingContracts.push(contractObject)
  }

  removeContract(id:number){
  this.userPendingContracts.splice(this.userPendingContracts.findIndex(item => item.id === id), 1)
  }

}