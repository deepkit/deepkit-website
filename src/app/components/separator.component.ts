import { Component, Input } from "@angular/core";

@Component({
    selector: 'separator',
    template: `
      <div><img alt="separator" src="assets/images/separator.svg"/></div>
    `,
    styles: [`
        :host {
            display: block;
            pointer-events: none;
            border-top: 1px solid rgb(50, 51, 53);
            height: 10px;
            background-color: #16171a;
        }

        div {
            height: 105px;
            position: relative;
            top: -93px;
            max-width: calc(1874px + 175px);
            margin: auto;
            overflow: hidden;
        }

        img {
            position: absolute;
            left: 75px;
        }

        :host.right img {
            transform: scaleX(-1);
            left: unset;
            right: 75px;
        }
    `],
    host: {
        '[class.right]': `align === 'right'`
    }
})
export class SeparatorComponent {
    @Input() align: 'left' | 'right' = 'left';
}
