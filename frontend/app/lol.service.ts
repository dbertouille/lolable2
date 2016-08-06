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

    getComics() {
        return this.get('comics')
    }

    getComic(id: number) {
        return this.get('comics/' + id);
    }

    getComicBlog(id: number) {
        return this.get('comics/' + id + '/blog');
    }

    getComicNewest() {
        return this.get('comics/newest');
    }

    getComicRandom() {
        return this.get('comics/random');
    }

    private handleError(error: any) {
        /* 404s are expected in some cases */
        if (error.status != 404) {
            console.error('An error occurred', error);
        }
        return Promise.reject(error.message || error);
    }
}
