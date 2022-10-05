import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-new-contract-form',
  templateUrl: './new-contract-form.component.html',
  styleUrls: ['./new-contract-form.component.css']
})
export class NewContractFormComponent implements OnInit {

  inputValue : string = "testNameA";

  @Output() nameToSearchBy: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  getResults(){
    this.nameToSearchBy.emit(this.inputValue)
  }

}
