import { Component } from '@angular/core';

@Component({
    selector: 'page-radiobox',
    template: `
        <h1>Radiobox</h1>

        <textarea codeHighlight>
        import {DuiRadioboxModule} from '@deepkit/desktop-ui';
        </textarea>

        <dui-radiobox [(ngModel)]="radioValue" value="a">Radio A</dui-radiobox><br/>
        <dui-radiobox [(ngModel)]="radioValue" value="b">Radio B</dui-radiobox><br/>
        <dui-radiobox [(ngModel)]="radioValue" value="c">Radio C</dui-radiobox>
        <p>
            Chosen: {{radioValue}}
        </p>

        <dui-radiobox [(ngModel)]="radioValue" disabled value="a">Radio A</dui-radiobox><br/>
        <dui-radiobox [(ngModel)]="radioValue" disabled value="b">Radio B</dui-radiobox><br/>
        <dui-radiobox [(ngModel)]="radioValue" disabled value="c">Radio C</dui-radiobox>
    `
})
export class RadioboxComponent {
    radioValue = 'a';
}
