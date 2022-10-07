import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RandomDrawRoutingModule } from './random-draw-routing.module';
import { DrawRandomDareComponent } from './components/random-draw/random-draw.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    DrawRandomDareComponent
  ],
  imports: [
    CommonModule,
    RandomDrawRoutingModule,
    SharedModule
  ]
})
export class RandomDrawModule { }
