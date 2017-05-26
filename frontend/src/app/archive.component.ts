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
        }
        .archive-item {
           // border-radius: 25px;
            border: 2px solid #000000;
            background-color:rgba(255, 255, 255, 0.5);
        }
        .archive-item > p {
            margin: 0px;
            width: 100%;
        }
        .archive-item-type {
            background-color: black;
            color: white;
            text-align: center;
            font-weight: bold;
        }
        .archive-item-img {
            object-fit:cover;
        }
        .archive-footer {
           text-align: center;
        }
        .archive-footer button {
            background-color: black;
            color: white;
            font-weight: bold;
            font-size: 24px;
        }
    `],
    template:`
        <div class="search">
            <label>
                Search
               <input type="text" [value]="searchText" (keyup.enter)="setSearch()" (input)="searchText = $event.target.value"/>
            </label>
            <button (click)="setSearch()">
                <i class="fa fa-search"></i>
            </button>
        </div>
        <div class="archive" [ngGrid]="gridOptions">
            <div class="archive-item" *ngFor="let box of boxes" [(ngGridItem)]="box.config">
                <p class="archive-item-type" [style.height.px]="titleHeight"><b>{{box.content.type}}</b><p>
                <img class="archive-item-img" src="{{box.content.thumb}}" [style.height.px]="imageSize" [style.width.px]="imageSize"/>
            </div>
        </div>
        <div class="archive-footer">
            <button *ngIf="!atEnd" (click)="addNextPage()">Load More</button>
        </div>
    `,
})

export class ArchiveComponent implements OnInit {
    private wsurl = globals.wsurl;

    private searchText = "";
    private search = "";

    private page = 1;
    private pageSize = 5;
    private imageSize = 0;
    private minImageSize = 75;
    private maxImageSize = 200;
    private titleHeight = 20;
    private boxes: Array<Box> = [];
    private atEnd = false;
    private mimMargin = 5;

    private gridOptions = {
        'draggable': false,
        'resizable': false,
        'limit_to_screen': true,
        'fix_to_grid': true,
        'row_height': 0,
        'col_width': 0,
        'min_width': 0,
        'min_height': 0,
        'margins': [0],
        'cascade': "left",
    }

    constructor(
        private lolService: LOLService,
        private route: ActivatedRoute,
        private location: Location
    ) {}

    ngOnInit() {
        this.sizeTheThings();
        this.addNextPage();
        window.onresize = (e) => {
            this.sizeTheThings();
        }
    }

    public addNextPage() {
        this.lolService.getComics(this.pageSize, (this.page - 1) * this.pageSize, this.search).then(comics => {
            comics.sort((a, b) => a.id < b.id ? 1 : a.id > b.id ? -1 : 0)
            comics.forEach((comic, i) => {
                this.boxes.push({
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
                });
            });
            if (comics.length < this.pageSize) {
                this.atEnd = true;
            }
            this.page++;
        });
    }

    public sizeTheThings() {
        let width = document.querySelectorAll('.archive')[0].clientWidth;

        this.imageSize = Math.floor(width / 3) - this.mimMargin * 2 - 4;
        this.imageSize = Math.max(this.imageSize, this.minImageSize);
        this.imageSize = Math.min(this.imageSize, this.maxImageSize);

        // + 4 for borders
        let itemWidth = this.imageSize + 4;
        let nthings = Math.floor(width / (itemWidth + this.mimMargin * 2));
        let margins = Math.floor(((width - (nthings * itemWidth)) / (nthings * 2)));

        this.gridOptions['margins'] = [margins];
        this.gridOptions['row_height'] = this.imageSize + this.titleHeight + 4;
        this.gridOptions['col_width'] = this.imageSize + 4;
    }

    public setSearch() {
        if (this.search !== this.searchText) {
            this.search = this.searchText;
            this.page = 1;
            this.atEnd = false;
            this.boxes = [];
            this.addNextPage();
        }
    }
}
