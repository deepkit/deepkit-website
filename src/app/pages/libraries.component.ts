import { Component } from '@angular/core';

@Component({
    template: `
        <div class="page">
            <div class="wrapper">
                <div class="overline">TYPESCRIPT</div>
                <h2>LIBRARIES</h2>

                <p class="feature-text">
                    A collection of open source TypeScript libraries under MIT license that work standalone or in combination.
                    Each library lives in its own NPM package, is carefully optimised, and follows modern best practises.
                </p>

                <p class="feature-text">
                    Progressively adopt Deepkit libraries one by one or use all together in Deepkit Framework.
                </p>

                <library-cards style="display: block; margin: 80px 0;"></library-cards>
            </div>
        </div>
    `
})
export class LibrariesComponent {

}
