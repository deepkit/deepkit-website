import { Component } from '@angular/core';

@Component({
    template: `
        <div class="subline">Framework</div>

        <h2>Dependency injection</h2>

        <p>
            The heart of Deepkit Framework is a very powerful dependency injection container, <a routerLink="/library/injector">Deepkit
            Injector</a>.
            It's a compiling container with scopes, typesafe configuration system,
            automatic dependency resolving, compiler passes, tagged providers, various providers and more. 
            It's where all class instances of your application are created and live.
        </p>

        <h3>Provider</h3>

        <p>
            A provider is used to describe how a service needs to be built. It defines what happens when a service is requested by your
            code, either through a dependency injection or when manually requesting the service from the container.
            There are several providers that allow you to register a service and define its behavior.
        </p>

        <h4>Class provider</h4>

        <p>
            A class provider is a simple class. It's automatically instantiated and dependencies are automatically resolved once that
            class is requested.
        </p>

        <textarea codeHighlight>
            class Database {
                getUsers(): {username: string}[] {
                    return [{username: 'Peter'}];
                }
            }
            
            class MyService {
                constructor(protected database: Database) {
                }
            }
            
            new App({
                providers: [MyService, Database],
            }).run();
        </textarea>

        <p>
            An verbose alternative notation is:
        </p>

        <textarea codeHighlight>
            providers: [{provide: MyService}],
        </textarea>

        <p>
            With the verbose notation you can redirect provider to an alternative class implementation.
        </p>

        <textarea codeHighlight>
            providers: [
                {provide: MyService, useClass: OverwrittenMyService},
                OverwrittenMyService
            ],
        </textarea>

        <h4>Value provider</h4>

        <p>
            Instead of letting the dependency injection container instantiate your class, you can do so manually before the
            actual container is created. All dependencies need to be resolved manually as well.
        </p>

        <textarea codeHighlight>
            const database = new Database();

            new App({
                providers: [{provide: MyService, useValue: new MyService(database)}],
            }).run();
        </textarea>

        <h4>Factory provider</h4>

        <p>
            If your service is more complex or requires complex setup calls on a newly created instance before it can be used,
            you can use a factory.
        </p>

        <textarea codeHighlight>
            new App({
                providers: [
                    {
                        provide: MyService, 
                        deps: [Database], 
                        useFactory: (database: Database) => {
                            return new MyService(database);
                        }
                    }
                ],
            }).run();
        </textarea>

        <p>
            You can use <code>deps</code> to retrieve dependencies that should be built by the container.
            A factory function is normally only called once, since providers are singletons by default.
        </p>

        <h4>Transient provider</h4>

        <p>
            All services are singletons unless otherwise specified, meaning a service is only instantiated once (per scope). Every other class
            requesting this service gets the very same instance. To disable this behavior, you can use transient providers.
            To enable transient you add <code>transient: true</code> to the provider.
        </p>

        <textarea codeHighlight>
            //class provider with transient
            {provide: MyService, transient: true}
            
            //class provider with transient overwritten class
            {provide: MyService, transient: true, useClass: OverwrittenMyService}
            
            //class provider with transient
            {provide: MyService, transient: true, useValue: new MyService(...)}
            
            //factory provider with transient
            {provide: MyService, transient: true, deps: [...], factory: ...}
        </textarea>

        <h3>Constructor/Property injection</h3>

        <p>
            Most of the time you use the constructor injector pattern. All dependencies are <i>injected</i> as constructor arguments.
            When you define a dependency as constructor parameter or property you essentially <i>request</i> an instance of that
            dependency from the container.
        </p>

        <textarea codeHighlight>
            class MyService {
                constructor(protected database: Database) {
                }
            }
        </textarea>

        <p>
            Optional arguments should be marked as such, otherwise an error could be thrown if no instance could be resolved.
        </p>

        <textarea codeHighlight>
            class MyService {
                constructor(protected database?: Database) {
                }
            }
        </textarea>

        <p>
            An alternative to constructor injection is property injection. This is usually used when you have (soft) circular dependency and
            don't depend on that dependency in the constructor.
        </p>

        <textarea codeHighlight>
            import { Inject } from '@deepkit/injector';
            
            class MyService {
                //required 
                protected database!: Inject<Database>;
            
                //or optional
                protected database?: Inject<Database>;
            }
        </textarea>

        <h3>Configuration</h3>
        
        <p>
            In Deepkit Framework modules and your application can have configuration options. 
            A configuration could be database urls, passwords, IPs, and so on. 
            To retrieve that information in your services, you can use configuration injection.
        </p>
        
        <textarea codeHighlight="">
            #!/usr/bin/env ts-node-script
            import { App } from '@deepkit/app';
            import { Database } from '@deepkit/orm';
            import { MongoDatabaseAdapter } from '@deepkit/mongo';
            
            class Config {
                database: string = 'mongodb://localhost';
            }
            
            class MainDatabase extends Database {
                constructor(url: Config['database']) {
                    super(new MongoDatabaseAdapter(url), []);
                }
            }
            
            new App({
                config: config,
                providers: [MainDatabase]
            }).run();
        </textarea>
        
        <p>
            The easiest way is to use the TypeScript index access operator <code>Config['database']</code> as dependency in the constructor.
            This will automatically inject the value of 'database'.
        </p>
        
        <p>
            An alternative is to use <i>configuration partials</i>. Those are types containing only the options you need. This 
            is perfect when you have more than one configuration option needed in your service.
        </p>

        <textarea codeHighlight>
            #!/usr/bin/env ts-node-script
            import { App } from '@deepkit/app';
            import { Database } from '@deepkit/orm';
            import { MongoDatabaseAdapter } from '@deepkit/mongo';
            
            class Config {
                databaseUrl: string = 'mongodb://localhost';
                pageTitle: string = 'My super page';
                domain: string = 'example.com';
            }

            class MainDatabase extends Database {
                constructor(databaseSettings: Partial<Config, 'databaseUrl'>) {
                    super(new MongoDatabaseAdapter(databaseSettings), []);
                }
            }
            
            //or use multiple values and define as type alias
            type DBConfig = Partial<Config, 'databaseUrl' | 'anotherOption'>;
            class MainDatabase extends Database {
                constructor(databaseSettings: DBConfig) {
            }
            
            new App({
                config: Config,
                providers: [MainDatabase]
            }).run();
        </textarea>

        <p>Or request the whole configuration object.</p>
            
        <textarea codeHighlight>
            class MainDatabase extends Database {
                constructor(protected database: Config) {
                    super(new MongoDatabaseAdapter(database.databaseUrl), []);
                }
            }
        </textarea>

        <h3>Scopes</h3>
        
        <p>
            By default, services don't live in any scope. If you have multiple scopes and put a service into that scope,
            that service is instantiated per scope. 
            Your application can create custom scopes by creating a new InjectorContext. 
            Deepkit Framework applications have already a few scopes define:
            For HTTP requests <code>http</code>, for RCP sessions <code>rpc</code>, 
            and CLI commands <code>cli</code>. A new HTTP scope is created for each incoming request and closed when done.
            The same is true for an RPC session: As soon as a new client connects, an RPC scope is created and closed when the client disconnects.
            For CLI commands, a CLI scope is created for each executed command.
        </p>
        
        <p>
            For example, if you put a service into the <code>http</code> scope, your service can only be requested by
            other services living in the same scope. Your HTTP controllers are automatically in the <code>http</code> scope,
            so they would be able to request that service. The objects <code>HttpRequest</code> and <code>HttpResponse</code>
            are only available in the <code>http</code> scope.
        </p>
        
        <p>
            There are certain system services that are in a scope. For example <code>RpcKernelConnection</code> can be requested
            from RPC controllers (that are automatically in the <code>rpc</code> scope) and services that are in that scope as well.
        </p>
        
        <textarea codeHighlight>
            import { HttpRequest } from '@deepkit/http';
            import { FrameworkModule } from '@deepkit/framework';
            
            class MyHttpSessionHandler {
                constructor(protected request: HttpRequest) {}
            
                getUser(): User {
                    return request.user;
                }   
            }
            
            new App({
                providers: [{provide: MyHttpSessionHandler, scope: 'http'}],
                imports: [new FrameworkModule]
            }).run();
        </textarea>

        <h3>Compiler passes</h3>
        
        <p>
            Compiler passes are a very powerful tool to adjust the way your services are built in the dependency injection container.
            Compiler passes provides a way to manipulate other service definitions that have been registered with the service container.
            It allows you to change properties or call methods with static arguments or with values from the container.
        </p>
        
        <p>
            Compiler passes are added in the <code>setup</code> callback of your app object or a module.
        </p>
        
        <textarea codeHighlight>
            import { App, } from '@deepkit/app';
            import { Logger } from '@deepkit/logger';
            import { injectorReference } from '@deepkit/injector';
            
            class Database {
            }
            
            class DatabaseRegistry {
                databases: Database[] = [];
                logger?: Logger;
            
                addDatabase(database: Database) {
                    this.databases.push(database);
                }
            
                enableAutoMigration() {
                }
            }
            
            class Config {
                migrateOnStartup: boolean = false;
            }
            
            new App({
                config: Config,
                providers: [DatabaseRegistry, Logger]
            })
            .setup((module, config) => {
                module.setupProvider(DatabaseRegistry).addDatabase(new Database());
            
                if (config.migrateOnStartup) {
                    module.setupProvider(DatabaseRegistry).enableAutoMigration();
                }
            
                module.setupProvider(DatabaseRegistry).logger = injectorReference(Logger);
            })
            .run();
        </textarea>
        
        <p>
            With <code>module.setupProvider()</code> you request a Proxy object from the provider interface and call each method on it.
            All calls will be scheduled and executed once the real service behind that provider is being built. If you change
            properties, these assignments will be scheduled as well, and will also be replayed for each newly created service. 
        </p>
        
        <p>
            Use <code>injectorReference</code> to reference other services. They will be replaced with the real service instance
            when your scheduled calls are executed.
        </p>
        
        <p>
            Using the <code>config</code> parameter in the <code>setup()</code> callback allows you to configure your services
            depending on configuration values. This makes it possible to set up your dependency injection container very dynamically for a 
            large variety of use cases.
        </p>

        <h3>Tagged providers</h3>
        
        <p>
            Dependency injection tags allow service authors to provide users a hook point to provide additional services for a specific purpose.
            For example, a user could provide several <i>Transport</i> services and tag them via an already defined tag <i>LogTransporterTag</i>
            from a <i>Logger</i> service. The Logger service can then request all services defined by the user for the tag <i>LogTransporterTag</i>.  
        </p>
        
        <p>
            Another use case would be to provide several <i>Database</i> services for a <i>DatabaseRegistry</i> service.
        </p>
        
        <textarea codeHighlight title="app.ts">
            import { App } from '@deepkit/app';
            import { Tag } from '@deepkit/injector';
            import { cli, Command } from '@deepkit/app';
            
            class Database {
                constructor(public name: string = 'default') {
                }
            }
            
            class DatabasesTag extends Tag<Database> {
            }
            
            @cli.controller('test')
            class DatabaseRegistry {
                constructor(
                    public databases: DatabasesTag
                ) {
                }
            }
            
            @cli.controller('test')
            export class TestCommand implements Command {
                constructor(protected db: DatabaseRegistry) {
                }
            
                async execute() {
                    console.log(this.db.databases);
                }
            }
            
            new App({
                controllers: [TestCommand],
                providers: [
                    DatabaseRegistry,
                    DatabasesTag.provide(Database),
                    DatabasesTag.provide({ provide: Database, useValue: new Database('second') }),
                ]
            }).run();
        </textarea>
        
        <textarea codeHighlight="bash">
            $ ts-node app.ts test
            DatabasesTag {
              services: [ Database { name: 'default' }, Database { name: 'second' } ]
            }
        </textarea>
        
        <h4>Tag registry</h4>
        
        <p>
            If a service needs instead of the service instances their definition (provider), it can use the <code>TagRegistry</code> class.
        </p>
        
        <textarea codeHighlight title="app.ts">
            @cli.controller('test')
            export class TestCommand implements Command {
                constructor(protected tagRegistry: TagRegistry) {
                }
            
                async execute() {
                    console.log(this.tagRegistry.resolve(DatabasesTag));
                }
            }
        </textarea>
        
        <textarea codeHighlight="bash">
            $ ts-node app.ts test
            [
              TagProvider {
                provider: { provide: [class Database] },
                tag: DatabasesTag { services: [] }
              },
              TagProvider {
                provider: { provide: [class Database], useValue: [Database] },
                tag: DatabasesTag { services: [] }
              }
            ]
        </textarea>
    `
})
export class DocFrameworkDependencyInjectionComponent {
}
