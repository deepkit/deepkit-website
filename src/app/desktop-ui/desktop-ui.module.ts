import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from '../common/common.module';
import { DesktopUiComponent } from './desktop-ui.component';
import {
    DuiButtonModule,
    DuiCheckboxModule,
    DuiFormComponent,
    DuiInputModule,
    DuiRadioboxModule,
    DuiSelectModule,
    DuiWindowModule,
    DuiIconModule,
    DuiListModule,
    DuiTableModule,
    DuiAppModule,
    DuiDialogModule,
    DuiSliderModule,
    DuiEmojiModule,
    DuiIndicatorModule,
} from '@deepkit/desktop-ui';
import { FormComponent } from './pages/form.component';
import { ButtonComponent } from './pages/button.component';
import { ButtonGroupComponent } from './pages/button-group.component';
import { ApiDocComponent, ApiDocProvider } from '../components/api-doc.component';
import { RadioboxComponent } from './pages/radiobox.component';
import { CheckboxComponent } from './pages/checkbox.component';
import { SelectboxComponent } from './pages/selectbox.component';
import { IconComponent } from './pages/icon.component';
import { IconsComponent } from '../components/icons-browser.component';
import { SliderComponent } from './pages/slider.component';
import { IndicatorComponent } from './pages/indicator.component';
import { TableComponent } from './pages/table.component';
import { ListComponent } from './pages/list.component';
import { InputComponent } from './pages/input.component';
import { DialogComponent } from './pages/dialog.component';
import { MenuComponent } from './pages/menu.component';
import { WindowComponent } from './pages/window.component';
import { CodeFrameComponent } from '../components/doc-code-frame.component';
import { WindowToolbarComponent } from './pages/window-toolbar.component';


const routes: Routes = [
    {
        path: '', component: DesktopUiComponent
    },
];


@NgModule({
    declarations: [
        DesktopUiComponent,
        FormComponent,
        ButtonComponent,
        InputComponent,
        ButtonGroupComponent,
        ApiDocComponent,
        RadioboxComponent,
        CheckboxComponent,
        SelectboxComponent,
        IconComponent,
        IconsComponent,
        SliderComponent,
        IndicatorComponent,
        TableComponent,
        ListComponent,
        DialogComponent,
        MenuComponent,
        WindowComponent,
        CodeFrameComponent,
        WindowToolbarComponent,
    ],
    providers: [
        ApiDocProvider
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AppCommonModule,
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
export class DesktopUiModule {

}
