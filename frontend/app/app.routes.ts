import { provideRouter, RouterConfig }  from '@angular/router';

import { ArchiveComponent } from './archive.component';
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
    },
    {
        path: 'archive',
        component: ArchiveComponent
    }
];

export const appRouterProviders = [
    provideRouter(routes)
];
