import { Component } from '@angular/core';

@Component({
    template: `
        <div class="wrapper banner">
            <strong>Deepkit</strong>
            <h1>High performance TypeScript framework</h1>
            <p>
                Modular open-source framework for sophisticated TypeScript applications.
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
                        It makes it easy to write complex high performance server side applications. 
                    </p>
                    
                    <p>
                        <a routerLink="/framework" class="button">Deepkit Framework</a>
                    </p>
                </div>
            </div>
            <div>
                <div>
                    <h3>Library collection</h3>
                    <p>Deepkit is a collection of TypeScript libraries that work standalone.</p>
                    <p>
                        Highly optimized for many use-cases and streamlined in their API.
                    </p>
                    
                    <p>
                        <a routerLink="/library" class="button">Deepkit Libraries</a>
                    </p>
                </div>
            </div>
        </div>

<!--        <div class="wrapper libraries">-->
<!--            <a name="libraries"></a>-->
<!--            <h1>Deepkit libraries</h1>-->
<!--        </div>-->

<!--        <library-cards></library-cards>-->
    `,
    styleUrls: ['./index-page.component.scss']
})
export class IndexPageComponent {

}
