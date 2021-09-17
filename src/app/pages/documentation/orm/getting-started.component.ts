import { Component } from '@angular/core';

@Component({
    template: `
        <div class="subline">ORM</div>

        <h2>Getting Started</h2>

        <h3>Installation</h3>

        <textarea codeHighlight="bash">
            npm install @deepkit/orm
        </textarea>

        <p>
            Make sure all peer dependencies are installed. By default NPM 7+ installs them automatically.
            For older versions, use this command:
        </p>

        <textarea codeHighlight="bash">
            npm install @deepkit/orm reflect-metadata @deepkit/type rxjs @deepkit/core @deepkit/injector @deepkit/logger @deepkit/stopwatch
        </textarea>
        
        <h3>Deepkit Type</h3>
        
        <p>
            Deepkit ORM is based on Deepkit Type. Deepkit Type uses reflect-metadata and the decorator metadata of TypeScript.
            Make sure you have <code>experimentalDecorators</code> and <code>emitDecoratorMetadata</code> enabled in <code>tsconfig.json</code>:
        </p>

        <textarea codeHighlight="json">
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
        </textarea>
        
        <p>
            Also make sure to always import <code>reflect-metadata</code> at the very beginning of your entry point scripts.
            More information about Deepkit Type can be found in chapter <a routerLink="/documentation/type">Deepkit Type Getting Started</a>.
        </p>
        
        <h3>Database</h3>

        <p>
            You primarily work with the <code>Database</code> class. Once instantiated with an adapter,
            you can start to query data, persist objects, or create a unit-of-work session.
        </p>

        <textarea codeHighlight title="database.ts">
            import 'reflect-metadata';
            import { SQLiteDatabaseAdapter } from '@deepkit/sqlite';
            import { entity, t } from '@deepkit/type';
            import { Database } from '@deepkit/orm';

            async function main() {
                @entity.name('user')
                class User {
                    @t.primary.autoIncrement public id: number = 0;
                    @t created: Date = new Date;
                
                    constructor(
                        @t public name: string
                    ) {
                    }
                }
                
                const database = new Database(new SQLiteDatabaseAdapter('./example.sqlite'), [User]);
                await database.migrate(); //create tables
                
                await database.persist(new User('Peter'));
                
                const allUsers = await database.query(User).find();
                console.log('all users', allUsers);
            }
            
            main();
        </textarea>

        <p>
            Although we try to make the query API (result of <code>database.query(Entity)</code>) as streamlined as possible, its API changes depending on the adapter.
            This way you can use database specific functions directly on the query object.
        </p>

        <h3>Adapter</h3>

        <p>
            An adapter can be installed via NPM and then used in <code>Database</code> object.
        </p>

        <textarea codeHighlight="bash">
            npm install @deepkit/sqlite
        </textarea>

        <textarea codeHighlight>
            import { SQLiteDatabaseAdapter } from '@deepkit/sqlite';
            import { entity, t } from '@deepkit/type';
            import { Database } from '@deepkit/orm';
                        
            @entity.name('user')
            export class User {
                @t.primary.autoIncrement public id: number = 0;
                @t created: Date = new Date;
            
                constructor(
                    @t public name: string
                ) {
                }
            }
            
            const database = new Database(new SQLiteDatabaseAdapter('./example.sqlite'), [User]);
        </textarea>

        <h4>SQLite</h4>

        <p>
            SQLite adapter is available in the <code>@deepkit/sqlite</code> package and uses <code>better-sqlite</code> package under the hood.
            It can be configured to use a local sqlite database or <code>:memory:</code>.
        </p>

        <textarea codeHighlight="bash">
            $ npm install @deepkit/sqlite 
        </textarea>

        <textarea codeHighlight>
            import { SQLiteDatabaseAdapter } from '@deepkit/sqlite';
            
            const database = new Database(new SQLiteDatabaseAdapter('./example.sqlite'), [User]);
            
            const database = new Database(new SQLiteDatabaseAdapter(':memory:'), [User]);
        </textarea>

        <h4>MySQL</h4>

        <p>
            MySQL adapter is available in the <code>@deepkit/mysql</code> package and uses <code>mariadb</code> package under the hood.
            See its typings or <a href="https://github.com/mariadb-corporation/mariadb-connector-nodejs/blob/ce05265e777e9fca01a8e851db5187007135c25a/types/index.d.ts#L172">ConnectionConfig</a>
            to see all available connection options.
        </p>

        <textarea codeHighlight="bash">
            $ npm install @deepkit/mysql 
        </textarea>

        <textarea codeHighlight>
            import { MySQLDatabaseAdapter } from '@deepkit/mysql';
            
            const database = new Database(new MySQLDatabaseAdapter({
                host: 'localhost',
                port: 3306
            }), [User]);
        </textarea>

        <h4>PostgreSQL</h4>

        <p>
            PostgreSQL adapter is available in the <code>@deepkit/postgres</code> package and uses <code>pg</code> package under the hood.
            See its typings or <a href="https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/pg/index.d.ts#L16">ClientConfig</a>
            to see all available connection options.
        </p>

        <textarea codeHighlight="bash">
            $ npm install @deepkit/postgres 
        </textarea>

        <textarea codeHighlight>
            import { PostgresDatabaseAdapter } from '@deepkit/postgres';
            
            const database = new Database(new PostgresDatabaseAdapter({
                host: 'localhost',
                port: 3306
            }), [User]);
        </textarea>

        <h4>MongoDB</h4>

        <p>
            MongoDB adapter is available in the <code>@deepkit/mongo</code> package and uses its own Mongo driver.
            Read the <a href="https://docs.mongodb.com/manual/reference/connection-string/">Connection String URI</a>
            documentation to see all available connection options.
        </p>

        <textarea codeHighlight="bash">
            $ npm install @deepkit/mongo @deepkit/bson
        </textarea>

        <textarea codeHighlight>
            import { MongoDatabaseAdapter } from '@deepkit/mongo';
            
            const database = new Database(new MongoDatabaseAdapter('mongodb://localhost/mydatabase'), [User]);
        </textarea>

    `
})
export class DocORMGettingStartedComponent {
}
