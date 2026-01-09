import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

export type CardInfo ={
  id :(number | string), title :string, type :string ,applicableTo :string[]
}


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  /**
  *gets from api
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


  getPersonsCards(user_id: number){
    return this.http.get('http://localhost:3005/users/cards/'  + user_id);
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
  
  // get matching users users @Deprecated
  async getUserbyName(name:Number | String){
    const response = await fetch(`http://localhost:3001/users/${name}`);
    return await response.json() ?? {};
  }

  //@Deprecated
  async getUserbyId(id:Number | String){
    const response = await fetch(`http://localhost:3001/users/${id}`);
    return await response.json() ?? {};
  }
  
  //@Deprecated
  getFromExpressByDifficulty(color :string){
    let rechieved = this.http.get('http://localhost:3001/challenges/'+color);
   return rechieved;
  }


  getContractWithUsers(id: Number | String): Observable<any>{
    return this.http.get(`http://localhost:3005/contracts/${id}`);
  }


  createContract(payload: any): Observable<any>{
    // Backend expects POST /contracts
    return this.http.post('http://localhost:3005/contracts', payload);
  }

  deleteContract(id: Number | String): Observable<any>{
    return this.http.delete(`http://localhost:3005/contracts/${id}`);
  }

  completeContract(contract_id: number): Observable<any>{
    return this.http.delete(`http://localhost:3005/contracts/complete/${contract_id}`);
  }


}
