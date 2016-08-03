import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

import { LOLService } from './lol.service';

@Component({
    selector: 'lol-comic',
    template:`
        <div id="comic">
            {{comic.title}}
        </div>
	    <div id="bottommenu">
            <md-button (click)="onClickFirst()">First</md-button>
            <md-button (click)="onClickBack()">Back</md-button>
            <md-button (click)="onClickRandom()">Random</md-button>
            <md-button (click)="onClickNext()">Next</md-button>
            <md-button (click)="onClickNewest()">Newest</md-button>
        </div>

    `,
})

export class ComicComponent implements OnInit {
    latest = {};
    comic = {};

    /* The first comic ID may not always be 1 */
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
