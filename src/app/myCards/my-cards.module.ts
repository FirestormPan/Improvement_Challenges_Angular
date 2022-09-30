import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyCardsRoutingModule } from './my-cards-routing.module';
import { MyCardsPageComponent } from './components/my-cards-page/my-cards-page.component';



@NgModule({
  declarations: [
    MyCardsPageComponent
  ],
  imports: [
    CommonModule,
    MyCardsRoutingModule
  ]
})
export class MyCardsModule { 

}
