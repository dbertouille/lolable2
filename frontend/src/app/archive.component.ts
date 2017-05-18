import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { LOLService } from './lol.service';

import globals = require('./globals');

interface Box {
    content: any;
    config: any;
}

@Component({
    selector: 'lol-archive',
    styles: [`
        .search {
            font-size: 25px;
            font-weight: bold;
            margin-right: 50px;
            margin-top: 20px;
            text-align: right;
        }
        .search input {
            font-size: 25px;
        }
        .archive {
            margin-top: 20px;
            margin: auto;
        }
        .archive-item {
            border-radius: 25px;
            border: 2px solid #000000;
            background-color:rgba(255, 255, 255, 0.5);
        }
        .archive-item-type {
            background-color: black;
            color: white;
            text-align: center;
            font-weight: bold;
        }
        .archive-item-title{
            margin-left: 20px;
        }
        .archive-item-img {
            width: 250px;
            height: 250px;
            display: block;
            margin: auto;
            object-fit:cover;
            border: 2px solid #000000;
        }
    `],
    template:`
        <div class="search">
            <label>
                Search
               <input type="text"/>
            </label>
            <button>
                <i class="fa fa-search"></i>
            </button>
        </div>
        <div class="archive" [ngGrid]="gridOptions">
            <div class="archive-item" *ngFor="let box of boxes" [(ngGridItem)]="box.config">
                <p class="archive-item-type"><b>{{box.content.type}}</b><p>
                <p class="archive-item-title"><b>{{box.content.name}}</b></p>
                <img class="archive-item-img" src="{{box.content.thumb}}"/>
            </div>
        </div>
    `,
})

export class ArchiveComponent implements OnInit {
    private wsurl = globals.wsurl;
    private page = 1;
    private boxes: Array<Box> = [];
    private gridOptions = {
        'draggable': false,
        'resizable': false,
        'limit_to_screen': true,
        'fix_to_grid': true,
        'row_height': 370,
        'col_width': 320,
        'margins': [25],
        'cascade': "left",
    }

    constructor(
        private lolService: LOLService,
        private route: ActivatedRoute,
        private location: Location
    ) {}

    ngOnInit() {
        this.lolService.getComics().then(comics => {
            comics.sort((a, b) => a.id < b.id ? 1 : a.id > b.id ? -1 : 0)
            comics.forEach((comic, i) => {
                this.boxes[i] = {
                    content: {
                        type: "COMIC",
                        name: "Issue #" + comic.id + ": " + comic.title,
                        thumb: this.wsurl + '/static/comics/' + comic.id + '.png',
                        url: "",
                    },
                    config: {
                        col: i + 1,
                        row: 1
                    }
                }
            });
        });
    }
}
