import { Component, Input } from '@angular/core';
import {DomSanitizationService} from '@angular/platform-browser';

import { LOLService } from './lol.service';

@Component({
    selector: 'lol-blog-entry',
    styles: [`
        .blog-entry {
            border-radius: 25px;
            border: 2px solid #000000;
            margin-left: 50px;
            margin-right: 50px;
            padding-top: 10px;
            padding-bottom: 10px;
            padding-left: 10px;
            text-align: left;
            background-color:rgba(255, 255, 255, 0.5);
        }
        .blog-entry-title {
            font-weight: bold;
            font-size: 24px;
        }

        :host >>> * {
            display:block;
            margin-top: 20px;
            margin-bottom: 20px;
            margin-left: auto;
            margin-right: auto;
            padding-left: 20px;
            padding-right: 20px;
        }
    `],
    template:`
        <div *ngIf="blogTitle && blogContent" class="blog-entry">
            <div class="blog-entry-title">
                {{blogTitle}}
            </div>
            <div class="blog-entry-data" [innerHTML]="blogContent">
            </div>
        </div>
    `,
})

export class BlogEntryComponent {
    comic = undefined;
    blogTitle = undefined;
    blogContent = undefined;

    constructor(private lolService: LOLService, private sanitizer: DomSanitizationService) {}

    @Input()
    set blog(blog) {
        this.blogTitle = blog.title;
        this.blogContent = this.sanitizer.bypassSecurityTrustHtml(blog.blog);
    }

    @Input()
    set selectedComic(selectedComic) {
        this.comic = selectedComic;
        this.lolService.getComicBlog(this.comic.id)
          .then(blog => this.blog = blog, err => this.blog = undefined);
    }
}
