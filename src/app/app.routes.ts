import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'login',
        loadComponent: () => import('../app/components/login/login').then(c => c.Login)
    }
];
