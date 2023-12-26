import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CardComponent } from './components/card/card.component';
import { PopupCardComponent } from './components/card/popup-card/popup-card.component';
import { MatDialogModule } from '@angular/material/dialog';
import {  MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { LoginPopupComponent } from './components/login-popup/login-popup.component';

@NgModule({
  declarations: [
    SidebarComponent,
    TopbarComponent,
    CardComponent,
    PopupCardComponent,
    LoginPopupComponent
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
    CardComponent,
    LoginPopupComponent
  ]
})

export class SharedModule { }
