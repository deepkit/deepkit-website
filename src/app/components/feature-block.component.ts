import { Component, Input } from '@angular/core';

@Component({
    selector: 'feature-block',
    template: `
        <div [class.wrapper]="wrapper" [class.center]="align === 'center'">
            <ng-content></ng-content>
        </div>
    `,
    host: {
        '[style.background-color]': 'bg',
    },
    styleUrls: ['./feature-block.component.scss']
})
export class FeatureBlockComponent {
    @Input() bg!: string;
    @Input() wrapper: boolean = true;
    @Input() align: 'left' | 'center' = 'left';
}
