import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

import { LOLService } from './lol.service';

@Component({
    selector: 'lol-about',
    template:`
        <div *ngIf="data" id="about">
            <img src="/static/banners/about.png"/>
            <div [innerHTML]=data align="left">
            </div>
        </div>
    `
})

export class AboutComponent implements OnInit {
    data = undefined;

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
