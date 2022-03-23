import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DocDesktopUIGettingStartedComponent } from "./getting-started.component";
import { AppCommonModule } from "../../../common/common.module";
import {
    DuiAppModule,
    DuiButtonModule,
    DuiCheckboxModule, DuiDialogModule, DuiEmojiModule,
    DuiFormComponent, DuiIconModule, DuiIndicatorModule,
    DuiInputModule, DuiListModule, DuiRadioboxModule, DuiSelectModule, DuiSliderModule, DuiTableModule,
    DuiWindowModule
} from "@deepkit/desktop-ui";
import { IconBrowserComponent } from "./icon-browser.component";
import { DocDesktopUIIconComponent } from "./icon.component";
import { DocModule } from "./doc.module";
import { DuiApp } from "@deepkit/desktop-ui/src/components/app";
import { DocDesktopUIButtonComponent } from "./button.component";
import { DocDesktopUIButtonGroupComponent } from "./button-group.component";
import { DocDesktopUIDialogComponent } from "./dialog.component";
import { DocDesktopUIFormComponent } from "./form.component";
import { DocDesktopUIIndicatorComponent } from "./indicator.component";
import { DocDesktopUIInputComponent } from "./input.component";
import { DocDesktopUIListComponent } from "./list.component";
import { DocDesktopUIWindowMenuComponent } from "./window-menu.component";
import { DocDesktopUIRadioboxComponent } from "./radiobox.component";
import { DocDesktopUISelectboxComponent } from "./selectbox.component";
import { DocDesktopUISliderComponent } from "./slider.component";
import { DocDesktopUITableComponent } from "./table.component";
import { DocDesktopUIWindowToolbarComponent } from "./window-toolbar.component";
import { DocDesktopUIWindowComponent } from "./window.component";
import { DocDesktopUICheckboxComponent } from "./checkbox.component";
import { DocDesktopUIButtonDropdownComponent } from "./dropdown.component";

const routes: Routes = [
    {path: '', component: DocDesktopUIGettingStartedComponent},
    {path: 'icons', component: DocDesktopUIIconComponent},
    {path: 'button', component: DocDesktopUIButtonComponent},
    {path: 'button-group', component: DocDesktopUIButtonGroupComponent},
    {path: 'dropdown', component: DocDesktopUIButtonDropdownComponent},
    {path: 'dialog', component: DocDesktopUIDialogComponent},
    {path: 'form', component: DocDesktopUIFormComponent},
    {path: 'indicator', component: DocDesktopUIInputComponent},
    {path: 'input', component: DocDesktopUIInputComponent},
    {path: 'list', component: DocDesktopUIListComponent},
    {path: 'checkbox', component: DocDesktopUICheckboxComponent},
    {path: 'radiobox', component: DocDesktopUIRadioboxComponent},
    {path: 'selectbox', component: DocDesktopUISelectboxComponent},
    {path: 'slider', component: DocDesktopUISliderComponent},
    {path: 'table', component: DocDesktopUITableComponent},
    {path: 'window', component: DocDesktopUIWindowComponent},
    {path: 'window-menu', component: DocDesktopUIWindowMenuComponent},
    {path: 'window-toolbar', component: DocDesktopUIWindowToolbarComponent},
];

@NgModule({
    declarations: [
        DocDesktopUIGettingStartedComponent,
        DocDesktopUIIconComponent,
        IconBrowserComponent,
        DocDesktopUIButtonComponent,
        DocDesktopUIButtonGroupComponent,
        DocDesktopUIDialogComponent,
        DocDesktopUIFormComponent,
        DocDesktopUIButtonDropdownComponent,
        DocDesktopUIIndicatorComponent,
        DocDesktopUIInputComponent,
        DocDesktopUIListComponent,
        DocDesktopUIWindowMenuComponent,
        DocDesktopUICheckboxComponent,
        DocDesktopUIRadioboxComponent,
        DocDesktopUISelectboxComponent,
        DocDesktopUISliderComponent,
        DocDesktopUITableComponent,
        DocDesktopUIWindowComponent,
        DocDesktopUIWindowToolbarComponent,
    ],
    imports: [
        CommonModule,
        AppCommonModule,
        FormsModule,
        DocModule.forRoot(),
        RouterModule.forChild(routes),

        DuiAppModule.forRoot(),
        DuiWindowModule.forRoot(),

        DuiCheckboxModule,
        DuiButtonModule,
        DuiInputModule,
        DuiFormComponent,
        DuiRadioboxModule,
        DuiSelectModule,
        DuiIndicatorModule,
        DuiIconModule,
        DuiListModule,
        DuiTableModule,
        DuiButtonModule,
        DuiDialogModule,
        DuiEmojiModule,
        DuiSliderModule,
    ]
})
export class DocDesktopUIModule {
    constructor(duiApp: DuiApp) {
        duiApp.disableThemeDetection();
    }

}
