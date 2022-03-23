import { Component } from '@angular/core';

@Component({
    selector: 'page-icon',
    template: `
        <h1>Icon</h1>

        <p>
            This library comes with own set of icons you can use in dui-button, dui-input and dui-icon. All icons are available as SVGs and
            are compiled to
            a font file you should import in your angular config. See the getting started page to know how to install the font correctly.
        </p>

        <dui-icon name="flag" [size]="8"></dui-icon>
        <dui-icon name="flag"></dui-icon>
        <dui-icon name="flag" [size]="24"></dui-icon>
        <p>
            <dui-button icon="flag">My button</dui-button>
            <dui-button icon="flag" iconRight>My Button</dui-button>
            <dui-button icon="check">Check</dui-button>
            <dui-button icon="star">Star</dui-button>
        </p>
        <p>
            <dui-button icon="arrow_down">Dropdown</dui-button>
            <dui-button icon="arrow_down" iconRight>Dropdown</dui-button>
        </p>
        <p>
            <dui-button-group padding="none">
                <dui-button icon="garbage"></dui-button>
                <dui-button icon="flag"></dui-button>
            </dui-button-group>
            <dui-button-group padding="none">
                <dui-button small [iconSize]="15" icon="garbage"></dui-button>
                <dui-button small icon="flag"></dui-button>
            </dui-button-group>
        </p>
        <p>
            <dui-input round placeholder="My input with icon" icon="flag"></dui-input>
        </p>

        <p>
            <dui-icon name="zoom-to-fit" clickable></dui-icon>
            Clickable icon
        </p>

        <dui-button-groups>
            <dui-button-group padding="none">
                <dui-select textured [ngModel]="12" small style="width: 50px;">
                    <dui-option [value]="8">8</dui-option>
                    <dui-option [value]="12">12</dui-option>
                </dui-select>
            </dui-button-group>

            <dui-button-group padding="none">
                <dui-button textured small icon="15_text-format-bold"></dui-button>
                <dui-button textured small [active]="true" icon="15_text-format-italic"></dui-button>
                <dui-button textured small icon="15_text-format-underline"></dui-button>
                <dui-button textured small icon="15_text-format-strikethrough"></dui-button>
            </dui-button-group>

            <dui-button-group padding="none">
                <dui-button textured small [active]="true" icon="15_text-format-align-left"></dui-button>
                <dui-button textured small icon="15_text-format-align-center"></dui-button>
                <dui-button textured small icon="15_text-format-align-right"></dui-button>
            </dui-button-group>
        </dui-button-groups>

        <h3>Icons available</h3>

        These icons can be used right away.

        <p>
            <icons-browser></icons-browser>
        </p>
    `
})
export class IconComponent {
}
