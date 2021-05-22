import { Component } from '@angular/core';

@Component({
    selector: 'page-form',
    template: `
        <h1>Form</h1>

        <dui-window-toolbar for="main">
            <dui-button-group>
                <dui-button textured [disabled]="name === ''" (click)="name = ''">clear</dui-button>
            </dui-button-group>
        </dui-window-toolbar>

        <p>
            <dui-input placeholder="Username"></dui-input>
            default with placeholder
        </p>

        <p>
            <dui-input [(ngModel)]="name"></dui-input>
            default
        </p>

        <p>
            <dui-input clearer [(ngModel)]="name"></dui-input>
            clearer
        </p>

        <p>
            <dui-input textured [(ngModel)]="name"></dui-input>
            textured
        </p>

        <p>
            <dui-input round [(ngModel)]="name"></dui-input>
            round
        </p>

        <p>
            <dui-input round lightFocus [(ngModel)]="name"></dui-input>
            round lightFocus
        </p>
        <p>
            <dui-input round lightFocus semiTransparent [(ngModel)]="name"></dui-input>
            round lightFocus semiTransparent
        </p>

        <p>
            <dui-input icon="star" [(ngModel)]="name"></dui-input>
        </p>

        <p>
            <dui-input icon="star" round clearer [(ngModel)]="name"></dui-input>
        </p>

        <p>
            <dui-input icon="check" placeholder="Good job"></dui-input>
        </p>

        <textarea codeHighlight="html">
<dui-window-toolbar for="main">
    <dui-button-group>
        <dui-button textured [disabled]="name === ''" (click)="name = ''">clear</dui-button>
    </dui-button-group>
</dui-window-toolbar>

<p>
    <dui-input placeholder="Username"></dui-input>
    default with placeholder
</p>

<p>
    <dui-input [(ngModel)]="name"></dui-input>
    default
</p>

<p>
    <dui-input clearer [(ngModel)]="name"></dui-input>
    clearer
</p>

<p>
    <dui-input textured [(ngModel)]="name"></dui-input>
    textured
</p>

<p>
    <dui-input round [(ngModel)]="name"></dui-input>
    round
</p>

<p>
    <dui-input round lightFocus [(ngModel)]="name"></dui-input>
    round lightFocus
</p>
<p>
    <dui-input round lightFocus semiTransparent [(ngModel)]="name"></dui-input>
    round lightFocus semiTransparent
</p>

<p>
    <dui-input icon="star" [(ngModel)]="name"></dui-input>
</p>

<p>
    <dui-input icon="star" round clearer [(ngModel)]="name"></dui-input>
</p>

<p>
    <dui-input icon="check" placeholder="Good job"></dui-input>
</p>
        </textarea>

        <api-doc module="components/form/form.component" component="FormComponent"></api-doc>

        <api-doc module="components/form/form.component" component="FormRowComponent"></api-doc>
    `
})
export class FormComponent {
    name: string = 'Peter';
}
