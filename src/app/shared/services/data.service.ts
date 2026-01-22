import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export type CardInfo ={
  id :(number | string), title :string, type :string ,applicableTo :string[]
}

export type ContractInfo ={
  id :(number | string), title :string, description :string ,challengeLevel :string, participants :string[], dueDate :string, completed :boolean
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  serverUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  /**
  *gets from api
  * @returns a subscription with the wanted info
  */
  getRandomTruthOrDare(truthOrDare : string){ 
    const URL: string = 'https://api.truthordarebot.xyz/v1/' + truthOrDare;

    try{
      return this.http.get(URL);
    }
    catch(err){
      return new Observable<any>(
        (subscriber) =>{
          subscriber.next({question:'please select again', errorLog: err})
        }
      );
    }
  }

  getPersonsCards(user_id: number | string): Observable<CardInfo[]>{
    return this.http.get<CardInfo[]>(this.serverUrl + 'users/cards/'  + user_id);
  }
  
  // get matching users users @Deprecated
  async getUserbyName(name:Number | String){
    const response = await fetch(`${this.serverUrl}users/${name}`);
    return await response.json() ?? {};
  }

  //@Deprecated
  async getUserbyId(id:Number | String){
    const response = await fetch(`${this.serverUrl}users/${id}`);
    return await response.json() ?? {};
  }
  
  //@Deprecated
  getFromExpressByDifficulty(color :string){
    let rechieved = this.http.get(`${this.serverUrl}/challenges/${color}`);
   return rechieved;
  }

  getContractWithUsers(id: number | string): Observable<ContractInfo>{
    return this.http.get<ContractInfo>(`${this.serverUrl}contracts/${id}`);
  }

  createContract(payload: any): Observable<any>{
    return this.http.post(`${this.serverUrl}contracts`, payload);
  }

  deleteContract(id: Number | String): Observable<void>{
    return this.http.delete<void>(`${this.serverUrl}contracts/${id}`);
  }

  completeContract(payload:any): Observable<void>{
    return this.http.post<void>(`${this.serverUrl}contracts/complete/`, payload);
  }

}
