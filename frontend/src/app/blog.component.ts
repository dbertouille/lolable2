import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

import { BlogEntryComponent } from './blog-entry.component';

import { LOLService } from './lol.service';

import globals = require('./globals');

@Component({
    selector: 'lol-blog',
    styles: [`
        .blog-entry-wrapper {
            margin-top: 15px;
        }
    `],
    template:`
        <div *ngIf="blogs" id="blogs">
            <div class="blog-entry-wrapper" *ngFor="let blog of blogs">
                <lol-blog-entry [blog]="blog"></lol-blog-entry>
            </div>
        </div>
    `,
  //  directives: [BlogEntryComponent],
})

export class BlogComponent implements OnInit {
    blogs = undefined;

    constructor(private lolService: LOLService) {}

    ngOnInit() {
        this.lolService.getBlogs().then(blogs => this.blogs = blogs);
    }
}
