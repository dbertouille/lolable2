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
        .comicimg {
            border:1px solid #021a40;
        }

        .comicmenu {
            background-color: black;
            color: white;
        }

        .comicmenuitem {
            cursor: pointer;
            padding-left: 10px;
            padding-right: 10px;
            font-size: 20px;
        }

        .comicmenuitem:hover {
            font-weight: bold;
        }

        .comicmenuitem.disabled {
            color: gray;
            cursor: default;
        }
        .comicmenuitem-spacer {
            border: 1px solid #000000;
        }
    `],
    template:`
        <div *ngIf="comic" id="comic">
            <img class="comicimg" src="{{wsurl + '/static/comics/' + comic.id + '.png'}}"/>
            <div class="comicmenu">
                <md-button
                  (click)="onClickFirst()"
                  class="comicmenuitem"
                  [class.disabled]="comic.id == 1">
                    First
                </md-button>
                <span class="comicmenuitem-spacer"></span>
                <md-button
                  (click)="onClickBack()"
                  class="comicmenuitem"
                  [class.disabled]="comic.id == 1">
                    Back
                </md-button>
                <span class="comicmenuitem-spacer"></span>
                <md-button (click)="onClickRandom()" class="comicmenuitem">
                    Random
                </md-button>
                <span class="comicmenuitem-spacer"></span>
                <md-button
                  (click)="onClickNext()"
                  class="comicmenuitem"
                  [class.disabled]="comic.id == latest.id">
                    Next
                </md-button>
                <span class="comicmenuitem-spacer"></span>
                <md-button
                  (click)="onClickNewest()"
                  class="comicmenuitem"
                  [class.disabled]="comic.id == latest.id">
                    Newest
                </md-button>
            </div>
            <div style="height:10px;"></div>
            <lol-blog-entry [selectedComic]="comic"></lol-blog-entry>
        </div>

    `,
    directives: [BlogEntryComponent],
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

    first_id = 1;

    constructor(
        private lolService: LOLService,
        private route: ActivatedRoute,
        private location: Location,
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
        this.setComic(latest);
    }
}
