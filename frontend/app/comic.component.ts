import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

import { LOLService } from './lol.service';

import globals = require('./globals');

@Component({
    selector: 'lol-comic',
    template:`
        <div *ngIf="comic" id="comic">
            <img src="{{wsurl + '/static/comics/' + comic.id + '.png'}}"/>
            <div id="comicmenu">
                <md-button *ngIf="comic.id != 1" (click)="onClickFirst()">
                    First
                </md-button>
                <md-button *ngIf="comic.id != 1" (click)="onClickBack()">
                    Back
                </md-button>
                <md-button (click)="onClickRandom()">
                    Random
                </md-button>
                <md-button *ngIf="comic.id != latest.id"
                  (click)="onClickNext()">
                    Next
                </md-button>
                <md-button *ngIf="comic.id != latest.id"
                  (click)="onClickNewest()">
                    Newest
                </md-button>
            </div>
        </div>

    `,
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
