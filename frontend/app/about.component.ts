import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

import { LOLService } from './lol.service';

import globals = require('./globals');

@Component({
    selector: 'lol-about',
    styles: [`
        #about {
            width: 900px;
        }
    `],
    template:`
        <div *ngIf="data" id="about">
            <img src="{{bannerurl}}"/>
            <div [innerHTML]=data align="left">
            </div>
        </div>
    `
})

export class AboutComponent implements OnInit {
    data = undefined;
    bannerurl = globals.wsurl + "/static/banner_about.png";

    constructor(private lolService: LOLService) {}

    ngOnInit() {
        this.lolService.getConfig().then(cfg => {
            var item;
            item = cfg.find(item => item.key == 'about');
            if (item !== undefined)
                this.data = item.value;
        });
    }
}
