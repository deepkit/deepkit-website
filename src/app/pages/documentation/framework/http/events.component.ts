import { Component } from '@angular/core';

@Component({
    template: `
        <div class="subline">Framework</div>

        <h2>HTTP events</h2>

        <p>
            The HTTP kernel is based on the workflow engine that provides several event tokens you can use to
            hook into the whole request handling process.
        </p>
        
        <image src="/assets/documentation/framework/http-workflow.png"></image>
        
        <h3>Event tokens</h3>

        <p>
            Each even token has its own event type. See its typings to learn more about what
            data you have available.
        </p>

        <table class="pretty">
            <tr>
                <td>Token</td>
                <td>Description</td>
            </tr>
            <tr>
                <td>httpWorkflow.onRequest</td>
                <td>When a new request comes in</td>
            </tr>
            <tr>
                <td>httpWorkflow.onRoute</td>
                <td>When the route should be resolved from the request</td>
            </tr>
            <tr>
                <td>httpWorkflow.onRouteNotFound</td>
                <td>When the route is not found</td>
            </tr>
            <tr>
                <td>httpWorkflow.onAuth</td>
                <td>When authentication happens</td>
            </tr>
            <tr>
                <td>httpWorkflow.onResolveParameters</td>
                <td>When route parameters are resolved</td>
            </tr>
            <tr>
                <td>httpWorkflow.onAccessDenied</td>
                <td>When access is denied</td>
            </tr>
            <tr>
                <td>httpWorkflow.onController</td>
                <td>When the controller action is called</td>
            </tr>
            <tr>
                <td>httpWorkflow.onControllerError</td>
                <td>When the controller action threw an error</td>
            </tr>
            <tr>
                <td>httpWorkflow.onParametersFailed</td>
                <td>When route parameters resolving failed</td>
            </tr>
            <tr>
                <td>httpWorkflow.onResponse</td>
                <td>When the controller action has been called. This is the place where the result is converted to a response.</td>
            </tr>
        </table>
        
        <p>
            Since all HTTP events are based on the workflow engine, you can change its behavior by using the given event and its <code>next</code> method.
        </p>
            
        <p>
            The HTTP kernel uses its own events to implement request handling. 
            All those HTTP event listeners have a priority of 100, which means when you listen to an event, by default
            your listener runs first (since default priority is 0). Add a priority of over 100 to run after
            the HTTP kernel's listeners.
        </p>
        
        <p>
            For example, let's say you want to intercept the event where a controller is called.
            When a certain controller should be called, we check whether the user has access to it.
            If the user has access, we continue. If not, we jump to the next workflow state <i>accessDenied</i>. 
        </p>
        
        <textarea codeHighlight>
            #!/usr/bin/env ts-node-script
            import { App } from '@deepkit/app';
            import { FrameworkModule } from '@deepkit/framework';
            import { HtmlResponse, http, httpWorkflow } from '@deepkit/http';
            import { eventDispatcher } from '@deepkit/event';
            
            @http.controller()
            class MyWebsite {
                @http.GET('/')
                open() {
                    return 'Welcome';
                }
            
                @http.GET('/admin').group('secret')
                secret() {
                    return 'Welcome to the dark side';
                }
            }
            
            class SecretRouteListeners {
                @eventDispatcher.listen(httpWorkflow.onController)
                onController(event: typeof httpWorkflow.onController.event) {
                    if (event.route.groups.includes('secret')) {
                        //check here for authentication information like cookie session, JWT, etc.

                        //this jumps to the 'accessDenied' workflow state,
                        // essentially executing all onAccessDenied listeners.

                        //since our listener is called before the HTTP kernel one,
                        // the controller action will never be called.
                        event.accessDenied();
                    }
                }
            
                /**
                 * We change the default accessDenied implementation.
                 */
                @eventDispatcher.listen(httpWorkflow.onAccessDenied)
                onAccessDenied(event: typeof httpWorkflow.onAccessDenied.event): void {
                    if (event.sent) return;
                    if (event.hasNext()) return;
            
                    event.send(new HtmlResponse('No access to this area.', 403));
                }
            }
            
            new App({
                controllers: [MyWebsite],
                listeners: [SecretRouteListeners],
                imports: [new FrameworkModule]
            }).run();
        </textarea>

        <textarea codeHighlight="bash">
            $ curl http://localhost:8080/
            Welcome
            $ curl http://localhost:8080/admin
            No access to this area
        </textarea>
        
        <h3>Example</h3>
        
        <p>
            An example event listener that changes the response of controller action looks like the following:
        </p>
        
        <textarea codeHighlight>
            #!/usr/bin/env ts-node-script
            import { App } from '@deepkit/app';
            import { FrameworkModule } from '@deepkit/framework';
            import { http, httpWorkflow } from '@deepkit/http';
            import { eventDispatcher } from '@deepkit/event';
            
            class User {
                constructor(
                    public username: string,
                    public id: number = 0,
                ) {
                }
            }

            @http.controller()
            class MyWebsite {
                @http.GET()
                getUser() {
                    return new User('User 1', 1);
                }
            }

            class UserResponseMapping {
                @eventDispatcher.listen(httpWorkflow.onResponse)
                onResponse(event: typeof httpWorkflow.onResponse.event) {
                    if (event.result instanceof User) {
                        event.result = event.result.username;
                    }
                }
            }
            
            new App({
                controllers: [MyWebsite],
                listeners: [UserResponseMapping],
                imports: [new FrameworkModule]
            })
                .run();
        </textarea>
    `
})
export class DocFrameworkHttpEventsComponent {
}
