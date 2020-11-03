import {Component} from "@angular/core";

@Component({
    template: `
        <div class="main-wrapper">
            <div class="wrapper">
                <div class="banner">
                    <div class="header-sub">
                        <h1>Deepkit ML</h1>
                        <nav>
                            <a routerLink="/machine-learning" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}">Overview</a>
                            <a routerLink="/machine-learning/download" routerLinkActive="active">Download</a>
                            <a routerLink="/machine-learning/pricing" routerLinkActive="active">Price</a>
                            <a routerLink="/machine-learning/support" routerLinkActive="active">Support</a>
                            <a routerLink="/machine-learning/documentation" routerLinkActive="active">Documentation</a>
                        </nav>
                    </div>
                </div>
                
            </div>
        </div>
        <router-outlet></router-outlet>
    `
})
export class MLFrame {}
