import { NgModule } from '@angular/core';
import { BenchmarksComponent } from './benchmarks.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from '../common/common.module';
import { PlotlyModule } from 'angular-plotly.js';
import * as PlotlyJS from 'plotly.js-dist-min';
import { MarkdownModule } from 'ngx-markdown';

PlotlyModule.plotlyjs = PlotlyJS;
const routes: Routes = [
    {path: '', component: BenchmarksComponent}
];

@NgModule({
    declarations: [
        BenchmarksComponent,
    ],
    imports: [
        CommonModule,
        AppCommonModule,
        FormsModule,
        PlotlyModule,
        MarkdownModule.forRoot(),
        RouterModule.forChild(routes),
    ]
})
export class BenchmarksModule {

}
