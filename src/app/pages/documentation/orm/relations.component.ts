import { Component } from '@angular/core';

@Component({
    template: `
        <div class="subline">ORM</div>

        <h2>Relations</h2>

        <p>
            Relations allow you to connect two entities in a certain way. This is usually
            done in databases using Foreign Keys. Deepkit ORM supports relations for all official databases adapters.
        </p>


        <p>
            A relation is annotated using the <code>t.reference()</code> decorator. Usually, a relation has also
            a reverse relation, which is annotated using the <code>t.backReference()</code> decorator.
        </p>


        <h3>One to many</h3>

        <p>
            The entity who stores a reference is usually called the "owning side" or the one who "owns" the reference.
            The following shows two entities with an one-to-many relation between <i>User</i> and <i>Post</i>.
            It means one user can have multiple posts. The Post entity is owning the relation of Post->User. In the database itself is now a field Post."author" that
            holds the primary key of User. 
        </p>

        <textarea codeHighlight="">
            import 'reflect-metadata';
            import { SQLiteDatabaseAdapter } from '@deepkit/sqlite';
            import { entity, t } from '@deepkit/type';
            import { Database } from '@deepkit/orm';
            
            async function main() {
                @entity.name('user').collectionName('users')
                class User {
                    @t.primary.autoIncrement public id: number = 0;
                    @t created: Date = new Date;
            
                    constructor(@t public username: string) {
                    }
                }
            
                @entity.name('post')
                class Post {
                    @t.primary.autoIncrement public id: number = 0;
                    @t created: Date = new Date;
            
                    constructor(
                        @t.reference() public author: User,
                        @t public title: string) {
                    }
                }
            
                const database = new Database(new SQLiteDatabaseAdapter(':memory:'), [User, Post]);
                await database.migrate();
            
                const user1 = new User('User1');
                const post1 = new Post(user1, 'My first blog post');
                const post2 = new Post(user1, 'My second blog post');
            
                await database.persist(user1, post1, post2);
            }

            main();
        </textarea>

        <p>
            Owning sides are annotated using <code>t.reference()</code>. References are not selected in queries per default.
            See chapter <a routerLink="/documentation/orm/query" fragment="joins">ORM Query / Joins</a> for more information.
        </p>

        <h3>Many to one</h3>

        <p>
            A owning reference can have a revered reference which is usually called many-to-one. It's a virtual reference only, since its not reflected in the database itself.
            A back reference is annotated using <code>t.backReference()</code> and is mainly used for reflection
            and query joins. If you add a back reference from User to Post, you will be able to join Posts directly from User queries.
        </p>

        <textarea codeHighlight>
            @entity.name('user').collectionName('users')
            class User {
                @t.primary.autoIncrement public id: number = 0;
                @t created: Date = new Date;
            
                //'() => T' is used because of circular dependency
                @t.array(() => Post).backReference()
                posts?: Post[];

                constructor(@t public username: string) {
                }
            }
        </textarea>
        
        <textarea codeHighlight>
            //[ { username: 'User1', posts: [ [Post], [Post] ] } ]
            const users = await database.query(User).select('username', 'posts').joinWith('posts').find();
        </textarea>
        
        <h3>Many to many</h3>
        
        <p>
            A many-to-many relation allows to connect many records with many others. It's usually used for
            users in groups. A user can be in no, one, or many groups. Ergo has a group zero, one, or many users.
        </p>
        
        <p>
            Many to many relations are usually implemented via a pivot entity. The pivot entity holds the actual owning
            references and User and Group have only back references.
        </p>
        
        <textarea codeHighlight>
            @entity.name('user')
            class User {
                @t.primary.autoIncrement public id: number = 0;
                @t created: Date = new Date;
        
                //'() => T' because of circular dependency
                @t.array(() => Group).backReference({via: () => UserGroup})
                groups?: Group[];
        
                constructor(@t public username: string) {
                }
            }
        
            @entity.name('group')
            class Group {
                @t.primary.autoIncrement public id: number = 0;
        
                constructor(@t public name: string) {
                }
            }
        
            @entity.name('userGroup')
            class UserGroup {
                @t.primary.autoIncrement public id: number = 0;
        
                constructor(
                    @t.reference() public user: User, 
                    @t.reference() public group: Group, 
                ) {
                }
            }
        </textarea>
        
        <p>
            You can now create users and groups, and connect them using the pivot entity.
            By using a back reference in User we can fetch the groups directly with a User query.
        </p>
        
        <textarea codeHighlight>
            const database = new Database(new SQLiteDatabaseAdapter(':memory:'), [User, Group, UserGroup]);
            await database.migrate();
        
            const user1 = new User('User1');
            const user2 = new User('User2');
            const group1 = new Group('Group1');
        
            await database.persist(user1, user2, group1, new UserGroup(user1, group1), new UserGroup(user2, group1));
        
            //[
            //   { id: 1, username: 'User1', groups: [ [Group] ] },
            //   { id: 2, username: 'User2', groups: [ [Group] ] }
            // ]
            const users = await database.query(User).select('username', 'groups').joinWith('groups').find();
        </textarea>
        
        <p>
            To unlink a user from a group, we drop the record of UserGroup:
        </p>
        <textarea codeHighlight>
            const users = await database.query(User).filter({user: user1, group: group1}).deleteOne();
        </textarea>
    `
})
export class DocORMRelationsComponent {
}
