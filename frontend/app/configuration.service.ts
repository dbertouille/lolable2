import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Configuration } from './configuration';

import globals = require('./globals');

@Injectable()
export class ConfigurationService {

  constructor(private http: Http) {}

  getConfig() {
    return this.http.get(globals.wsurl + '/configuration')
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
