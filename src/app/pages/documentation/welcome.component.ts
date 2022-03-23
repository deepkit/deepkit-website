import { Component } from '@angular/core';

@Component({
    template: `
        <h1>Documentation</h1>

        <p>
            Welcome to the Deepkit documentation. In this documentation you will find more information about how to use
            each library and the Deepkit Framework in great detail with example code.
        </p>
        
        <h2>API</h2>
        
        <p>
            Use the API documentation to get very detailed information about the API of each module.
        </p>
        
        <p>
            <a class="button big" href="/assets/api-docs/modules.html">API Documentation</a>
        </p>
        
        <h2>Support</h2>
        
        <p>
            If you need help, please join the Discord community server: 
        </p>
        <p>
            <a class="button big" routerLink="/community">Community</a>
        </p>
    `
})
export class DocWelcomeComponent {

}
