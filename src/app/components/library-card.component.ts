import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'library-card',
    template: `
        <a #link [routerLink]="doc ? undefined : productUrl">
            <h3 class="title">{{title}}</h3>
            <div class="content">
                <ng-content></ng-content>
            </div>
            <div class="package">{{package}}</div>
        </a>
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
export class LibraryCardComponent implements AfterViewInit {
    @Input() package!: string;
    @Input() title!: string;
    @Input() sub!: string;
    @Input() doc?: string;

    @ViewChild('link') link?: ElementRef;

    ngAfterViewInit(): void {
        if (this.link) {
            if (this.doc) this.link.nativeElement.href = this.docUrl;
        }
    }

    get productUrl() {
        return '/library/' + this.package.substr(9);
    }

    get docUrl() {
        return 'https://docs.deepkit.io/english/' + this.doc;
    }

    constructor(public router: Router) {
    }
}
