import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyCardsPageComponent } from './components/my-cards-page/my-cards-page.component';

const routes: Routes = [
  {path:'' , component: MyCardsPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyCardsRoutingModule { }
