import { Component, EventEmitter, OnInit, Output ,ElementRef, ViewChild, HostListener  } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';
import { UserService, User } from 'src/app/shared/services/user.service';
import { debounceTime, distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';
import { Observable, fromEvent , of} from 'rxjs';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-new-contract-form',
  templateUrl: './new-contract-form.component.html',
  styleUrls: ['./new-contract-form.component.css']
})
export class NewContractFormComponent implements OnInit {

  @Output() newContractEmitter: EventEmitter<any> = new EventEmitter();

  checked :boolean[] = [false, false, false, true];
  challengeLevel: string = 'random';
  contractParticipants :String[] = [];

  searchIsFocused = false;
  searchControl = new FormControl('');
  searchResults$!: Observable<User[]>;

  constructor(private dataservice: DataService, private userService: UserService, private elementRef: ElementRef) {  }

  ngOnInit(): void {
    this.searchResults$ = this.searchControl.valueChanges.pipe(
      debounceTime(300),          // wait for user to stop typing
      distinctUntilChanged(),      // only request when value actually changes
      switchMap(value =>{
        const term = value?.trim() ?? "";
        if(term.length===0){return of([])}
        return this.userService.searchUsers(term)   // returns an Observable from HttpClient
      }
      )
    );
  }

  onChecked(checkedBoxIndex:number, value: string){
    this.checked =  [false, false, false, false]
    this.checked[checkedBoxIndex] = true;
    this.challengeLevel = value;
  }

  @ViewChild('searchWrapper') searchWrapper!: ElementRef;
  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (!this.searchWrapper.nativeElement.contains(event.target)) {
      this.searchIsFocused = false;
    }
  }

  async addParticipant(username :string | undefined) {
    if(username && !this.contractParticipants.includes(username)){
      this.contractParticipants.push(username);
      this.searchControl.setValue('');
    }
  }

  onSubmit(event:any, title :string, contractdescription :string, dateinput: any ){
    event.preventDefault();

    //create payload
    const payload ={
      participants: this.contractParticipants,
      title: title,
      description: contractdescription,
      color: this.challengeLevel,
      dueDate: dateinput || null,
    };
    let user = this.userService.getloggedInUser();
    if(user && user.username){
      payload.participants.push(user.username);
    }

    // HttpClient Observables are cold: subscribe to execute the request
    this.dataservice.createContract(payload).subscribe({
      next: (res) => {
        // Emit to parent so it can refresh the list or react to the creation
        this.newContractEmitter.emit(res);

        // Reset the form
        this.searchControl.setValue('');
        this.contractParticipants = [];
        this.checked = [false, false, false, true];
        this.challengeLevel = 'random';
      },
      error: (err) => {
        console.error('Failed to create contract', err);
      }
    });
  }

}