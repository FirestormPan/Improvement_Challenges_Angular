import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Observable, map } from 'rxjs';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-draw-random-dare',
  templateUrl: './random-draw.component.html',
  styleUrls: ['./random-draw.component.css']
})
export class DrawRandomDareComponent implements OnInit {

  daregotten ={type: "normal" , title: 'Truth or Dare?' , text: "Click here to draw a card of random category(either truth or dare)", applicables:[]};

  randomDareObserver ={
    next: (value:any)=>{
      this.daregotten = value;
    },
    error: (err:any) =>{
      console.log("Observable got an error of: "+ err)
    },
    complete:()=>{
      console.log("~~observer got a complete notification")
    }
  }

  constructor(private dataservice: DataService) { }

  ngOnInit(): void {
  }

  drawRandom(truthOrDare  : string):void{
    let observable : Observable<any> = this.dataservice.getRandomTruthOrDare(truthOrDare).pipe(
      map( (value)=>{
          return {type: "normal" , title: value.type , text: value.question, applicables:[]};
      })
    );

    observable?.subscribe(this.randomDareObserver)
  }

  randomCategory(){
    if( Math.random() > 0.5 )
    return 'truth'
    else
    return 'dare'
  }

}
