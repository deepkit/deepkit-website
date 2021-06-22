import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeHighlightComponent } from './code-highlight.component';
import { SeparatorComponent } from './separator.component';
import { FeatureBoxComponent } from './feature-box.component';
import { PerformanceChartComponent, PerformanceEntryDirective } from './performance-chart.component';
import { ProductBannerComponent } from './product-banner.component';
import { RouterModule } from '@angular/router';
import { ImageComponent } from './image.component';


@NgModule({
    declarations: [
        CodeHighlightComponent,
        SeparatorComponent,
        FeatureBoxComponent,
        PerformanceChartComponent,
        PerformanceEntryDirective,
        ProductBannerComponent,
        ImageComponent,
    ],
    exports: [
        CodeHighlightComponent,
        SeparatorComponent,
        FeatureBoxComponent,
        PerformanceChartComponent,
        PerformanceEntryDirective,
        ProductBannerComponent,
        ImageComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([]),
    ]
})
export class AppCommonModule {

}
