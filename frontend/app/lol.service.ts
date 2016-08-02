import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import globals = require('./globals');

@Injectable()
export class LOLService {

    constructor(private http: Http) {}

    private get(resource: string) {
        return this.http.get(globals.wsurl + '/' + resource)
          .toPromise()
          .then(response => response.json())
          .catch(this.handleError);
    }

    getConfig() {
        return this.get('configuration');
    }

    getComicNewest() {
        return this.get('comics/newest');
    }

    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}