import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

import { LOLService } from './lol.service';

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
            border-bottom: 2px solid black;
            background-color: #303030;
        }
        .header-logo {
            max-height: 100px;
        }
        .header-content {
            flex-grow: 100;
            position: relative;

            color: white;
            margin-left: 5px;
        }
        .header-menu {
            position: absolute;
            bottom: 0;
        }
        .header-menu a {
            //background-color: black;
            color: white;
            text-decoration: none;
            font-size: 3vw;
            font-weight: bold;
            padding-left: 10px;
            padding-right: 10px;
            border-radius: 0.5em;
            border-radius: 0.5em;
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
            min-height: 20px;
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
                            <a class="text" href="https://www.youtube.com/channel/UC7yfCL0Xns8k2Nrpvb63Ogg">@Lolable</a>
                        </div>
                        <div class="header-social-item">
                            <img src="static/icons/facebook.png"/>
                            <a class="text" href="https://www.facebook.com/lolablecomics/">@LolableComics</a>
                        </div>
                    </div>
                    <div class="header-menu">
                        <a [routerLink]="['/comic']">COMIC</a>
                        <a [routerLink]="['/archive']">ARCHIVE</a>
                        <a [routerLink]="['/blog']">BLOG</a>
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
