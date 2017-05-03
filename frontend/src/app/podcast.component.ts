import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

import { NgGridModule } from 'angular2-grid';

import { LOLService } from './lol.service';

import globals = require('./globals');

interface Box {
    podcast: any;
    config: any;
}

@Component({
    selector: 'lol-podcast',
    styles: [`
        .blog-entry-wrapper {
            margin-top: 15px;
        }
    `],
    template:`
        <div [ngGrid]="gridOptions">
            <div *ngFor="let box of boxes" [(ngGridItem)]="box.config">
                <p>{{box.podcast.name}}</p>
            </div>
        </div>
    `,
})

export class PodcastComponent implements OnInit {
    private boxes: Array<Box> = [];
    private gridOptions = {
        'limit_to_screen': true,
    }

    constructor(private lolService: LOLService) {}

    ngOnInit() {
        for (var i = 0; i < 8; i++) {
            this.boxes[i] = {
                podcast: {
                    name: "Podcast " + (i + 1),
                },
                config: {
                    'dragHandle': '.handle',
                    'col': i % 4 + 1,
                    'row': Math.floor(i / 4) + 1,
                }
            }
        }
    }
}
