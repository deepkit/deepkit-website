import { NgModule } from '@angular/core';
import { OrmComponent } from './orm.component';
import { OrmPlaygroundComponent } from './orm-playground.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from '../common/common.module';

const routes: Routes = [
    {path: '', component: OrmComponent}
];

@NgModule({
    declarations: [
        OrmComponent,
        OrmPlaygroundComponent,
    ],
    imports: [
        CommonModule,
        AppCommonModule,
        FormsModule,
        RouterModule.forChild(routes),
    ]
})
export class OrmModule {

}
