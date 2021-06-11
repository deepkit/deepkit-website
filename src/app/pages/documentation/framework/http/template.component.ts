import { Component } from '@angular/core';

@Component({
    template: `
        <div class="subline">Framework</div>

        <h2>Template</h2>

        <p>
            The template engine allows you to write typesafe, fast, and secure HTML templates. It is based on TSX and
            works out of the box as soon as you use the <code>.tsx</code> file extension and adjust your tsconfig accordingly.
        </p>

        <p>
            In your tsconfig you have to adjust following settings: <code>jsx</code> and <code>jsxImportSource</code>
        </p>

        <textarea codeHighlight="json" title="tsconfig.json">
            {
              "compilerOptions": {
                "experimentalDecorators": true,
                "emitDecoratorMetadata": true,
                "target": "ES2020",
                "moduleResolution": "node",
            
                "jsx": "react-jsx",
                "jsxImportSource": "@deepkit/template"
              }
            }
        </textarea>

        <p>
            Now you can use TSX in your controller directly.
        </p>

        <textarea codeHighlight title="app.tsx">
            #!/usr/bin/env ts-node-script
            import 'reflect-metadata';
            import { Application, KernelModule } from '@deepkit/framework';
            import { http } from '@deepkit/http';
            
            @http.controller('my-base-url/')
            class MyPage {
                @http.GET('hello-world')
                helloWorld() {
                    return <div style="color: red">Hello World</div>;
                }
            }

            Application.create({
                controllers: [MyPage],
                imports: [
                    KernelModule.configure({
                        debug: true,
                    })
                ]
            }).run();
        </textarea>

        <p>
            When you return a template like that in your route method, the HTTP content type will automatically be set to
            <code>text/html; charset=utf-8</code>.
        </p>

        <h3>Components</h3>

        <p>
            You can structure your templates like you're used to in React. Either modularise your layout into several functions or
            class components.
        </p>

        <h4>Function components</h4>

        <p>
            The easiest way is to use a function that returns TSX.
        </p>

        <textarea codeHighlight title="app.tsx">
            async function Website(props: {title: string, children?: any}) {
                return <html>
                    <head>
                        <title>{props.title}</title>
                    </head>
                    <body>
                        {props.children}
                    </body>
                </html>;
            }

            @http.controller('my-base-url/')
            class MyPage {
                @http.GET('hello-world')
                helloWorld() {
                    return <Website title="Hello world">
                        <h1>Great page</h1>
                    </Website>;
                }
            }
        </textarea>

        <textarea codeHighlight="bash">
            $ curl http://localhost:8080/my-base-url/hello-world
            <html><head><title>Hello world</title></head><body><h1>Great page</h1></body></html>
        </textarea>

        <p>
            Function components can be async. This is an important difference to other template engines you might know, like React.
        </p>

        <h4>Class component</h4>

        <p>
            A more powerful way to write a component is a class component. They are handled and instantiated in the dependency injection
            container and have thus access to all services registered in the container. This makes it possible to directly
            access for example a data source like a database in your components.
        </p>

        <textarea codeHighlight>
            class UserList {
                constructor(
                    protected props: {},
                    protected children: any,
                    protected database: SQLiteDatabase) {
                }
            
                async render() {
                    const users = await this.database.query(User).find();
            
                    return <div class="users">
                        {users.map((user) => <UserDetail user={user}/>)}
                    </div>;
                }
            }

            @http.controller()
            class MyPage {
                @http.GET('')
                listUsers() {
                    return <UserList/>;
                }
            }
        </textarea>

        <p>
            For class components the first constructor arguments are reserved. The <code>props</code> can be defined as you want,
            the <code>children</code> is always "any", and then follow optional dependencies you can choose however you want.
            Since class components are instantiated in the dependency injection container you have access to all your services.
        </p>

        <h3>Render dynamic HTML</h3>

        <p>
            The template engine automatically sanitized all variables used, so you can
            safely use user input directly in the template. To render dynamic HTML, use can use the <code>html</code> function.
        </p>

        <textarea codeHighlight>
            import { html } from '@deepkit/template';
            helloWorld() {
                const yes = "<b>yes!</b>";
                return <div style="color: red">Hello World. {html(yes)}</div>;
            }
        </textarea>
        
        <h3>Structure</h3>
        
        <p>
            The template engine tries to optimise the generated JSX code in a way that makes it much easier for NodeJS/v8 to
            generate the HTML string. In order to get this working correctly, you should move all your components out of the
            main <code>app.tsx</code> and move it to separate files. A structure could look like that:
        </p>
        
        <textarea codeHighlight>
            .
            ├── app.ts
            └── views
                ├── user-detail.tsx
                ├── user-list.tsx
                └── website.tsx
        </textarea>
    `
})
export class DocFrameworkHttpTemplateComponent {
}
