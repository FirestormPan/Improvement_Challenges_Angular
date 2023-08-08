import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contracts-page',
  templateUrl: './contracts-page.component.html',
  styleUrls: ['./contracts-page.component.css']
})
export class ContractsPageComponent implements OnInit {

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
      id:21,
      title:"Title",
      description:"Whoever raids a goblin village first, wins",
      participants:[{name:'alessandro'}, {name:"Peter"}, {name:"Franko"}, {name:"Millan"},],
      dueDate:"22-10-99",
      challengeLevel:"yellow"
    },
  ]; //kanonika 8a erxontai diafora apo ton server, epita apo klhsh

  constructor() { }

  ngOnInit(): void {
  }

  addContract(contractObject:any){
    console.log(contractObject)
    this.userPendingContracts.push(contractObject)
  }

  removeContract(id:number){
  this.userPendingContracts.splice(this.userPendingContracts.findIndex(item => item.id === id), 1)
  }

}