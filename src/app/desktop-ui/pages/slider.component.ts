import { Component } from '@angular/core';

@Component({
    selector: 'page-slider',
    template: `
        <h1>Slider</h1>

        <textarea codeHighlight>
        import {DuiSliderModule} from '@deepkit/desktop-ui';
        </textarea>

        <p>
            <dui-slider [(ngModel)]="value"></dui-slider>
            <br/>
            Value: {{value}}
        </p>
        <p>
            <dui-slider [min]="50" [max]="200" [(ngModel)]="value2"></dui-slider>
            <br/>
            Value2: {{value2}}
        </p>

        <p>
            <dui-slider [min]="50" [steps]="25" [max]="200" [(ngModel)]="value3"></dui-slider>
            <br/>
            Value3: {{value3}}
        </p>

        <p>
            <dui-slider mini></dui-slider>
            <br/>
        </p>
    `
})
export class SliderComponent {
    value = 0.30;
    value2 = 60;
    value3 = 75;
}
