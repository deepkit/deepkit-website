import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexPageComponent } from './pages/index-page.component';
import { ContactPageComponent } from './pages/contact-page.component';
import { DataProtectionPageComponent } from './pages/data-protection-page.component';
import { DocumentationDefaultPageComponent, DocumentationPageComponent } from './pages/documentation-page.component';
import { NotFoundComponent } from './pages/not-found.component';
import { FeaturesPageComponent } from './pages/features-page.component';
import { TypeComponent } from './pages/type.component';
import { RpcComponent } from './pages/rpc.component';
import { AboutUsComponent } from './pages/about-us.component';
import { BrokerComponent } from './pages/broker.component';
import { LibrariesComponent } from './pages/libraries.component';
import { OrmBrowserComponent } from './pages/orm-browser.component';
import { DocTypeGettingStartedComponent } from './pages/documentation/type/getting-started.component';
import { DocTypeSchemaComponent } from './pages/documentation/type/schema.component';
import { DocTypeSerializationComponent } from './pages/documentation/type/serialization.component';
import { DocTypeReflectionComponent } from './pages/documentation/type/reflection.component';
import { DocTypeValidationComponent } from './pages/documentation/type/validation.component';
import { DocTypePerformanceComponent } from './pages/documentation/type/performance.component';
import { DocTypePatchComponent } from './pages/documentation/type/patch.component';
import { DocTypeChangeDetectionComponent } from './pages/documentation/type/change-detection.component';
import { DocTypeStateManagementComponent } from './pages/documentation/type/state-management.component';
import { DocTypeSerializationTargetComponent } from './pages/documentation/type/serialization-target.component';
import { DocFrameworkGettingStartedComponent } from './pages/documentation/framework/getting-started.component';
import { DocFrameworkModulesComponent } from './pages/documentation/framework/modules.component';
import { DocFrameworkServicesComponent } from './pages/documentation/framework/services.component';
import { DocFrameworkFundamentalsComponent } from './pages/documentation/framework/fundamentals.component.ts';
import { DocWelcomeComponent } from './pages/documentation/welcome.component';
import { DocFrameworkEventsComponent } from './pages/documentation/framework/events.component';
import { DocFrameworkCLIComponent } from './pages/documentation/framework/cli.component';
import { DocFrameworkDatabaseComponent } from './pages/documentation/framework/database.component';
import { DocFrameworkHttpControllerComponent } from './pages/documentation/framework/http/controller.component';
import { DocFrameworkHttpTemplateComponent } from './pages/documentation/framework/http/template.component';


const routes: Routes = [
    { path: '', pathMatch: 'full', component: IndexPageComponent, data: { title: 'Welcome' } },
    { path: 'contact', pathMatch: 'full', component: ContactPageComponent, data: { title: 'Contact' } },
    {
        path: 'data-protection',
        component: DataProtectionPageComponent,
        data: { title: 'Data protection' }
    },
    {
        path: 'about-us',
        component: AboutUsComponent,
        data: { title: 'About Deepkit' }
    },

    {
        path: 'framework',
        component: FeaturesPageComponent,
        data: { title: 'Framework Features' },
    },

    {
        path: 'library/type',
        component: TypeComponent,
        data: { title: 'Deepkit Type' },
    },
    {
        path: 'library',
        component: LibrariesComponent,
        data: { title: 'Libraries' },
    },
    {
        path: 'library/orm',
        loadChildren: () => import('./orm/orm.module').then(m => m.OrmModule),
        data: { title: 'Deepkit ORM' },
    },
    {
        path: 'library/rpc',
        component: RpcComponent,
    },
    {
        path: 'library/broker',
        component:
        BrokerComponent,
    },
    {
        path: 'library/orm-browser',
        component:
        OrmBrowserComponent,
    },

    {
        path: 'library/desktop-ui',
        loadChildren: () => import('./desktop-ui/desktop-ui.module').then(m => m.DesktopUiModule),
        data: { title: 'Angular Desktop UI' },
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
            { path: '', component: DocWelcomeComponent },
            { path: 'framework', component: DocFrameworkGettingStartedComponent },
            { path: 'framework/fundamentals', component: DocFrameworkFundamentalsComponent },
            { path: 'framework/modules', component: DocFrameworkModulesComponent },
            { path: 'framework/services', component: DocFrameworkServicesComponent },
            { path: 'framework/events', component: DocFrameworkEventsComponent },
            { path: 'framework/cli', component: DocFrameworkCLIComponent },
            { path: 'framework/database', component: DocFrameworkDatabaseComponent },
            { path: 'framework/http/controller', component: DocFrameworkHttpControllerComponent },
            { path: 'framework/http/template', component: DocFrameworkHttpTemplateComponent },

            { path: 'type', component: DocTypeGettingStartedComponent },
            { path: 'type/schema', component: DocTypeSchemaComponent },
            { path: 'type/serialization', component: DocTypeSerializationComponent },
            { path: 'type/reflection', component: DocTypeReflectionComponent },
            { path: 'type/validation', component: DocTypeValidationComponent },
            { path: 'type/performance', component: DocTypePerformanceComponent },
            { path: 'type/patch', component: DocTypePatchComponent },
            { path: 'type/change-detection', component: DocTypeChangeDetectionComponent },
            { path: 'type/state-management', component: DocTypeStateManagementComponent },
            { path: 'type/serialization-target', component: DocTypeSerializationTargetComponent },
            { path: '**', component: DocumentationDefaultPageComponent },
        ]
    },
    // {path: 'pricing', component: PricingPageComponent, data: {title: 'Pricing'}},
    { path: '**', component: NotFoundComponent }
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
