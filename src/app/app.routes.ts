import { Routes } from '@angular/router';

export const routes: Routes = [

    {
        path: '',
        loadChildren: async () => (await import('src/app/pages/home')).routes,
    },
    {
        path: 'adduser',
        loadChildren: async () => (await import('src/app/pages/adduser')).routes,
    },
    {
        path: 'users/:userId',
        loadChildren: async () => (await import('src/app/pages/user')).routes,
    },

];
