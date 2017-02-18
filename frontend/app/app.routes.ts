import { provideRouter, RouterConfig }  from '@angular/router';

import { AboutComponent } from './about.component';
import { ArchiveComponent } from './archive.component';
import { BlogComponent } from './blog.component';
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
        path: 'blog',
        component: BlogComponent
    },
    {
        path: 'comics',
        component: ComicComponent
    },
];

export const appRouterProviders = [
    provideRouter(routes)
];
