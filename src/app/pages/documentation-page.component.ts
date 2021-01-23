import { ChangeDetectorRef, Component, HostListener, Inject, OnInit, Optional } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RESPONSE } from "@nguniversal/express-engine/tokens";
import { Docu } from "../provider/docu";
import { AnchorService } from "../provider/anchor";
import { TitleService } from "../provider/title";

@Component({
    template: `
      <div class="wrapper">
        <nav>
          <div class="category">
            <div class="category-title">Framework</div>

            <a routerLink="">Getting started</a>
            <a routerLink="">Modules</a>
            <a routerLink="">Services</a>

            <div class="section-title">HTTP</div>
            <section>
              <a routerLink="">Controller</a>
              <a routerLink="">Template</a>
              <a routerLink="">Authentication</a>
              <a routerLink="">Sessino/Roles</a>
            </section>

            <div class="section-title">RPC</div>
            <section>
              <a routerLink="">Controller</a>
              <a routerLink="">Client</a>
              <a routerLink="">Authentication</a>
              <a routerLink="">Sessino/Roles</a>
              <a routerLink="">Stream/RxJS</a>
            </section>

            <a routerLink="">CLI</a>
            <a routerLink="">Logger</a>
            <a routerLink="">Event Dispatcher</a>
            <a routerLink="">Dependency Injection</a>
            <a routerLink="">Workflow</a>
            <a routerLink="">Configuration</a>
            <a routerLink="">Testing</a>
          </div>

          <div class="category">
            <div class="category-title">Type</div>

            <a routerLink="">Getting started</a>
            <a routerLink="">Schema</a>
            <a routerLink="">Serialization</a>
            <a routerLink="">Validation</a>
            <a routerLink="">Groups</a>
            <a routerLink="">Patch</a>
            <a routerLink="">State management</a>
            <a routerLink="">Serialization target</a>
            <a routerLink="">External classes</a>
          </div>

          <div class="category">
            <div class="category-title">Database/ORM</div>

            <a routerLink="">Getting started</a>
            <a routerLink="">Schema</a>
            <a routerLink="">Session</a>
            <a routerLink="">Query</a>
            <a routerLink="">Relations</a>
            <a routerLink="">Events</a>
            <div class="section-title">Plugins</div>
            <section>
              <a routerLink="">Soft-Delete</a>
            </section>
          </div>
        </nav>
        <main>
          <div class="subline">Framework</div>
          <h2>Getting Started</h2>

          <h3>Server Requirements</h3>

          <p>
            Deepkit framework has no system requirements except than an installed NodeJS v14+.
          </p>
          <p>
            The easiest way to use Deepkit Framework is by using a full-stack example project that has already
            everything installed. The examples with frontend contain a NX managed mono-repository with server, shared,
            and frontend package.
          </p>
        </main>
      </div>
    `,
    styleUrls: ['./documentation-page.component.scss']
})
export class DocumentationPageComponent {

}
