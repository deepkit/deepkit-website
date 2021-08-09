import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer.component';
import { HeaderComponent } from './components/header.component';
import { ContactPageComponent } from './pages/contact-page.component';
import { DataProtectionPageComponent } from './pages/data-protection-page.component';
import { DocumentationDefaultPageComponent, DocumentationPageComponent } from './pages/documentation-page.component';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HumanFileSizePipe } from './pipes';
import { NotFoundComponent } from './pages/not-found.component';
import { ImageComponent } from './components/image.component';
import { IndexPageComponent } from './pages/index-page.component';
import { MLPricingPageComponent } from './pages/machine-learning/pricing-page.component';
import { MLDownloadPageComponent } from './pages/machine-learning/download-page.component';
import { MLSupportPageComponent } from './pages/machine-learning/support-page.component';
import { MLIndexPageComponent } from './pages/machine-learning/index-page.component';
import { Docu } from './provider/docu';
import { AnchorService } from './provider/anchor';
import { TitleService } from './provider/title';
import { FrameworkIndexPageComponent } from './pages/framwork/index-page.component';
import { MLFrame } from './pages/machine-learning/frame.component';
import { FrameworkFrameComponent } from './pages/framwork/frame.component';
import { BenchmarkComponent } from './pages/framwork/benchmark.component';
import { DeepkitClient } from '@deepkit/rpc';
import { ControllerClient } from './client';
import { IndexFeatureComponent } from './components/index-feature.component';
import { FeaturesPageComponent } from './pages/features-page.component';
import { TypeComponent } from './pages/type.component';
import { FormsModule } from '@angular/forms';
import { AppCommonModule } from './common/common.module';
import { RpcComponent } from './pages/rpc.component';
import { AboutUsComponent } from './pages/about-us.component';
import { BrokerComponent } from './pages/broker.component';
import { LibraryCardComponent } from './components/library-card.component';
import { LibraryCardsComponent } from './components/library-cards.component';
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
import { DocORMSchemaComponent } from './pages/documentation/orm/schema.component';
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
import { FeatureBlockComponent } from './components/feature-block.component';
import { DocFrameworkLoggerComponent } from './pages/documentation/framework/logger.component';
import { DocFrameworkHttpMiddlewareComponent } from './pages/documentation/framework/http/middleware.component';
import { DocORMTransactionComponent } from './pages/documentation/orm/transaction.component';
import { DocORMInheritanceComponent } from './pages/documentation/orm/inheritance.component';
import { DocORMCompositePrimaryKeyComponent } from './pages/documentation/orm/composite-primary-key.component';

@NgModule({
    declarations: [
        AppComponent,
        IndexPageComponent,
        ContactPageComponent,
        HeaderComponent,
        FooterComponent,
        ImageComponent,
        DataProtectionPageComponent,
        MLDownloadPageComponent,
        MLIndexPageComponent,
        MLSupportPageComponent,
        DocumentationPageComponent,
        MLPricingPageComponent,
        HumanFileSizePipe,
        NotFoundComponent,
        LibraryCardComponent,
        LibraryCardsComponent,
        LibrariesComponent,

        FeatureBlockComponent,

        FrameworkFrameComponent,
        MLFrame,
        FrameworkIndexPageComponent,
        BenchmarkComponent,
        IndexFeatureComponent,
        FeaturesPageComponent,
        TypeComponent,
        RpcComponent,
        AboutUsComponent,
        BrokerComponent,
        OrmBrowserComponent,
        CommunityPageComponent,
        DocumentationDefaultPageComponent,
        DocWelcomeComponent,
        DocTypeGettingStartedComponent,
        DocTypeSchemaComponent,
        DocTypeSerializationComponent,
        DocTypeReflectionComponent,
        DocTypeValidationComponent,
        DocTypePerformanceComponent,
        DocTypePatchComponent,
        DocTypeChangeDetectionComponent,
        DocTypeStateManagementComponent,
        DocTypeSerializationTargetComponent,
        DocFrameworkGettingStartedComponent,
        DocFrameworkModulesComponent,
        DocFrameworkServicesComponent,
        DocFrameworkFundamentalsComponent,
        DocFrameworkEventsComponent,
        DocFrameworkCLIComponent,
        DocFrameworkDatabaseComponent,
        DocFrameworkHttpControllerComponent,
        DocFrameworkHttpTemplateComponent,
        DocFrameworkHttpEventsComponent,
        DocFrameworkHttpMiddlewareComponent,
        DocFrameworkRPCControllerComponent,
        DocFrameworkRPCClientComponent,
        DocFrameworkRPCSecurityComponent,
        DocFrameworkDependencyInjectionComponent,
        DocFrameworkConfigurationComponent,
        DocFrameworkTestingComponent,
        DocFrameworkDeploymentComponent,
        DocFrameworkHttpPublicDirComponent,
        DocFrameworkLoggerComponent,
        DocORMGettingStartedComponent,
        DocORMSchemaComponent,
        DocORMSessionComponent,
        DocORMQueryComponent,
        DocORMRelationsComponent,
        DocORMEventsComponent,
        DocORMPluginSoftDeleteComponent,
        DocORMTransactionComponent,
        DocORMInheritanceComponent,
        DocORMCompositePrimaryKeyComponent,
        DocBenchmarkComponent,
        DocBSONComponent,
        DocDebuggerComponent,
        DocEventComponent,
        DocInjectorComponent,
        DocLoggerComponent,
        DocMongoComponent,
        DocTemplateComponent,
        DocTopsortComponent,
        DocTypeAngularComponent,
        DocWorkflowComponent,
        DocHttpComponent,
    ],
    imports: [
        CommonModule,
        AppCommonModule,
        FormsModule,
        BrowserModule.withServerTransition({ appId: 'serverApp' }),
        // MarkdownModule.forRoot({
        //     sanitize: SecurityContext.NONE
        // }),
        AppRoutingModule,
        HttpClientModule,
        TransferHttpCacheModule,
    ],
    providers: [
        Docu,
        Title,
        TitleService,
        AnchorService,
        { provide: 'ORIGIN_URL', useValue: '' },
        { provide: DeepkitClient, useFactory: () => new DeepkitClient('ws://' + location.host) },
        ControllerClient,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
