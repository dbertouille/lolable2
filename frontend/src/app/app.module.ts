import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes }  from '@angular/router';

import { AboutComponent } from './about.component';
import { AppComponent } from './app.component';
import { BlogComponent } from './blog.component';
import { BlogEntryComponent } from './blog-entry.component';
import { ComicComponent } from './comic.component';

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
    }
];


@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    BlogComponent,
    BlogEntryComponent,
    ComicComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
