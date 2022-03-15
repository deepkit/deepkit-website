import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
import { DocTypeTypesComponent } from './pages/documentation/type/types.component';
import { DocTypeSerializationComponent } from './pages/documentation/type/serialization.component';
import { DocTypeReflectionComponent } from './pages/documentation/type/reflection.component';
import { DocTypeValidationComponent } from './pages/documentation/type/validation.component';
import { DocTypePerformanceComponent } from './pages/documentation/type/performance.component';
import { DocTypeChangeDetectionComponent } from './pages/documentation/type/change-detection.component';
import { DocTypeCustomSerializerComponent } from './pages/documentation/type/custom-serializer.component';
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
import { DocFrameworkRPCControllerComponent } from './pages/documentation/framework/rpc/controller.component';
import { DocFrameworkRPCClientComponent } from './pages/documentation/framework/rpc/client.component';
import { DocFrameworkRPCSecurityComponent } from './pages/documentation/framework/rpc/security.component';
import { DocFrameworkDependencyInjectionComponent } from './pages/documentation/framework/dependency-injection.component';
import { DocFrameworkConfigurationComponent } from './pages/documentation/framework/configuration.component';
import { DocFrameworkTestingComponent } from './pages/documentation/framework/testing.component';
import { DocFrameworkDeploymentComponent } from './pages/documentation/framework/deployment.component';
import { DocFrameworkHttpPublicDirComponent } from './pages/documentation/framework/http/public-dir.component';
import { CommunityPageComponent } from './pages/community.component';
import { DocORMGettingStartedComponent } from './pages/documentation/orm/getting-started.component';
import { DocORMEntityComponent } from './pages/documentation/orm/entity.component';
import { DocORMSessionComponent } from './pages/documentation/orm/session.component';
import { DocORMQueryComponent } from './pages/documentation/orm/query.component';
import { DocORMRelationsComponent } from './pages/documentation/orm/relations.component';
import { DocORMEventsComponent } from './pages/documentation/orm/events.component';
import { DocORMPluginSoftDeleteComponent } from './pages/documentation/orm/plugin-soft-delete.component';
import { DocBenchmarkComponent } from './pages/documentation/benchmark.component';
import { DocBSONComponent } from './pages/documentation/bson.component';
import { DocDebuggerComponent } from './pages/documentation/debugger.component';
import { DocEventComponent } from './pages/documentation/event.component';
import { DocInjectorComponent } from './pages/documentation/injector.component';
import { DocLoggerComponent } from './pages/documentation/logger.component';
import { DocMongoComponent } from './pages/documentation/mongo.component';
import { DocTemplateComponent } from './pages/documentation/template.component';
import { DocTopsortComponent } from './pages/documentation/topsort.component';
import { DocTypeAngularComponent } from './pages/documentation/type-angular.component';
import { DocWorkflowComponent } from './pages/documentation/workflow.component';
import { DocHttpComponent } from './pages/documentation/http.component';
import { DocFrameworkHttpEventsComponent } from './pages/documentation/framework/http/events.component';
import { DocFrameworkLoggerComponent } from './pages/documentation/framework/logger.component';
import { DocFrameworkHttpMiddlewareComponent } from './pages/documentation/framework/http/middleware.component';
import { DocORMTransactionComponent } from './pages/documentation/orm/transaction.component';
import { DocORMInheritanceComponent } from './pages/documentation/orm/inheritance.component';
import { DocORMCompositePrimaryKeyComponent } from './pages/documentation/orm/composite-primary-key.component';


const routes: Routes = [
    { path: '', pathMatch: 'full', component: IndexPageComponent, data: { title: 'Welcome', startPage: true } },
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
        path: 'community',
        component: CommunityPageComponent,
        data: { title: 'Community' },
    },
    {
        path: 'benchmarks',
        loadChildren: () => import('./benchmarks/benchmarks.module').then(m => m.BenchmarksModule),
        data: { title: 'Benchmarks' },
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
        path: 'blog',
        loadChildren: () => import('./blog/blog.module').then(m => m.BlogModule),
        data: { title: 'Blog' },
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
        path: 'documentation', component: DocumentationPageComponent, data: {header: false, documentation: true}, children: [
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
            { path: 'framework/http/public-dir', component: DocFrameworkHttpPublicDirComponent },
            { path: 'framework/http/events', component: DocFrameworkHttpEventsComponent },
            { path: 'framework/http/middleware', component: DocFrameworkHttpMiddlewareComponent },

            { path: 'framework/rpc/controller', component: DocFrameworkRPCControllerComponent },
            { path: 'framework/rpc/client', component: DocFrameworkRPCClientComponent },
            { path: 'framework/rpc/security', component: DocFrameworkRPCSecurityComponent },

            { path: 'framework/dependency-injection', component: DocFrameworkDependencyInjectionComponent },
            { path: 'framework/configuration', component: DocFrameworkConfigurationComponent },
            { path: 'framework/testing', component: DocFrameworkTestingComponent },
            { path: 'framework/deployment', component: DocFrameworkDeploymentComponent },
            { path: 'framework/logger', component: DocFrameworkLoggerComponent },

            { path: 'type', component: DocTypeGettingStartedComponent },
            { path: 'type/types', component: DocTypeTypesComponent },
            { path: 'type/serialization', component: DocTypeSerializationComponent },
            { path: 'type/reflection', component: DocTypeReflectionComponent },
            { path: 'type/validation', component: DocTypeValidationComponent },
            { path: 'type/performance', component: DocTypePerformanceComponent },
            // { path: 'type/patch', component: DocTypePatchComponent },
            { path: 'type/change-detection', component: DocTypeChangeDetectionComponent },
            // { path: 'type/state-management', component: DocTypeStateManagementComponent },
            { path: 'type/custom-serializer', component: DocTypeCustomSerializerComponent },

            { path: 'orm', component: DocORMGettingStartedComponent },
            { path: 'orm/entity', component: DocORMEntityComponent },
            { path: 'orm/session', component: DocORMSessionComponent },
            { path: 'orm/query', component: DocORMQueryComponent },
            { path: 'orm/relations', component: DocORMRelationsComponent },
            { path: 'orm/events', component: DocORMEventsComponent },
            { path: 'orm/transactions', component: DocORMTransactionComponent },
            { path: 'orm/inheritance', component: DocORMInheritanceComponent },
            { path: 'orm/composite-primary-key', component: DocORMCompositePrimaryKeyComponent },
            { path: 'orm/plugin/soft-delete', component: DocORMPluginSoftDeleteComponent },

            {
                path: 'desktop-ui',
                loadChildren: () => import('./pages/documentation/desktop-ui/desktop-ui.module').then(m => m.DocDesktopUIModule),
            },

            { path: 'benchmark', component: DocBenchmarkComponent },

            { path: 'bson', component: DocBSONComponent },
            { path: 'debugger', component: DocDebuggerComponent },
            { path: 'event', component: DocEventComponent },
            { path: 'injector', component: DocInjectorComponent },
            { path: 'logger', component: DocLoggerComponent },
            { path: 'mongo', component: DocMongoComponent },
            { path: 'template', component: DocTemplateComponent },
            { path: 'topsort', component: DocTopsortComponent },
            { path: 'type-angular', component: DocTypeAngularComponent },
            { path: 'workflow', component: DocWorkflowComponent },
            { path: 'http', component: DocHttpComponent },

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
