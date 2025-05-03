import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client.component';
import { ClientProfileComponent } from './client-profile/client-profile.component';
import { ClientHomeComponent } from './client-home/client-home.component';

const routes: Routes = [
  {
    path: '', component: ClientComponent,
    children: [
      {
        path: '', component:ClientHomeComponent
      },
      {
        path: 'profile/:id', component:ClientProfileComponent
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
