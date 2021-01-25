import { Component, HostBinding, Input } from "@angular/core";

@Component({
    selector: 'feature-box',
    template: `
      <div class="wrapper">
        <div class="blur1"></div>
        <ng-content select=".top"></ng-content>
        <div class="layout">
            <div class="left">
              <ng-content select=".left"></ng-content>
            </div>
            <div class="right">
              <ng-content select=".right"></ng-content>
            </div>
        </div>
        <div class="rest">
          <ng-content></ng-content>
        </div>
      </div>

      <separator [align]="align"></separator>
    `, styles: [`
        :host {
            display: block;
            background-color: var(--color-bg);
            overflow: hidden;
        }

        :host.right .blur1 {
            left: unset;
            right: -65px;
        }
        
        .blur1 {
            position: absolute;
            left: -65px;
            bottom: -120px;
            height: 260px;
            width: 737px;
            border-radius: 555px;
            opacity: 0.06;
            background: var(--color);
            filter: blur(50px);
            pointer-events: none;
        }
        
        .wrapper {
            position: relative;
            padding-top: 80px;
            padding-bottom: calc(80px + 105px);
        }
        
        .layout {
            position: relative;
            display: flex;
        }
        
        .layout ::ng-deep h2:first-of-type {
            margin-top: 0;
        }

        .layout div.left {
            position: relative;
            text-align: left;
            margin-right: 25px;
            display: flex;
            justify-content: center;
            align-items: center;
            max-width: 50%;
        }

        .layout div.right {
            position: relative;
            margin-left: auto;
            padding-left: 25px;
            text-align: right;
            max-width: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        :host ::ng-deep .actions {
            margin: 20px 0;
        }
    `],
    host: {
        '[class.right]': `align === 'right'`,
        '[style.--color]': `color`,
    }
})
export class FeatureBoxComponent {
    @Input() align: 'left' | 'right' = 'left';
    @Input() color: string = '#0000FF';
}
