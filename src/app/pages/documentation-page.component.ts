import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AnchorService } from '../provider/anchor';
import { TitleService } from '../provider/title';

@Component({
    template: `
        <div class="wrapper">
            <div class="chapters" (click)="toggleMenu()">
                <div>Documentation chapters</div>
                <svg *ngIf="showMenu" width="17px" height="17px" viewBox="0 0 17 17" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <g id="arrow_up" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <path d="M11.8443139,6.21655734 C12.0945582,5.9426926 12.5163616,5.92638983 12.7864381,6.18014409 C13.0565147,6.43389835 13.072592,6.86161807 12.8223477,7.13548282 L9.4890169,10.7834457 C9.22518123,11.0721848 8.77481877,11.0721848 8.5109831,10.7834457 L5.17765229,7.13548282 C4.92740802,6.86161807 4.94348529,6.43389835 5.21356186,6.18014409 C5.48363844,5.92638983 5.90544182,5.9426926 6.15568608,6.21655734 L9,9.32934519 L11.8443139,6.21655734 Z" id="Arrows" fill="#000000" fill-rule="nonzero" transform="translate(9.000000, 8.500000) scale(1, -1) translate(-9.000000, -8.500000) "></path>
                    </g>
                </svg>
                <svg *ngIf="!showMenu" width="17px" height="17px" viewBox="0 0 17 17" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <g id="arrow_down" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <path d="M11.8443139,6.21655734 C12.0945582,5.9426926 12.5163616,5.92638983 12.7864381,6.18014409 C13.0565147,6.43389835 13.072592,6.86161807 12.8223477,7.13548282 L9.4890169,10.7834457 C9.22518123,11.0721848 8.77481877,11.0721848 8.5109831,10.7834457 L5.17765229,7.13548282 C4.92740802,6.86161807 4.94348529,6.43389835 5.21356186,6.18014409 C5.48363844,5.92638983 5.90544182,5.9426926 6.15568608,6.21655734 L9,9.32934519 L11.8443139,6.21655734 Z" id="Arrows" fill="#000000" fill-rule="nonzero"></path>
                    </g>
                </svg>
            </div>
            
            <nav [class.showMenu]="showMenu">
                <div class="category">
                    <div class="category-title">Framework</div>

                    <a routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" routerLink="/documentation/framework">Getting
                        started</a>
                    <a routerLinkActive="active" routerLink="/documentation/framework/fundamentals">Fundamentals</a>
                    <a routerLinkActive="active" routerLink="/documentation/framework/modules">Modules</a>
                    <a routerLinkActive="active" routerLink="/documentation/framework/services">Services</a>
                    <a routerLinkActive="active" routerLink="/documentation/framework/events">Events</a>
                    <a routerLinkActive="active" routerLink="/documentation/framework/cli">CLI</a>
                    <a routerLinkActive="active" routerLink="/documentation/framework/database">Database</a>

                    <div class="section-title">HTTP</div>
                    <section>
                        <a routerLinkActive="active" routerLink="/documentation/framework/http/controller">Controller</a>
                        <a routerLinkActive="active" routerLink="/documentation/framework/http/template">Template</a>
                        <a routerLinkActive="active" routerLink="/documentation/framework/http/security">Security</a>
                        <a routerLinkActive="active" routerLink="/documentation/framework/http/public-dir">Public directory</a>
                    </section>

                    <div class="section-title">RPC</div>
                    <section>
                        <a routerLinkActive="active" routerLink="/documentation/framework/rpc/controller">Controller</a>
                        <a routerLinkActive="active" routerLink="/documentation/framework/rpc/client">Client</a>
                        <a routerLinkActive="active" routerLink="/documentation/framework/rpc/security">Security</a>
                    </section>

                    <a routerLinkActive="active" routerLink="/documentation/framework/dependency-injection">Dependency injection</a>
                    <a routerLinkActive="active" routerLink="/documentation/framework/configuration">Configuration</a>
                    <a routerLinkActive="active" routerLink="/documentation/framework/testing">Testing</a>
                    <a routerLinkActive="active" routerLink="/documentation/framework/deployment">Deployment</a>
                    <a routerLinkActive="active" routerLink="/documentation/framework/workflow">Workflow</a>
                    <a routerLinkActive="active" routerLink="/documentation/framework/logger">Logger</a>
                </div>

                <div class="category">
                    <div class="category-title">Type</div>

                    <a routerLinkActive="active" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}"
                       routerLink="/documentation/type">Getting started</a>
                    <a routerLinkActive="active" routerLinkActive="active" routerLink="/documentation/type/schema">Schema</a>
                    <a routerLinkActive="active" routerLinkActive="active" routerLink="/documentation/type/reflection">Reflection</a>
                    <a routerLinkActive="active" routerLinkActive="active" routerLink="/documentation/type/serialization">Serialization</a>
                    <a routerLinkActive="active" routerLinkActive="active" routerLink="/documentation/type/validation">Validation</a>
                    <a routerLinkActive="active" routerLinkActive="active" routerLink="/documentation/type/performance">Performance</a>
                    <a routerLinkActive="active" routerLinkActive="active" routerLink="/documentation/type/patch">Patch</a>
                    <a routerLinkActive="active" routerLinkActive="active" routerLink="/documentation/type/change-detection">Change
                        detection</a>
                    <a routerLinkActive="active" routerLinkActive="active" routerLink="/documentation/type/state-management">State
                        management</a>
                    <a routerLinkActive="active" routerLinkActive="active" routerLink="/documentation/type/serialization-target">Serialization
                        target</a>
                </div>

                <div class="category">
                    <div class="category-title">ORM</div>

                    <a routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" routerLink="/documentation/orm">Getting
                        started</a>
                    <a routerLinkActive="active" routerLink="/documentation/orm/schema">Schema</a>
                    <a routerLinkActive="active" routerLink="/documentation/orm/session">Session</a>
                    <a routerLinkActive="active" routerLink="/documentation/orm/query">Query</a>
                    <a routerLinkActive="active" routerLink="/documentation/orm/relations">Relations</a>
                    <a routerLinkActive="active" routerLink="/documentation/orm/events">Events</a>
                    <div class="section-title">Plugins</div>
                    <section>
                        <a routerLinkActive="active" routerLink="/documentation/orm/plugin/soft-delete">Soft-Delete</a>
                    </section>
                </div>


                <div class="category">
                    <div class="category-title">RPC</div>

                    <a routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" routerLink="/documentation/rpc">Getting
                        started</a>
                    <a routerLinkActive="active" routerLink="/documentation/rpc/controller">Server</a>
                    <a routerLinkActive="active" routerLink="/documentation/rpc/controller">Controller</a>
                    <a routerLinkActive="active" routerLink="/documentation/rpc/client">Client</a>
                    <a routerLinkActive="active" routerLink="/documentation/rpc/query">Stream</a>
                    <a routerLinkActive="active" routerLink="/documentation/rpc/events">Security</a>
                </div>
            </nav>
            <main #content>
                <router-outlet (activate)="onOutlet($event)"></router-outlet>
            </main>
            <div class="table-of-content">
                <a [routerLink]="router.url.split('#')[0]" [fragment]="getFragment(h.innerText)"
                   *ngFor="let h of headers" class="{{h.tagName.toLowerCase()}}">
                    {{h.innerText}}
                </a>
            </div>
        </div>
    `,
    styleUrls: ['./documentation-page.component.scss']
})
export class DocumentationPageComponent implements AfterViewInit {
    @ViewChild('content') elementRef?: ElementRef<HTMLDivElement>;

