import { Component, Input, OnInit } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

import { LOLService } from './lol.service';

@Component({
    selector: 'lol-blog-entry',
    styles: [`
        @media (max-width: 500px) {
            .blog-entry {
                margin-left: 10px;
                margin-right: 10px;
            }
        }

        @media (min-width: 500px) {
            .blog-entry {
                margin-left: 50px;
                margin-right: 50px;
            }
        }

        .blog-entry {
            border-radius: 25px;
            border: 2px solid #000000;
            padding-top: 10px;
            padding-bottom: 10px;
            padding-left: 10px;
            text-align: left;
            background-color:rgba(255, 255, 255, 0.5);
        }

        :host >>> * {
            display:block;
            margin-top: 20px;
            margin-bottom: 20px;
            margin-left: auto;
            margin-right: auto;
            padding-left: 5px;
            padding-right: 5px;
        }
    `],
    template:`
        <div *ngIf="blogTitle && blogContent" class="blog-entry">
            <div class="title blog-entry-title">
                {{blogTitle}}
            </div>
            <div class="text blog-entry-data" [innerHTML]="blogContent">
            </div>
        </div>
    `,
})

export class BlogEntryComponent implements OnInit {
    comic = undefined;
    blogTitle = undefined;
    blogContent = undefined;

    constructor(private lolService: LOLService, private sanitizer: DomSanitizer) {}

    ngOnInit() {
        this.resizeYoutube();
    }

    @Input()
    set blog(blog) {
        if (blog === undefined) {
            this.blogTitle = undefined;
            this.blogContent = undefined;
        } else {
            this.blogTitle = blog.title;
            this.blogContent = this.sanitizer.bypassSecurityTrustHtml(blog.blog);
        }
    }

    @Input()
    set selectedComic(selectedComic) {
        this.comic = selectedComic;
        this.lolService.getComicBlog(this.comic.id)
          .then(blog => this.blog = blog, err => this.blog = undefined);
    }

    resizeYoutube() {
        var iframes = document.getElementsByTagName('iframe');
        for (var i = 0; i < iframes.length; i++) {
            var iframe = iframes[i];
            var players = /www.youtube.com|player.vimeo.com/;
            if (iframe.src.search(players) === -1) {
               continue
            }
            if (iframe.parentElement.className === 'fluid-vids') {
                continue;
            }

            var videoRatio = (Number(iframe.height) / Number(iframe.width)) * 100;
            iframe.style.position = 'absolute';
            iframe.style.top = '0';
            iframe.style.left = '0';
            iframe.width = '100%';
            iframe.height = '100%';

            var wrap              = document.createElement( 'div' );
            wrap.className        = 'fluid-vids';
            wrap.style.width      = '100%';
            wrap.style.position   = 'relative';
            wrap.style.paddingTop = videoRatio + '%';

            var iframeParent      = iframe.parentNode;
            iframeParent.insertBefore( wrap, iframe );
            wrap.appendChild( iframe );
        }
    }
}
