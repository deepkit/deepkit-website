import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'dw-header',
    template: `
        <div class="wrapper" [class.showMenu]="showMenu">
            <a class="logo" *ngIf="!startPage" routerLink="/"><img src="/assets/images/deepkit_text.svg"/></a>
            <a class="logo" *ngIf="startPage" routerLink="/"><img src="/assets/images/deepkit_white_text.svg"/></a>

            <a class="burger" (click)="toggleMenu()">
                <svg width="21px" height="16px" viewBox="0 0 21 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <g id="burger" [attr.fill]="startPage ? 'white' : 'black'">
                            <rect id="Rectangle" x="0" y="0" width="21" height="2"></rect>
                            <rect id="Rectangle" x="0" y="7" width="21" height="2"></rect>
                            <rect id="Rectangle" x="0" y="14" width="21" height="2"></rect>
                        </g>
                    </g>
                </svg>
            </a>
            <nav class="main">
                <a routerLinkActive="active" routerLink="/framework">Framework</a>
                <a routerLinkActive="active" routerLink="/library">Libraries</a>
                <a routerLinkActive="active" routerLink="/community">Community</a>
                <a routerLinkActive="active" routerLink="/blog">Blog</a>
                <a routerLinkActive="active" routerLink="/documentation">Docs</a>

                <!--                <nav style="justify-content: flex-end;">-->
                <!--                    <a routerLinkActive="active" routerLink="/blog">Blog</a>-->
                <!--                    <a routerLinkActive="active" routerLink="/documentation">Documentation</a>-->
                <!--&lt;!&ndash;                    <a routerLinkActive="active" routerLink="/blog">Blog</a>&ndash;&gt;-->
                <!--                </nav>-->
            </nav>

        </div>
    `,
    host: {
        '[class.fromStartPage]': 'fromStartPage',
        '[class.startPage]': 'startPage',
    },
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    public menu = '';
    @Input() startPage: boolean = false;
    @Input() fromStartPage: boolean = false;

    protected lastTimeout: any;

    public showMenu: boolean = false;

    constructor(
        protected cd: ChangeDetectorRef,
        public router: Router,
    ) {
        router.events.subscribe(() => {
            this.menu = '';
            this.showMenu = false;
            this.cd.detectChanges();
        });
    }

    toggleMenu() {
        this.showMenu = !this.showMenu;
        this.cd.detectChanges();
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