    public headers: HTMLHeadingElement[] = [];
    public showMenu: boolean = false;

    constructor(
        public router: Router,
        public title: TitleService,
        protected cd: ChangeDetectorRef,
        protected anchorService: AnchorService,
    ) {
        router.events.subscribe(() => {
            this.showMenu = false;
            this.cd.detectChanges();
        });
    }

    toggleMenu() {
        this.showMenu = !this.showMenu;
        this.cd.detectChanges();
    }

    getFragment(value: string): string {
        if ('string' !== typeof value) return '';
        return value.trim().replace(/[^a-zA-Z0-9]+/g, '-').toLowerCase();
    }

    loadTableOfContent() {
        if (!this.elementRef) {
            return;
        }

        this.headers = [];
        let title = '';
        let subline = '';
        const headers: HTMLHeadingElement[] = Array.from(this.elementRef.nativeElement.querySelectorAll('div.subline, h2, h3, h4'));

        for (const header of headers) {
            if (header.tagName.toLowerCase() === 'h2') {
                title = header.innerText;
            }
            if (header.tagName.toLowerCase() === 'div') {
                subline = header.innerText;
                continue;
            }

            this.headers.push(header);
            if ((header as any)._addedLink) return;
            const fragment = this.getFragment(header.innerText);
            const a = document.createElement('a');
            a.name = fragment;
            header.appendChild(a);
            (header as any)._addedLink = true;
        }

        this.title.setTitle(`${title} - ${subline} - Documentation`);
        this.anchorService.scrollToAnchor();
    }

    ngAfterViewInit() {
        this.loadTableOfContent();
    }

    onOutlet(event: any) {
        this.loadTableOfContent();
    }
}

@Component({
    template: `
        <h2>Not found</h2>

        <p>
            This page has not yet been created. Please note we're in early beta and not all documentation
            have been created. Please try again in a few days.
        </p>
    `
})
export class DocumentationDefaultPageComponent {
}
