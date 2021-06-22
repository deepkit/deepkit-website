import { Component } from '@angular/core';

@Component({
    template: `
        <div class="subline">ORM</div>

        <h2>Schema</h2>

        <p>
            Deepkit ORM is based on Deepkit Type and uses <a routerLink="/documentation/type/schema">its schema definition</a>.
            It has already everything needed to decorate your entity with schema definition information necessary to
            describe database tables/collections.
        </p>

        <p>
            A entity can be described as TypeScript class schema or functional schema. Each entity needs to
            have at least one primary key using <code>t.primary</code> and an entity name.
        </p>

        <h3>Class schema</h3>

        <p>
            The entity name (first argument in <code>@entity.name()</code>) is per default the table/collection name. To change
            the table/collection name, use <code>collectionName</code>.
        </p>

        <textarea codeHighlight>
            import { entity, t } from '@deepkit/type';
                        
            @entity.name('user').collectionName('users')
            export class User {
                @t.primary.autoIncrement public id: number = 0;
                @t created: Date = new Date;
            
                constructor(
                    @t public name: string
                ) {
                }
            }
        </textarea>

        <p>
            The class itself can now be used with the <code>Database</code> object.
        </p>

        <textarea codeHighlight>
            import 'reflect-metadata';
            import { SQLiteDatabaseAdapter } from '@deepkit/sqlite';
            import { entity, t } from '@deepkit/type';
            import { Database } from '@deepkit/orm';
            
            //class User here
            
            const database = new Database(new SQLiteDatabaseAdapter(':memory:'), [User]);
            await database.migrate();
            
            await database.persist(new User('Peter'));
        
            const allUsers = await database.query(User).find();
            console.log('all users', allUsers);
        </textarea>

        <h3>Functional schema</h3>

        <p>
            Class schemas have <a routerLink="/documentation/type/schema#class-schemas">several disadvantages</a> which can be solved
            by using functional schemas.
        </p>

        <textarea codeHighlight>
            import { t } from '@deepkit/type';

            const userSchema = t.schema({
                id: t.number.primary.autoIncrement,
                created: t.date.default(() => new Date),
                name: t.string
            }, {name: 'user', collectionName: 'users'});
        </textarea>

        <p>
            The schema itself can now be used with the <code>Database</code> object.
        </p>

        <textarea codeHighlight>
            import 'reflect-metadata';
            import { SQLiteDatabaseAdapter } from '@deepkit/sqlite';
            import { plainToClass, t } from '@deepkit/type';
            import { Database } from '@deepkit/orm';

            //userSchema = t.schema({}) here
        
            const database = new Database(new SQLiteDatabaseAdapter(':memory:'), [userSchema]);
            await database.migrate();
        
            await database.persist(plainToClass(userSchema, {name: 'Peter'}));
        
            const allUsers = await database.query(userSchema).find();
            console.log('all users', allUsers);
        </textarea>

        <h3>Database types</h3>

        <p>
            Each database adapters has its mapping of JavaScript runtime types to database engine types.
        </p>

        <table class="pretty">
            <tr>
                <th style="width: 170px;">Runtime type</th>
                <th>SQLite</th>
                <th>MySQL</th>
                <th>PostgreSQL</th>
                <th>Mongo</th>
            </tr>
            <tr>
                <td>string</td>
                <td>text</td>
                <td>longtext</td>
                <td>text</td>
                <td>string</td>
            </tr>
            <tr>
                <td>number</td>
                <td>float</td>
                <td>double</td>
                <td>double precision</td>
                <td>int/number</td>
            </tr>
            <tr>
                <td>boolean</td>
                <td>integer(1)</td>
                <td>boolean</td>
                <td>boolean</td>
                <td>boolean</td>
            </tr>
            <tr>
                <td>date</td>
                <td>text</td>
                <td>datetime</td>
                <td>timestamp</td>
                <td>datetime</td>
            </tr>
            <tr>
                <td>array</td>
                <td>text</td>
                <td>json</td>
                <td>jsonb</td>
                <td>array</td>
            </tr>
            <tr>
                <td>map</td>
                <td>text</td>
                <td>json</td>
                <td>jsonb</td>
                <td>object</td>
            </tr>
            <tr>
                <td>map</td>
                <td>text</td>
                <td>json</td>
                <td>jsonb</td>
                <td>object</td>
            </tr>
            <tr>
                <td>union</td>
                <td>text</td>
                <td>json</td>
                <td>jsonb</td>
                <td>T</td>
            </tr>
            <tr>
                <td>uuid</td>
                <td>blob</td>
                <td>binary(16)</td>
                <td>uuid</td>
                <td>binary</td>
            </tr>
            <tr>
                <td>ArrayBuffer/Uint8Array/...</td>
                <td>blob</td>
                <td>longblob</td>
                <td>bytea</td>
                <td>binary</td>
            </tr>
        </table>

        <p>
            To change the mapped type to something else, use its database decorator method. For example for MySQL its <code>@t.mysql({{"{"}}type: 'VARCHAR(255)'{{"}"}})</code>.
        </p>

        <table class="pretty">
            <tr>
                <th>Database</th>
                <th>Decorator</th>
            </tr>
            <tr>
                <td>SQLite</td>
                <td><code>@t.sqlite({{"{"}}type: 'text'{{"}"}})</code></td>
            </tr>
            <tr>
                <td>Mysql</td>
                <td><code>@t.mysql({{"{"}}type: 'VARCHAR(255)'{{"}"}})</code></td>
            </tr>
            <tr>
                <td>PostgreSQL</td>
                <td><code>@t.postgres({{"{"}}type: 'VARCHAR(255)'{{"}"}})</code></td>
            </tr>
        </table>

        <h4>Primary</h4>

        <p>
            A primary field is annotated using the <code>t.primary</code> decorator. At the moment only one primary key is supported.
        </p>

        <h4>Optional</h4>

        <p>
            Optional fields are annotated using the <code>t.optional</code> or <code>t.nullable</code> decorator. Only use one of them.
            Both decorators result in having the column NULLABLE for SQL adapters. In any case a null or undefined value is represented
            in the database as NULL, and only converted to undefined or null during runtime. So the only difference between those decorators
            is that they are different represented during runtime.
        </p>
        
        <p>
            In the following example is the <code>modified</code> field optional and can thus be <code>undefined</code>, although
            in the database its always represented as null.
        </p>

        <textarea codeHighlight>
            import { uuid, t } from '@deepkit/type';
            
            
            class User {
                @t.primary.uuid public id: string = uuid();
            
                //the decorator t.optional is not necessary as it will be automatically detected 
                @t modified?: Date;
            }

            //or functional
            const userSchema = t.schema({
                id: t.uuid.primary.default(uuid),
                modified: t.date.optional
            });
        </textarea>

        <p>
            This example shows how the nullable decorator works. It uses in both, the runtime and database, the datatype <code>null</code>.
            Its more verbose than <code>t.optional</code> and is not frequently used.
        </p>
        
        <textarea codeHighlight>
            import { uuid, t } from '@deepkit/type';
            
            
            class User {
                @t.primary.uuid public id: string = uuid();
            
                @t.nullable modified: Date | null = null;
            }

            //or functional
            const userSchema = t.schema({
                id: t.uuid.primary.default(uuid),
                modified: t.date.nullable.default(null)
            });
        </textarea>

        <h4>Auto increment</h4>

        <p>
            Fields that should be auto increment on insert are annotated using the <code>t.autoIncrement</code> decorator.
            All adapters support auto increment values. The MongoDB adapter uses a additional collection to track auto increment counter.
        </p>
        
        <p>
            Auto increment Fields get a new value on insertion automatically.
        </p>

        <h4>MongoDB ObjectID</h4>

        <p>
            Fields that should be of type ObjectID in MongoDB are annotated using the <code>t.mongoId</code> decorator.
            The runtime type is <code>string</code> and in the database itself <code>ObjectID</code>.
        </p>
        
        <p>
            MongoID fields get a new value on insertion automatically.
        </p>

        <h4>UUID</h4>

        <p>
            Fields that should be of type UUID (v4) are annotated using the <code>t.uuid</code> decorator.
            The runtime type is <code>string</code> and databases store them usually in a binary type.
            Use the <code>uuid()</code> to generate a UUID v4.
        </p>

        <textarea codeHighlight>
            import { uuid, t } from '@deepkit/type';
            
            class User {
                @t.primary.uuid public id: string = uuid();
            }

            //or functional
            const userSchema = t.schema({
                id: t.uuid.primary.default(uuid),
            });
        </textarea>
        
        <h4>Relations</h4>
        
        <p>
            References (foreign keys) are annotated using the <code>t.reference()</code> decorator.
            For more information please read the <a routerLink="/documentation/orm/relations">ORM Relations</a> chapter.
        </p>
        
        <h3>More</h3>
        
        <p>
            There are many more schema definition decorators available like validators
        </p>
    `
})
export class DocORMSchemaComponent {
}
