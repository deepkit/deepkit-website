import { ChangeDetectorRef, Component, Input, SkipSelf } from "@angular/core";
import { ActivatedRoute, ActivationEnd, NavigationEnd, Router } from "@angular/router";

@Component({
    selector: 'dw-header',
    template: `
      <div class="wrapper">
        <a routerLink="/"><img src="/assets/images/deepkit_white.svg"/></a>

        <nav>
          <a class="products" [class.active]="router.url.startsWith('/products')" 
             (click)="open('products'); $event.preventDefault()" (mouseenter)="open('products')" (mouseleave)="close('products')">Products</a>
          <a routerLinkActive="active" routerLink="/support">Pro</a>

          <a routerLinkActive="active" routerLink="/community">Community</a>
          <a routerLinkActive="active" routerLink="/documentation">Documentation</a>

          <a id="github-logo" href="https://github.com/deepkit/deepkit-framework" target="_blank">
            <img width="24" height="24" src="/assets/images/github.svg"/>
          </a>
        </nav>

        <div [class.active]="menu === 'products'" (mouseenter)="open('products')" (mouseleave)="close('products')" class="products-menu">
          <div class="framework">
            <h3>Framework <span class="tag" style="position: relative; top: -8px;">alpha</span></h3>
            
            <a routerLink="/products/framework">Features</a>
            <a routerLink="documentation/why-deepkit">Why Deepkit?</a>
            <a routerLink="/documentation/framework">Get Started</a>
          </div>
          
          <div class="components">
            <h3>Typescript Components</h3>

            <div routerLink="/products/type">
              <h4>Type</h4>
              <p>Runtime TypeScript type/reflection system with ultra-fast serialization and validation.</p>
            </div>
            <div routerLink="/products/orm">
              <h4>ORM</h4>
              <p>Fastest TypeScript ORM for MongoDB, SQLite, MySQL, MariaDB, PostgreSQL.</p>
            </div>
            <div>
              <h4>RPC</h4>
              <p>Highly configurable RPC server for TypeScript with automatic type serialization and validation.</p>
            </div>
            <div>
              <h4>Broker</h4>
              <p>High-Performance typesafe message bus for pub/sub, key-value, and central atomic app locks.</p>
            </div>
            <div>
              <h4>Desktop UI</h4>
              <p>Angular & Electron desktop UI framework. Angular components for native looking UI widgets.</p>
            </div>
          </div>
        </div>
      </div>
    `,
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    public menu: string = '';

    protected lastTimeout: any;

    constructor(
        protected cd: ChangeDetectorRef,
        public router: Router,
    ) {
        router.events.subscribe(() => {
            this.menu = '';
            this.cd.detectChanges();
        })
    }

    open(menu: string){
        if (this.lastTimeout) clearTimeout(this.lastTimeout);

        this.menu = menu;
        this.cd.detectChanges();
    }

    close(menu: string){
        this.lastTimeout = setTimeout(() => {
            if (this.menu === menu) this.menu = '';
            this.cd.detectChanges();
        }, 200);
    }
}
