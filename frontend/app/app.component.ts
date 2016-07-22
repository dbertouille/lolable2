import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

import { ConfigurationService } from './configuration.service';

@Component({
  selector: 'lolable',
  template: `
    <h1>{{title}}</h1>
  `,
  providers: [ConfigurationService]
})

export class AppComponent implements OnInit {
  title = '';

  constructor(private configurationService: ConfigurationService) { }

  ngOnInit() {
    this.configurationService.getTitle().then(title => this.title = title);
  }
}
