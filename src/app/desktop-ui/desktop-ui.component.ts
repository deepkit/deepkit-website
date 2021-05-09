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

      <div class="wrapper">
        <div class="preview">
          <dui-window style="height: 500px;">
            <dui-window-header>
              Angular Desktop UI
              <dui-window-toolbar>
                <dui-button-group>
                  <dui-button textured icon="envelop"></dui-button>
                </dui-button-group>
                <dui-button-group float="sidebar">
                  <dui-button textured (click)="sidebarVisible = !sidebarVisible;"
                              icon="toggle_sidebar"></dui-button>
                </dui-button-group>
              </dui-window-toolbar>
            </dui-window-header>
            <dui-window-content [sidebarVisible]="sidebarVisible">
              <dui-window-sidebar>
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
              </dui-window-sidebar>
              <div>
                Selected dui-list-item: {{selected}}
              </div>
            </dui-window-content>
          </dui-window>
        </div>
      </div>
    `,
    styles: [`
        .preview {
            position: relative;
            z-index: 101;
            top: -80px;
            margin-bottom: -80px;
            border-radius: 4px;
            background-image: url('/assets/desktop-ui/bg.png');
        }

        dui-window {
            box-shadow: 0 15px 22px 0 rgba(0, 0, 0, 0.21);
            border-radius: 4px;
            overflow: hidden;
            backdrop-filter: blur(2px);
            background: var(--dui-window-content-bg-trans) !important;
        }
    `]
})
export class DesktopUiComponent {
    selected: any;
    sidebarVisible = true;

    constructor(duiApp: DuiApp) {
        duiApp.setPlatform('darwin');
    }
}
