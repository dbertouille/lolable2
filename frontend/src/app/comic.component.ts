import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BlogEntryComponent } from './blog-entry.component';

import { LOLService } from './lol.service';

import globals = require('./globals');

@Component({
    selector: 'lol-comic',
    styles: [`
        .comic-wrapper {
            margin-top: 20px;
        }
        .comic {
            width: 90%;
            margin: auto;
        }
        .comic-title-text {
            font-weight: bold;
            margin-left: 10px;
        }
        .comic-img {
            width: 100%;
            display: block;
            border: solid black 2px;
        }
        .comic-menu {
            background-color: black;
            color: white;
            text-align: center;
        }
        .comic-menu a {
            color: white;
            text-decoration: none;
            padding-left: 10px;
            padding-right: 10px;
            border-radius: 0.5em;
            border-radius: 0.5em;
        }
        .comic-menu-item {
            cursor: pointer;
            padding-left: 10px;
            padding-right: 10px;
        }
        .comic-menu-item:hover {
            font-weight: bold;
        }
        .comic-menu-item.disabled {
            color: gray;
            cursor: default;
        }
        .comic-menu-item-spacer {
           // border: 1px solid #000000;
        }
    `],
    template:`
        <div *ngIf="comic" class="comic-wrapper">
            <div class="comic">
                <div class="title comic-title">
                    <span class="comic-title-text">
                    Issue #{{comic.id}}: {{comic.title}}
                    </span>
                </div>
                <div class="comic-img-wrapper">
                    <img class="comic-img" src="{{wsurl + '/static/comics/comic' + pad(comic.id, 3) + '.jpg'}}"/>
                </div>
                <div class="comic-menu">
                    <a
                    (click)="onClickFirst()"
                    class="text comic-menu-item"
                    [class.disabled]="comic.id == 1">
                        First
                    </a>
                    <span class="text comic-menu-item-spacer"></span>
                    <a
                    (click)="onClickBack()"
                    class="text comic-menu-item"
                    [class.disabled]="comic.id == 1">
                        Back
                    </a>
                    <span class="text comic-menu-item-spacer"></span>
                    <a (click)="onClickRandom()" class="text comic-menu-item">
                        Random
                    </a>
                    <span class="text comic-menu-item-spacer"></span>
                    <a class="text comic-menu-item" [routerLink]="['/archive']">
                        Archive
                    </a>
                    <span class="text comic-menu-item-spacer"></span>
                    <a
                    (click)="onClickNext()"
                    class="text comic-menu-item"
                    [class.disabled]="comic.id == latest.id">
                        Next
                    </a>
                    <span class="text comic-menu-item-spacer"></span>
                    <a
                    (click)="onClickNewest()"
                    class="text comic-menu-item"
                    [class.disabled]="comic.id == latest.id">
                        Newest
                    </a>
                </div>
            </div>
            <div style="height:10px;"></div>
            <lol-blog-entry [selectedComic]="comic"></lol-blog-entry>
        </div>

    `,
  //  directives: [BlogEntryComponent],
})

/*
 * This class assumes all comics are in sequential order starting
 * from 1. If we allow comics to be deleted, we may need to rework
 * this (and the webservice)
 */
export class ComicComponent implements OnInit {
    wsurl = globals.wsurl;
    latest = undefined;
    comic = undefined;
    sub = undefined;

    first_id = 1;

    constructor(
        private lolService: LOLService,
        private route: ActivatedRoute,
        private location: Location
    ) {}

    ngOnInit() {
        this.lolService.getComicNewest().then(comic => {
            this.latest = comic;
            this.sub = this.route.params.subscribe(params => {
                var id = +params['id'];
                if(isNaN(id) || id == undefined) {
                    id = this.latest.id;
                }
                this.loadComic(id);
            });
        });
    }

    loadComic(id) {
        this.lolService.getComic(id).then(comic => this.setComic(comic));
    }

    setComic(comic) {
        this.comic = comic
        this.location.replaceState("/comic/" + this.comic.id);
    }
    

    onClickFirst() {
        this.loadComic(this.first_id);
    }

    onClickBack() {
        this.loadComic(Math.max(this.comic.id - 1, this.first_id));
    }

    onClickRandom() {
        this.lolService.getComicRandom().then(comic => this.setComic(comic));
    }

    onClickNext() {
        this.loadComic(Math.min(this.comic.id + 1, this.latest.id));
    }

    onClickNewest() {
        this.setComic(this.latest);
    }

    pad(num, size) {
        var s = num+"";
        while (s.length < size) s = "0" + s;
        return s;
    }
}
