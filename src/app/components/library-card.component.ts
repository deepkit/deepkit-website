import { Component, Input } from '@angular/core';

@Component({
    selector: 'library-card',
    template: `
        <a href="/library/{{package|slice:9}}">
            <div class="package">{{package}}</div>
            <div class="title">{{title}}</div>
            <div class="sub">{{sub}}</div>
            <div class="content">
                <ng-content></ng-content>
            </div>
        </a>
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
}
