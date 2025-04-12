import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '', redirectTo: 'dashboard', pathMatch: 'full'
    },

    {
        path: 'dashboard',
        loadChildren: () => import('./Dashboard/dashboard.module').then(m => m.DashboardModule)
    }
];
