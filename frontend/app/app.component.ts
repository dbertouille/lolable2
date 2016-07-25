import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

import { ConfigurationService } from './configuration.service';

import globals = require('./globals');

@Component({
  selector: 'lolable',
  template: `
    <img src="{{logourl}}"/>
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
