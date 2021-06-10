import { Component } from '@angular/core';

@Component({
    template: `
        <div class="wrapper">
            <nav>
                <div class="category">
                    <div class="category-title">Framework</div>

                    <a routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" routerLink="/documentation/framework">Getting started</a>
                    <a routerLinkActive="active" routerLink="/documentation/framework/modules">Modules</a>
                    <a routerLinkActive="active" routerLink="/documentation/framework/services">Services</a>

                    <div class="section-title">HTTP</div>
                    <section>
                        <a routerLinkActive="active" routerLink="/documentation/framework/http-controller">Controller</a>
                        <a routerLinkActive="active" routerLink="/documentation/framework/http/template">Template</a>
                        <a routerLinkActive="active" routerLink="/documentation/framework/http/authentication">Authentication</a>
                        <a routerLinkActive="active" routerLink="/documentation/framework/http/sessions">Session/Roles</a>
                    </section>

                    <div class="section-title">RPC</div>
                    <section>
                        <a routerLinkActive="active" routerLink="/documentation/framework/rpc/controller">Controller</a>
                        <a routerLinkActive="active" routerLink="/documentation/framework/rpc/client">Client</a>
                        <a routerLinkActive="active" routerLink="/documentation/framework/rpc/authentication">Authentication</a>
                        <a routerLinkActive="active" routerLink="/documentation/framework/rpc/sessions">Session/Roles</a>
                        <a routerLinkActive="active" routerLink="/documentation/framework/rpc/stream">Stream/RxJS</a>
                    </section>

                    <a routerLinkActive="active" routerLink="/documentation/framework/cli">CLI</a>
                    <a routerLinkActive="active" routerLink="/documentation/framework/logger">Logger</a>
                    <a routerLinkActive="active" routerLink="/documentation/framework/event-dispatcher">Event Dispatcher</a>
                    <a routerLinkActive="active" routerLink="/documentation/framework/dependency-injection">Dependency Injection</a>
                    <a routerLinkActive="active" routerLink="/documentation/framework/workflow">Workflow</a>
                    <a routerLinkActive="active" routerLink="/documentation/framework/configuration">Configuration</a>
                    <a routerLinkActive="active" routerLink="/documentation/framework/testing">Testing</a>
                </div>

                <div class="category">
                    <div class="category-title">Type</div>

                    <a routerLinkActive="active" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" routerLink="/documentation/type">Getting started</a>
                    <a routerLinkActive="active" routerLinkActive="active" routerLink="/documentation/type/schema">Schema</a>
                    <a routerLinkActive="active" routerLinkActive="active" routerLink="/documentation/type/reflection">Reflection</a>
                    <a routerLinkActive="active" routerLinkActive="active" routerLink="/documentation/type/serialization">Serialization</a>
                    <a routerLinkActive="active" routerLinkActive="active" routerLink="/documentation/type/validation">Validation</a>
                    <a routerLinkActive="active" routerLinkActive="active" routerLink="/documentation/type/performance">Performance</a>
                    <a routerLinkActive="active" routerLinkActive="active" routerLink="/documentation/type/patch">Patch</a>
                    <a routerLinkActive="active" routerLinkActive="active" routerLink="/documentation/type/change-detection">Change detection</a>
                    <a routerLinkActive="active" routerLinkActive="active" routerLink="/documentation/type/state-management">State management</a>
                    <a routerLinkActive="active" routerLinkActive="active" routerLink="/documentation/type/serialization-target">Serialization target</a>
                </div>

                <div class="category">
                    <div class="category-title">Database/ORM</div>

                    <a routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" routerLink="/documentation/orm">Getting started</a>
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
            </nav>
            <main>
                <router-outlet></router-outlet>
            </main>
        </div>
    `,
    styleUrls: ['./documentation-page.component.scss']
})
export class DocumentationPageComponent {

}

@Component({
    template: `
    <h2>Not found</h2>
    
    <p>
        This page has not yet been created. Please try again later.
    </p>
    `
})
export class DocumentationDefaultPageComponent {

}
