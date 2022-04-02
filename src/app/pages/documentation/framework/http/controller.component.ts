import { Component } from '@angular/core';

@Component({
    template: `
        <div class="subline">Framework</div>

        <h2>HTTP controller</h2>

        <p>
            An HTTP controller is one of three different types of entry points to your application. An HTTP controller defines HTTP routes using TypeScript
            classes and decorators.
        </p>

        <p>
            A very simple implementation of an HTTP controller looks like the following:
        </p>

        <textarea codeHighlight title="app.ts">
            #!/usr/bin/env ts-node-script
            import { App } from '@deepkit/app';
            import { FrameworkModule } from '@deepkit/framework';
            import { http } from '@deepkit/http';
            
            class MyPage {
                @http.GET('/')
                helloWorld() {
                    return "Hello World!";
                }
            }
            
            new App({
                controllers: [MyPage],
                imports: [new FrameworkModule]
            }).run();
        </textarea>

        <p>
            You can execute that script directly with <code>ts-node</code>.
        </p>

        <textarea codeHighlight="bash">
            $ ts-node app.ts server:start
            2021-06-11T17:44:52.646Z [LOG] Start HTTP server, using 1 workers.
            2021-06-11T17:44:52.649Z [LOG] HTTP MyPage
            2021-06-11T17:44:52.649Z [LOG]     GET / helloWorld
            2021-06-11T17:44:52.649Z [LOG] HTTP listening at http://localhost:8080/
        </textarea>

        <p>
            Request your first route with curl to see your returned string.
        </p>

        <textarea codeHighlight="bash">
            $ curl http://localhost:8080/
            Hello World!
        </textarea>

        <p>
            HTTP controllers are handled and instantiated by the dependency injection container, like services and event listeners, and thus have access
            to all other registered services.
            See the chapter <a routerLink="/documentation/framework/dependency-injection">Dependency injection</a> for more details.
        </p>

        <h3>Decorators</h3>

        <p>
            Each class needs at least the <code>@http.controller</code> decorator and each route at least one HTTP method decorator.
            Decorators on routes (methods) may be chained, for example:
        </p>

        <textarea codeHighlight>
            @http.GET('/user').name('users').description('Lists users')
            userList() {
            }
        </textarea>

        <table class="pretty">
            <tr>
                <th style="width:250px;">Decorator/Type</th>
                <th>Description</th>
            </tr>
            <tr>
                <td>@http.controller(string)</td>
                <td>Marks a class as controller with a baseUrl.</td>
            </tr>
            <tr>
                <td>@http.name(string)</td>
                <td>Assigns a unique name to this route.</td>
            </tr>
            <tr>
                <td>@http.GET(string)</td>
                <td>Marks a method as HTTP GET route with a path pattern.</td>
            </tr>
            <tr>
                <td>@http.POST(string)</td>
                <td>Marks a method as HTTP POST route with a path pattern.</td>
            </tr>
            <tr>
                <td>@http.PUT(string)</td>
                <td>Marks a method as HTTP PUT route with a path pattern.</td>
            </tr>
            <tr>
                <td>@http.DELETE(string)</td>
                <td>Marks a method as HTTP DELETE route with a path pattern.</td>
            </tr>
            <tr>
                <td>@http.ANY(string)</td>
                <td>Marks a method as any HTTP method route with a path pattern.</td>
            </tr>
            <tr>
                <td>@http.throws(ClassType, string)</td>
                <td>Annotates possible error classes that can be thrown by this class.</td>
            </tr>
            <tr>
                <td>@http.regexp(string, RegExp)</td>
                <td>Specifies the regular expression for a route parameter.</td>
            </tr>
            <tr>
                <td>@http.group(...string)</td>
                <td>Assigns this route to a specific group/s.</td>
            </tr>
            <tr>
                <td>@http.category(string)</td>
                <td>Assigns this route to a category.</td>
            </tr>
            <tr>
                <td>@http.data(string, any)</td>
                <td>Assigns arbitrary data to this route.</td>
            </tr>
            <tr>
                <td>@http.serialization()</td>
                <td>Assigns serialization options for the serialization process of @deepkit/type types.</td>
            </tr>
            <tr>
                <td>@http.serializer()</td>
                <td>Assigns a different serializer for the serialization process of @deepkit/type types. 
                    Default is <code>serializer</code></td>
            </tr>
            <tr>
                <td>@http.description(string)</td>
                <td>Assigns a description to this route that will be used in developer tooling</td>
            </tr>
            <tr>        
                <td>@http.use(Function)</td>
                <td>Allows to change the route object and composite multiple properties into one function.</td>
            </tr>
        </table>

        <h3>Types</h3>

        <table class="pretty">
            <tr>
                <td>HttpQuery</td>
                <td>Marks a route parameter as query parameter (so it is read from the query string).</td>
            </tr>
            <tr>
                <td>HttpQueries</td>
                <td>Marks a route parameter as a type of all query parameters (parsed query string as an object).</td>
            </tr>
            <tr>
                <td>HttpBody</td>
                <td>Marks a route parameter as body object (so the parsed body is passed)</td>
            </tr>
            <tr>
                <td>HttpBodyValidation</td>
                <td>Marks a route parameter as body object (so the parsed body is passed) with custom validation handling.</td>
            </tr>
        </table>
        
        <h4>A Note on Decorator Metadata</h4>

        <p>
            One of the powerful use cases for decorators is the ability to attach data to parts of your actual application code. This data can then be retrieved and further built upon later.
            By providing descriptive metadata to your controllers we can enable more powerful tooling like (eventual) OpenAPI support as well as deep integration with the Deepkit API Console GUI
        </p>

        <h3>Parameters</h3>

        <p>
            Routes can have arbitrary parameters. Path parameters are expressed in the route's path and query as well as body parameters in
            the method signature itself. Path parameter's name maps directly to method arguments with the same name.
        </p>

        
        <h4>Path parameters</h4>
        
        <textarea codeHighlight>
            class MyPage {
                @http.GET('/:text')
                helloWorld(text: string) {
                    return 'Hello ' + text;
                }
            }
        </textarea>

        <textarea codeHighlight="bash">
            $ curl http://localhost:8080/galaxy
            Hello galaxy
        </textarea>
        
        <p>
            You can modify how a path parameter is matched using <code>@http.regexp(name, regex)</code>.
        </p>

        <textarea codeHighlight>
            @http.GET('hello-world/:text').regexp('text', /a-zA-Z0-9/)
            helloWorld(text: string) {
                return 'Hello ' + text;
            }
        </textarea>
        
        <h4>Query parameters</h4>
        
        <textarea codeHighlight>
            import { HttpQuery } from '@deepkit/http';

            class MyPage {
                @http.GET('/')
                helloWorld(text: HttpQuery<string>) {
                    return 'Hello ' + text;
                }
            }
        </textarea>

        <textarea codeHighlight="bash">
            $ curl http://localhost:8080/\\?text\\=galaxy
            Hello galaxy
        </textarea>
        
        <p>
            Parameter types are automatically deserialized and validated. So you can add validators of @deepkit/type
            at your parameters.
        </p>

        <textarea codeHighlight>
            import { HttpQuery, MinLength } from '@deepkit/http';

            class MyPage {
                @http.GET('/')
                helloWorld(text: HttpQuery<string> & MinLength<3>) {
                    return 'Hello ' + text;
                }
            }
        </textarea>

        <textarea codeHighlight="bash">
            $ curl http://localhost:8080/\\?text\\=galaxy
            Hello galaxy
            $ curl http://localhost:8080/\\?text\\=ga
            error
        </textarea>

        <p>
            Warning: Parameter values are not escaped/sanitized. Returning them directly in a string opens a security hole (XSS).
            Make sure never to trust external input and filter/sanitize/convert where necessary.
        </p>
        
        <h4>Query parameters model</h4>
        
        <p>
            Instead of specifying each query parameter as a method parameter, you can use a type instead.
        </p>
        
        <textarea codeHighlight>
            class HelloWorldQuery {
                text!: string;
                page: number = 0;
            }
            
            class MyPage {
                @http.GET('/')
                helloWorld(query: HttpQueries<HelloWorldQuery>) {
                    return 'Hello ' + query.text + ' at page ' + query.page;
                }
            }
        </textarea>
        
        <h4>Body parameters</h4>
        
        <p>
            For <code>@http.POST</code> routes, you can specify a body schema that is automatically deserialized from the incoming HTTP body.
            The body content type needs to be either <code>application/x-www-form-urlencoded</code>, <code>multipart/form-data</code>,
            or <code>application/json</code>.
        </p>
        
        <textarea codeHighlight>
            class HelloWorldBody {
                text!: string;
            }
            
            class MyPage {
                @http.POST('/')
                helloWorld(body: HttpBody<HelloWorldBody>) {
                    return 'Hello ' + body.text;
                }
            }
        </textarea>
        
        <textarea codeHighlight="bash">
            $ curl http://localhost:8080/ -H "Content-Type: application/json" --data '{"text": "galaxy"}'
            Hello galaxy
        </textarea>
        
        <p>
            To react to body validation errors in the same route, you use <code>HttpBodyValidation</code>.
        </p>
        
        <textarea codeHighlight>
            @http.POST('hello-world')
            helloWorld(body: HttpBodyValidation<HelloWorldBody>) {
                if (!body.valid()) {
                    // Houston, we got some errors.
                    const textError = body.getErrorMessageForPath('text');
                    return 'Text is invalid, please fix it. ' + textError;
                }
        
                return 'Hello ' + body.text;
            }
        </textarea>
        
        <p>
            As soon as <code>valid()</code> returns false, the injected body representation <code>body</code> can be in a faulty state
            since the validation failed. When you don't use <code>HttpBodyValidation</code> and a faulty request comes in, the whole route would return an error
            and your route code would never execute. Use <code>HttpBodyValidation</code> only when you want to for example display error messages 
            regarding the body manually in the same route.
        </p>

        <p>
            To accept uploaded files from HTML forms for example, you should use <code>UploadedFile</code>. 
        </p>
        
        <textarea codeHighlight>
            import { http, UploadedFile, HttpBody } from '@deepkit/http';
            import { readFileSync } from 'fs';

            class HelloWordBody {
                file!: UploadedFile;
            }

            class MyPage {
                @http.POST('/')
                helloWorld(body: HttpBody<HelloWordBody>) {
                    const content = readFileSync(body.file.path);

                    return {
                        uploadedFile: body.file
                    };
                }
            }
        </textarea>
        
        <textarea codeHighlight="bash">
            $ curl http://localhost:8080/ -X POST -H "Content-Type: multipart/form-data" -F "file=@Downloads/23931.png"
            {
                "uploadedFile": {
                    "size":6430,
                    "path":"/var/folders/pn/40jxd3dj0fg957gqv_nhz5dw0000gn/T/upload_dd0c7241133326bf6afddc233e34affa",
                    "name":"23931.png",
                    "type":"image/png",
                    "lastModifiedDate":"2021-06-11T19:19:14.775Z"
                }
            }
        </textarea>
        
        <p>
            By default, the router stores all uploaded files in the temp folder and will be removed as soon as your route method
            is finished.
        </p>
        
        <h3>Parameter validation</h3>

        <p>
            Parameters are automatically converted to the annotated type and validated.
            See <a routerLink="/documentation/type/types">Deepkit Types</a> chapter for more information.
        </p>

        <textarea codeHighlight>
            import { Positive, Max } from '@deepkit/type';
            
            class MyWebsite {
                @http.GET(':id')
                getUser(id: number & Positive & Max<10000>) {
                    //...
                }
            }
        </textarea>

        <h3>Parameter resolver</h3>

        <p>
            The router supports a way to resolve complex parameter types. If you have for example a route like <code>/user/:id</code>
            you can resolve the <i>id</i> into a <i>User</i> object outside of the route using a resolver.
        </p>
        
        <textarea codeHighlight>
            #!/usr/bin/env ts-node-script
            import { App } from '@deepkit/app';
            import { FrameworkModule } from '@deepkit/framework';
            import { http, RouteParameterResolverContext, RouteParameterResolverTag, RouteParameterResolver } from '@deepkit/http';
            import { ClassType } from '@deepkit/core';
            
            class User {
                constructor(
                    public username: string,
                    public id: number = 0,
                ) {
                }
            }
            
            class UserDatabase {
                protected users: User[] = [
                    new User('User 1', 1),
                    new User('User 2', 2),
                ];
            
                public getUser(id: number): User | undefined {
                    return this.users.find(v => v.id === id);
                }
            }
            
            class UserResolver implements RouteParameterResolver {
                constructor(protected database: UserDatabase) {
                }
            
                async resolve(context: RouteParameterResolverContext) {
                    if (!context.parameters.id) throw new Error('No :id given');
                    return await this.database.getUser(parseInt(context.parameters.id));
                }
            }
            
            @http.resolveParameter(User, UserResolver)
            class MyWebsite {
                @http.GET(':id')
                getUser(user: User) {
                    return 'Hello ' + user.username;
                }
            }
            
            new App({
                controllers: [MyWebsite],
                providers: [
                    UserDatabase,
                    UserResolver,
                ],
                imports: [new FrameworkModule]
            })
                .run();
        </textarea>


        <h3>Response</h3>

        <p>
            A controller can return various data structures. Some of them are treated in a special way like redirects and templates, and others
            like simple objects are simply sent as JSON.
        </p>

        <h4>Types</h4>
        
        <p>
            If they route has a return type defined the returning value is automatically serialized using JSON serializer and sent using
            content type <code>application/json; charset=utf-8</code>.
        </p>
        
        <p>
            You can additionally define how the result is serialized using <code>serialization</code> and <code>serializer</code>.
        </p>

        <textarea codeHighlight>
            import { Group } from '@deepkit/type';
            
            class User {
                passwordHash?: string & Group<'sensitive'>;
            
                constructor(
                    public username: string,
                    public id: number = 0,
                ) {
                }
            }
            
            class MyWebsite {
                @http.GET('/user').serialization({groupsExclude: ['sensitive']})
                getUsers(): User[] {
                    return this.users.list;
                }
            }
        </textarea>

        <h4>Redirect</h4>

        <p>
            Redirecting a user may be done via the <i>Redirect</i> object. By default it uses 302 redirects, but that can be changed in the arguments of
            <code>Redirect.toRoute</code> and <code>Redirect.toUrl</code>.
        </p>
        
        <textarea codeHighlight>
            #!/usr/bin/env ts-node-script
            import { App } from '@deepkit/app';
            import { FrameworkModule } from '@deepkit/framework';
            import { http, Redirect, HttpBody } from '@deepkit/http';
            
            class User {
                constructor(
                    public username: string,
                    public id: number = 0,
                ) {}
            }
            
            class Users {
                public list: User[] = [];
            }
            
            class MyWebsite {
                constructor(protected users: Users) {
                }
            
                @http.GET('/user').name('user_list')
                getUsers() {
                    return this.users.list;
                }
            
                @http.POST('/user')
                addUser(user: HttpBody<User>) {
                    this.users.list.push(user);
                    return Redirect.toRoute('user_list');
                }
            }
            
            new App({
                providers: [Users],
                controllers: [MyWebsite],
                imports: [new FrameworkModule]
            }).run();

        </textarea>

        <h4>Modification</h4>
        
        <p>
            A response from a controller can be arbitrarily changed and reacted on using an event listener.
        </p>
        
        <p>
            To change the result of a route call, listen to the <code>httpWorkflow.onResponse</code> event
            and change the <code>event.result</code> accordingly.
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
export class DocFrameworkHttpControllerComponent {
}
