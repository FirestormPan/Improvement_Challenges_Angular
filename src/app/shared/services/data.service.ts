import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

export interface User {
  id: number | string;
  name: string;
  pfp: string;
  contracts: string[];
}
@Injectable({
  providedIn: 'root'
})
export class DataService {

  ourChallenges = [
    {difficulty: "red", type: 'activateable', question:'Πεσε 10 καμψεις'},
    {difficulty: "red", type: 'activateable', question:'Dance an oriental belly dance for 2 mins'},
    {difficulty: "red", type: 'activateable', question:'Sing Afrika by Shakira song'},
    {difficulty: "red", type: 'activateable', question:'Πεσε 10 καμψεις'},
    {difficulty: "red", type: 'activateable', question:'Πεσε 10 καμψεις'},
    {difficulty: "red", type: 'activateable', question:'Πεσε 10 καμψεις'},
    {difficulty: "red", type: 'activateable', question:'Πεσε 10 καμψεις'},
    {difficulty: "red", type: 'activateable', question:'Πεσε 10 καμψεις'},
    {difficulty: "red", type: 'activateable', question:'Πεσε 10 καμψεις'},
    {difficulty: "red", type: 'activateable', question:'Πεσε 10 καμψεις'},
    {difficulty: "red", type: 'activateable', question:'Πεσε 10 καμψεις'},
    {difficulty: "red", type: 'activateable', question:'Πεσε 10 καμψεις'},
    {difficulty: "red", type: 'activateable', question:'Πεσε 10 καμψεις'},
    {difficulty: "red", type: 'activateable', question:'Πεσε 10 καμψεις'},
  ]

  constructor(private http: HttpClient) { }

  /**
  *gets from server
  * @returns a subscription with the wanted info
  */
 getRandomTruthOrDare(truthOrDare : string){ 

  const baseURL: string = 'https://api.truthordarebot.xyz/v1/';

  const currentURL: string = baseURL + truthOrDare;
  try{
    return this.http.get(currentURL);
  }
  catch(err){
    return new Observable<any>(
      (subscriber) =>{
        subscriber.next({question:'please select again', errorLog: err})
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


  async getPeopleArrayFromName(wantedName :string){ //express

    const contenstantInput = document.getElementById('username') as HTMLInputElement;
    const typeahead = fromEvent(contenstantInput, 'input').pipe(
      map(e=>(e.target as HTMLInputElement).value),
      filter(text=>text.length>2),
      debounceTime(10),
      distinctUntilChanged(),
      switchMap(searchTerm =>ajax(`http://localhost:3001/users/${searchTerm}`))
    )
    return typeahead
  }
  
  // get matching users users
  async getUserbyName(name:Number | String){
    const response = await fetch(`http://localhost:3001/users/${name}`);
    return await response.json() ?? {};
  }

  async getUserbyId(id:Number | String){
    const response = await fetch(`http://localhost:3001/users/${id}`);
    return await response.json() ?? {};
  }
  

  // async getUserFromExpress(name:Number | String): Promise<User | undefined>{

  //   const response = await fetch(`http://localhost:3001/users/${name}`);
  //   return await response.json() ?? {};
        
  //   // return this.http.get<User>('http://localhost:3001/users/player', {observe: 'body', responseType: 'json'})
  //   // .pipe(
  //   //   map( (res)=>{
  //   //   for(const key in res){
  //   //   }
  //   // } )
  //   // )
  //   // .subscribe((response)=>{
  //   //   console.log(response)

  //   // })
  // }

  getFromExpressByDifficulty(color :string){
    let rechieved = this.http.get('http://localhost:3001/challenges/'+color);
   return rechieved;
  }

}
