import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

import { ComicComponent } from './comic.component';

import { ConfigurationService } from './configuration.service';

import globals = require('./globals');

@Component({
  selector: 'lol-app',
  template:`
    <div id="main" align="center">
        {{title}}
        <div id="header">
            <img src="{{logourl}}"/>
        </div>
	    <div id="topmenu">
            <md-button>About</md-button>
            <md-button>Archive</md-button>
            <md-button>Podcasts</md-button>
        </div>
        <div id="content">
            <lol-comic></lol-comic>
        </div>
        <div id="footer">
            {{footer}}
        </div>
    </div>
  `,
  providers: [ConfigurationService],
  directives: [ComicComponent]
})

export class AppComponent implements OnInit {
    title = '';
    footer = '';
    logourl = globals.wsurl + "/static/logo.png";

    constructor(private configurationService: ConfigurationService) { }

    ngOnInit() {
        this.configurationService.getConfig().then(cfg => {
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
