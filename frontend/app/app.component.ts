import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { AboutComponent } from './about.component';
import { ArchiveComponent } from './archive.component';
import { BlogComponent } from './blog.component';
import { ComicComponent } from './comic.component';

import { LOLService } from './lol.service';

import globals = require('./globals');

@Component({
    selector: 'lol-app',
    styles: [`
        .main {
            min-height: 100vh;
            background-image: url('static/bg.jpg');
            display: block;
        }
        .header {
            display: flex;
            float: left
            width: 100%;
        }
        .header-logo {
            max-height: 100px;
        }
        .header-content {
            flex-grow: 100;
            position: relative;
             background-color: black;
             color: white;
        }
        .header-menu {
            position: absolute;
            bottom: 0;
            width: 100%;
        }
        .header-menu a {
            color: white;
            text-decoration: none;
            font-size: 3vw;
            font-weight: bold;
            border-bottom: 2px solid;
            margin-left: 10px;
        }

        .header-social {
            margin-right: 10px;
            margin-top: 10px;
            float: right;
        }

        .header-social img {
            height: 15px;
        }

        .header-social a {
            color: white;
            text-decoration: none;
        }

        .header-social a:hover {
            font-weight: bold;
        }
        .content {
            display: block;
            clear: left;
        }

        .footer {
            width: 100%;
            margin-top: 20px;
            text-align: center;
        }

    `],
    template:`
        <div class="main">
            <div class="header">
                <div>
                    <img class="header-logo" src="static/logo.jpg"/>
                </div>
                <div class="header-content">
                    <div class="header-social">
                        <div class="header-social-item">
                            <img src="static/icons/youtube.png"/>
                            <a href="https://www.youtube.com/channel/UC7yfCL0Xns8k2Nrpvb63Ogg">@Lolable</a>
                        </div>
                        <div class="header-social-item">
                            <img src="static/icons/facebook.png"/>
                            <a href="https://www.facebook.com/lolablecomics/">@LolableComics</a>
                        </div>
                    </div>
                    <div class="header-menu">
                        <a [routerLink]="['/comic']">COMIC</a>
                        <a [routerLink]="['/podcast']">PODCAST</a>
                        <a [routerLink]="['/blog']">BLOG</a>
                        <a>STORE</a>
                    </div>
                </div>
            </div>
            <div class="content">
                <router-outlet></router-outlet>
            </div>
            <div class="footer">
                {{footer}}
            </div>
        </div>
    `,
    providers: [
        LOLService,
    ],
    directives: [ROUTER_DIRECTIVES],
    precompile: [
      AboutComponent,
      ArchiveComponent,
      BlogComponent,
      ComicComponent
    ],
})

export class AppComponent implements OnInit {
    title = '';
    footer = '';

    constructor(private lolService: LOLService) { }

    ngOnInit() {
        this.lolService.getConfig().then(cfg => {
            var item;
            item  = cfg.find(item => item.key == 'title');
            if (item !== undefined)
                this.title = item.value;
            item = cfg.find(item => item.key == 'footer');
            if (item !== undefined)
                this.footer = item.value;
        });
    }
}
