import { Component } from '@angular/core';

@Component({
    template: `
        <div class="subline">Framework</div>

        <h2>Deployment</h2>
        
        In this chapter we provide instruction on how to compile your application to JavaScript, configure it
        for your production environment, and deploy it via Docker.

        <h3>Compile TypeScript</h3>
        
        <p>
            Let's assume you have an application like this in a file <code>app.ts</code>:
        </p>
        
        <textarea codeHighlight title="app.ts">
            #!/usr/bin/env ts-node-script
            import 'reflect-metadata';
            import { App, createModuleConfig } from '@deepkit/app';
            import { FrameworkModule } from '@deepkit/framework';
            import { t } from '@deepkit/type';
            import { inject } from '@deepkit/injector';
            import { http } from '@deepkit/http';
            
            const config = createModuleConfig({
                title: t.string.default('DEV my Page'),
            });
            
            @http.controller()
            class MyWebsite {
                constructor(
                    @inject(config.token('title')) protected title: string
                ) {
                }
            
                @http.GET()
                helloWorld() {
                    return 'Hello from ' + this.title;
                }
            }
            
            new App({
                config: config,
                controllers: [MyWebsite],
                imports: [new FrameworkModule]
            })
                .loadConfigFromEnv()
                .run();
        </textarea>

        <p>
            When started using <code>ts-node app.ts server:start</code> you see everything works correctly at http://localhost:8080/. In a production environment
            you would not start the server using <code>ts-node</code>. You would compile it down to JavaScript and then use regular <code>node</code>.
            To do so you need to have a correct <i>tsconfig.json</i> in place with the right configuration options.
            In the <a routerLink="/documentation/framework">Getting Started</a> is your <code>tsconfig.json</code> configured
            in a way that it outputs JavaScript in the <code>./dist</code> folder. We assume you have that configured as well.
        </p>

        <p>
            When the all compiler settings are correct and your <code>outDir</code> points to a folder like <code>dist</code> for example, then
            as soon as you run the command <code>tsc</code> in your project, all your linked files in <code>files</code> in the <i>tsconfig.json</i>
            are compiled to JavaScript.
            Its enough to specify your entry point files to be in that list. All imported files are automatically compiled as well 
            and don't need to be inserted in the <i>tsconfig.json</i>. <code>tsc</code> is part of Typescript when you install <code>npm install typescript</code>.
        </p>
        
        <textarea codeHighlight="bash">
            $ ./node_modules/.bin/tsc
        </textarea>
        
        <p>
            The TypeScript compiler doesn't output anything when it was successful. You can check the output of <code>dist</code> now. 
        </p>
        
        <textarea codeHighlight="bash">
            $ tree dist
            dist
            └── app.js
        </textarea>
        
        <p>
            You see there is only one file. Your can execute it via <code>node dist/app.js</code> and get the same functionality
            as with <code>ts-node app.ts</code>.
        </p>
        
        <p>
            For a deployment its important that TypeScript files are compiling correctly and everything works via <code>node</code>
            directly. You could now simply move your <code>dist</code> folder including your <code>node_modules</code> and run
            <code>node dist/app.js server:start</code> and your app is successfully deployed. You would however use other solutions
            like Docker to correctly package your application.
        </p>

        <h3>Configuration</h3>
        
        <p>
            In a production environment, you would not bind the server to <code>localhost</code> but most likely to all devices via <code>0.0.0.0</code>.
            If not behind a reverse proxy you also would adjust the port to be <code>80</code>. To configure those two settings, you have
            to adjust the <code>FrameworkModule</code>. The two we care about are <code>host</code> and <code>port</code>. 
            To allow them to be configured from the outside via environment variables or via <i>.dotenv</i> files we first have to allow that. 
            Luckily our code above already did so using the methods <code>loadConfigFromEnv()</code>.
        </p>
        
        <p>
            Please read the chapter <a routerLink="/documentation/framework/configuration">Configuration</a> to learn more about how you
            can set application configuration options.
        </p>
        
        <p>
            To see what configuration options are available and which value they have, you can use the command <code>ts-node app.ts app:config</code>.
            You can see them also in the Framework Debugger.
        </p>
        
        <h4>SSL</h4>
        
        <p>
            Its recommended (and sometimes required) to let your app run at HTTPS using SSL. There are several options to configure
            SSL.
            To enable ssl use <code>framework.ssl</code> and to configure its parameters following options.
        </p>
        
        <table class="pretty">
            <tr>
                <th width="150">Name</th>
                <th width="100">Type</th>
                <th>Description</th>
            </tr>
            <tr>
                <td>framework.ssl</td>
                <td>boolean</td>
                <td>Enables HTTPS server when true</td>
            </tr>
            <tr>
                <td>framework.httpsPort</td>
                <td>number?</td>
                <td>If httpsPort and ssl is defined, then the https server is started additional to the http server.</td>
            </tr>
            <tr>
                <td>framework.sslKey</td>
                <td>string?</td>
                <td>A file path to a ssl key file for https</td>
            </tr>
            <tr>
                <td>framework.sslCertificate</td>
                <td>string?</td>
                <td>A file path to a certificate file for https</td>
            </tr>
            <tr>
                <td>framework.sslCa</td>
                <td>string?</td>
                <td>A file path to a ca file for https</td>
            </tr>
            <tr>
                <td>framework.sslCrl</td>
                <td>string?</td>
                <td>A file path to a crl file for https</td>
            </tr>
            <tr>
                <td>framework.sslOptions</td>
                <td>object?</td>
                <td>Same interface as tls.SecureContextOptions & tls.TlsOptions. </td>
            </tr>
        </table>

        <textarea codeHighlight title="app.ts">
            import { App } from '@deepkit/app';
            import { FrameworkModule } from '@deepkit/framework';
            
            // your config and http controller here 
            
            new App({
                config: config,
                controllers: [MyWebsite],
                imports: [
                    new FrameworkModule({
                        ssl: true,
                        selfSigned: true,
                        sslKey: __dirname + 'path/ssl.key',
                        sslCertificate: __dirname + 'path/ssl.cert',
                        sslCA: __dirname + 'path/ssl.ca',
                    })
                ]
            })
                .run();
        </textarea>
        
        <h4>Local SSL</h4>
        
        <p>
            In local dev environment you can activate self-signed HTTPs using the option <code>framework.selfSigned</code>. 
        </p>

        <textarea codeHighlight title="app.ts">
            import { App } from '@deepkit/app';
            import { FrameworkModule } from '@deepkit/framework';
            
            // your config and http controller here 
            
            new App({
                config: config,
                controllers: [MyWebsite],
                imports: [
                    new FrameworkModule({
                        ssl: true,
                        selfSigned: true,
                    })
                ]
            })
                .run();
        </textarea>
        
        <textarea codeHighlight="bash">
            $ ts-node app.ts server:start
            2021-06-13T18:04:01.563Z [LOG] Start HTTP server, using 1 workers.
            2021-06-13T18:04:01.598Z [LOG] Self signed certificate for localhost created at var/self-signed-localhost.cert
            2021-06-13T18:04:01.598Z [LOG] Tip: If you want to open this server via chrome for localhost, use chrome://flags/#allow-insecure-localhost
            2021-06-13T18:04:01.606Z [LOG] HTTP MyWebsite
            2021-06-13T18:04:01.606Z [LOG]     GET / helloWorld
            2021-06-13T18:04:01.606Z [LOG] HTTPS listening at https://localhost:8080/
        </textarea>

        <p>
            When you start that server now, your HTTP server is available as HTTPS at <code>https://localhost:8080/</code>.
            In chrome when opening that URL you get an error "NET::ERR_CERT_INVALID" now, since self-signed certificates are considered an security risk.
            <code>chrome://flags/#allow-insecure-localhost</code>.
        </p>
    `
})
export class DocFrameworkDeploymentComponent {
}
