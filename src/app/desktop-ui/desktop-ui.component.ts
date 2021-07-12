import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { DuiApp } from '@deepkit/desktop-ui';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';

@Component({
    template: `
        <div class="page">
            <product-banner header="Desktop UI" id="desktop-ui">
                <p>
                    Desktop user interface library for fast GUI development based on Angular.
                    With features for Electron, Dark/White mode, and zone-less Angular support.
                </p>
                <p>
                    Currently with MacOS style support. Windows and generic web (Linux) will follow.
                </p>
            </product-banner>

            <div class="preview" *ngIf="isBrowser">
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
                                    <dui-list-title>Application</dui-list-title>
                                    <dui-list-item value="menu">Menu</dui-list-item>
                                    <dui-list-item value="dialog">Dialog</dui-list-item>

                                    <dui-list-title>Form controls</dui-list-title>
                                    <dui-list-item value="form">Form</dui-list-item>
                                    <dui-list-item value="input">Input</dui-list-item>
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

                                    <dui-list-title>Window</dui-list-title>
                                    <dui-list-item value="window">Window</dui-list-item>
                                    <dui-list-item value="window-toolbar">Toolbar</dui-list-item>
                                </dui-list>
                            </dui-window-sidebar>

                            <page-button *ngIf="selected === 'button'"></page-button>
                            <page-button-group *ngIf="selected === 'button-group'"></page-button-group>
                            <page-form *ngIf="selected === 'form'"></page-form>
                            <page-input *ngIf="selected === 'input'"></page-input>
                            <page-radiobox *ngIf="selected === 'radiobox'"></page-radiobox>
                            <page-checkbox *ngIf="selected === 'checkbox'"></page-checkbox>
                            <page-selectbox *ngIf="selected === 'selectbox'"></page-selectbox>
                            <page-icon *ngIf="selected === 'icon'"></page-icon>
                            <page-slider *ngIf="selected === 'slider'"></page-slider>
                            <page-indicator *ngIf="selected === 'indicator'"></page-indicator>
                            <page-table *ngIf="selected === 'table'"></page-table>
                            <page-list *ngIf="selected === 'list'"></page-list>
                            <page-dialog *ngIf="selected === 'dialog'"></page-dialog>
                            <page-menu *ngIf="selected === 'menu'"></page-menu>
                            <page-window *ngIf="selected === 'window'"></page-window>
                            <page-window-toolbar *ngIf="selected === 'window-toolbar'"></page-window-toolbar>
                        </dui-window-content>
                    </dui-window>
                </div>
            </div>

            <div class="text" *ngIf="isBrowser">
                <h2>Input widgets</h2>

                <p>
                    With basic widgets like inputs, selectbox, radiobox, checkbox, slider, and buttons its easy and fast to build
                    desktop looking user interfaces.
                </p>

                <div class="dui-body" style="padding: 16px;">
                    <p>
                        <dui-input placeholder="Input text" style="margin-right: 5px;"></dui-input>
                        <dui-button>Button</dui-button>
                    </p>
                    <p style="display: flex; justify-content: space-between; max-width: 400px;">
                        <dui-select [(ngModel)]="select1">
                            <dui-option value="a">Option A</dui-option>
                            <dui-option value="b">Option B</dui-option>
                        </dui-select>
                        <dui-radiobox>Radio</dui-radiobox>
                        <dui-checkbox>Checkbox</dui-checkbox>
                        <dui-slider style="width: 100px;" [ngModel]="0.4"></dui-slider>
                    </p>
                </div>

                <h2>Table</h2>

                <p>
                    The table widget allows to dynamically render big amount of data with virtual scrolling,
                    dynamic columns (moving, hiding), sorting, context menu, and more.
                </p>

                <div class="dui-body" style="padding: 16px;">
                    <dui-table style="height: 180px;" multiSelect [items]="items" [selectable]="true">
                        <dui-dropdown duiTableCustomRowContextMenu>
                            <dui-dropdown-item>Delete</dui-dropdown-item>
                        </dui-dropdown>
                        <dui-table-column name="title" header="Title" [width]="150"></dui-table-column>
                        <dui-table-column name="i" [width]="30"></dui-table-column>
                        <dui-table-column name="created" header="Created">
                            <ng-container *duiTableCell="let row">
                                {{row.created|date:'mediumTime'}}
                            </ng-container>
                        </dui-table-column>
                        <dui-table-column name="columnA" header="Another A" hidden>
                            <ng-container *duiTableCell="let row">
                                I'm just A
                            </ng-container>
                        </dui-table-column>
                        <dui-table-column name="columnB" header="Another B" hidden>
                            <ng-container *duiTableCell="let row">
                                I'm just B
                            </ng-container>
                        </dui-table-column>
                    </dui-table>
                </div>

                <h2>Angular forms</h2>

                <p>
                    With support for reactive and ngModel Angular forms, you can use all input widgets in your forms.
                </p>

                <div class="dui-body" style="padding: 16px;">
                    <form ngForm="form1">
                        <dui-form-row label="Forename">
                            <dui-input formControlName="forename"></dui-input>
                        </dui-form-row>
                        <dui-form-row label="Surname">
                            <dui-input formControlName="surname"></dui-input>
                        </dui-form-row>
                        <dui-button>Send</dui-button>
                    </form>
                </div>

                <textarea codeHighlight="html">
                    <form ngForm="form1">
                        <dui-form-row label="Forename">
                            <dui-input formControlName="forename"></dui-input>
                        </dui-form-row>
                        <dui-form-row label="Surname">
                            <dui-input formControlName="surname"></dui-input>
                        </dui-form-row>
                        <dui-button>Send</dui-button>
                    </form>
                </textarea>

                <p>
                    With <a href="/library/type-angular">@deepkit/type-angular</a> you can build Angular forms even faster by
                    using already existing models from @deepkit/type!
                </p>

                <h2>Custom icons</h2>

                <p>
                    An integrated framework for custom icons based on SVG files allows you to provide icons
                    as SVG and compile them automatically down to a font file and use them directly in desktop UI.
                </p>

                <p>
                    <dui-icon name="comment"></dui-icon>
                    <dui-icon name="toggle_sidebar"></dui-icon>
                    <dui-icon name="add"></dui-icon>
                    <dui-icon name="star"></dui-icon>
                    <dui-icon name="search"></dui-icon>
                </p>
                
                <pre class="code">my-icon.svg</pre>

                <textarea codeHighlight="html">
                    <dui-button icon="my-icon">Button</dui-button>
                    
                    <dui-icon name="my-icon"></dui-icon>
                </textarea>

                More information in the documentation about <a href="/documentation/desktop-ui/icons">custom icons</a>.

                <h2>Window frame</h2>
                
                <p>
                    Window frame styling includes header, sidebar, footer, and for certain platforms even window actions (close, min/maximize)
                    to triggers Electron actions. By using Electron and a transparent frameless BrowserWindow
                    a realistic native look and feel is possible.
                </p>

                <div class="dui-body" style="padding: 80px 30px">
                    <dui-window style="height: 300px;">
                        <dui-window-header>
                            Angular Desktop UI
                            <dui-window-toolbar>
                                <dui-button-group>
                                    <dui-button textured icon="envelop"></dui-button>
                                </dui-button-group>
                                <dui-button-group float="sidebar">
                                    <dui-button textured (click)="sidebarVisible2 = !sidebarVisible2;" icon="toggle_sidebar"></dui-button>
                                </dui-button-group>
                                <dui-button-group float="right">
                                    <dui-input textured icon="search" placeholder="Search" round clearer></dui-input>
                                </dui-button-group>
                            </dui-window-toolbar>
                        </dui-window-header>
                        <dui-window-content [sidebarVisible]="sidebarVisible2">
                            <dui-window-sidebar>
                                <dui-list>
                                    <dui-list-title>Category</dui-list-title>
                                    <dui-list-item>Item 1</dui-list-item>
                                    <dui-list-item>Item 2</dui-list-item>
                                </dui-list>
                            </dui-window-sidebar>
                            <div>
                                This is the window content.
                            </div>
                        </dui-window-content>
                        <dui-window-footer>
                            This is the footer.
                        </dui-window-footer>
                    </dui-window>
                </div>
                
                <div class="line"></div>
                
                <div style="text-align: center;">
                    <h1>Showcase</h1>

                    <p>
                        Desktop UI is used in a complex desktop application for
                        <a target="_blank" href="https://deepkit.ai/">machine learning experiment management</a>.
                        The framework enabled to develop this kind of application on a budget and time frame that wasn't possible before.
                    </p>

                    <p>
                        Live demonstration in the browser can be seen here:
                        <a target="_blank"
                           href="https://app.deepkit.ai/public/marcj/deepkit-python-sdk?projectView[tab]=experiments&experimentView[filter][list]=0b3e5215-289b-48b3-8108-284337766eb2">Demo</a>.
                    </p>
                </div>
            </div>

            <div style="background: #020607; padding: 150px 0;">
                <div class="wrapper" style="max-width: 1300px;">
                    <video id="my-video" muted="" oncanplay="this.muted=true" loop="" controls="" autoplay=""
                           preload="auto" poster="https://deepkit.ai/assets/images/video-screen-min.png"
                           data-setup="{&quot;fluid&quot;: true}"
                           class="video-js vjs-default-skin" style="max-width: 100%; max-height: 100%; margin: auto;">
                        <source src="https://deepkit.ai/assets/images/deepkit-v2020.mp4" type="video/mp4">
                        <p class="vjs-no-js"> To view this video please enable JavaScript, and consider upgrading to
                            a web browser that <a href="https://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>
                        </p>
                    </video>
                </div>
            </div>
        </div>

    `,
    styleUrls: ['./desktop-ui.component.scss']
})
export class DesktopUiComponent {
    selected: string = 'form';
    select1 = 'a';
    sidebarVisible = true;
    sidebarVisible2 = true;

    items = [
        { title: 'first', i: 1, created: new Date },
        { title: 'second', i: 2, created: new Date },
        { title: 'another', i: 3, created: new Date },
        { title: 'yeah', i: 4, created: new Date },
        { title: 'peter', i: 5, created: new Date },
    ];

    form1 = new FormGroup({
        forename: new FormControl('', [Validators.required]),
        surname: new FormControl('', [Validators.required]),
    });

    isBrowser = isPlatformBrowser(this.platformId);

    constructor(public duiApp: DuiApp, @Inject(PLATFORM_ID) protected platformId: any) {
        this.duiApp.setPlatform('darwin');
    }
}
