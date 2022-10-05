import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContractsRoutingModule } from './contracts-routing.module';
import { ContractsPageComponent } from './contracts-page/contracts-page.component';
import { NewContractFormComponent } from './new-contract-form/new-contract-form.component';


@NgModule({
  declarations: [
    ContractsPageComponent,
    NewContractFormComponent
  ],
  imports: [
    CommonModule,
    ContractsRoutingModule
  ]
})
export class ContractsModule { }
