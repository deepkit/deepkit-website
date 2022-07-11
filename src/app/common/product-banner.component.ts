import { Component, Input } from '@angular/core';

@Component({
    selector: 'product-banner',

    template: `
        <div class="wrapper" style="margin-bottom: 50px; padding-bottom: 50px; border-bottom: 1px solid var(--color-line)">
            <div class="overline">LIBRARY</div>
            <h2>{{header}}</h2>
            <div style="font-size: 14px; color: grey">@deepkit/{{id}}</div>

            <div style="max-width: 650px;">
                <ng-content></ng-content>
            </div>

            <a *ngIf="doc"class="button " href="https://docs.deepkit.io/english/{{doc}}">read documentation</a>
        </div>
    `
})
export class ProductBannerComponent {
    @Input() header!: string;
    @Input() id!: string;
    @Input() doc?: string;
}
