import { Component } from '@angular/core';

@Component({
    template: `
        <div class="subline">ORM</div>

        <h2>Entity</h2>

        <p>
            Deepkit ORM is based on @deepkit/type and uses <a routerLink="/documentation/type/types">its type
            definition</a>
            capabilities. It already has everything needed to decorate your entity with information necessary to
            describe database tables/collections. Make sure that @deepkit/type is correctly 
            <a href="/documentation/type">installed and configured</a>.
        </p>

        <p>
            An entity is a class or (experimental) interface with at least one property declared as primary key.
        </p>

        <h3>Class</h3>

        <p>
            The entity name (first argument in <code>@entity.name()</code>) is also the table/collection name, by
            default. To change
            the table/collection name, use <code>.collectionName('users')</code>.
        </p>

        <textarea codeHighlight>
            import { entity, integer, PrimaryKey, AutoIncrement, MinLength, MaxLength } from '@deepkit/type';
                        
            @entity.name('user')
            export class User {
                id: integer & PrimaryKey & AutoIncrement = 0;
                created: Date = new Date;
            
                firstName?: string & MaxLength<64>;
                lastName?: string & MaxLength<64>;
            
                constructor(public username: string & MinLength<3> & MaxLength<24> & Unique) {
                }
            }
        </textarea>

        <p>
            The class itself can now be used with the <code>Database</code> object.
        </p>

        <textarea codeHighlight>
            import { SQLiteDatabaseAdapter } from '@deepkit/sqlite';
            import { Database } from '@deepkit/orm';
            import { entity, PrimaryKey, AutoIncrement } from '@deepkit/type';
            
            class User {
                //....
            }
            
            const database = new Database(new SQLiteDatabaseAdapter(':memory:'), [User]);
            await database.migrate();
            
            await database.persist(new User('Peter'));
        
            const allUsers = await database.query(User).find();
            console.log('all users', allUsers);
        </textarea>

        <h3>Interface</h3>
        
        <p>
            Pure interfaces are currently supported as experimental feature. 
        </p>

        <textarea codeHighlight>
            import { SQLiteDatabaseAdapter } from '@deepkit/sqlite';
            import { Database } from '@deepkit/orm';
            import { PrimaryKey, AutoIncrement } from '@deepkit/type';

            interface User {
                id: number & PrimaryKey & AutoIncrement;
                created: Date;
                name: string;
            }
        
            const database = new Database(new SQLiteDatabaseAdapter(':memory:'))
                .register<User>({collection: 'users');
            await database.migrate();
        
            const user: User = {id: 0, created: new Date, name: 'Peter'};
            await database.persist(user);
        
            const allUsers = await database.query<User>().find();
            console.log('all users', allUsers);
        </textarea>

        <h3>Database types</h3>

        <p>
            Each database adapter has its mapping of TypeScript types to database engine types.
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
            To change the mapped type to something else, use its database decorator type. 
            For example for MySQL it's <code>MySQL&lt;{{"{"}}type: 'VARCHAR(255)'{{"}"}}&gt;</code>.
            The <code>type</code> needs to be a valid SQL type statement that is passed as is to the migration
            system.
        </p>

        <table class="pretty">
            <tr>
                <th style="width: 200px;">Database</th>
                <th>Decorator</th>
            </tr>
            <tr>
                <td>SQLite</td>
                <td>
                    <textarea codeHighlight>
                    import { SQLite } from '@deepkit/type';
                    interface User {
                        title: string & SQLite<{type: 'text'}>;
                    }
                    </textarea>
        </td>
        </tr>
        <tr>
            <td>Mysql</td>
            <td>
                    <textarea codeHighlight>
                    import { MySQL } from '@deepkit/type';
                    interface User {
                        title: string & MySQL<{type: 'text'}>;
                    }
                    </textarea>
            </td>
        </tr>
        <tr>
            <td>PostgreSQL</td>
            <td>
                    <textarea codeHighlight>
                    import { Postgres } from '@deepkit/type';
                    interface User {
                        title: string & Postgres<{type: 'text'}>;
                    }
                    </textarea>
            </td>
        </tr>
        <tr>
            <td>All databases</td>
            <td>
                With <code>DatabaseField</code> its possible to define database field options
                for a new unknown or all database adapters.
                <textarea codeHighlight>
                    import { DatabaseField } from '@deepkit/type';
                    interface User {
                        title: string & DatabaseField<{type: 'text'}>;
                    }
                    </textarea>
            </td>
        </tr>
        </table>

        <h4>Primary</h4>

        <p>
            A primary field is annotated using the <code>PrimaryKey</code> type decorator. 
            At the moment only one primary key is supported.
        </p>

        <h4>Optional</h4>

        <p>
            Optional fields are annotated using <code>title?: string</code> or <code>title: string | null</code> as
            property type.
            You should use only one, usually the optional <code>?</code> syntax that works with <code>undefined</code>.
            Both decorators result in having the column NULLABLE for SQL adapters. In any case a null or undefined value
            is represented
            in the database as NULL, and only converted to undefined or null at runtime. So the only difference between
            those decorators
            is that they are represent different values at runtime.
        </p>

        <p>
            In the following example, the <code>modified</code> field is optional and can thus be <code>undefined</code>
            in runtime,
            although in the database it's always represented as null.
        </p>

        <textarea codeHighlight>
            import { PrimaryKey } from '@deepkit/type';
            
            class User {
                id: number & PrimaryKey = 0;
                modified?: Date;
            }
        </textarea>

        <p>
            This example shows how the nullable decorator works. In both the database and in the javascript
            runtime, null will be used. This is more verbose than <code>modified?: Date</code> and is not frequently
            used.
        </p>

        <textarea codeHighlight>
            import { PrimaryKey } from '@deepkit/type';
            
            class User {
                id: number & PrimaryKey = 0;
                modified: Date | null = null;
            }
        </textarea>

        <h4>Auto increment</h4>

        <p>
            Fields that should be auto-incremented on insert are annotated using the <code>AutoIncrement</code>
            decorator.
            All adapters support auto increment values. The MongoDB adapter uses an additional collection to track the
            uto increment counter.
        </p>

        <p>
            Auto increment fields get a new value on insertion automatically.
        </p>

        <textarea codeHighlight>
            import { PrimaryKey, AutoIncrement } from '@deepkit/type';
            
            class User {
                id: number & PrimaryKey & AutoIncrement = 0;
            }
        </textarea>

        <h4>MongoDB ObjectID</h4>

        <p>
            Fields that should be of type ObjectID in MongoDB are annotated using the <code>MongoId</code> type
            decorator.
            The runtime type is <code>string</code> and in the database itself <code>ObjectId</code> (binary).
        </p>

        <p>
            MongoID fields get a new value on insertion automatically.
        </p>

        <textarea codeHighlight>
            import { PrimaryKey, MongoId } from '@deepkit/type';
            
            class User {
                _id: MongoId & PrimaryKey = '';
            }
        </textarea>

        <h4>UUID</h4>

        <p>
            Fields that should be of type UUID (v4) are declared using the <code>UUID</code> special type.
            The runtime type is <code>string</code> and databases usually store them in a binary type.
            Use the <code>uuid()</code> function to generate a new UUID v4.
        </p>

        <textarea codeHighlight>
            import { uuid, UUID, PrimaryKey } from '@deepkit/type';
            
            class User {
                id: UUID & PrimaryKey = uuid();
            }
        </textarea>

        <h4>Relations</h4>

        <p>
            References (foreign keys) are annotated using the <code>Reference</code> type decorator.
            For more information please read the <a routerLink="/documentation/orm/relations">ORM Relations</a> chapter.
        </p>

        <h3>More</h3>

        <p>
            There are many more schema definition decorators available like integers, indexes, name mapping, and validators.
            See the section <a href="/documentation/type/types#special-types">Type: Special types</a> or
            <a href="/documentation/type/validation">Type: Validation</a> for more information.
        </p>
    `
})
export class DocORMEntityComponent {
}
