import { Component, Input } from '@angular/core';

@Component({
    selector: 'product-banner',

    template: `
        <div class="banner">
            <nav>
                <div class="breadcrumb">
                    <a routerLink="/library">Deepkit library</a> /
                </div>
                <a routerLink="/library/{{id}}" routerLinkActive="active">Overview</a>
                <a routerLink="/documentation/{{id}}">Documentation</a>
                <a href="/assets/api-docs/modules/_deepkit_{{id}}.html">API</a>
            </nav>

            <h1>{{header}}</h1>
            <div class="package-name">@deepkit/{{id}}</div>
            <ng-content></ng-content>
<!--            <div class="actions"></div>-->
        </div>
    `
})
export class ProductBannerComponent {
    @Input() header!: string;
    @Input() id!: string;
}
