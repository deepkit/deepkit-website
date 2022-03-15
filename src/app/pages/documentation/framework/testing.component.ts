import { Component } from '@angular/core';

@Component({
    template: `
        <div class="subline">Framework</div>

        <h2>Testing</h2>

        <p>
            Services and controllers in Deepkit Framework are designed in a way that advocates SOLID and clean code
            that is well designed, encapsulated, and separated. This properties make such code easy to test.
        </p>

        <p>
            This documentation shows you how to setup a test framework called
            <a target="_blank" href="https://jestjs.io/">Jest</a> with <i>ts-jest</i>. To do so run following command
            to install jest and ts-jest.
        </p>
        
        <textarea codeHighlight="bash">
            npm install jest ts-jest @types/jest
        </textarea>
        
        <p>
            Jest needs a few configuration options to know where to find your test suits and how to compile TS code.
            Add following config to your <code>package.json</code> 
        </p>
        
        <textarea codeHighlight="json" title="package.json">
            {
              ...,

              "jest": {
                "transform": {
                  "^.+\\\\.(ts|tsx)$": "ts-jest"
                },
                "testEnvironment": "node",
                "resolver": "@deepkit/framework/resolve",
                "testMatch": [
                  "**/*.spec.ts"
                ]
              }
            }
        </textarea>
        
        <p>
            Your tests files should be named <code>*.spec.ts</code>. Create a file <code>test.spec.ts</code> with following content.
        </p>
        
        <textarea codeHighlight title="test.spec.ts">
            test('first test', () => {
                expect(1 + 1).toBe(2);
            });
        </textarea>
        
        <p>
            You can now run all your test suits at once using the jest command.
        </p>
        
        <textarea codeHighlight="bash">
            $ node_modules/.bin/jest
             PASS  ./test.spec.ts
              ✓ first test (1 ms)
            
            Test Suites: 1 passed, 1 total
            Tests:       1 passed, 1 total
            Snapshots:   0 total
            Time:        0.23 s, estimated 1 s
            Ran all test suites.
        </textarea>
        
        <p>
            Please read the <a target="_blank" href="https://jestjs.io/">Jest documentation</a>
            to learn more how the jest CLI tool work and how you can write more sophisticated tests and whole test suits.
        </p>

        <h3>Unit tests</h3>

        <p>
            Whenever possible try to unit test your services. The easier, better separated, and more well defined your service dependencies
            are the easier is it to unit test them. In this case you can write simple tests like the following:
        </p>

        <textarea codeHighlight title="my-service.ts">
            export class MyService {
                helloWorld() {
                    return 'hello world';
                }   
            }
        </textarea>

        <textarea codeHighlight title="my-service.spec.ts">
            import { MyService } from './my-service.ts';
            
            test('hello world', () => {
                const myService = new MyService();
                expect(myService.helloWorld()).toBe('hello world');
            });
        </textarea>



        <h3>Integration tests</h3>
        
        <p>
            Its not always possible to write unit test nor is it always the most efficient way to cover business critical code and behavior.
            Especially if your architecture is very complex it comes in handy if you can run end-to-end integration tests easily. 
        </p>
        
        <p>
            As you already learned in the dependency injection chapter, the dependency injection container is the heart of Deepkit.
            Its were all services are constructed and live. Your application defines services (providers), controllers, listeners, and
            imports. In integration tests you don't necessarily want to have them all available in a test case, however you usually want
            a lighter version of that application available to test the critical sections.
        </p>
        
        <textarea codeHighlight title="test.spec.ts">
            import { createTestingApp } from '@deepkit/framework';
            import { http, HttpRequest } from '@deepkit/http';
            
            test('http controller', async () => {
                @http.controller()
                class MyController {
            
                    @http.GET()
                    hello(@http.query() text: string) {
                        return 'hello ' + text;
                    }
                }
            
                const testing = createTestingApp({ controllers: [MyController] });
                await testing.startServer();
            
                const response = await testing.request(HttpRequest.GET('/').query({text: 'world'}));
            
                expect(response.getHeader('content-type')).toBe('text/plain; charset=utf-8');
                expect(response.body.toString()).toBe('hello world');
            });
        </textarea>
        
        <textarea codeHighlight title="test.spec.ts">
            import { createTestingApp } from '@deepkit/framework';
            
            test('service', async () => {
                class MyService {
                    helloWorld() {
                        return 'hello world';
                    }
                }
            
                const testing = createTestingApp({ providers: [MyService] });
            
                //access the dependency injection container and instantiate MyService
                const myService = testing.app.get(MyService);
            
                expect(myService.helloWorld()).toBe('hello world');
            });
        </textarea>
        
        <p>
            When you separated your application in multiple modules, you can easier test them. For example, lets assume you have a
            AppCoreModule created and want to test some services.
        </p>


        <textarea codeHighlight title="core.ts">
            class Config {
                items: number = 10;
            }
            
            export class MyService {
                constructor(protected items: Config['items']) {
            
                }
            
                doIt(): boolean {
                    //do something
                    return true;
                }
            }
            
            export AppCoreModule = new AppModule({
                config: config,
                provides: [MyService]
            }, 'core');
        </textarea>

        <p>
            You use your module like this:
        </p>
        
        <textarea codeHighlight title="app.ts">
            import { AppCoreModule } from './app-core.ts';
            
            new App({
                imports: [new AppCoreModule]
            }).run();
        </textarea>
        
        <p>
            And test it without bootstrapping the whole application server like that.
        </p>

        <textarea codeHighlight title="core.spec.ts">
            import { createTestingApp } from '@deepkit/framework';
            import { AppCoreModule, MyService } from './app-core.ts';
            
            test('service simple', async () => {
                const testing = createTestingApp({ imports: [new AppCoreModule] });

                const myService = testing.app.get(MyService);
                expect(myService.doIt()).toBe(true);
            });
            
            test('service simple big', async () => {
                // you change configurations of your module for specific test scenarios
                const testing = createTestingApp({ 
                    imports: [new AppCoreModule({items: 100})]
                });

                const myService = testing.app.get(MyService);
                expect(myService.doIt()).toBe(true);
            });
        </textarea>
    `
})
export class DocFrameworkTestingComponent {
}
