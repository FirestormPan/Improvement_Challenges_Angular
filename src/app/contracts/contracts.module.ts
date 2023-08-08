import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContractsRoutingModule } from './contracts-routing.module';
import { ContractsPageComponent } from './contracts-page/contracts-page.component';
import { NewContractFormComponent } from './new-contract-form/new-contract-form.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { ContractPendingComponent } from './contract-pending/contract-pending.component';


@NgModule({
  declarations: [
    ContractsPageComponent,
    NewContractFormComponent,
    ContractPendingComponent,
  ],
  imports: [
    CommonModule,
    ContractsRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class ContractsModule { 
  
  ngOnInit(): void {
  }
  
}
