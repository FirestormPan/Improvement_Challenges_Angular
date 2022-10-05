import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { RouterModule } from '@angular/router';
import { CardComponent } from './components/card/card.component';
import { PopupCardComponent } from './components/card/popup-card/popup-card.component';
import { MatDialogModule } from '@angular/material/dialog';
import {  MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SidebarComponent,
    TopbarComponent,
    CardComponent,
    PopupCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatDialogModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    FormsModule
  ],
  exports:[
    SidebarComponent,
    TopbarComponent,
    CardComponent
  ]
})

export class SharedModule { }
