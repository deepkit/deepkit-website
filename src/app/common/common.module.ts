import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CodeHighlightComponent } from "./code-highlight.component";
import { SeparatorComponent } from "./separator.component";
import { FeatureBoxComponent } from "./feature-box.component";


@NgModule({
    declarations: [
        CodeHighlightComponent,
        SeparatorComponent,
        FeatureBoxComponent,
    ],
    exports: [
        CodeHighlightComponent,
        SeparatorComponent,
        FeatureBoxComponent,
    ],
    imports: [
        CommonModule,
    ]
})
export class AppCommonModule {

}
