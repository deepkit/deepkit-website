import { Component } from '@angular/core';

@Component({
    template: `
        <div class="subline">Framework</div>

        <h2>RPC Security</h2>

        <p>
            Per default all RPC actions are unsecured, which means everyone can access them. Exactly like HTTP routes.
            Deepkit RPC has a built-in authentication API that allows you to authenticate an user and to granularity define which
            user has access to an action.
        </p>

        <p>
            In this chapter is explained how you can setup the security layer of Deepkit RPC within your Deepkit Framework application
            and setup the client in order to be authenticated.
        </p>

        <p>
            Deepkit RPC uses a class called <code>RpcKernelSecurity</code> which is an allow-all implementation per default.
            To overwrite it, you have to register a new provider for that class with a new implementation.
        </p>

        <p>
            A full implementation of a security class that allows everything looks like following.
        </p>

        <textarea codeHighlight title="app.ts">
            #!/usr/bin/env ts-node-script
            import 'reflect-metadata';
            import { App } from '@deepkit/app';
            import { FrameworkModule } from '@deepkit/framework';
            import { rpc, RpcKernelSecurity, Session, RpcAction } from '@deepkit/rpc';
            import { MyRPCInterface } from './my-rpc';
            import { ClassType } from '@deepkit/core';
            
            @rpc.controller('my-rpc')
            class MyRpcController implements MyRPCInterface {
                @rpc.action()
                helloWorld(): string {
                    return 'Hello World!';
                }
            }
            
            export class MyRpcSession extends Session { }
            
            class MyRpcSecurity extends RpcKernelSecurity {
                async hasControllerAccess(session: Session, action: RpcAction): Promise<boolean> {
                    return true;
                }
            
                async isAllowedToRegisterAsPeer(session: Session, peerId: string): Promise<boolean> {
                    return false;
                }
            
                async isAllowedToSendToPeer(session: Session, peerId: string): Promise<boolean> {
                    return false;
                }
            
                async authenticate(token: any): Promise<MyRpcSession> {
                    throw new Error('Authentication not implemented');
                }
            }
            
            new App({
                providers: [
                    {provide: RpcKernelSecurity, useClass: MyRpcSecurity}
                ],
                controllers: [MyRpcController],
                imports: [new FrameworkModule]
            }).run();
        </textarea>

        <p>
            The line <code>{{"{"}}provide: RpcKernelSecurity, useClass: MyRpcSecurity{{"}"}}</code> is crucial. It tells the dependency
            injection container that whenever the class <code>RpcKernelSecurity</code> is requested it should take
            <code>MyRpcSecurity</code> instead.
        </p>

        <p>
            You can now implement each <code>is*()</code> method as you like. The returned session object in <code>authenticate</code>
            is used for the RPC connection and each call to the other methods.
        </p>

        <p>
            Note that <code>hasControllerAccess</code> is always
            called, even if the user is not authenticated. When the user is not authenticated there is still a session object, but not
            from your <code>MyRpcSession</code> type, but from <code>Session from '@deepkit/rpc'</code> type.
            The default implementation of @deepkit/rpc's <code>Session</code> looks like following.
        </p>

        <textarea codeHighlight title="@deepkit/rpc Session">
            export class Session {
                constructor(
                    public readonly username: string,
                    public readonly token: any,
                ) {
                }
            
                public isAnonymous(): boolean {
                    return undefined === this.token;
                }
            }
        </textarea>

        <p>
            For non-authenticated connections a <code>Session('anon', undefined)</code> is used.
        </p>

        <p>
            To enable only authenticated access, you can use its <code>isAnonymous</code> method.
            This doesn't differentiate between users though.
        </p>

        <textarea codeHighlight>
            class MyRpcSecurity extends RpcKernelSecurity> {
                async hasControllerAccess(session: Session, action: RpcAction): Promise<boolean> {
                    return !session.isAnonymous();
                }
            }
        </textarea>

        <h3>Authenticate</h3>

        <p>
            To authenticate a client needs to send a token. A token can be of any structure. It could be a JSON web token, a
            username/password object, or a API key. If you set the token on the client before any action was called, the initial connection
            and handshake of the connection includes an authentication process, which calls the <code>authenticate(token: any)</code>
            method of your security class. If it throws an error the connection is rejected with an access denied error.
        </p>

        <textarea codeHighlight title="client.ts">
            const client = new DeepkitClient('ws://localhost:8881');
            client.token.set({username: 'peter', password: 'secret'});
            
            //here do actions
        </textarea>

        <p>On the server side a security class implementation for that token could look like following.</p>

        <textarea codeHighlight title="app.ts">
            import { injectable } from '@deepkit/injector';
            import { rpc, RpcKernelSecurity } from '@deepkit/rpc';
            import { MyDatabase, User, hash } from './my-database.ts';
            
            @injectable
            class MyRpcSecurity extends RpcKernelSecurity {
                constructor(protected database: MyDatabase) {
                }
            
                async authenticate(token: any): Promise<MyRpcSession> {
                    const user = await this.database.query(User).filter({username: token.username}).findOne();
                    if (hash(token.password) === user.password) {
                        return new MyRpcSession(token.username, token);
                    }
            
                    throw new Error('Access denied');
                }
            }
        </textarea>

        <p>
            If you authenticate tokens without username, you can simply use a static string like "API" something else that indicates the
            client at least a little bit.
        </p>

        <h3>Roles</h3>

        <p>
            Many security systems have a role based system. With Deepkit RPC you can specify on each action a group,
            which you can use then in the <code>hasControllerAccess</code> to check for access.
        </p>

        <p>
            First lets assign a group to a controller action. Its recommended to use enums here and put the roles in a central place
            so you don't work with magic strings (where typos can happen), but in our example we keep it simple for demonstration purposes.
            An action can be in multiple groups, but in this example only one is assigned.
        </p>

        <textarea codeHighlight title="app.ts">
            import { rpc } from '@deepkit/rpc';
            
            @rpc.controller('my-rpc')
            class MyRpcController implements MyRPCInterface {
                @rpc.action().group('a')
                helloWorld(): string {
                    return 'Hello World!';
                }
            }
        </textarea>

        <p>
            You should extend our session object so that each session has a group. This group can be set to the
            value of a user's group for example during authentication. In the <code>hasControllerAccess</code>
            you use the data from the action itself and simply check whether the user/session has a group
            that is also defined in the action itself.
        </p>

        <textarea codeHighlight title="app.ts">
            export class MyRpcSession extends Session {
                group: string = '';
            }

            class MyRpcSecurity extends RpcKernelSecurity {
                constructor(protected database: MyDatabase) {
                }
            
                async hasControllerAccess(session: Session, action: RpcAction): Promise<boolean> {
                    return action.groups.includes(session.group);
                }
            
                async authenticate(token: any): Promise<MyRpcSession> {
                    const user = await this.database.query(User).filter({username: token.username}).findOne();
                    if (hash(token.password) === user.password) {
                        const session = new MyRpcSession(token.username, token);
                        session.group = user.group;
                        return session;
                    }
            
                    throw new Error('Access denied');
                }
            }
        </textarea>

        <h3>Peer access</h3>

        <p>
            There are two other methods that are important to understand: <code>isAllowedToRegisterAsPeer</code> and <code>isAllowedToSendToPeer</code>.
        </p>

        <p>
            A client can register a controller on the server under a peer id. This peer id is not verified beforehand automatically, so you
            need to make sure manually that in <code>isAllowedToRegisterAsPeer</code> a client is allowed to (overwrite) register a
            controller
            for a certain peer id. If you don't use this peer feature, you should return here always false.
        </p>

        <p>
            When a client can register a controller, another can consume this controller. Every time a client wants to execute an action
            on a peer controller the method <code>isAllowedToSendToPeer</code> is used.
            If you don't use this peer feature, you should return here always false.
        </p>

        <p>
            With both of these methods it is possible to specify in detail which peer can talk to which peer.
            A peer id is an arbitrary string, but using is as communication channel path can be the most useful. For example a peer id
            like <code>user/:id</code> or <code>microservice/:name</code> makes it obvious for what that channel is used for.
        </p>
    `
})
export class DocFrameworkRPCSecurityComponent {
}
