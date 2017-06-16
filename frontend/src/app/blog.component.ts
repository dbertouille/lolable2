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
        .blog-footer {
           text-align: center;
        }
        .blog-footer button {
            background-color: black;
            color: white;
            font-weight: bold;
            font-size: 24px;
        }
    `],
    template:`
        <div *ngIf="blogs" id="blogs">
            <div class="blog-entry-wrapper" *ngFor="let blog of blogs">
                <lol-blog-entry [blog]="blog"></lol-blog-entry>
            </div>
        </div>
        <div class="blog-footer">
            <button (click)="getNextChunk()">Load More</button>
        </div>
    `,
})

export class BlogComponent implements OnInit {
    private page = 1;
    private pageSize = 10;

    public blogs = [];

    constructor(private lolService: LOLService) {}

    ngOnInit() {
        this.getNextChunk();
    }

    getNextChunk() {
        this.lolService.getBlogs(this.pageSize, (this.page - 1) * this.pageSize).then(blogs => {
            blogs.forEach((blog, i) => {
                this.blogs.push(blog);
            });
        });
        this.page++;
    }
}
