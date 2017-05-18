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

    getBlogs() {
        return this.get('blogs');
    }

    getConfig() {
        return this.get('configuration');
    }

    getComics(limit=null, offset=null, search=null) {
        let params = [];
        var s = 'comics?';
        if (limit !== null) {
            params.push("limit=" + limit)
        }
        if (offset !== null) {
            params.push("offset=" + offset)
        }
        if (search !== null) {
            params.push("search=" + encodeURIComponent(search))
        }
        return this.get(s + params.join('&'));
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
