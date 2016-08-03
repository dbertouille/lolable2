import { provideRouter, RouterConfig }  from '@angular/router';
import { ComicComponent } from './comic.component';

const routes: RouterConfig = [
    {
        path: '',
        redirectTo: '/comics',
        pathMatch: 'full'
    },
    {
        path: 'comics',
        component: ComicComponent
    }
];

export const appRouterProviders = [
    provideRouter(routes)
];
