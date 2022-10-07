import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DrawRandomDareComponent } from './components/random-draw/random-draw.component';

const routes: Routes = [
  { path:'' , component: DrawRandomDareComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RandomDrawRoutingModule { }
