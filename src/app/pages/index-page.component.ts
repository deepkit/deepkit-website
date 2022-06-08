import { Component } from '@angular/core';

@Component({
    template: `
        <div class="page">
            <div class="wrapper" style="position: relative;">
                <img class="bg" src="/assets/images/startpage-bg.svg"/>
            </div>
            <div class="wrapper text">
                <div class="overline">INTRODUCING</div>

                <h1>HIGH PERFORMANCE<br/>TYPESCRIPT FRAMEWORK</h1>
            </div>

            <main>
                <div class="overline">ALPHA</div>
                <p class="tagline">
                    High-quality TypeScript libraries and a framework that brings everything together.<br/>
                    Precisely aligned, gently optimised, solidly engineered.
                </p>
                <p class="buttons">
                    <a class="button big" routerLink="/framework">Framework</a>
                    <a class="button big" routerLink="/library">Libraries</a>
                </p>
            </main>
            
            <dw-footer></dw-footer>
        </div>
    `,
    styleUrls: ['./index-page.component.scss']
})
export class IndexPageComponent {

}
