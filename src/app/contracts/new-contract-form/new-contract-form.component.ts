import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';

type Person = {
  id: number | string;
  name: string;
  pfp: string;
};


@Component({
  selector: 'app-new-contract-form',
  templateUrl: './new-contract-form.component.html',
  styleUrls: ['./new-contract-form.component.css']
})
export class NewContractFormComponent implements OnInit {

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

  addParticipant(username :string) {
    let them = this.dataservice.getPeopleArrayFromName(username)
    them.forEach(
      person =>{
       if(!this.contractParticipants.find(participant => person.name === participant.name) )
        this.contractParticipants.push( person )
      } 
    )
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
