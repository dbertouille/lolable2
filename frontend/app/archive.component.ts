import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

import { DataTableDirectives } from 'angular2-datatable/datatable';

import { LOLService } from './lol.service';

@Component({
    selector: 'lol-archive',
    template:`
        <div *ngIf="comics" id="archive">
            <table class="table table-striped"
              [mfData]="comics"
              #mf="mfDataTable"
              [mfRowsOnPage]="2">
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
                <tfoot>
                <tr>
                    <td colspan="3">
                        <mfBootstrapPaginator [rowsOnPageSet]="[2,4,8]"></mfBootstrapPaginator>
                    </td>
                </tr>
                </tfoot>
            </table>
        </div>
    `,
    directives: [DataTableDirectives]
})

export class ArchiveComponent implements OnInit {
    comics = undefined;

    constructor(private lolService: LOLService) {}

    ngOnInit() {
        this.lolService.getComics().then(comics => this.comics = comics);
    }
}
