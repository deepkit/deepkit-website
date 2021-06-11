import { Component } from '@angular/core';

@Component({
    template: `
        <div class="subline">Framework</div>

        <h2>Modules</h2>

        <p>
            Deepkit Framework is highly modular and lets you split up your application in several handy modules.
            Each module has its own dependency injection sub container, configuration, commands, and more.
            In fact, in the Getting Started chapter you already created a module - the root module.
            <code>Application.create</code> takes almost the same arguments as a module, because in fact, it creates the root modular
            in the background for you.
        </p>

        <p>
            You can skip this chapter if you don't plan to split up your application into sub modules, or if you don't plan
            to provide a module as a library for others to use.
        </p>

        <p>
            The simplest way to create a module is like this.
        </p>

        <textarea codeHighlight title="my-module.ts">
            import { AppModule } from '@deepkit/app';
            export const myModule = new AppModule({
            }, 'myModule');
        </textarea>

        <p>
            It creates a new AppModule and exports the variable. It has basically no functionality at this point since
            its module definition is an empty object, but demonstrates the relationship between modules and your application (your root
            module).
            This module in <code>myModule</code> can then be imported in your application or in other modules.
        </p>

        <p>
            It's important to give your module a good short name as the second argument in order to make configuration via
            environment variables easy.
        </p>

        <textarea codeHighlight title="app.ts">
            import { myModule } from './my-module.ts'
            
            Application.create({
                controllers: [TestCommand],
                imports: [
                    myModule,
                ]
            }).run();
        </textarea>

        <p>
            You can now add features to your modules like you would with your <code>Application</code>. The arguments are the same.
            You can add HTTP/RPC/CLI controllers, services, a configuration, event listeners,
        </p>

        <h3>Provide a service</h3>

        <p>
            If you provide a service in your application's <code>providers</code> section, you have those per default accessible
            in your whole application. With modules on the other hand those services/providers are automatically encapsulated in the dependency injection
            container of this module. You have to manually export each provider in order to make them available to a module/application
            that imports this module. This is like on how Angular works.
        </p>

        <p>
            To read more how services work, please see the chapter <a routerLink="/documentation/framework/services">Services</a>.
        </p>

        <textarea codeHighlight title="my-module.ts">
            import { AppModule } from '@deepkit/app';
            
            export class HelloWorldService {
                helloWorld() {
                    console.log('Hello world!');
                }
            }
            
            export const myModule = new AppModule({
                providers: [
                    HelloWorldService,
                ],
                exports: [
                    HelloWorldService,
                ]
            }, 'myModule');
        </textarea>

        <h3><code>forRoot()</code></h3>

        <p>
            <code>forRoot()</code> allows you to move the dependency injection container of your module into the application's container.
            This makes every service available in the module automatically available in the application itself. It basically moves each
            provider
            (controller, event listener, service) into the root container, which makes initial development easier but could lead to
            dependency clashes.
        </p>

        <p>
            If you build a library that can be used by many (unknown) applications, you should avoid using forRoot(), as it could clash
            with provider tokens from other libraries. For example, if this library module imports a <code>foo</code> module that defines a
            service and you
            reconfigure some services to your need, and the user's application imports the same <code>foo</code> module, the user receives
            your reconfigured services. For many simpler use cases this might be fine though.
        </p>
        
        <p>
            forRoot can be enabled when its called on the module and the result used as the module:
        </p>
        
        <textarea codeHighlight title="my-module.ts">
            import { AppModule } from '@deepkit/app';
            export const myModule = new AppModule({
            }, 'myModule').forRoot();
        </textarea>

        <h3>Configuration</h3>

        <p>
            Each module has its own configuration options that you define exactly like you define the configuration for a application.
            You first create configuration object and reference it in the module definition.
        </p>

        <textarea codeHighlight title="my-module.ts">
            import { AppModule, AppModuleConfig } from '@deepkit/app';
            import { inject } from '@deepkit/injector';
            import { t } from '@deepkit/type';
            
            export const config = new AppModuleConfig({
                world: t.string.default('world'),
            });
            
            export class HelloWorldService {
                constructor(@inject(config.token('world')) protected world: string) {
                }
            
                helloWorld() {
                    console.log('Hello', this.world);
                }
            }
            
            export const myModule = new AppModule({
                config: config,
                providers: [
                    HelloWorldService,
                ],
                exports: [
                    HelloWorldService,
                ]
            }, 'myModule');
        </textarea>

        <p>
            We can now import that module and use its exported service in our application code.
        </p>

        <textarea codeHighlight title="app.ts">
            #!/usr/bin/env ts-node-script
            import 'reflect-metadata';
            import { Application } from '@deepkit/framework';
            import { cli, Command } from '@deepkit/app';
            import { HelloWorldService, myModule } from './my-module';
            
            @cli.controller('test')
            export class TestCommand implements Command {
                constructor(protected helloWorld: HelloWorldService) {
                }
            
                async execute() {
                    this.helloWorld.helloWorld();
                }
            }
            
            Application.create({
                controllers: [TestCommand],
                imports: [
                    myModule,
                ]
            }).run();
        </textarea>

        <p>
            When you run the application's test command, you see it still prints <code>Hello world</code>, but this time from the
            service from the <code>myModule</code>.
        </p>

        <textarea codeHighlight="bash">
            $ ./app.ts test
            Hello world
        </textarea>

        <p>
            To proof this the application (and other users that import this module) can reconfigure the <code>world</code> configuration
            option.
        </p>

        <textarea codeHighlight>
            Application.create({
                controllers: [TestCommand],
                imports: [
                    myModule.configure({world: 'galaxy'}),
                ]
            }).run();
        </textarea>

        <p>When executing now again, we see:</p>

        <textarea codeHighlight="bash">
            $ ./app.ts test
            Hello galaxy
        </textarea>

        <p>
            All configuration options can also be changed via environment variables. See the chapter 
            <a routerLink="/documentation/framework/configuration">Configuration</a> for more information.
        </p>
    `
})
export class DocFrameworkModulesComponent {
}
