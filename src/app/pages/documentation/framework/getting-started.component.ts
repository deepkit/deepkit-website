import { Component } from '@angular/core';

@Component({
    template: `
        <div class="subline">Framework</div>

        <h2>Getting Started</h2>

        <h3>Installation</h3>

        <textarea codeHighlight="bash">
            npm install @deepkit/framework
        </textarea>

        <p>
            Make sure all peer dependencies are installed. Per default NPM 7+ installs them automatically.
            For older versions, use this command:
        </p>

        <textarea codeHighlight="bash">
            npm install @deepkit/framework reflect-metadata rxjs @deepkit/app @deepkit/broker \\
               @deepkit/core @deepkit/core-rxjs @deepkit/crypto @deepkit/event \\
               @deepkit/http @deepkit/injector @deepkit/logger @deepkit/orm @deepkit/rpc \\
               @deepkit/rpc-tcp @deepkit/sql @deepkit/sqlite @deepkit/stopwatch @deepkit/template \\
               @deepkit/type @deepkit/workflow @deepkit/bson
        </textarea>

        <p>
            To compile your application we need the TypeScript compiler and recommend <code>ts-node</code> to run it easily. 
            Install it with this command:
        </p>

        <textarea codeHighlight="bash">
            $ npm install typescript ts-node
        </textarea>
        
        <p>
            An alternative to using <code>ts-node</code> is to compile the source via the TypeScript compiler and run the JavaScript source directly.
            This has the advantage that the execution time for short commands increases dramatically.
            However, this adds also an additional workflow overhead by either running the compiler manually or by setting
            up a watcher. That's why this documentation uses ts-node in all examples. See the chapter
            <a routerLink="/documentation/framework/deployment">Deployment</a> to learn about compilation.
        </p>
        
        <h3>Write the application</h3>
        
        <p>
            Since Deepkit Framework does not use any configuration files or special folder structure, you can
            structure your project the way you want. The only two files you need to get started is a TypeScript file
            <code>app.ts</code> and the TypeScript config <code>tsconfig.json</code>.
        </p>
        
        <p>
            We should have the following files in our project folder:
        </p>
        
        <textarea codeHighlight="bash">
            .
            ├── app.ts
            ├── node_modules
            ├── package-lock.json
            └── tsconfig.json
        </textarea>


        <textarea codeHighlight="json" title="tsconfig.json">
            {
              "compilerOptions": {
                "outDir": "./dist",
                "experimentalDecorators": true,
                "emitDecoratorMetadata": true,
                "strict": true,
                "esModuleInterop": true,
                "target": "ES2020",
                "module": "CommonJS",
                "moduleResolution": "node"
              },
              "files": [
                "app.ts"
              ]
            }
        </textarea>

        <textarea codeHighlight title="app.ts">
            #!/usr/bin/env ts-node-script
            import 'reflect-metadata';
            import { Application } from '@deepkit/framework';
            import { Logger } from '@deepkit/logger';
            import { cli, Command } from '@deepkit/app';
            
            @cli.controller('test')
            export class TestCommand implements Command {
                constructor(protected logger: Logger) {
                }
            
                async execute() {
                    this.logger.log('Hello World!');
                }
            }
            
            Application.create({
                controllers: [TestCommand]
            }).run();
        </textarea>

        <p>
            In this code you see that we defined a <code>test</code> command via the <code>TestCommand</code> class
            and created a new (Deepkit Framework) Application, which we directly <code>run()</code>. 
            By executing this script we execute this application.
        </p>
        
        <p>
            With the shebang at the first line ("#!...") we can make our script executable using the following command.
        </p>
        
        <textarea codeHighlight="bash">
            $ chmod +x app.ts
        </textarea>
        
        <p>
            And then execute it.
        </p>

        <textarea codeHighlight="bash">
            $ ./app.ts
            VERSION
              Node
            
            USAGE
              $ ts-node-script app.ts [COMMAND]
            
            TOPICS
              debug
              migration  Executes pending migration files. Use migration:pending to see which are pending.
              server     Starts the HTTP server
            
            COMMANDS
              test
        </textarea>
        
        <p>
            To execute now our <code>test</code> command, we run following command.
        </p>

        <textarea codeHighlight="bash">
            $ ./app.ts test
            Hello World
        </textarea>
        
        <h3>HTTP server</h3>
        
        <p>
            When you execute <code>./app.ts server:listen</code> the HTTP/RPC server is starting and waits for incoming requests.
            In order to serve requests, please see the chapter <a routerLink="/documentation/framework/http/controller">HTTP Controller</a>
            or <a routerLink="/documentation/framework/rpc/controller">RPC controller</a>. But before you do that, please read the
            chapter <a routerLink="/documentation/framework/fundamentals">Fundamentals</a> first.
        </p>
    `
})
export class DocFrameworkGettingStartedComponent {
}
