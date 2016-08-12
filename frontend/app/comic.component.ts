import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

import { BlogEntryComponent } from './blog-entry.component';

import { LOLService } from './lol.service';

import globals = require('./globals');

@Component({
    selector: 'lol-comic',
    styles: [`
        .comicmenu {
            background-color: black;
            color: white;
        }
        .comicmenuitem {
            cursor: pointer;
        }
        .comicmenuitem.disabled {
            color: gray;
            cursor: default;
        }
    `],
    template:`
        <div *ngIf="comic" id="comic">
            <img src="{{wsurl + '/static/comics/' + comic.id + '.png'}}"/>
            <div class="comicmenu">
                <md-button
                  (click)="onClickFirst()"
                  class="comicmenuitem"
                  [class.disabled]="comic.id == 1">
                    First
                </md-button>
                <md-button
                  (click)="onClickBack()"
                  class="comicmenuitem"
                  [class.disabled]="comic.id == 1">
                    Back
                </md-button>
                <md-button (click)="onClickRandom()" class="comicmenuitem">
                    Random
                </md-button>
                <md-button
                  (click)="onClickNext()"
                  class="comicmenuitem"
                  [class.disabled]="comic.id == latest.id">
                    Next
                </md-button>
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

    constructor(private lolService: LOLService) {}

    ngOnInit() {
        this.lolService.getComicNewest().then(comic => {
            this.comic = comic;
            this.latest = comic;
        });
    }

    onClickFirst() {
        if (this.comic.id == this.first_id)
            return;
        this.lolService.getComic(this.first_id)
            .then(comic => this.comic = comic);
    }

    onClickBack() {
        if (this.comic.id == this.first_id)
            return;
        this.lolService.getComic(this.comic.id - 1)
            .then(comic => this.comic = comic);
    }

    onClickRandom() {
        this.lolService.getComicRandom().then(comic => this.comic = comic);
    }

    onClickNext() {
        if (this.comic.id == this.latest.id)
            return;
        this.lolService.getComic(this.comic.id + 1)
            .then(comic => this.comic = comic);
    }

    onClickNewest() {
        this.lolService.getComicNewest().then(comic => {
            this.comic = comic;
            this.latest = comic;
        });
    }
}
