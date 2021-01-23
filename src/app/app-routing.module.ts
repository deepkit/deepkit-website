import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {IndexPageComponent} from "./pages/index-page.component";
import {ContactPageComponent} from "./pages/contact-page.component";
import {DataProtectionPageComponent} from "./pages/data-protection-page.component";
import {DocumentationPageComponent} from "./pages/documentation-page.component";
import {NotFoundComponent} from "./pages/not-found.component";
import {MLDownloadPageComponent} from "./pages/machine-learning/download-page.component";
import {MLPricingPageComponent} from "./pages/machine-learning/pricing-page.component";
import {MLSupportPageComponent} from "./pages/machine-learning/support-page.component";
import {MLIndexPageComponent} from "./pages/machine-learning/index-page.component";
import {FrameworkIndexPageComponent} from "./pages/framwork/index-page.component";
import {MLFrame} from "./pages/machine-learning/frame.component";
import {FrameworkFrameComponent} from "./pages/framwork/frame.component";
import {BenchmarkComponent} from "./pages/framwork/benchmark.component";
import { FeaturesPageComponent } from "./pages/features-page.component";


const routes: Routes = [
    {path: '', pathMatch: 'full', component: IndexPageComponent, data: {title: 'Welcome'}},
    {path: 'contact', pathMatch: 'full', component: ContactPageComponent, data: {title: 'Contact'}},
    {
        path: 'data-protection',
        pathMatch: 'full',
        component: DataProtectionPageComponent,
        data: {title: 'Data protection'}
    },

    {
        path: 'products/framework',
        component: FeaturesPageComponent,
        data: {title: 'Features'},
    },

    // {
    //     path: 'framework',
    //     component: FrameworkFrameComponent,
    //     data: {title: 'Deepkit Framework'},
    //     children: [
    //         {path: '', pathMatch: 'full', component: FrameworkIndexPageComponent, data: {title: 'Deepkit Framework'}},
    //
    //         {path: 'benchmark', component: BenchmarkComponent, data: {title: 'Framework Benchmark'}},
    //     ]
    // },
    //
    // {
    //     path: 'machine-learning', component: MLFrame, data: {title: 'Machine Learning'}, children: [
    //         {path: '', pathMatch: 'full', component: MLIndexPageComponent, data: {title: 'Machine Learning'}},
    //
    //         {path: 'download', component: MLDownloadPageComponent, data: {title: 'Download'}},
    //         {path: 'support', component: MLSupportPageComponent, data: {title: 'Support'}},
    //         {path: 'pricing', component: MLPricingPageComponent, data: {title: 'Pricing'}},
    //     ]
    // },


    {
        path: 'documentation', component: DocumentationPageComponent, children: [
            {path: '', pathMatch: 'full', redirectTo: 'home'},
            {path: '**', component: DocumentationPageComponent}
        ]
    },
    // {path: 'pricing', component: PricingPageComponent, data: {title: 'Pricing'}},
    {path: '**', component: NotFoundComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled',
    anchorScrolling: 'enabled',
    scrollPositionRestoration: 'enabled',
    relativeLinkResolution: 'legacy'
})],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
