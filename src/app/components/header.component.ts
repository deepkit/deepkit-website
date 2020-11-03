import {ChangeDetectorRef, Component, Input, SkipSelf} from "@angular/core";
import {ActivatedRoute, ActivationEnd, NavigationEnd, Router} from "@angular/router";

@Component({
    selector: 'dw-header',
    template: `
        <div class="wrapper">
            <a routerLink="/"><img src="/assets/images/deepkit_white.svg"/></a>
            <nav>
                <a routerLinkActive="active" routerLink="/machine-learning">Machine Learning</a>
                <a routerLinkActive="active" routerLink="/framework">Framework</a>
                <a routerLinkActive="active" routerLink="/services">Services</a>
<!--                <a routerLinkActive="active" routerLink="/pricing">Pricing</a>-->
<!--                <a routerLinkActive="active" routerLink="/documentation">Documentation</a>-->
<!--                <a routerLinkActive="active" routerLink="/support">Support</a>-->
<!--                <a id="github-logo" href="https://github.com/deepkit/deepkit" target="_blank">-->
<!--                    <img width="24" height="24" src="/assets/images/github.svg"/>-->
<!--                </a>-->
            </nav>
        </div>
    `,
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
}
