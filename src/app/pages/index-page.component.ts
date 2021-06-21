import { Component } from '@angular/core';

@Component({
    template: `
        <div class="wrapper banner">
            <strong>Deepkit</strong>
            <h1>High performance TypeScript framework</h1>
            <p>
                Modular framework for sophisticated TypeScript applications.
            </p>
        </div>

        <div class="separator">
            <div class="left"></div>
            <img src="../../assets/images/rectangle.svg"/>
            <div class="right"></div>
        </div>

        <div class="what">
            <div>
                <div>
                    <h3>Framework</h3>
                    <p>Deepkit is a Node.js framework written in and for TypeScript.</p>
                    <p>
                        It focuses on high performance server side applications while also providing tools and libraries for the whole tech
                        stack.
                    </p>
                </div>
            </div>
            <div>
                <div>
                    <h3>Library collection</h3>
                    <p>Deepkit is a collection of libraries of TypeScript packages that work standalone or in combination.</p>
                    <p>
                        Highly optimized for certain use-cases and streamlined in its API, they bring solid solutions for a lot of common
                        use-cases.
                    </p>
                </div>
            </div>
        </div>

        <div class="wrapper libraries">
            <a name="libraries"></a>
            <h1>Deepkit libraries</h1>

            <p>
                Deepkit libraries is a collection of open source TypeScript libraries under MIT license that work standalone or in
                combination. Each library lives in its own NPM package, is carefully optimised, and follows modern best practises..
                You can progressively adopt Deepkit libraries one by one or use all together in the full-fledged Deepkit Framework.
            </p>
        </div>

        <library-cards></library-cards>
    `,
    styleUrls: ['./index-page.component.scss']
})
export class IndexPageComponent {

}
