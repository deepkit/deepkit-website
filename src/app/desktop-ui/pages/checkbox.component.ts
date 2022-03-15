import { Component } from '@angular/core';

@Component({
    selector: 'page-checkbox',
    template: `
        <h1>Checkbox</h1>

        <textarea codeHighlight>
        import {DuiCheckboxModule} from '@deepkit/desktop-ui';
        </textarea>

        <p>
            <dui-checkbox [(ngModel)]="active">Disable all</dui-checkbox>
            <br/>
            Active: {{active}}
        </p>
        <p>
            <dui-checkbox [(ngModel)]="active" disabled>Disabled</dui-checkbox>
            <br/>
        </p>
    `
})
export class CheckboxComponent {
    active = false;
}
