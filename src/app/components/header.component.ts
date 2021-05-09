import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'dw-header',
    template: `
        <div class="wrapper">
            <a routerLink="/"><img src="/assets/images/deepkit_white.svg"/></a>

            <nav>
                <a routerLinkActive="active" routerLink="/framework">Framework</a>
                <a routerLinkActive="active" routerLink="/library">Libraries</a>
                <a routerLinkActive="active" routerLink="/community">Community</a>
            </nav>

            <nav style="justify-content: flex-end;">
                <a routerLinkActive="active" routerLink="/documentation">Documentation</a>
                <a routerLinkActive="active" routerLink="/blog">Blog</a>
            </nav>

<!--            <div [class.active]="menu === 'library'" (mouseenter)="open('library')" (mouseleave)="close('library')" class="library-menu">-->
<!--                <section>-->
<!--                    <h4>Database</h4>-->
<!--                    <a routerLink="/library/orm">orm</a>-->
<!--                    <a routerLink="/library/orm-browser">orm-browser</a>-->
<!--                    <a routerLink="/library/mongo">mongo</a>-->
<!--                    <a routerLink="/library/mysql">mysql</a>-->
<!--                    <a routerLink="/library/postgres">postgres</a>-->
<!--                    <a routerLink="/library/sqlite">sqlite</a>-->
<!--                </section>-->
<!--                <section>-->
<!--                    <h4>Data</h4>-->
<!--                    <a routerLink="/library/type">type</a>-->
<!--                    <a routerLink="/library/broker">broker</a>-->
<!--                    <a routerLink="/library/rpc">rpc</a>-->
<!--                    <a routerLink="/library/rpc-tcp">rpc-tcp</a>-->
<!--                    <a routerLink="/library/bson">bson</a>-->
<!--                </section>-->
<!--                <section>-->
<!--                    <h4>Framework</h4>-->
<!--                    <a routerLink="/library/app">app</a>-->
<!--                    <a routerLink="/library/framework">framework</a>-->
<!--                    <a routerLink="/library/debugger">debugger</a>-->
<!--                    <a routerLink="/library/http">http</a>-->
<!--                    <a routerLink="/library/injector">injector</a>-->
<!--                    <a routerLink="/library/logger">logger</a>-->
<!--                    <a routerLink="/library/template">template</a>-->
<!--                    <a routerLink="/library/event">event</a>-->
<!--                    <a routerLink="/library/workflow">workflow</a>-->
<!--                    <a routerLink="/library/stopwatch">stopwatch</a>-->
<!--                    <a routerLink="/library/core">core</a>-->
<!--                    <a routerLink="/library/core-rxjs">core-rxjs</a>-->
<!--                    <a routerLink="/library/topsort">topsort</a>-->
<!--                </section>-->
<!--                <section>-->
<!--                    <h4>Angular</h4>-->
<!--                    <a routerLink="/library/desktop-ui">desktop-ui</a>-->
<!--                    <a routerLink="/library/type-angular">type-angular</a>-->
<!--                    <a routerLink="/library/angular-universal">angular-universal</a>-->
<!--                </section>-->
<!--            </div>-->
        </div>
    `,
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    public menu = '';

    protected lastTimeout: any;

    constructor(
        protected cd: ChangeDetectorRef,
        public router: Router,
    ) {
        router.events.subscribe(() => {
            this.menu = '';
            this.cd.detectChanges();
        });
    }

    open(menu: string) {
        if (this.lastTimeout) {
            clearTimeout(this.lastTimeout);
        }

        this.menu = menu;
        this.cd.detectChanges();
    }

    close(menu: string) {
        this.lastTimeout = setTimeout(() => {
            if (this.menu === menu) {
                this.menu = '';
            }
            this.cd.detectChanges();
        }, 200);
    }
}
