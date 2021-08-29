import { Component } from '@angular/core';

@Component({
    template: `
        <div class="subline">Framework</div>

        <h2>HTTP Middleware</h2>

        <p>
            HTTP middlewares allow you to hook into the request/response cycle as an alternative to
            <a routerLink="/documentation/framework/http/events">HTTP events</a>. Its API allows
            you to use all middlewares from the Express/Connect framework.
        </p>

        <h3>Middleware</h3>

        <p>
            A middleware can either be a class (which is instantiated by the dependency injection container)
            or a simple function.
        </p>

        <textarea codeHighlight>
            import { HttpMiddleware, httpMiddleware, HttpRequest, HttpResponse } from '@deepkit/http';

            class MyMiddleware implements HttpMiddleware {
                async execute(request: HttpRequest, response: HttpResponse, next: (err?: any) => void) {
                    response.setHeader('middleware', '1');
                    next();
                }
            }
            
            function myMiddlewareFunction(request: HttpRequest, response: HttpResponse, next: (err?: any) => void) {
                response.setHeader('middleware', '1');
                next();
            }
            
            new App({
                providers: [MyMiddleware],
                middlewares: [
                    httpMiddleware.for(MyMiddleware),
                    httpMiddleware.for(myMiddlewareFunction),
                ],
                imports: [new FrameworkModule]
            }).run();
        </textarea>

        <h3>Global</h3>

        <p>
            By using <code>httpMiddleware.for(MyMiddleware)</code> a middleware is registered for all routes, globally.
        </p>

        <textarea codeHighlight>
            import { httpMiddleware } from '@deepkit/http';

            new App({
                providers: [MyMiddleware],
                middlewares: [
                    httpMiddleware.for(MyMiddleware)
                ],
                imports: [new FrameworkModule]
            }).run();
        </textarea>

        <h3>Per Controller</h3>

        <p>
            You can limit middlewares to one or multiple controllers in two ways.
            Either by using the <code>@http.controller</code> or <code>httpMiddleware.for(T).forControllers()</code>.
            <code>excludeControllers</code> allow you to exclude controllers.
        </p>

        <textarea codeHighlight>
            @http.controller().middleware(MyMiddleware)
            class MyFirstController {
                
            }
        </textarea>

        <textarea codeHighlight>
            new App({
                providers: [MyMiddleware],
                controllers: [MainController, UsersCommand],
                middlewares: [
                    httpMiddleware.for(MyMiddleware).forControllers(MyFirstController, MySecondController)
                ],
                imports: [new FrameworkModule]
            }).run();
        </textarea>

        <h3>Per Route Name</h3>

        <p>
            <code>forRouteNames</code> along with its counterpart <code>excludeRouteNames</code> allow you to filter
            the execution of a middleware per route names.
        </p>

        <textarea codeHighlight>
            @http.controller()
            class MyFirstController {
                @http.GET('/hello').name('firstRoute')
                myAction() {
                }
            
                @http.GET('/second').name('secondRoute')
                myAction2() {
                }
            }
        </textarea>

        <textarea codeHighlight>
            new App({
                controllers: [MainController, UsersCommand],
                providers: [MyMiddleware],
                middlewares: [
                    httpMiddleware.for(MyMiddleware).forRouteNames('firstRoute', 'secondRoute')
                ],
                imports: [new FrameworkModule]
            }).run();
        </textarea>


        <h3>Per Action/Route</h3>

        <p>
            To execute a middleware only for a certain route, you can either use <code>@http.GET().middleware()</code>
            or <code>httpMiddleware.for(T).forRoute()</code> where <code>forRoute</code> has multiple options to filter routes.
        </p>

        <textarea codeHighlight>
            @http.controller()
            class MyFirstController {
                @http.GET('/hello').middleware(MyMiddleware)
                myAction() {
                }
            }
        </textarea>

        <textarea codeHighlight>
            new App({
                controllers: [MainController, UsersCommand],
                providers: [MyMiddleware],
                middlewares: [
                    httpMiddleware.for(MyMiddleware).forRoutes({
                        path: 'api/*'
                    })
                ],
                imports: [new FrameworkModule]
            }).run();
        </textarea>

        <p><code>forRoutes()</code> allows as first argument several way to filter for routes.</p>

        <textarea codeHighlight>
            {
                path?: string;
                pathRegExp?: RegExp;
                httpMethod?: 'GET' | 'HEAD' | 'POST' | 'PATCH' | 'PUT' | 'DELETE' | 'OPTIONS' | 'TRACE';
                category?: string;
                excludeCategory?: string;
                group?: string;
                excludeGroup?: string;
            }
        </textarea>

        <h4>Path Pattern</h4>

        <p><code>path</code> supports wildcard <code>*</code>.</p>

        <textarea codeHighlight>
            httpMiddleware.for(MyMiddleware).forRoutes({
                path: 'api/*'
            })
        </textarea>

        <h4>RegExp</h4>

        <textarea codeHighlight>
            httpMiddleware.for(MyMiddleware).forRoutes({
                pathRegExp: /'api\/.*'/
            })
        </textarea>

        <h4>HTTP Method</h4>

        <p>
            Filter all routes by a HTTP method.
        </p>

        <textarea codeHighlight>
            httpMiddleware.for(MyMiddleware).forRoutes({
                httpMethod: 'GET'
            })
        </textarea>

        <h4>Category</h4>

        <p>
            <code>category</code> along with its counterpart <code>excludeCategory</code> allow you to filter per route category.
        </p>

        <textarea codeHighlight>
            @http.controller().category('myCategory')
            class MyFirstController {
                
            }
            
            @http.controller()
            class MySecondController {
                @http.GET().category('myCategory')
                myAction() {
                }
            }
        </textarea>

        <textarea codeHighlight>
            httpMiddleware.for(MyMiddleware).forRoutes({
                category: 'myCategory'
            })
        </textarea>

        <h4>Group</h4>

        <p>
            <code>group</code> along with its counterpart <code>excludeGroup</code> allow you to filter per route group.
        </p>

        <textarea codeHighlight>
            @http.controller().group('myGroup')
            class MyFirstController {
                
            }
            
            @http.controller()
            class MySecondController {
                @http.GET().group('myGroup')
                myAction() {
                }
            }
        </textarea>

        <textarea codeHighlight>
            httpMiddleware.for(MyMiddleware).forRoutes({
                group: 'myGroup'
            })
        </textarea>


        <h3>Per Modules</h3>

        <p>
            You can limit the execution of a module for a whole module.
        </p>

        <textarea codeHighlight>
            httpMiddleware.for(MyMiddleware).forModule(ApiModule)
        </textarea>

        <h3>Per Self Modules</h3>

        <p>
            To execute a middleware for all controllers/routes of a module where the middleware was registered use
            <code>forSelfModules()</code>.
        </p>

        <textarea codeHighlight>
            const ApiModule new AppModule({
                controllers: [MainController, UsersCommand],
                providers: [MyMiddleware],
                middlewares: [
                    //for all controllers registered of the same module
                    httpMiddleware.for(MyMiddleware).forSelfModules(),
                ],
            });
        </textarea>

        <h3>Timeout</h3>

        <p>
            All middleware needs to execute <code>next()</code> sooner or later. If a middleware does not execute next() withing a timeout,
            a warning is logged and the next middleware executed.
            To change the default of 4seconds to something else use <code>timeout(milliseconds)</code>.
        </p>

        <textarea codeHighlight>
            const ApiModule = new AppModule({
                controllers: [MainController, UsersCommand],
                providers: [MyMiddleware],
                middlewares: [
                    //for all controllers registered of the same module
                    httpMiddleware.for(MyMiddleware).timeout(15_000),
                ],
            });
        </textarea>

        <h3>Multiple Rules</h3>

        <p>
            To combine multiple filters, you can chain method calls.
        </p>

        <textarea codeHighlight>
            const ApiModule = new AppModule({
                controllers: [MyController],
                providers: [MyMiddleware],
                middlewares: [
                    httpMiddleware.for(MyMiddleware).forControllers(MyController).excludeRouteNames('secondRoute')
                ],
            });
        </textarea>

        <h3>Express Middleware</h3>

        <p>
            All express middlewares are supported.
        </p>

        <textarea codeHighlight>
            import * as compression from 'compression';
            
            const ApiModule = new AppModule({
                middlewares: [
                    httpMiddleware.for(compress()).forControllers(MyController)
                ],
            });
        </textarea>
    `
})
export class DocFrameworkHttpMiddlewareComponent {
}
