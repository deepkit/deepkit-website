import { Component } from '@angular/core';

@Component({
    selector: 'page-list',
    template: `<h1>List</h1>

    <textarea codeHighlight>
    import {DuiListModule} from '@deepkit/desktop-ui';
    </textarea>

    <div style="max-width: 350px;">
        <dui-list [(ngModel)]="selected">
            <dui-list-item value="button">Button</dui-list-item>
            <dui-list-item value="button-group">Button Group</dui-list-item>
            <dui-list-item value="window">Window</dui-list-item>
            <dui-list-item value="toolbar">Toolbar</dui-list-item>
            <dui-list-item value="sidebar">Sidebar</dui-list-item>
            <dui-list-item value="checkbox">Checkbox</dui-list-item>
            <dui-list-item value="radiobox">Radiobox</dui-list-item>
            <dui-list-item value="select">Select</dui-list-item>
        </dui-list>
    </div>
    <p>
        Selected dui-list-item: {{selected}}
    </p>

    <h2>List with category titles</h2>

    <div style="max-width: 350px;">
        <dui-list [(ngModel)]="selected">
            <dui-list-title>Form controls</dui-list-title>
            <dui-list-item value="button">Button</dui-list-item>
            <dui-list-item value="button-group">Button Group</dui-list-item>

            <dui-list-title>Window</dui-list-title>
            <dui-list-item value="window">Window</dui-list-item>
            <dui-list-item value="toolbar">Toolbar</dui-list-item>
            <dui-list-item value="sidebar">Sidebar</dui-list-item>

            <dui-list-title>Buttons & Indicators</dui-list-title>
            <dui-list-item value="checkbox">Checkbox</dui-list-item>
            <dui-list-item value="radiobox">Radiobox</dui-list-item>
            <dui-list-item value="select">Select</dui-list-item>
        </dui-list>
    </div>
    <p>
        Selected dui-list-item: {{selected}}
    </p>
    `
})
export class ListComponent {
    sidebarVisible = true;
    selected = 'button';
}
