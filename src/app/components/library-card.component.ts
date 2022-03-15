import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'library-card',
    host: {
        '(click)': 'router.navigateByUrl(url)',
    },
    template: `
        <h3 class="title">{{title}}</h3>
        <div class="content">
            <ng-content></ng-content>
        </div>
        <div class="package">{{package}}</div>
    `,
    styles: [`
        :host {
            align-items: flex-start;
            padding: 25px;
        }
        
        :host:hover .package {
            color: white;
        }

        a, a:link {
            color: black;
        }

        a:hover {
            text-decoration: none;
        }
        
        .page, .title, .content {
            transition: color 0.2s ease-out;
        }

        .package {
            color: gray;
            font-size: 14px;
        }

        .title {
            font-weight: 800;
            font-size: 28px;
            text-transform: uppercase;
            color: #000000;
            letter-spacing: 6px;
            margin-bottom: 15px;
        }

        .content {
            font-weight: 600;
            font-size: 14px;
            color: var(--color-dark2);
            letter-spacing: 0;
            line-height: 28px;
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
    @Input() linkDocumentation: boolean = false;

    get url() {
        return this.linkDocumentation ? '/documentation/' + this.package.substr(9) : '/library/' + this.package.substr(9);
    }

    constructor(public router: Router) {
    }
}
