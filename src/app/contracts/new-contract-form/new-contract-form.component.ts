import { Component, EventEmitter, OnInit, Output ,ElementRef, ViewChild  } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';
import { debounceTime, distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { HttpClient } from '@angular/common/http';
import { Observable, fromEvent } from 'rxjs';

type Person = {
  id: number | string;
  name: string;
  pfp: string;
  contracts:string[];
};


@Component({
  selector: 'app-new-contract-form',
  templateUrl: './new-contract-form.component.html',
  styleUrls: ['./new-contract-form.component.css']
})
export class NewContractFormComponent implements OnInit {
  @ViewChild('username') usernameInput!: ElementRef;

  @Output() newContractEmitter: EventEmitter<any> = new EventEmitter();

  checked :boolean[] = [false, false, false, false, true];
  challengeLevel: string = 'random';
  contractParticipants :Person[] = [];
  username ='';

  constructor(private dataservice: DataService) { }

  ngOnInit(): void {
  }

  onChecked(checkedBoxIndex:number, event:any){
    this.checked =  [false, false, false, false, false]
    this.checked[checkedBoxIndex] = true;
    this.challengeLevel = event.target.value;
  }

  async addParticipant(username :string) {

    // let a = await this.dataservice.getUserFromExpress(username);
    // console.log(a)

    const usernameInput = this.usernameInput.nativeElement;

    fromEvent(usernameInput, 'input').pipe(
      map( (e: Event) => (e as InputEvent).target?.value || ''),
      filter((text:String)=>text.length>2),
      debounceTime(10),
      distinctUntilChanged(),
      switchMap(searchTerm =>ajax(`http://localhost:3001/users/${searchTerm}`))
    )
    .subscribe((response)=>{
        console.log(response)
      })


    // this.dataservice.getPeopleArrayFromName(username)
    // .then( (newParticipant)=>{
    //   console.log(newParticipant)
    // }
    // )
    // .subscribe((response)=>{
    //   console.log(response.name)
    //   return response.name
    // })


    // let them = this.dataservice.getPeopleArrayFromName(username)
    // them.forEach(
    //   person =>{
    //    if(!this.contractParticipants.find(participant => person.name === participant.name) )
    //     this.contractParticipants.push( person )
    //   } 
    // )
  }

  onSubmit(event:any, title :string, contractdescription :string, dateinput: any ){
    event.preventDefault();
    let vi ={
      id: Math.ceil(Math.random()*1000),
      participants: this.contractParticipants,
      title: title,
      description: contractdescription,
      challengeLevel: this.challengeLevel,
      expiresOn: dateinput,
    }
    //console.log(vi);
    this.newContractEmitter.emit(vi)
  }

}
