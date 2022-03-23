import { Component } from '@angular/core';

@Component({
    template: `
        <div class="page">
            <div class="wrapper fadeIn" style="position: relative;">
                <img class="bg" src="/assets/images/startpage-bg.svg"/>
            </div>
            <div class="wrapper text">
                <div class="overline fadeIn" style="--delay: 1s">INTRODUCING</div>

                <h1 class="fadeIn" style="--delay: 1s">HIGH PERFORMANCE<br/>TYPESCRIPT FRAMEWORK</h1>
            </div>

            <main>
                <div class="overline fadeIn" style="--delay: 2s">ALPHA</div>
                <p class="tagline fadeIn" style="--delay: 2.5s">
                    High-quality TypeScript libraries and a framework that brings everything together.<br/>
                    Precisely aligned, gently optimised, solid engineered.
                </p>
                <p class="buttons fadeIn" style="--delay: 3s">
                    <a class="button big" routerLink="/framework">Framework</a>
                    <a class="button big" routerLink="/library">Libraries</a>
                </p>
            </main>
            
            <dw-footer class="fadeIn" style="--delay: 4s"></dw-footer>
        </div>
    `,
    styleUrls: ['./index-page.component.scss']
})
export class IndexPageComponent {

}
