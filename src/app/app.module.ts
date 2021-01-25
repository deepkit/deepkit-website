import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule, SecurityContext } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from "./components/footer.component";
import { HeaderComponent } from "./components/header.component";
import { ContactPageComponent } from "./pages/contact-page.component";
import { DataProtectionPageComponent } from "./pages/data-protection-page.component";
import { DocumentationPageComponent } from "./pages/documentation-page.component";
import { TransferHttpCacheModule } from '@nguniversal/common';
import { MarkdownModule } from "ngx-markdown";
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { HumanFileSizePipe } from "./pipes";
import { NotFoundComponent } from "./pages/not-found.component";
import { ImageComponent } from "./components/image.component";
import { IndexPageComponent } from "./pages/index-page.component";
import { MLPricingPageComponent } from "./pages/machine-learning/pricing-page.component";
import { MLDownloadPageComponent } from "./pages/machine-learning/download-page.component";
import { MLSupportPageComponent } from "./pages/machine-learning/support-page.component";
import { MLIndexPageComponent } from "./pages/machine-learning/index-page.component";
import { Docu } from "./provider/docu";
import { AnchorService } from "./provider/anchor";
import { TitleService } from "./provider/title";
import { FrameworkIndexPageComponent } from "./pages/framwork/index-page.component";
import { MLFrame } from "./pages/machine-learning/frame.component";
import { FrameworkFrameComponent } from "./pages/framwork/frame.component";
import { BenchmarkComponent } from './pages/framwork/benchmark.component';
import { DeepkitClient } from '@deepkit/rpc';
import { ControllerClient } from './client';
import { IndexFeatureComponent } from './components/index-feature.component';
import { FeaturesPageComponent } from './pages/features-page.component';
import { TypeComponent } from './pages/type.component';
import { FormsModule } from "@angular/forms";
import { AppCommonModule } from './common/common.module';

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

        FrameworkFrameComponent,
        MLFrame,
        FrameworkIndexPageComponent,
        BenchmarkComponent,
        IndexFeatureComponent,
        FeaturesPageComponent,
        TypeComponent,
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
