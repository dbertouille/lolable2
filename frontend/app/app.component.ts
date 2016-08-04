import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { ArchiveComponent } from './archive.component';
import { ComicComponent } from './comic.component';

import { LOLService } from './lol.service';

import globals = require('./globals');

@Component({
    selector: 'lol-app',
    template:`
        <div id="main" align="center">
            <div id="header">
                <img src="{{logourl}}"/>
            </div>
            <div id="topmenu">
                <md-button>About</md-button>
                <md-button>Archive</md-button>
                <md-button>Podcasts</md-button>
            </div>
            <div id="content">
                <router-outlet></router-outlet>
            </div>
            <div id="footer">
                {{footer}}
            </div>
        </div>
    `,
    providers: [LOLService],
    directives: [ROUTER_DIRECTIVES],
    precompile: [
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
