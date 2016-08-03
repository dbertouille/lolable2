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
            <md-button>First</md-button>
            <md-button>Back</md-button>
            <md-button (click)="onClickRandom()">Random</md-button>
            <md-button>Next</md-button>
            <md-button>Newest</md-button>
        </div>

    `,
})

export class ComicComponent implements OnInit {
    comic = {};

    constructor(private lolService: LOLService) {}

    ngOnInit() {
        this.lolService.getComicNewest().then(comic => this.comic = comic);
    }

    onClickRandom() {
        this.lolService.getComicRandom().then(comic => this.comic = comic);
    }
}
