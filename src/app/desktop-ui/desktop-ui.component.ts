import { Component } from '@angular/core';
import { DuiApp } from '@deepkit/desktop-ui';

@Component({
    template: `
        <div class="banner" style="height: 450px;">
            <div class="wrapper">
                <div class="text">
                    <h1>Deepkit Desktop UI</h1>

                    <p class="banner-text">
                        Angular Desktop UI
                    </p>
                </div>
            </div>
        </div>

        <div class="preview">
            <div class="wrapper">
                <dui-window style="height: 600px;">
                    <dui-window-header>
                        Angular Desktop UI
                        <dui-window-toolbar>
                            <dui-button-group>
                                <dui-select textured [(ngModel)]="duiApp.theme">
                                    <dui-option value="auto">Auto theme</dui-option>
                                    <dui-option value="dark">Dark theme</dui-option>
                                    <dui-option value="light">Light theme</dui-option>
                                </dui-select>

                                <dui-select textured [ngModel]="duiApp.getPlatform()" (ngModelChange)="duiApp.setPlatform($event)">
                                    <dui-option value="web">Web</dui-option>
                                    <dui-option value="darwin">macOS</dui-option>
                                    <dui-option value="linux">Linux</dui-option>
                                    <dui-option value="win32">Windows</dui-option>
                                </dui-select>
                            </dui-button-group>
                            <dui-button-group float="sidebar">
                                <dui-button textured (click)="sidebarVisible = !sidebarVisible;"
                                            icon="toggle_sidebar"></dui-button>
                            </dui-button-group>
                            <dui-window-toolbar-container name="main"></dui-window-toolbar-container>
                        </dui-window-toolbar>
                    </dui-window-header>
                    <dui-window-content [sidebarVisible]="sidebarVisible">
                        <dui-window-sidebar>
                            <dui-list [(ngModel)]="selected">
                                <dui-list-title>Form controls</dui-list-title>
                                <dui-list-item value="form">Form</dui-list-item>
                                <dui-list-item value="radiobox">Radiobox</dui-list-item>
                                <dui-list-item value="checkbox">Checkbox</dui-list-item>
                                <dui-list-item value="selectbox">Selectbox</dui-list-item>

                                <dui-list-title>List</dui-list-title>
                                <dui-list-item value="list">List</dui-list-item>
                                
                                <dui-list-title>Buttons</dui-list-title>
                                <dui-list-item value="button">Button</dui-list-item>
                                <dui-list-item value="button-group">Button Group</dui-list-item>
                                <dui-list-item value="icon">Icon</dui-list-item>
                                <dui-list-item value="slider">Slider</dui-list-item>
                                <dui-list-item value="indicator">Indicator</dui-list-item>
                                
                                <dui-list-title>Table</dui-list-title>
                                <dui-list-item value="table">Table</dui-list-item>
                            </dui-list>
                        </dui-window-sidebar>
                        <div style="padding: 14px;">
                            <page-button *ngIf="selected === 'button'"></page-button>
                            <page-button-group *ngIf="selected === 'button-group'"></page-button-group>
                            <page-form *ngIf="selected === 'form'"></page-form>
                            <page-radiobox *ngIf="selected === 'radiobox'"></page-radiobox>
                            <page-checkbox *ngIf="selected === 'checkbox'"></page-checkbox>
                            <page-selectbox *ngIf="selected === 'selectbox'"></page-selectbox>
                            <page-icon *ngIf="selected === 'icon'"></page-icon>
                            <page-slider *ngIf="selected === 'slider'"></page-slider>
                            <page-indicator *ngIf="selected === 'indicator'"></page-indicator>
                            <page-table *ngIf="selected === 'table'"></page-table>
                            <page-list *ngIf="selected === 'list'"></page-list>
                        </div>
                    </dui-window-content>
                </dui-window>
            </div>
        </div>
    `,
    styleUrls: ['./desktop-ui.component.scss']
})
export class DesktopUiComponent {
    selected: string = 'form';
    sidebarVisible = true;

    constructor(public duiApp: DuiApp) {
        this.duiApp.setPlatform('darwin');
    }
}
