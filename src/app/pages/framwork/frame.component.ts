import {Component} from "@angular/core";

@Component({
    template: `
        <div class="main-wrapper">
            <div class="wrapper">
                <div class="banner">
                    <div class="header-sub">
                        <h1>Deepkit Framework</h1>
                        <nav>
                            <a routerLink="/framework" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}">Overview</a>
                            <a routerLink="/framework/benchmark" routerLinkActive="active">Benchmarks</a>
                            <a routerLink="/framework/pricing" routerLinkActive="active">Price</a>
                            <a routerLink="/framework/support" routerLinkActive="active">Support</a>
                            <a routerLink="/framework/documentation" routerLinkActive="active">Documentation</a>
                        </nav>
                    </div>
                </div>
                
            </div>
        </div>
        <router-outlet></router-outlet>
    `
})
export class FrameworkFrameComponent {}
