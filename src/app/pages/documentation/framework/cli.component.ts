import { Component } from '@angular/core';

@Component({
    template: `
        <div class="subline">Framework</div>

        <h2>CLI</h2>

        <p>
            CLI stands for command line interface and is a way to interact with your application through the terminal/console.
            It's one of three entry points into your application.
            In Deepkit Framework your applications always start via a command line program that you write yourself in TypeScript.
            It's how you start the HTTP/RPC server, execute migrations, and execute your own commands. It's all via the same entry
            point, the same file.
        </p>

        <p>
            Deepkit Framework comes with a CLI framework based on simple classes. In fact, it is based on <code>@deepkit/app</code>,
            which is a small package just for that purpose and could be used standalone. In that package you find decorators needed
            to decorate your CLI controller class.
        </p>

        <p>
            Controllers are handled and instantiated by the dependency injection container and thus can import and use other services.
            See the chapter <a routerLink="/documentation/framework/dependency-injection">Dependency injection</a> for more details.
        </p>
        
        <p>
            To create a command for your application, you have to create a CLI controller. It's a simple class decorated with
            information about the command. If you read the Getting Started chapter, you already saw how it looks.
        </p>

        <textarea codeHighlight title="app.ts">
            #!/usr/bin/env ts-node-script
            import 'reflect-metadata';
            import { App } from '@deepkit/app';
            import { Logger } from '@deepkit/logger';
            import { cli, Command } from '@deepkit/app';
            
            @cli.controller('test', {
                description: 'My super first command'
            })
            export class TestCommand implements Command {
                constructor(protected logger: Logger) {
                }
            
                async execute() {
                    this.logger.log('Hello World!');
                }
            }
            
            new App({
                controllers: [TestCommand]
            }).run();
        </textarea>

        <p>
            This code is in fact already a full Deepkit Framework application that can be executed. Use <code>ts-node</code> to start it.
            Note: Make sure to follow the 
            <a routerLink="/documentation/framework">Getting Started</a> 
            guide so that dependencies and the tsconfig is correctly created. 
        </p>

        <textarea codeHighlight>
            $ ts-node ./app.ts
            VERSION
              Node
            
            USAGE
              $ ts-node app.ts [COMMAND]
            
            TOPICS
              debug
              migration  Executes pending migration files. Use migration:pending to see which are pending.
              server     Starts the HTTP server
            
            COMMANDS
              test
        </textarea>

        <p>
            You can make the file executable using <code>chmod +x app.ts</code> and then simply execute <code>./app.ts</code>.
        </p>
        
        <p>
            To execute the command your just registered, you should call <code>./app.ts test</code>.
        </p>
        
        <textarea codeHighlight>
            $ ts-node ./app.ts test
            Hello World!
        </textarea>
        
        <h3>Arguments</h3>
        
        <p>
            To add arguments to your command, use the decorator of <code>@deepkit/app</code> on an argument of the <code>execute</code> method.
        </p>
        
        <textarea codeHighlight title="app.ts">
            @cli.controller('test')
            export class TestCommand implements Command {
                constructor(protected logger: Logger) {
                }
            
                async execute(
                    @arg title: string
                ) {
                    this.logger.log('Hello', title);
                }
            }
        </textarea>
        
        <p>
            Executing this command now without providing <code>title</code> throws an error:
        </p>
        
        <textarea codeHighlight>
            $ ./app.ts test
            RequiredArgsError: Missing 1 required arg:
            title
        </textarea>
        
        <p>
            By using <code>--help</code> you get more information about the required arguments:
        </p>
        
        <textarea codeHighlight>
            $ ./app.ts test --help
            USAGE
              $ ts-node-script app.ts test TITLE
        </textarea>
        
        <p>
            So lets provide the title this time:
        </p>
        
        <textarea codeHighlight>
            $ ./app.ts test "beautiful world"
            Hello beautiful world
        </textarea>
        
        <p>
            You can add as many arguments as you want. The order of the <code>execute</code> arguments is reflected in the command.
        </p>
        
        <h3>Flags</h3>
        
        <p>
            Flags are another way to provide values to your command.
        </p>
        
        <textarea codeHighlight title="app.ts">
            @cli.controller('test')
            export class TestCommand implements Command {
                constructor(protected logger: Logger) {
                }
            
                async execute(
                    @arg title: string,
                    @flag.optional color: boolean = false,
                ) {
                    if (color) {
                        this.logger.log('Colored: <yellow>Hello', title, '</yellow>');
                    } else {
                        this.logger.log('Hello', title);
                    }
                }
            }
        </textarea>
        
        <textarea codeHighlight>
            $./app.ts test "beautiful world" --color
            Colored: Hello beautiful world
        </textarea>

        <p>
            All flags are per default required. That means that the command above would throw an error when you omit the <code>--color</code> flag.
            To make it optional, you can either using <code>@flag.optional</code> with a default value:
        </p>
        
        <textarea codeHighlight>
            @flag.optional color: boolean = false
        </textarea>
        
        <p>
            Or you use <code>@flag.default(value)</code>:
        </p>
        
        <textarea codeHighlight>
            @flag.default(false) color: boolean
        </textarea>

        <p>
            Data from your terminal is deserialized using Deepkit Type, which has a simple type conversion built-in.
            That means that numbers will be converted automatically. 
        </p>

        <textarea codeHighlight>
            async execute(
                @flag sinceYear: number,
            ) {
                console.log(typeof sinceYear, sinceYear);
            }
        </textarea>

        <textarea codeHighlight>
            $ ./app.ts test --sinceYear 2016
            number 2016
        </textarea>
        
        <h3>Decorators</h3>
        
        <p>
            All decorators of the same type can be chained together. For example <code>@arg.optional.description('text')</code>
            or <code>@flag.optional.multiple.description('text')</code>
        </p>
        
        <table class="pretty">
            <tr>
                <th>Name</th>
                <th>Description</th>
            </tr>
            <tr>
                <td>@arg</td>
                <td>Register the parameter as argument</td>
            </tr>
            <tr>
                <td>@arg.optional</td>
                <td>Register the parameter as optional argument</td>
            </tr>
            <tr>
                <td>@arg.description(string)</td>
                <td>Sets the description of a argument</td>
            </tr>
            <tr>
                <td>@arg.default(any)</td>
                <td>Sets the a default value for a argument</td>
            </tr>
            <tr>
                <td>@flag</td>
                <td>Register the parameter as flag</td>
            </tr>
            <tr>
                <td>@flag.char(string)</td>
                <td>Enables a short character for that flag</td>
            </tr>
            <tr>
                <td>@flag.hidden</td>
                <td>Hides the flag from the --help page</td>
            </tr>
            <tr>
                <td>@flag.optional</td>
                <td>Register the parameter as optional flag</td>
            </tr>
            <tr>
                <td>@flag.description(string)</td>
                <td>Sets the description of a flag</td>
            </tr>
            <tr>
                <td>@flag.default(any)</td>
                <td>Sets the a default value for a flag</td>
            </tr>
        </table>
        
        <h3>Validation</h3>
        
        <p>
            Arguments and flags will be deserialized using Deepkit Type. You can add additional validators to each parameter
            using <code>@t</code>.
        </p>
        
        <textarea codeHighlight>
            import { t } from '@deepkit/type';

            @cli.controller('test')
            export class TestCommand implements Command {
                async execute(
                    @flag @t.positive() sinceYear: number,
                ) {
                    console.log(typeof sinceYear, sinceYear);
                }
            }
        </textarea>
        
        <textarea codeHighlight>
            $ ./app.ts test --sinceYear -2016
            Validation error in sinceYear: Number needs to be positive [positive]
        </textarea>
        
        <h3>Exit code</h3>
        
        <p>
            The exit code is per default 0 indicating the command executed successfully. To change the exit code you
            should return a non-0 number in the <code>exucute</code> method.
        </p>

        <textarea codeHighlight>
            @cli.controller('test')
            export class TestCommand implements Command {
                async execute() {
                    console.error('Error :(');
                    return 12;
                }
            }
        </textarea>

        <textarea codeHighlight>
            $ ./app.ts
            Error :(
            $ echo $?
            12
        </textarea>
    `
})
export class DocFrameworkCLIComponent {
}
