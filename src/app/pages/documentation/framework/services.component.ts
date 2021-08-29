import { Component } from '@angular/core';

@Component({
    template: `
        <div class="subline">Framework</div>

        <h2>Services</h2>

        <p>
            Service is a broad category encompassing any value, function, or feature that an application needs. A service is typically a
            class with a narrow, well-defined purpose. It should do something specific and do it well.
        </p>
        
        <p>
            A service in Deepkit (and in most other JavaScript/TypeScript frameworks) is a simple class registered in a module
            using a provider. The simplest provider is the class provider, which specifies only the class itself and nothing else.
            It then becomes a singleton in the dependency injection container of the module where it was defined.
        </p>
        
        <p>
            Services are handled and instantiated by the dependency injection container and thus can be imported and used in other services, 
            in controllers, and event listeners using constructor injection or property injection.
            See the chapter <a routerLink="/documentation/framework/dependency-injection">Dependency injection</a> for more details.
        </p>

        <p>
            To create a simple service, you just write a class with a purpose:
        </p>
        
        <textarea codeHighlight title="services/user-manager.ts">
            export interface User {
                username: string;
            }
            
            export class UserManager {
                users: User[] = [];
            
                addUser(user: User) {
                    this.users.push(user);
                }
            }
        </textarea>

        <p>
            And either register it in your application, or in a module:
        </p>
        
        <textarea codeHighlight title="app.ts">
            new Application({
                providers: [UserManager]
            }).run();
        </textarea>
        
        <p>
            After doing so you can use this service in controllers, other services, or event listeners.
            For example, let's reuse our CLI <code>TestCommand</code> 
            from the <a routerLink="/documentation/framework/getting-started">Getting Started</a> chapter.
        </p>
        
        <textarea codeHighlight title="cli/test.ts">
            import { UserManger } from './services/user-manager';
            
            @cli.controller('test')
            export class TestCommand implements Command {
                constructor(protected userManager: UserManager) {
                }
            
                async execute() {
                    this.userManager.addUser({username: 'Peter'});
                }
            }
        </textarea>
    `
})
export class DocFrameworkServicesComponent {
}
