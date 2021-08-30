import { Component } from '@angular/core';

@Component({
    template: `
        <div class="subline">Framework</div>

        <h2>RPC controller</h2>

        <p>
            A rpc controller is one of three entry points to your application. A rpc controller defines RPC actions using TypeScript
            classes and decorators. RPC controllers are based on the standalone package <a routerLink="/library/rpc">Deepkit RPC</a>.
        </p>

        <p>
            This chapter should demonstrate the basic usage of Deepkit RPC within the Deepkit Framework. All other details can be found in
            the documentation of <a routerLink="/documentation/rpc">Deepkit RPC</a> itself.
        </p>

        <p>
            A very simple implementation of a RPC controller looks like the following. You define a class, decorate it with RPC decorators,
            and register the class as controller in your application. Deepkit Framework automatically creates a Deepkit RPC kernel 
            inside your application once it is started using <code>server:start</code> based on WebSockets. 
            Its kernel is automatically configured to use the dependency injection container of your application for controllers and security implementations, 
            as well as the message broker of your application.
        </p>
        
        <textarea codeHighlight title="app.ts">
            #!/usr/bin/env ts-node-script
            import 'reflect-metadata';
            import { App } from '@deepkit/app';
            import { FrameworkModule } from '@deepkit/framework';
            import { rpc } from '@deepkit/rpc';
            import { MyRPCInterface } from './my-rpc';
            
            @rpc.controller(MyRPCInterface)
            class MyRpcController implements MyRPCInterface {
            
                @rpc.action()
                helloWorld(): string {
                    return 'Hello World!';
                }
            }
            
            new App({
                controllers: [MyRpcController],
                imports: [new FrameworkModule]
            }).run();
        </textarea>

        <textarea codeHighlight title="my-rpc.ts">
            import { ControllerSymbol } from '@deepkit/rpc';

            export const MyRPCInterface = ControllerSymbol<MyRPCInterface>('my-rpc', []);
            export interface MyRPCInterface {
                helloWorld(): string;
            }
        </textarea>

        <p>
            RPC controllers are handled and instantiated by the dependency injection container, like services and event listeners, and have thus access
            to all other registered services.
            See the chapter <a routerLink="/documentation/framework/dependency-injection">Dependency injection</a> for more details.
        </p>

        <p>
            You can execute that script directly with <code>ts-node</code>.
        </p>

        <textarea codeHighlight="bash">
            $ ts-node app.ts server:start
            2021-06-11T22:45:05.467Z [LOG] Start HTTP server, using 1 workers.
            2021-06-11T22:45:05.472Z [LOG] RPC MyRpcController my-rpc
            2021-06-11T22:45:05.472Z [LOG] HTTP listening at http://localhost:8080/
        </textarea>

        <p>
            To execute the action <code>helloWorld()</code>, you need to instantiate a RPC client object and connect to the server.
        </p>

        <textarea codeHighlight title="client.ts">
            #!/usr/bin/env ts-node-script
            import 'reflect-metadata';
            import { DeepkitClient } from '@deepkit/rpc';
            import { MyRPCInterface } from './my-rpc';
            
            async function main() {
                const client = new DeepkitClient('ws://localhost:8080');
            
                const myRpcController = client.controller(MyRPCInterface);
            
                console.log(await myRpcController.helloWorld());
            
                client.disconnect();
            }
            
            main();
        </textarea>

        <p>
            You can execute the client via <code>ts-node</code>.
        </p>

        <textarea codeHighlight="bash">
            $ ts-node client.ts
            Hello World!
        </textarea>

        <p>
            Please read the chapter <a routerLink="/documentation/framework/rpc/client">RPC Client</a> for more information about
            the client side.
        </p>

        <p>
            Please read the chapter <a routerLink="/documentation/rpc">Deepkit RPC</a> for more information about
            the how Deepkit RPC works in detail, how RPC actions can be decorated, streams established, entity shared, and much more.
        </p>

        <h3>Interface and model sharing</h3>

        <p>
            One of the biggest advantages of Deepkit RPC is that it allows you to share the interface of your controller with the client
            making everything perfectly typesafe. Since data is automatically serialized and validated based on the definition and schemas
            used in the action, you have only one source of truth of your API.
        </p>
        
        <p>
            If you have a frontend like Angular or React or anything other SPA-like, you should move the interfaces and all models used between frontend and your server
            into a own package or folder. Both frontend and server then imports from that place.
        </p>
        
        <p>
            If you have several applications that need to communicate between each other (like many micro-services), you could do the same
            by putting all interfaces and models in a package that can be imported by those applications.
        </p>

        <h3>TCP</h3>

        <p>
            Per default, all RPC controllers in your Deepkit Framework application are using the started HTTP server using Websockets
            as transport protocol. You can also start a Deepkit RPC server via TCP (or any other transport protocol). 
            <code>@deepkit/rpc-tcp</code> provides a connection adapter for TCP based on Node's <code>net</code> 
            and a faster TCP implementation using turbo-tcp.
        </p>
        
        <p>
            To start the RPC TCP server you should use a new listener and start it on main server bootstrap.
        </p>

        <textarea codeHighlight title="client.ts">
            #!/usr/bin/env ts-node-script
            import 'reflect-metadata';
            import { App } from '@deepkit/app';
            import { FrameworkModule, onServerMainBootstrap, onServerMainShutdown, WebWorkerFactory } from '@deepkit/framework';
            import { injectable } from '@deepkit/injector';
            import { TcpRpcServer } from '@deepkit/rpc-tcp';
            import { eventDispatcher } from '@deepkit/event';
            import { Logger } from '@deepkit/logger';
            
            @injectable
            class RpcTcpBootstrap {
                server?: TcpRpcServer;
            
                constructor(
                    protected workerFactory: WebWorkerFactory,
                    protected logger: Logger,
                ) {
                }
            
                @eventDispatcher.listen(onServerMainBootstrap)
                bootstrap() {
                    const host = 'localhost:8081';
                    this.server = new TcpRpcServer(this.workerFactory.createRpcKernel(), host);
                    this.server.start();
                    this.logger.log('RPC TCP server listens on', host);
                }
            
                @eventDispatcher.listen(onServerMainShutdown)
                shutdown() {
                    if (this.server) this.server.close();
                }
            }
            
            new App({
                listeners: [RpcTcpBootstrap],
                imports: [new FrameworkModule]
            })
                .run();
        </textarea>
    `
})
export class DocFrameworkRPCControllerComponent {
}
