import { Component } from '@angular/core';

@Component({
    template: `
        <div class="subline">Framework</div>

        <h2>Modules</h2>

        <p>
            Deepkit Framework is highly modular and lets you split up your application into several handy modules.
            Each module has its own dependency injection sub container, configuration, commands, and more.
            In fact, in the Getting Started chapter you already created a module - the root module.
            <code>new App</code> takes almost the same arguments as a module, because in fact, it creates the root module
            in the background for you.
        </p>

        <p>
            You can skip this chapter if you don't plan to split up your application into sub modules, or if you don't plan
            to provide a module as a package for others to use.
        </p>

        <p>
            The simplest way to create a module is like this.
        </p>

        <textarea codeHighlight title="module.ts">
            import { createModule } from '@deepkit/app';
            
            export class MyModule extends createModule({}) {
            }
        </textarea>

        <p>
            It has basically no functionality at this point since its module definition is an empty object and it has no methods,
            but this demonstrates the relationship between modules and your application (your root module).
            This module <code>MyModule</code> can then be imported in your application or in other modules.
        </p>

        <textarea codeHighlight title="app.ts">
            import { MyModule } from './module.ts'
            
            new App({
                imports: [
                    new MyModule(),
                ]
            }).run();
        </textarea>

        <p>
            You can now add features to that module as you would with <code>App</code>.
            The arguments are the same except that <code>imports</code> is not available in a module definition.
            Add HTTP/RPC/CLI controllers, services, a configuration, event listeners, as well as use various module hooks to
            make modules more dynamic.
        </p>

        <h3>Controllers</h3>

        <p>
            Modules can define controllers that will be handled by other modules. For example, if you add a controller with decorators from the
            <code>@deepkit/http</code> package, its module <code>HttpModule</code> will pick that up and register the found routes in its router.
            A single controller can have multiple such decorators attached. It's up to the module author who gives you those decorators
            how to process the controllers.
        </p>

        <textarea codeHighlight title="module.ts">
            import { createModule } from '@deepkit/app';
            import { http } from '@deepkit/http';
            import { injectable } from '@deepkit/injector';

            class MyHttpController {
                @http.GET('/hello)
                hello() {
                    return 'Hello world!';
                }
            }
            
            export class MyModule extends createModule({
                controllers: [MyHttpController]
            }) {}
        </textarea>

        <h3>Providers</h3>

        <p>
            If you define a provider in your application's <code>providers</code> section, they will be accessible
            in your whole application. With modules on the other hand those services/providers are automatically encapsulated in the dependency injection
            sub container of this module. You have to manually export each provider in order to make them available to a module/application
            that imports this module.
        </p>

        <p>
            To read more how services work, please see the chapter <a routerLink="/documentation/framework/dependency-injection">Dependency Injection</a>.
        </p>

        <textarea codeHighlight title="module.ts">
            import { createModule } from '@deepkit/app';
            import { http } from '@deepkit/http';
            import { injectable } from '@deepkit/injector';
            
            export class HelloWorldService {
                helloWorld() {
                    return 'Hello there!';
                }
            }
            
            class MyHttpController {
                constructor(private helloService: HelloWorldService) {}
            
                @http.GET('/hello)
                hello() {
                    return this.helloService.helloWorld();
                }
            }
            
            export class MyModule extends createModule({
                controllers: [MyHttpController],
                providers: [HelloWorldService],
            }) {}
        </textarea>

        <p>
            If a user imports this module, they won't have access to the <code>HelloWorldService</code> provider as it's encapsulated in the MyModule's sub dependency injection container.
        </p>


        <h3>Exports</h3>

        <p>
            To make providers available in the importer's module, you can put the class type of the provider in <code>exports</code>. This essentially moves the provider
            one level up, to the dependency injection container of the parent - the importer.
        </p>

        <textarea codeHighlight title="module.ts">
            import { createModule } from '@deepkit/app';
            
            export class MyModule extends createModule({
                controllers: [MyHttpController]
                providers: [HelloWorldService],
                exports: [HelloWorldService],
            }) {}
        </textarea>

        <p>
            If you have other providers like FactoryProvider, useClassProvider, etc, you should still only use the class type in the exports.
        </p>

        <textarea codeHighlight title="module.ts">
            import { createModule } from '@deepkit/app';
            
            export class MyModule extends createModule({
                controllers: [MyHttpController]
                providers: [
                    {provide: HelloWorldService, useValue: new HelloWorldService}
                ],
                exports: [HelloWorldService],
            }) {}
        </textarea>

        <p>
            We can now import that module and use its exported service in our application code.
        </p>

        <textarea codeHighlight title="app.ts">
            #!/usr/bin/env ts-node-script
            import { App } from '@deepkit/app';
            import { cli, Command } from '@deepkit/app';
            import { HelloWorldService, MyModule } from './my-module';
            
            @cli.controller('test')
            export class TestCommand implements Command {
                constructor(protected helloWorld: HelloWorldService) {
                }
            
                async execute() {
                    this.helloWorld.helloWorld();
                }
            }
            
            new App({
                controllers: [TestCommand],
                imports: [
                    new MyModule(),
                ]
            }).run();
        </textarea>


        <h3>Configuration schema</h3>

        <p>
            A module can have type-safe configuration options. The values of those options can be partially or completely injected to services
            from that module using simply the class reference or type functions like <code>Partial&lt;Config, 'url'&gt;</code>. 
            To define a configuration schema write a class with properties.
        </p>

        <textarea codeHighlight title="module.config.ts">
            
            export class Config {
                title!: string; //this makes it required and needs to be provided
                host?: string;
            
                debug: boolean = false; //default values are supported as well
            }
        </textarea>

        <textarea codeHighlight title="module.ts">
            import { createModule } from '@deepkit/app';
            import { Config } from './module.config.ts';

            export class MyModule extends createModule({
               config: Config
            }) {}
        </textarea>

        <p>
            Configuration option values can be provided either by the constructor of your module, with the <code>.configure()</code> method,
            or via configuration loaders (e.g. environment variables loaders).
        </p>

        <textarea codeHighlight title="app.ts">
            import { MyModule } from './module.ts';

            new App({
               imports: [new MyModule({title: 'Hello World'}],
            }).run();
        </textarea>

        <p>
            To dynamically change the configuration options of a imported module, you can use the <code>process</code> module hook.
            This is a good place to either redirect configuration options or set up an imported module depending on the current module
            config, or other module instance information.
        </p>

        <textarea codeHighlight title="main.module.ts">
            import { MyModule } from './module.ts';

            export class MainModule extends createModule({
            }) {
                process() {
                    this.getImportedModuleByClass(MyModule).configure({title: 'Changed'});
                }
            }
        </textarea>

        <p>
            For the application level, it works slightly differently:
        </p>

        <textarea codeHighlight title="app.ts">
            new App({
                imports: [new MyModule({title: 'Hello World'}],
            })
                .setup((module, config) => {
                    module.getImportedModuleByClass(MyModule).configure({title: 'Changed'});
                })
                .run();
        </textarea>

        <p>
            If the root application module is created from a regular module, it works similarly to regular modules.
        </p>

        <textarea codeHighlight title="app.ts">
            class AppModule extends createModule({
            }) {
                process() {
                    this.getImportedModuleByClass(MyModule).configure({title: 'Changed'});
                }
            }
            
            App.fromModule(new AppModule()).run();
        </textarea>

        <h3>Consume Configuration</h3>

        <p>
            To use a configuration option in a service, you can use regular dependency injection. It's possible to either
            inject the whole configuration object, a single value, or a partial of the configuration.
        </p>

        <h4>Partial</h4>

        <p>
            To inject only a sub section of configuration values use the <code>Pick</code> type function.
        </p>

        <textarea codeHighlight title="my-service.ts">
            import { Config } from './module.config';

            export class MyService {
                 constructor(private config: Pick<Config, 'title' | 'host'}) {
                 } 
            
                 getTitle() {
                     return this.config.title;
                 }
            }
            
            //In unit tests, it can be instantiated via
            new MyService({title: 'Hello', host: '0.0.0.0'});

            //or you can use type aliases
            type MyServiceConfig = Pick<Config, 'title' | 'host'};
            export class MyService {
                 constructor(private config: MyServiceConfig) {
                 } 
            }
        </textarea>

        <h4>Single value</h4>

        <p>
            To inject only a single value, use the index access type operator.
        </p>

        <textarea codeHighlight title="my-service.ts">
            import { Config } from './module.config';

            export class MyService {
                 constructor(private title: Config['title']) {
                 } 
            
                 getTitle() {
                     return this.title;
                 }
            }
        </textarea>

        <h4>All</h4>
        <p>
            To inject all config values, use the class as dependency.
        </p>

        <textarea codeHighlight title="my-service.ts">
            import { Config } from './module.config';
            
            export class MyService {
                 constructor(private config: Config) {
                 } 
            
                 getTitle() {
                     return this.config.title;
                 }
            }
        </textarea>

        <p>
            See the chapter <a routerLink="/documentation/framework/configuration">Configuration</a> for more information on how to
            inject configuration options.
        </p>

        <h3>Module name</h3>

        <p>
            All configuration options can also be changed via environment variables. This works only if the module has a name assigned.
            A module name can be defined via <code>createModule</code> and later changed dynamically on the instance creation. The latter
            pattern is useful if you have imported the same module twice and want to differentiate between them by setting a new name.
        </p>

        <textarea codeHighlight title="module.ts">
            export class MyModule extends createModule({
            }, 'my') { //<-- 'my' is the name
            }
        </textarea>

        <textarea codeHighlight title="app.ts">
            import { MyModule } from './module';
            
            new App({
                imports: [
                    new MyModule(), //'my' is the default name
                    new MyModule().rename('my2'), //'my2' is now the new name
                ]
            }).run();
        </textarea>


        <p>
            See the chapter <a routerLink="/documentation/framework/configuration">Configuration</a> for more information on how to load
            configuration options from environment variables or .env files.
        </p>


        <h3>Imports</h3>

        <p>
            Modules can import other modules to extend their functionality. In <code>App</code> you can import other modules in the module definition object via <code>imports: []</code>:
        </p>

        <textarea codeHighlight title="app.ts">
            new App({
                imports: [new Module]
            }).run();
        </textarea>

        <p>
            In regular modules, this is not possible since the module in the object definition object instance would become a global, which is usually not what you want.
            Instead, modules could be instantiated in module itself via the <code>imports</code> property, so that instances of each imported module is created for each new instance
            of your module.
        </p>

        <textarea codeHighlight title="module.ts">
            import { createModule } from '@deepkit/app';
            
            export class MyModule extends createModule({
            }) {
                imports = [new OtherModule()];
            }
        </textarea>

        <p>
            You can also import modules dynamically based on the configuration using the <code>process</code> hook.
        </p>

        <textarea codeHighlight title="module.ts">
            import { createModule } from '@deepkit/app';
            
            export class MyModule extends createModule({
            }) {
                process() {
                    if (this.config.xEnabled) {
                        this.addImport(new OtherModule({option: 'value'});
                    }
                }
            }
        </textarea>

        <h3>Hooks</h3>

        <p>
            The service container loads all modules in the order they were imported, starting at the root/application module.
        </p>

        <p>
            During this process, the service container also executes all registered configuration loaders, calls <code>setupConfig</code> callbacks, and then
            validates the configuration objects of each module.
        </p>

        <p>
            The whole process of loading the service container is as follows:
        </p>
        
        <ol>
            <li>For each module <code>T</code> (starting at the root)</li>
            <ol>
                <li>Execute configuration loaders <code>ConfigLoader.load(T)</code>.</li>
                <li>Call <code>T.setupConfig()</code>.</li>
                <li>Validate config of <code>T</code>. Abort if invalid.</li>
                <li>
                    Call <code>T.process()</code>.<br/>
                    Here the module can modify itself based on valid configuration options. Add new imports, providers, etc.
                </li>
                <li>Repeat 1. for each imported module of <code>T</code>.</li>
            </ol>
            <li>Find all registered modules.</li>
            <li>
                Process each module found <code>T</code>.
                <ol>
                    <li>Register middlewares of <code>T</code>.</li>
                    <li>Register listener of <code>T</code> in the event dispatcher.</li>
                    <li>Call for all found modules from 2. <code>Module.processController(T, controller)</code>.</li>
                    <li>Call for all found modules from 2. <code>Module.processProvider(T, token, provider)</code>.</li>
                    <li>Repeat 3. for each imported module of <code>T</code>.</li>
                </ol>
            </li>
            <li>Run <code>T.postProcess()</code> on all modules.</li>
            <li>Instantiate the bootstrap class on all modules.</li>
            <li>The dependency injection container is now built.</li>
        </ol>
        
        <p>
            To use hooks, you can register the 
            <code>process</code>, <code>processProvider</code>, <code>postProcess</code> 
            methods in your module class.
        </p>

        <textarea codeHighlight title="module.ts">
            import { createModule, AppModule } from '@deepkit/app';
            import { isClass } from '@deepkit/core';
            import { ProviderWithScope, Token } from '@deepkit/injector';
            
            export class MyModule extends createModule({
            }) {
                imports = [new FrameworkModule()];
            
                //executed first
                process() {
                    //this.config contains the fully validated config object.
                    if (this.config.environment === 'development') {
                        this.getImportedModuleByClass(FrameworkModule).configure({debug: true});
                    }
                    this.addModule(new AnotherModule);
                    this.addProvider(Service);
            
                    //calls additional setup methods. 
                    //In this case call 'method1' with given arguments when 
                    //Service is instantiated by the dependency injection container.
                    this.setupProvider(Service).method1(this.config.value);
                }
            
                //executed for each found provider in all modules
                processController(module: AppModule<any>, controller: ClassType) {
                    //HttpModule for example checks for each controller whether
                    //a @http decorator was used, and if so extracts all route
                    //information and puts them the router.
                }
            
                //executed for each found provider in all modules
                processProvider(module: AppModule<any>, token: Token, provider: ProviderWithScope) {
                    //FrameworkModule for example looks for provided tokens that extend from deepkit/orm Database
                    //and automatically registers them in a DatabaseRegistry so they can be used in the migration CLI commands
                    //and Framework Debugger.
                }
            
                //executed when all modules have been processed.
                //Last chance to setup providers via module.setupProvider/module.setupGlobalProvider based on
                //information processed in process/processProvider. 
                postProcess() {
                    
                }
            }
        </textarea>
        
        <h3>Stateful Modules</h3>
        
        <p>
            Since each module is explicitly instantiated with <code>new Module</code>, the module can have a state. This state can be injected into
            the dependency injection container so it is available for services.
        </p>
        
        <p>
            As an example, consider the HttpModule use-case. It checks each registered controller in the whole application to have
            certain @http decorators, and if so, puts the controller in a registry. This registry is injected to the Router,
            which, once instantiated, extracts all route information of those controllers and register them.
        </p>

        <textarea codeHighlight title="module.ts">
            class Registry {
                protected controllers: { module: AppModule<any>, classType: ClassType }[] = [];
        
                register(module: AppModule<any>, controller: ClassType) {
                    this.controllers.push({ module, classType: controller });
                }
        
                get(classType: ClassType) {
                    const controller = this.controllers.find(v => v.classType === classType);
                    if (!controller) throw new Error('Controller unknown');
                    return controller;
                }
            }
        
            class Router {
                constructor(
                    protected injectorContext: InjectorContext,
                    protected registry: Registry
                ) {
                }
        
                getController(classType: ClassType) {
                    //find classType and module for given controller classType
                    const controller = this.registry.get(classType);
        
                    //here the controller will be instantiated. If it was already
                    //instantiated, the old instanced will be returned (if the provider was not transient: true)
                    return injector.get(controller.classType, controller.module);
                }
            }
        
            class HttpModule extends createModule({
                providers: [Router],
                exports: [Router],
            }) {
                protected registry = new Registry;
        
                process() {
                    this.addProvider({ provide: Registry, useValue: this.registry });
                }
        
                processController(module: AppModule<any>, controller: ClassType) {
                    //controllers need to be put into the module's providers by the controller consumer
                    if (!module.isProvided(controller)) module.addProvider(controller);
                    this.registry.register(module, controller);
                }
            }
        
            class MyController {}
        
            const app = new App({
                controllers: [MyController],
                imports: [new HttpModule()]
            });
        
            const myController = app.get(Router).getController(MyController);
        </textarea>

        <h3>For root</h3>

        <p>
            The <code>root</code> property allows you to move the dependency injection container of a module into the root application's container.
            This makes every service available from the module automatically available in the root application itself. It basically moves each
            provider (controller, event listener, provider) into the root container. This could lead to dependency clashes,
            so should only be used for a module that has really only globals. You should prefer exporting each provider manually instead.
        </p>

        <p>
            If you build a library that can be used by many modules, you should avoid using <code>root</code>, as it could clash
            with provider tokens from other libraries. For example, if this library module imports a <code>foo</code> module that defines a
            service and you reconfigure some services to your need, and the user's application imports the same <code>foo</code> module, the user receives
            your reconfigured services. For many simpler use cases this might be fine though.
        </p>

        <textarea codeHighlight title="module.ts">
            import { createModule } from '@deepkit/app';
            export class MyModule extends createModule({
            }) {
                root = true;
            }
        </textarea>

        <p>
            You can also change the <code>root</code> property of a third-party module, by using <code>forRoot()</code>.
        </p>

        <textarea codeHighlight>
            new App({
                imports: [new ThirdPartyModule().forRoot()],
            }).run();
        </textarea>



        <h3>Injector Context</h3>
        
        <p>
            The InjectorContext is the dependency injection container. It allows you to request/instantiate services
            from your own or other modules. This is necessary if for example you have stored a controller in <code>processControllers</code> and want to correctly instantiate them.
        </p>

    `
})
export class DocFrameworkModulesComponent {
}
