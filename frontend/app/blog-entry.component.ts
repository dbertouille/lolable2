import { Component, Input } from '@angular/core';

import { LOLService } from './lol.service';

@Component({
    selector: 'lol-blog-entry',
    styles: [`
        .blog-entry {
            border-radius: 25px;
            border: 2px solid #000000;
            margin-left: 10px;
            margin-right: 10px;
            padding-top: 10px;
            padding-bottom: 10px;
            padding-left: 10px;
            text-align: left;
        }
        .blog-entry-title {
            font-weight: bold;
        }
    `],
    template:`
        <div *ngIf="blog" class="blog-entry">
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

    @Input() blog;

    @Input()
    set selectedComic(selectedComic) {
        this.comic = selectedComic;
        this.lolService.getComicBlog(this.comic.id)
          .then(blog => this.blog = blog, err => this.blog = undefined);
    }
}
