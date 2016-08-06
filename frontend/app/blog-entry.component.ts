import { Component, Input } from '@angular/core';

import { LOLService } from './lol.service';

@Component({
    selector: 'lol-blog-entry',
    template:`
        <div *ngIf="blog">
            <div class="blog-entry-title">
                {{blog.title}}
            </div>
            <div class="blog-entry-data">
                {{blog.blog}}
            </div>
        </div>
    `,
})

export class BlogEntryComponent {
    blog = undefined;
    comic = undefined;

    constructor(private lolService: LOLService) {}

    @Input()
    set selectedComic(selectedComic) {
        this.comic = selectedComic;
        this.lolService.getComicBlog(this.comic.id)
          .then(blog => this.blog = blog, err => this.blog = undefined);
    }
}
