import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfilePageComponent } from './profile/components/profile-page/profile-page.component';

const routes: Routes = [
  {
    path:'profile',
    loadChildren: ()=>import('./profile/profile.module').then(m => m.ProfileModule)
  },
  {
    path:'myCards',
    loadChildren: ()=>import('./myCards/my-cards.module').then(m => m.MyCardsModule)
  },
  {
    path:'informatzione',
    loadChildren: ()=>import('./informatzione/informatzione.module').then(m => m.InformatzioneModule)
  },
  {
    path:'contracts',
    loadChildren: ()=>import('./contracts/contracts.module').then(m => m.ContractsModule)
  },
  {
  path:'drawRandomDare',
  loadChildren: ()=>import('./random-draw/random-draw.module').then(m => m.RandomDrawModule)
  },
  {
     path: '**',
     component: ProfilePageComponent 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
