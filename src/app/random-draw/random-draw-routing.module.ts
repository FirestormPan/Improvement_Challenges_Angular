import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DrawRandomDareComponent } from './components/draw-random-dare/draw-random-dare.component';

const routes: Routes = [
  { path:'' , component: DrawRandomDareComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RandomDrawRoutingModule { }
