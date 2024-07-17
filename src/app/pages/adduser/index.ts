import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        title: 'AddUSer',
        loadComponent: async () => (await import('./adduser.component')).AdduserComponent,
    },
];
