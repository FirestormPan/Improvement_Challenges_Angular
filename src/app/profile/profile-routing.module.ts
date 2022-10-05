import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';

const routes: Routes = [
  {path:'', component: ProfilePageComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    FormsModule
  ],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
