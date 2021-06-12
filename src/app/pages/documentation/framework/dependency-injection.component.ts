import { Component } from '@angular/core';

@Component({
    template: `
        <div class="subline">Framework</div>

        <h2>Dependency injection</h2>

        <p>
           The heart of Deepkit Framework is a very powerful dependency injection container, <a routerLink="/library/injector">Deepkit Injector</a>. 
            Its a very powerful implementation of dependency injection with a compiled container, scopes, typesafe configuration system,
            automatic dependency resolving, compiler passes, tagged providers, various providers and more. Its where all class instances of your application
            are created and live.
        </p>
        
        <h3>Provider</h3>
        
        <p></p>
        
        <h3>Constructor/Property injection</h3>
        
        <p></p>
        
        <h3>Configuration</h3>
        
        <h3>Scopes</h3>
        
        <h3>Compiler passes</h3>
        
        <h3>Tagged providers</h3>
    `
})
export class DocFrameworkDependencyInjectionComponent {
}
