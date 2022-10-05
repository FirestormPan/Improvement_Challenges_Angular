import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ResourceLoader } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  people = [
    {id:103, name:"Aurorra"},
    {id:513, name:"Kosmas"},
    {id:105, name:"Ioanna"},
    {id:123, name:"Maria"},
    {id:100, name:"Kwstas"},
    {id:999, name:"Dimitris"},
  ]

  constructor(private http: HttpClient) { }

 getRandomDare(){
  const dareURL: string = 'https://api.truthordarebot.xyz/api/dare';
  let dare = this.http.get(dareURL)
  return dare;
 }


  getPersonsCards(){
    return [
      {
        id:0,
        title : 'my title is here',
        type : "activatable",
        applicableTo : [103, 513, 105],       
      },
      {
        id:1,
        title : 'my title is here',
        type : "normal",
        applicableTo : [999],        
      },
      {
        id:2,
        title : 'my title is here',
        type : "activatable",
        applicableTo : [999,100,123,105],        
      },
      {
        id:3,
        title : 'my title is here',
        type : "activatable",
        applicableTo : [999,100],        
      }
    ];
  }

  getPerson(wantedid:number){
    return this.people.filter(person => person.id==wantedid);
  }

}
