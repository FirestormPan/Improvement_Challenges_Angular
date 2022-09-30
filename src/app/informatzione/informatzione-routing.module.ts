import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InformazionePageComponent } from './informatzione-page/informazione-page.component';

const routes: Routes = [
  {path:'', component: InformazionePageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InformatzioneRoutingModule { }
