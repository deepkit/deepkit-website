import { Component } from '@angular/core';

@Component({
    template: `
        <div class="subline">Framework</div>

        <h2>Configuration</h2>

        <p>
            In Deepkit Framework modules and your application can have configuration options.
            A configuration could be database urls, passwords, IPs, and so on.
            Services and controllers can read those configuration options via dependency injection.
        </p>

        <p>
            A configuration can be defined using <code>AppModuleConfig</code> and the <code>t</code> decorator
            of <code>@deepkit/type</code>. It is a typesafe way to define a configuration for your whole
            application and its values are automatically serialized and validated.
        </p>

        <textarea codeHighlight title="app.ts">
            #!/usr/bin/env ts-node-script
            import 'reflect-metadata';
            import { Application } from '@deepkit/framework';
            import { AppModuleConfig } from '@deepkit/app';
            import { t } from '@deepkit/type';
            import { inject } from '@deepkit/injector';
            import { http } from '@deepkit/http';
            
            const config = new AppModuleConfig({
                pageTitle: t.string.default('Cool site'),
                domain: t.string.default('example.com'),
            });
            
            @http.controller()
            class MyWebsite {
                constructor(
                    @inject(config.all()) protected allSettings: typeof config.type
                ) {
                }
            
                @http.GET()
                helloWorld() {
                    return 'Hello from ' + this.allSettings.pageTitle + ' via ' + this.allSettings.domain;
                }
            }
            
            Application.create({
                config: config,
                controllers: [MyWebsite]
            }).run();
        </textarea>

        <textarea codeHighlight="bash">
            $ curl http://localhost:8080/
            Hello from Cool site via example.com
        </textarea>

        <p>
            There are several ways to read those configuration values in your services and controllers.
        </p>

        <h4>Configuration tokens</h4>

        <p>
            Configuration tokens are injected one per one. You can quickly add configuration options but have to keep
            their data type in sync. For more serious applications you should use <i>configuration slice</i>.
        </p>

        <textarea codeHighlight title="app.ts">
            import { inject } from '@deepkit/injector';
            import { config } from './app-config.ts';
            
            @http.controller()
            class MyWebsite {
                constructor(@inject(config.token('pageTitle')) pageTitle: string) {
                }
            }
        </textarea>

        <h4>Configuration slice</h4>

        <p>
            Configuration slices are the recommended way to provide your configuration options to services and controllers.
            They are fully type-safe, can be reused, and are easy to inject by simply using the class as type.
            They are also easy to test in your unit tests.
        </p>

        <textarea codeHighlight title="website.ts">
            import { config } from './app-config.ts';
            
            class WebsiteSettings extends config.slice(['pageTitle']) {
            }
            
            @http.controller()
            class MyWebsite {
                constructor(protected settings: WebsiteSettings) {
                }
            
                @http.GET()
                helloWorld() {
                    return 'Hello from ' + this.settings.pageTitle;
                }
            }
        </textarea>

        <textarea codeHighlight title="website.spec.ts">
            import { MyWebsite } from './app-config.ts';
            
            test('website', async () => {
                const website = new MyWebsite({pageTitle: 'World'});
            
                expect(website.helloWorld()).toBe('Hello from World');
            });
        </textarea>

        <h4>All configuration options</h4>
        
        <p>
            Another option is to inject the whole configuration object. This is not recommended but makes prototyping easy and fast.
        </p>

        <textarea codeHighlight title="website.ts">
            import { config } from './app-config.ts';

            @http.controller()
            class MyWebsite {
                constructor(@inject(config.all()) protected settings: typeof config.type) {
                }
            
                @http.GET()
                helloWorld() {
                    return 'Hello from ' + this.settings.pageTitle;
                }
            }
        </textarea>

        <h3>Configuration schema</h3>

        <p>
            The configuration schema is defined via <a routerLink="/documentation/type">Deepkit Type</a> and its <code>t</code> decorator.
            It allows you to define almost all possible data structures with default values, deserialization, validation, and description.
        </p>

        <textarea codeHighlight>
            const config = new AppModuleConfig({
                pageTitle: t.string.default('Cool site'),
                domain: t.string.default('example.com'),
                port: t.number.default(8080),
                databaseUrl: t.string.default('mongodb://localhost/'),
                
                email: t.boolean.default(false),
                emailSender: t.string.optional,
            });
        </textarea>

        <p>
            Its important to provide always a default value as the validation fails otherwise. For optional values use
            <code>.optional</code>.
        </p>

        <p>
            Configuration values of your application and all modules can be shown in the debugger. Activate the <code>debug</code> option in
            the <i>KernelModule</i> and open
            <a target="_blank" href="http://localhost:8080/_debug/configuration">http://localhost:8080/_debug/configuration</a>.
        </p>

        <textarea codeHighlight>
            import { Application, KernelModule } from '@deepkit/framework';

            Application.create({
                config: config,
                controllers: [MyWebsite],
                imports: [
                    KernelModule.configure({
                        debug: true,
                    })
                ]
            }).run();
        </textarea>

        <img src="/assets/documentation/framework/debugger-configuration.png"/>
        
        <p>
            You can also use <code>ts-node app.ts app:config</code> to see all available configuration options, active default, their
            default value, description and data type.
        </p>
        
        <textarea codeHighlight="bash">
            $ ts-node app.ts app:config
            Application config
            ┌─────────┬───────────────┬────────────────────────┬────────────────────────┬─────────────┬───────────┐
            │ (index) │     name      │         value          │      defaultValue      │ description │   type    │
            ├─────────┼───────────────┼────────────────────────┼────────────────────────┼─────────────┼───────────┤
            │    0    │  'pageTitle'  │     'Other title'      │      'Cool site'       │     ''      │ 'string'  │
            │    1    │   'domain'    │     'example.com'      │     'example.com'      │     ''      │ 'string'  │
            │    2    │    'port'     │          8080          │          8080          │     ''      │ 'number'  │
            │    3    │ 'databaseUrl' │ 'mongodb://localhost/' │ 'mongodb://localhost/' │     ''      │ 'string'  │
            │    4    │    'email'    │         false          │         false          │     ''      │ 'boolean' │
            │    5    │ 'emailSender' │       undefined        │       undefined        │     ''      │ 'string?' │
            └─────────┴───────────────┴────────────────────────┴────────────────────────┴─────────────┴───────────┘
            Modules config
            ┌─────────┬───────────────────────────┬─────────────────┬─────────────────┬────────────────────────────────────────────────────────────────────────────────────────────────────┬────────────┐
            │ (index) │           name            │      value      │  defaultValue   │                                            description                                             │    type    │
            ├─────────┼───────────────────────────┼─────────────────┼─────────────────┼────────────────────────────────────────────────────────────────────────────────────────────────────┼────────────┤
            │    0    │       'kernel.host'       │   'localhost'   │   'localhost'   │                                                 ''                                                 │  'string'  │
            │    1    │       'kernel.port'       │      8080       │      8080       │                                                 ''                                                 │  'number'  │
            │    2    │    'kernel.httpsPort'     │    undefined    │    undefined    │ 'If httpsPort and ssl is defined, then the https server is started additional to the http-server.' │ 'number?'  │
            │    3    │    'kernel.selfSigned'    │    undefined    │    undefined    │           'If for ssl: true the certificate and key should be automatically generated.'            │ 'boolean?' │
            │    4    │ 'kernel.keepAliveTimeout' │    undefined    │    undefined    │                                                 ''                                                 │ 'number?'  │
            │    5    │       'kernel.path'       │       '/'       │       '/'       │                                                 ''                                                 │  'string'  │
            │    6    │     'kernel.workers'      │        1        │        1        │                                                 ''                                                 │  'number'  │
            │    7    │       'kernel.ssl'        │      false      │      false      │                                       'Enables HTTPS server'                                       │ 'boolean'  │
            │    8    │    'kernel.sslOptions'    │    undefined    │    undefined    │                   'Same interface as tls.SecureContextOptions & tls.TlsOptions.'                   │   'any'    │
            ...
        </textarea>

        <h3>Set configuration values</h3>

        <p>
            Per default no values are overwritten, so default values are used. There are several ways to set configuration values.
        </p>

        <ul>
            <li>Environment variables for each option</li>
            <li>Environment variable via JSON</li>
            <li><i>dotenv</i> files</li>
        </ul>

        <p>
            You can use multiple configuration loading methods at the same time. The order in which they are called is important.
        </p>

        <h4>Environment variables</h4>

        <p>
            To allow setting each configuration option via its own environment variable, use <code>loadConfigFromEnvVariables</code>.
            The first argument is its prefix.
        </p>

        <p>
            For configuration options like above <code>pageTitle</code>, you can use <code>APP_pageTitle="Other title"</code>.
        </p>

        <textarea codeHighlight title="app.ts">
            Application.create({
                config: config,
                controllers: [MyWebsite],
            })
                .loadConfigFromEnvVariables('APP_')
                .run();
        </textarea>

        <textarea codeHighlight="bash">
            APP_pageTitle="Other title" ts-node app.ts server:listen
        </textarea>

        <h4>JSON environment variable</h4>

        <p>
            To change multiple configuration options via a single environment variable, use <code>loadConfigFromEnvVariable</code>.
            The first argument is its environment variable name.
        </p>

        <textarea codeHighlight title="app.ts">
            Application.create({
                config: config,
                controllers: [MyWebsite],
            })
                .loadConfigFromEnvVariable('APP_CONFIG')
                .run();
        </textarea>

        <textarea codeHighlight="bash">
            APP_CONFIG='{"pageTitle": "Other title"}' ts-node app.ts server:listen
        </textarea>

        <h4>DotEnv files</h4>

        <p>
            To change multiple configuration options via a dotenv file, use <code>loadConfigFromEnvFile</code>.
            The first argument is either a path to a dot env (relative to cwd) or multiple paths. If its an array
            it tries each path until it finds an existing file.
        </p>

        <textarea codeHighlight>
            Application.create({
                config: config,
                controllers: [MyWebsite],
            })
                .loadConfigFromEnvFile(['production.dotenv', 'dotenv'])
                .run();
        </textarea>

        <textarea codeHighlight="bash">
            $ cat dotenv
            pageTitle=Other title
            $ ts-node app.ts server:listen
        </textarea>

        <h3>Configure module</h3>

        <p>
            Each imported module should have a module id. This id is used for the configuration paths used above.
            Core modules like <code>KernelModule</code> and <code>HttpModule</code> are imported automatically if not done manually.
        </p>

        <p>
            For environment variable configuration the path for example for the kernel option <code>port</code> is <code>kernel_port</code>.
            If a prefix of <code>APP_</code> is used you can change the port via:
        </p>

        <textarea codeHighlight="bash">
            $ APP_kernel_port=9999 ts-node app.ts server:listen
            2021-06-12T18:59:26.363Z [LOG] Start HTTP server, using 1 workers.
            2021-06-12T18:59:26.365Z [LOG] HTTP MyWebsite
            2021-06-12T18:59:26.366Z [LOG]     GET / helloWorld
            2021-06-12T18:59:26.366Z [LOG] HTTP listening at http://localhost:9999/
        </textarea>

        <p>
            In dotenv files it would become <code>kernel_port=9999</code>.
        </p>

        <p>
            In JSON environment variables on the other hand its not separated by an underscore. <code>kernel</code> becomes an object.
        </p>

        <textarea codeHighlight>
            $ APP_CONFIG='{"kernel": {"port": 9999}}' ts-node app.ts server:listen
        </textarea>

        <p>
            This works the same for all modules. For configuration option of your application there is no module prefix needed.
        </p>

    `
})
export class DocFrameworkConfigurationComponent {
}
