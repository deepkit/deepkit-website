import { Component } from '@angular/core';

@Component({
    template: `
        <div class="subline">Framework</div>
        <h2>Logger</h2>

        <p>
           Deepkit Logger is a standalone library with one primary class <code>Logger</code> that you can use to log information. 
            This class is automatically provided in the dependency injection container in your Deepkit Framework application. 
        </p>

        <p>
            The Logger class has several logging methods, each behaving like <code>console.log</code>.
        </p>
        
        <table class="pretty">
            <tr>
                <td>Name</td>
                <td>Log level</td>
                <td>Level id</td>
            </tr>
            <tr>
                <td><code>logger.error()</code></td>
                <td>Error</td>
                <td>1</td>
            </tr>
            <tr>
                <td><code>logger.warning()</code></td>
                <td>Warning</td>
                <td>2</td>
            </tr>
            <tr>
                <td><code>logger.log()</code></td>
                <td>Default log</td>
                <td>3</td>
            </tr>
            <tr>
                <td><code>logger.info()</code></td>
                <td>Special information</td>
                <td>4</td>
            </tr>
            <tr>
                <td><code>logger.debug()</code></td>
                <td>Debug information</td>
                <td>5</td>
            </tr>
        </table>
        
        <p>
            Per default a Logger has a level of "info", which means it only handles info messages and below (thus log, warning, error, but not debug).
            To change the log level, call for example <code>logger.level = 5</code>.
        </p>


        <h4>Use in application</h4>
        
        <p>
            To use the logger in your Deepkit Framework application, you can simply inject <code>Logger</code> in your services or controllers.
        </p>
        
        <textarea codeHighlight>
            import { Logger } from '@deepkit/logger';
            import { injectable } from '@deepkit/injector';
            
            @injectable()
            class MyService {
                constructor(protected logger: Logger) {}
            
                doSomething() {
                    const value = 'yes';
                    this.logger.log('This is wild', value); 
                }
            }
        </textarea>

        <h4>Colors</h4>

        <p>
            The logger supports colored log messages. You can provide colors by using XML tags surrounding the text that should be in color.
        </p>

        <textarea codeHighlight>
            const username = 'Peter';
            logger.log(\`Hi <green>\${username}</green>\`);
        </textarea>

        <p>
            For transporters that don't support colors, the color information is automatically removed.
            In the default transporter (ConsoleTransport) the color is displayed.
            Following colors are available:

            <code>black</code>,
            <code>red</code>,
            <code>green</code>,
            <code>blue</code>,
            <code>cyan</code>,
            <code>magenta</code>,
            <code>white</code>, and
            <code>grey/gray</code>.
        </p>

        <h4>Transporter</h4>
        
        <p>
            You can configure a single or multiple transporter. In a Deepkit Framework application the transporter <code>ConsoleTransport</code>
            is automatically configured. To configure additional transporters, you can use compiler passes:
        </p>
        
        <textarea codeHighlight>
            import { Logger } from '@deepkit/logger';
            
            new Application({})
                .setup((module, config) => {
                    module.setupProvider(Logger).addTransport(new MyTransport);
                })
                .run();
        </textarea>
        
        <p>
            To replace all transporters with a new set of transporter, use set
        </p>

        <textarea codeHighlight>
            import { Logger, LoggerTransport } from '@deepkit/logger';
            
            export class MyTransport implements LoggerTransport {
                write(message: string, level: LoggerLevel, rawMessage: string) {
                    process.stdout.write(JSON.stringify({message: rawMessage, level, time: new Date}) + '\\n');
                }
            
                supportsColor() {
                    return false;
                }
            }
            
            new Application({})
                .setup((module, config) => {
                    module.setupProvider(Logger).setTransport([new MyTransport]);
                })
                .run();
        </textarea>
        
        <h4>JSON Transport</h4>
        
        <p>
            To change the output to JSON logs, you can use the included JSONTransport.
        </p>

        <textarea codeHighlight>
            import { Logger, JSONTransport } from '@deepkit/logger';
            
            new Application({})
                .setup((module, config) => {
                    module.setupProvider(Logger).setTransport([new JSONTransport]);
                })
                .run();
        </textarea>
        
        <h4>Formatter</h4>
        
        <p>
            Formatter allow you to change the message format, like for example adding the timestamp as string.
            When an application starts via <code>server:start</code>, a <code>DefaultFormatter</code> is automatically
            added (that adds timestamp, scope, and log level) when no other formatter is present.
        </p>

        <h4>Scoped Logger</h4>
        
        <p>
            Scoped logger add an arbitrary scope name to each log entry, that can be helpful to see from which sub section
            for your application the log entry comes from.
        </p>


        <textarea codeHighlight>
            const scopedLogger = logger.scoped('database');
            scopedLogger.log('Query', query);
        </textarea> 

        <h4>Context Data</h4>
        
        <p>
            To add context data to a log entry, use as last argument an plain object literal. 
            Only log calls with at least two arguments can have context data.  
        </p>

        <textarea codeHighlight>
            const query = 'SELECT *';
            const user = new User;
            logger.log('Query', {query, user}); //last argument is context data
            logger.log('Another', 'wild log entry', query, {user}); //last argument is context data
            
            logger.log({query, user}); //this is not handled as context data.
        </textarea>
    `
})
export class DocFrameworkLoggerComponent {

}
