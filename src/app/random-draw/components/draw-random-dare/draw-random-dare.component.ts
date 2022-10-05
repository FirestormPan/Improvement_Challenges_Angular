import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-draw-random-dare',
  templateUrl: './draw-random-dare.component.html',
  styleUrls: ['./draw-random-dare.component.css']
})
export class DrawRandomDareComponent implements OnInit {

  daregotten: any;

  constructor(private dataservice: DataService) { }

  ngOnInit(): void {

  }

  drawDare(){
    this.dataservice.getRandomDare().subscribe(
      (data =>{
        this.daregotten = data;
      })
    )

    console.log(this.daregotten.question);
  }

}
