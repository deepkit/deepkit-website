import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {IndexPageComponent} from './pages/index-page.component';
import {ContactPageComponent} from './pages/contact-page.component';
import {DataProtectionPageComponent} from './pages/data-protection-page.component';
import {DocumentationPageComponent} from './pages/documentation-page.component';
import {NotFoundComponent} from './pages/not-found.component';
import { FeaturesPageComponent } from './pages/features-page.component';
import { TypeComponent } from './pages/type.component';
import {RpcComponent} from './pages/rpc.component';
import { AboutUsComponent } from './pages/about-us.component';


const routes: Routes = [
    {path: '', pathMatch: 'full', component: IndexPageComponent, data: {title: 'Welcome'}},
    {path: 'contact', pathMatch: 'full', component: ContactPageComponent, data: {title: 'Contact'}},
    {
        path: 'data-protection',
        component: DataProtectionPageComponent,
        data: {title: 'Data protection'}
    },
    {
        path: 'about-us',
        component: AboutUsComponent,
        data: {title: 'About Deepkit'}
    },

    {
        path: 'products/framework',
        component: FeaturesPageComponent,
        data: {title: 'Framework Features'},
    },

    {
        path: 'products/type',
        component: TypeComponent,
        data: {title: 'Deepkit Type'},
    },
    {
        path: 'products/orm',
        loadChildren: () => import('./orm/orm.module').then(m => m.OrmModule),
        data: {title: 'Deepkit ORM'},
    },
    {
        path: 'products/rpc',
        component: RpcComponent,
    },

    // {
    //     path: 'products/desktop-ui',
    //     loadChildren: () => import('./desktop-ui/desktop-ui.module').then(m => m.DesktopUiModule),
    //     data: {title: 'Angular Desktop UI'},
    // },

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
