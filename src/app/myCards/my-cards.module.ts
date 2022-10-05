import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyCardsRoutingModule } from './my-cards-routing.module';
import { MyCardsPageComponent } from './components/my-cards-page/my-cards-page.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    MyCardsPageComponent
  ],
  imports: [
    CommonModule,
    MyCardsRoutingModule,
    SharedModule
  ]
})
export class MyCardsModule { 

  ngOnInit(): void {
  }

}
