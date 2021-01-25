import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CodeHighlightComponent } from "./code-highlight.component";
import { SeparatorComponent } from "./separator.component";
import { FeatureBoxComponent } from "./feature-box.component";
import { PerformanceChartComponent, PerformanceEntryDirective } from "./performance-chart.component";


@NgModule({
    declarations: [
        CodeHighlightComponent,
        SeparatorComponent,
        FeatureBoxComponent,
        PerformanceChartComponent,
        PerformanceEntryDirective,
    ],
    exports: [
        CodeHighlightComponent,
        SeparatorComponent,
        FeatureBoxComponent,
        PerformanceChartComponent,
        PerformanceEntryDirective,
    ],
    imports: [
        CommonModule,
    ]
})
export class AppCommonModule {

}
