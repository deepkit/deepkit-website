import { Component } from '@angular/core';

@Component({
    template: `
        <div class="subline">ORM</div>

        <h2>Session</h2>

        <p>
            Sessions are sessions of a unit of work (UoW) instance. A Unit of Work keeps track of everything you do during
            a session and automatically persists changes once you call <code>commit()</code>.
            Its the preferred way to execute inserts and updates to your database since it batches inserts and updates in a way to makes it very fast.
            A session is very light weight and can be easily created for example in a request-response life-cycle.
        </p>

        <textarea codeHighlight title="database.ts">
            import 'reflect-metadata';
            import { SQLiteDatabaseAdapter } from '@deepkit/sqlite';
            import { entity, t } from '@deepkit/type';
            import { Database } from '@deepkit/orm';
            
            async function main() {
            
                @entity.name('user').collectionName('users')
                class User {
                    @t.primary.autoIncrement public id: number = 0;
                    @t created: Date = new Date;
            
                    constructor(
                        @t public name: string
                    ) {
                    }
                }
            
                const database = new Database(new SQLiteDatabaseAdapter(':memory:'), [User]);
                await database.migrate();
            
                const session = database.createSession();
                session.add(new User('User1'), new User('User2'), new User('User3'));
            
                await session.commit();
            
                const users = await session.query(User).find();
                console.log(users);
            }
            
            main();
        </textarea>
        
        <p>
            Add new entity instances to the session via <code>session.add(T)</code> or schedule already existing via <code>session.remove(T)</code>.
            Once you are done with the session object, simply dereference it everywhere so that the garbage collector can remove it.  
        </p>
        
        <p>
            Modifications are automatically detected for entity instances that are <strong>only</strong> fetched via the session object.
        </p>
        
        <textarea codeHighlight>
            const users = await session.query(User).find();
            for (const user of users) {
                user.name += ' changed';
            }
        
            await session.commit();
        </textarea>
        
        <p>
            Every time you call <code>commit</code> all fetched entity instances are checked for changes, added entity instances via <code>add()</code> are inserted to the
            database, and removed entity instances via <code>remove()</code> are deleted. 
        </p>
        
        <h4>Identity map</h4>
        
        <p>
            A identity map is a feature that makes sure you work always with the same entity instances. If you for example
            execute <code>session.query(User).find()</code> twice, you get two different arrays but with the same entity instances in it.
            When commit a scheduled <code>session.add(entity1)</code> and fetch it again, you receive the very same entity instance <i>entity1</i>.
        </p>
        
        <p>
            It's important that once you start using sessions, you should use its <code>Session.query</code> method instead of <code>Database.query</code>. 
            Only session queries have the identity map feature activated.
        </p>
    `
})
export class DocORMSessionComponent {
}
