import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes }  from '@angular/router';
import { MaterialModule } from '@angular/material';
import { NgGridModule } from 'angular2-grid';

import { AboutComponent } from './about.component';
import { AppComponent } from './app.component';
import { BlogComponent } from './blog.component';
import { BlogEntryComponent } from './blog-entry.component';
import { ComicComponent } from './comic.component';
import { ArchiveComponent } from './archive.component';
import { PodcastComponent } from './podcast.component';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/comic',
        pathMatch: 'full'
    },
    {
        path: 'about',
        component: AboutComponent
    },
    {
        path : 'archive',
        component: ArchiveComponent
    },
    {
        path: 'blog',
        component: BlogComponent
    },
    {
        path: 'comic',
        component: ComicComponent
    },
    {
        path : 'comic/:id',
        component: ComicComponent
    },
    {
        path : 'podcast',
        component: PodcastComponent
    }
];


@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    ArchiveComponent,
    BlogComponent,
    BlogEntryComponent,
    ComicComponent,
    PodcastComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    NgGridModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
