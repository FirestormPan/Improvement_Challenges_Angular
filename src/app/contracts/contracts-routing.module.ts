import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContractsPageComponent } from './contracts-page/contracts-page.component';

const routes: Routes = [
  {path:'' , component: ContractsPageComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ContractsRoutingModule { }
