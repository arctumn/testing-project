import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'login',
        loadComponent: () => import('../app/components/login/login').then(c => c.Login)
    },
    {
        path:'register',
        loadComponent: () => import('../app/components/register/register.component').then(c => c.RegisterComponent)
    },
    {
        path: 'dashboard',
        loadComponent: () => import('../app/components/dashboard/dashboard').then(c => c.Dashboard)
    }
];
