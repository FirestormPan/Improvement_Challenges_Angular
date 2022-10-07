import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  baseURL: string = 'https://api.truthordarebot.xyz/v1/';

  people = [
    {id:103, name:"Aurorra"},
    {id:513, name:"Kosmas"},
    {id:105, name:"Ioanna"},
    {id:123, name:"Maria"},
    {id:100, name:"Kwstas"},
    {id:999, name:"Dimitris"},
  ]

  constructor(private http: HttpClient) { }

 getRandomTruthOrDare(truthOrDare : string){
  const currentURL: string = this.baseURL + truthOrDare;

  try{
    return this.http.get(currentURL);
  }catch(err){
    return new Observable<any>(
      (subscriber) =>{
        subscriber.next({question:'please select again', eroorLog: err})
      }
    );
  }
  
 }


  getPersonsCards(){
    return [
      {
        id:0,
        type : "activatable",
        title : 'my title is here',
        text: 'random dare',
        applicableTo : [103, 513, 105],       
      },
      {
        id:1,
        title : 'my title is here',
        text: 'random dare',
        type : "normal",
        applicableTo : [999],        
      },
      {
        id:2,
        title : 'my title is here',
        text: 'random dare',
        type : "activatable",
        applicableTo : [999,100,123,105],        
      },
      {
        id:3,
        title : 'my title is here',
        text: 'random dare',
        type : "activatable",
        applicableTo : [999,100],        
      }
    ];
  }

  getPerson(wantedid:number){
    return this.people.filter(person => person.id==wantedid);
  }

}
