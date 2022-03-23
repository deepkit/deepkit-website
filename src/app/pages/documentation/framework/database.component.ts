import { Component } from '@angular/core';

@Component({
    template: `
        <div class="subline">Framework</div>

        <h2>Database</h2>

        <p>
            Deepkit comes with its own high performance database abstraction library called Deepkit ORM.
            It's an ORM (object–relational mapping) library that makes it easy to work with SQL database as well as MongoDB.
        </p>

        <p>
            Although you can use whatever database library you want, we recommend Deepkit ORM as it's the fastest TypeScript database
            abstraction library that is perfectly integrated into the Deepkit Framework and has a lot of features that improve your
            workflow and efficiency.
        </p>

        <p>
            To get all information about Deepkit ORM, please open the chapter <a routerLink="/documentation/orm">Deepkit ORM</a>.
        </p>

        <h3>Model</h3>

        <p>
            In order to read and write data from and to the database, you need to create a model describing the interface and metadata
            of the model. It refers usually directly to the structure of a SQL table or MongoDB collection.
        </p>

        <textarea codeHighlight>
            import { entity, AutoIncrement, PrimaryKey } from '@deepkit/type';
                        
            @entity.name('user')
            class User {
                id: number & PrimaryKey & AutoIncrement = 0;
                
                created: Date = new Date;
                
                constructor(public username: string) {
                }
            }
        </textarea>

        <p>
            This is how a model (aka entity) looks. You define its name (which is by default its table or collection name) using
            <code>@entity.name()</code> and declare each property with a type. See the chapter
            <a routerLink="/documentation/type/types">Deepkit Type: Types</a> for more information.
        </p>
        
        <h3>Database class</h3>
        
        <p>
            In order to use the created model, you have to specify a data source. This is done using classes extending 
            the <code>Database</code> class of <code>@deepkit/orm</code> and using adapters. 
            Currently MySQL, SQLite, PostgreSQL, and MongoDB are supported; each has its own adapter.
            In this example we use SQLite and <code>@deepkit/sqlite</code>. Luckily, those dependencies are already installed with
            the Deepkit Framework since it uses SQLite under the hood for its debugger storage.
        </p>
        
        <textarea codeHighlight>
            import { Database } from '@deepkit/orm';
            import { SQLiteDatabaseAdapter } from '@deepkit/sqlite';
            
            export class SQLiteDatabase extends Database {
                name = 'default';
                constructor() {
                    super(new SQLiteDatabaseAdapter('/tmp/myapp.sqlite'), [User]);
                }
            }
        </textarea>
        
        <p>
            Create a new class and specify in its constructor the adapter with its parameters,
            and add all entities/models that should be associated with that database to the second parameter.
        </p>
        
        <p>
            You can now register this database class as provider. We also enable <code>migrateOnStartup</code>,
            which creates all tables in your database automatically on bootstrap. This is ideal for rapid prototyping, but is
            <strong>not recommended</strong> for a serious project or production setup.
        </p>
        
        <p>
            We furthermore enable <code>debug</code> which allows us to open the debugger when the application's server is started
            and manage your database models directly in its integrated ORM Browser.
        </p>
        
        <textarea codeHighlight>
            import { App } from '@deepkit/app';
            import { FrameworkModule } from '@deepkit/framework';
            import { SQLiteDatabase } from './database.ts';
            
            new App({
                providers: [SQLiteDatabase],
                imports: [
                    new FrameworkModule({
                        migrateOnStartup: true,
                        debug: true,
                    })
                ]
            }).run();
        </textarea>
        
        <p>
            You can now access the SQLiteDatabase everywhere using dependency injection:
        </p>

        <textarea codeHighlight>
            import { SQLiteDatabase } from './database.ts';
            
            export class Controller {
                constructor(protected database: SQLiteDatabase) {}
            
                @http.GET()
                async startPage(): User[] {
                    //return all users
                    return await this.database.query(User).find();
                }
            }
        </textarea>
        
        <h3>Manage data</h3>
        
        <p>
            You have everything set up to be able to manage your database data now using the Deepkit ORM Browser. 
            
            In order to open the ORM Browser and manage the content, write all the steps from above into the <code>app.ts</code> file.
            At the bottom of this chapter you will find the full source code example.
        </p>
        
        <p>
            And start the server: 
        </p>
        
        <textarea codeHighlight="bash">
            $ ts-node app.ts server:start
            2021-06-11T15:08:54.330Z [LOG] Start HTTP server, using 1 workers.
            2021-06-11T15:08:54.333Z [LOG] Migrate database default
            2021-06-11T15:08:54.336Z [LOG] RPC DebugController deepkit/debug/controller
            2021-06-11T15:08:54.337Z [LOG] RPC OrmBrowserController orm-browser/controller
            2021-06-11T15:08:54.337Z [LOG] HTTP OrmBrowserController
            2021-06-11T15:08:54.337Z [LOG]     GET /_orm-browser/query httpQuery
            2021-06-11T15:08:54.337Z [LOG] HTTP StaticController
            2021-06-11T15:08:54.337Z [LOG]     GET /_debug/:any serviceApp
            2021-06-11T15:08:54.337Z [LOG] HTTP listening at http://localhost:8080/
        </textarea>
        
        <p>
            You can now open <a target="_blank" href="http://localhost:8080/_debug/database/default">http://localhost:8080/_debug/database/default</a>.
        </p>
        
        <image src="/assets/documentation/framework/debugger-database.png"></image>
        
        <p>
            You can see the ER diagram. At the moment only one entity is available. If you add more with relations you see 
            all information at a glance.
        </p>
        
        <p>
            When you click on "User" in the left sidebar, you can manage its content. Click on the "+", and change the title of
            the new record. After changing required values (like the username), press "Commit". 
            This commits all changes to the database and makes all changes persistent. The auto increment ID is automatically assigned.
        </p>

        <image src="/assets/documentation/framework/debugger-database-user.png"></image>
        
        <h3>Use database</h3>
        
        <p>
            In order to use the created database class in your code, you can use the <code>TestCommand</code> again from the Getting Started.
            We'll adjust it slightly so it takes your class <code>SQLiteDatabase</code> as dependency.
        </p>
        
        <p>
            You can also inject <code>SQLiteDatabase</code> in CLI commands, event listeners, and all other services.
        </p>
        
        <textarea codeHighlight>
            import { arg, cli, Command } from '@deepkit/app';
            
            @cli.controller('add-user')
            export class TestCommand implements Command {
                constructor(protected database: SQLiteDatabase) {
                }
            
                async execute(
                    @arg username: string
                ) {
                    const user = new User(username);
                    await this.database.persist(user);
                    console.log('User added with id', user.id);
                }
            }
        </textarea>

        <p>
            As you can see, we inject the <code>SQLiteDatabase</code> directly as constructor argument. 
            Let's register the TestCommand and execute it.
        </p>

        <textarea codeHighlight>
            #!/usr/bin/env ts-node-script
            import { App } from '@deepkit/app';
            import { FrameworkModule } from '@deepkit/framework';
            import { arg, cli, Command } from '@deepkit/app';
            import { entity, AutoIncrement, PrimaryKey } from '@deepkit/type';
            import { Database } from '@deepkit/orm';
            import { SQLiteDatabaseAdapter } from '@deepkit/sqlite';
            
            @entity.name('user')
            class User {
                id: number & PrimaryKey & AutoIncrement = 0;
            
                created: Date = new Date;
            
                constructor(public username: string) {
                }
            }
            
            export class SQLiteDatabase extends Database {
                name = 'default';
                constructor() {
                    super(new SQLiteDatabaseAdapter('/tmp/myapp.sqlite'), [User]);
                }
            }
            
            @cli.controller('add-user')
            export class TestCommand implements Command {
                constructor(protected database: SQLiteDatabase) {
                }
            
                async execute(
                    @arg username: string
                ) {
                    const user = new User(username);
                    await this.database.persist(user);
                    console.log('User added with id', user.id);
                }
            }
            
            new App({
                controllers: [TestCommand],
                providers: [SQLiteDatabase],
                imports: [
                    new FrameworkModule({
                        migrateOnStartup: true,
                        debug: true,
                    })
                ]
            }).run();
        </textarea>
        
        <textarea codeHighlight>
            $ ./app.ts add-user Peter
            User added with id 2
        </textarea>
        
        <p>
            A new user has been added and the auto-incremented primary key is 2. You can start the server again and take a look into the data browser.
            You will see two records in the database.
        </p>
        
        <h3>More databases</h3>
        
        <p>
            You can add as many database classes as you want and name them the way you like. Make sure to change the <code>name</code> 
            of each database, so it doesn't conflict with others when using the ORM Browser.
        </p>
        
        <h3>Learn more</h3>
        
        <p>
            To learn more about how the <code>SQLiteDatabase</code> works, please read the chapter <a routerLink="/documentation/orm">Deepkit ORM</a>
            and its sub chapters like how to query data, how to manipulate data via sessions, how to define relations, and more.
            Please note that the chapters there are related to the standalone library <code>@deepkit/orm</code> and does not contain documentation
            about the Deepkit Framework part that you've read above from this chapter. In the standalone library you instantiate your database
            class manually like via <code>new SQLiteDatabase()</code>, however in your Deepkit Framework application this is done 
            automatically using the dependency injection container.
        </p>
    `
})
export class DocFrameworkDatabaseComponent {
}
