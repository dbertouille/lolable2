import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Configuration } from './configuration';

@Injectable()
export class ConfigurationService {

  constructor(private http: Http) {}

  getConfig() {
    return this.http.get('http://127.0.0.1:5000/configuration')
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
