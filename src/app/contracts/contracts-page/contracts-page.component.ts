import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contracts-page',
  templateUrl: './contracts-page.component.html',
  styleUrls: ['./contracts-page.component.css']
})
export class ContractsPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  displayShit(value:string){
    console.log(value)
  }

}
