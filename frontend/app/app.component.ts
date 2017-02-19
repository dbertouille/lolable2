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
        #outer {
            background-color: #303030;
        }
        #main {
            background-color: #f7fc8f;
            width: 900px;
            min-height: 100vh;
        }
        #header {
            display; inline-block;
            overflow: hidden;
            position: relative;
        }
        .logo {
            float:left;
            padding: 5px;
            background-color: black;
        }
        .textlogo {
            color: #f7fc8f;
            text-decoration: none;
            font-weight: bold;
            font-size: 40px;
        }
        .topmenu {
            width:50%;
            position: absolute;
            bottom: 0;
            left: 150;
            margin-bottom: 5px;
        }
        .topmenu a {
            float: left;
            color: black;
            text-decoration: none;
            font-size: 30px;
            font-weight: bold;
            border-bottom: 2px solid;
            margin-left: 10px;
        }

        .socialmedia {
            margin-right: 10px;
            margin-top: 10px;
            float: right;
        }

        .socialmedia img {
            height: 15px;
        }

        .socialmedia a {
            color: black;
            text-decoration: none;
        }

        .socialmedia a:hover {
            font-weight: bold;
        }
    `],
    template:`
        <div id="outer" align="center">
            <div id="main">
                <div id="header">
                    <div class="logo">
                        <a class="textlogo" [routerLink]="['/comic']">Lolable</a>
                    </div>
                    <div class="topmenu">
                        <a [routerLink]="['/comic']">Comic</a>
                        <a [routerLink]="['/podcast']">Podcast</a>
                        <a [routerLink]="['/blog']">Blog</a>
                        <a>Store</a>
                    </div>
                    <div class="socialmedia">
                        <div class="socialmedia-item">
                            <img src="static/icons/youtube.png"/>
                            <a href="https://www.youtube.com/channel/UC7yfCL0Xns8k2Nrpvb63Ogg">@Lolable</a>
                        </div>
                        <div class="socialmedia-item">
                            <img src="static/icons/facebook.png"/>
                            <a href="https://www.facebook.com/lolablecomics/">@LolableComics</a>
                        </div>
                    </div>
                </div>
                <div id="content">
                    <router-outlet></router-outlet>
                </div>
                <div id="footer">
                    {{footer}}
                </div>
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
