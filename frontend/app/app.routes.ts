import { provideRouter, RouterConfig }  from '@angular/router';

import { AboutComponent } from './about.component';
import { ArchiveComponent } from './archive.component';
import { ComicComponent } from './comic.component';

const routes: RouterConfig = [
    {
        path: '',
        redirectTo: '/comics',
        pathMatch: 'full'
    },
    {
        path: 'about',
        component: AboutComponent
    },
    {
        path: 'archive',
        component: ArchiveComponent
    },

    {
        path: 'comics',
        component: ComicComponent
    },
];

export const appRouterProviders = [
    provideRouter(routes)
];
