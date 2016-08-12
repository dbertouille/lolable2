import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { AboutComponent } from './about.component';
import { ArchiveComponent } from './archive.component';
import { ComicComponent } from './comic.component';

import { LOLService } from './lol.service';

import globals = require('./globals');

@Component({
    selector: 'lol-app',
    styles: [`
        #outer {
            background-color: #303030;
        }
        #main {
            width: 900px;
            background-color: white;
            min-height: 100vh;
        }
        .topmenu {
            background-color: black;
            color: white;
        }
        .topmenu a {
            color: white;
            text-decoration: none;
        }
    `],
    template:`
        <div id="outer" align="center">
            <div id="main">
                <div id="header">
                    <a [routerLink]="['/comics']">
                        <img src="{{logourl}}"/>
                    </a>
                </div>
                <div class="topmenu">
                    <a [routerLink]="['/about']">About</a>
                    <a [routerLink]="['/archive']">Archive</a>
                    <a [routerLink]="['/podcasts']">Podcasts</a>
                </div>
                <div id="content">
                    <router-outlet></router-outlet>
                </div>
                <div id="footer">
                    {{footer}}
                </div>
            </div>
        </div>
    `,
    providers: [LOLService],
    directives: [ROUTER_DIRECTIVES],
    precompile: [
      AboutComponent,
      ArchiveComponent,
      ComicComponent
    ],
})

export class AppComponent implements OnInit {
    title = '';
    footer = '';
    logourl = globals.wsurl + "/static/logo.png";

    constructor(private lolService: LOLService) { }

    ngOnInit() {
        this.lolService.getConfig().then(cfg => {
            var item;
            item  = cfg.find(item => item.key == 'title');
            if (item !== undefined)
                this.title = item.value;
            item = cfg.find(item => item.key == 'footer');
            if (item !== undefined)
                this.footer = item.value;
        });
    }
}
