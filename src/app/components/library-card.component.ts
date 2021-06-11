import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'library-card',
    host: {
        '(click)': 'router.navigateByUrl(url)',
    },
    template: `
        <div class="package">{{package}}</div>
        <div class="title">{{title}}</div>
        <div class="sub">{{sub}}</div>
        <div class="content">
            <ng-content></ng-content>
        </div>
    `,
    styles: [`
        :host {
            background: #FFFFFF;
            box-shadow: 0 0 16px rgba(0, 0, 0, 0.13);
            border-radius: 5px;
            text-align: left;
            padding: 35px 22px;
        }
        
        a, a:link {
            color: black;
        }
        
        a:hover{
            text-decoration: none;
        }
        
        .package {
            color: gray;
            font-size: 14px;
        }

        .title {
            margin-top: 5px;
            font-weight: bold;
        }

        .sub {
            margin-top: 34px;
            font-weight: bold;
            font-size: 14px;
        }

        .content {
            font-size: 14px;
        }

        .content p:first-child {
            margin-top: 0;
        }
    `]
})
export class LibraryCardComponent {
    @Input() package!: string;
    @Input() title!: string;
    @Input() sub!: string;

    get url() {
        return '/library/' + this.package.substr(9);
    }

    constructor(public router: Router) {
    }
}
