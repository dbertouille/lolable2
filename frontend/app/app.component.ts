import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

import { ConfigurationService } from './configuration.service';

import globals = require('./globals');

@Component({
  selector: 'lolable',
  template:`
    <div id="content" align="center">
        <div id="header">
            <img src="{{logourl}}"/>
	    <div id="topmenu">
            <md-button>About</md-button>
            <md-button>Archive</md-button>
            <md-button>Podcasts</md-button>
            </div>
        </div>
        <div id="footer">
        </div>
    </div>
  `,
  providers: [ConfigurationService]
})

export class AppComponent implements OnInit {
  title = '';
  logourl = globals.wsurl + "/static/logo.png";

  constructor(private configurationService: ConfigurationService) { }

  ngOnInit() {
    this.configurationService.getTitle().then(title => this.title = title);
  }
}
