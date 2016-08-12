import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

import { DataTableDirectives } from 'angular2-datatable/datatable';

import { LOLService } from './lol.service';

import globals = require('./globals');

@Component({
    selector: 'lol-archive',
    template:`
        <div *ngIf="comics" id="archive">
            <img src="{{bannerurl}}"/>
            <table class="table table-striped"
              [mfData]="comics"
              #mf="mfDataTable">
                <thead>
                    <th>
                        <mfDefaultSorter by="posted_date">
                            Date Added
                        </mfDefaultSorter>
                    </th>
                    <th>
                        <mfDefaultSorter by="title">
                            Title
                        </mfDefaultSorter>
                    </th>
                    <th>
                        <mfDefaultSorter by="id">
                            Rating
                        </mfDefaultSorter>
                    </th>

                </thead>
                <tbody>
                    <tr *ngFor="let comic of mf.data">
                        <td>
                            {{comic.posted_date}}
                        </td>
                        <td>
                            {{comic.title}}
                        </td>
                        <td>
                            TODO - Rating
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    `,
    directives: [DataTableDirectives]
})

export class ArchiveComponent implements OnInit {
    comics = undefined;
    bannerurl = globals.wsurl + "/static/banner_archive.png";

    constructor(private lolService: LOLService) {}

    ngOnInit() {
        this.lolService.getComics().then(comics => this.comics = comics);
    }
}
