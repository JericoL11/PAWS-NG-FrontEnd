import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';
import { PetComponent } from './pet/pet.component';
import { PetservicesComponent } from './petservices/petservices.component';
import { ClientComponent } from './client/client.component';

const routes: Routes = [
  {
    path: '', component:DashboardComponent,
    children:  [
    {
      path: '', component:HomeComponent  //landing
    },
    {
      //nested lazy loading
      path: 'client',
      loadChildren: () => import('./client/client.module').then(m => m.ClientModule)
    },
    {
      path: 'pet', component:PetComponent
    },
    {
      path: 'petservice', component:PetservicesComponent
    }
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
