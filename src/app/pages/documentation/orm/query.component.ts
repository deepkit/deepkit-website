import { Component } from '@angular/core';

@Component({
    template: `
        <div class="subline">ORM</div>

        <h2>Query</h2>

        <p>
            A query is an object that described how data should be fetched from the database or modified.
            It has multiple methods to describe your query and termination methods that execute it.
        </p>

        <p>
            You can create a query by using <code>Database.query(T)</code> or <code>Session.query(T)</code>. You should
            prefer <a routerLink="/documentation/orm/session">sessions</a> as it improves performance.
        </p>

        <textarea codeHighlight title="database.ts">
            @entity.name('user').collectionName('users')
            class User {
                @t.primary.autoIncrement public id: number = 0;
                @t created: Date = new Date;
                @t birthdate?: Date;
                @t visits: number = 0;
        
                constructor(@t public username: string) {
                }
            }
            
            const database = new Database(...);
            
            //[ { username: 'User1' }, { username: 'User2' }, { username: 'User2' } ]
            const users = await database.query(User).select('username').find();
        </textarea>

        <h3>Filter</h3>

        <p>
            A filter can be applied to limit the result set.
        </p>

        <textarea codeHighlight="">
            //simply filters
            const users = await database.query(User).filter({name: 'User1'}).find();
            
            //multiple filters, all AND
            const users = await database.query(User).filter({name: 'User1', id: 2}).find();
            
            //range filter: $gt, $lt, $gte, $lte (greater than, lower than, ...)
            //equal to WHERE created < NOW()
            const users = await database.query(User).filter({created: {$lt: new Date}}).find();
            //equal to WHERE id > 500
            const users = await database.query(User).filter({id: {$gt: 500}}).find();
            //equal to WHERE id >= 500
            const users = await database.query(User).filter({id: {$gte: 500}}).find();
            
            //set filter: $in, $nin (in, not in)
            //equal to WHERE id IN (1, 2, 3)
            const users = await database.query(User).filter({id: {$in: [1, 2, 3]}}).find();
            
            //regex filter
            const users = await database.query(User).filter({username: {$regex: /User[0-9]+/}}).find();
            
            //grouping: $and, $nor, $or
            //equal to WHERE (username = 'User1') OR (username = 'User2')
            const users = await database.query(User).filter({
                $or: [{username: 'User1'}, {username: 'User2'}]
            }).find();

            
            //nested grouping
            //equal to WHERE username = 'User1' OR (username = 'User2' and id > 0)
            const users = await database.query(User).filter({
                $or: [{username: 'User1'}, {username: 'User2', id: {$gt: 0}}]
            }).find();
            
            
            //nested grouping
            //equal to WHERE username = 'User1' AND (created < NOW() OR id > 0)
            const users = await database.query(User).filter({
                $and: [{username: 'User1'}, {$or: [{created: {$lt: new Date}, id: {$gt: 0}}]}]
            }).find();

        </textarea>

        <h3>Select</h3>

        <p>
            There are multiple select methods that execute the query.
        </p>

        <h4>count()</h4>

        <p>
            <code>count()</code> returns a number of records.
        </p>

        <h4>has()</h4>

        <p>
            <code>has()</code> returns a boolean of true when there is at least one record found, and false when no records found.
        </p>

        <h4>find()</h4>

        <p>
            <code>find()</code> always returns an array. If the result is empty then an empty array is returned.
        </p>

        <textarea codeHighlight="">
            const users = await database.query(User).find();
        </textarea>

        <h4>findOne()</h4>

        <p>
            <code>findOne()</code> returns a single entity instance and throws an <code>ItemNotFound</code> if not found.
        </p>

        <textarea codeHighlight="">
            const user = await database.query(User).findOne();
        </textarea>

        <h4>findOneOrUndefined()</h4>

        <p>
            <code>findOneOrUndefined()</code> returns a single entity instance or undefined when not found.
        </p>
        <textarea codeHighlight="">
            const user = await database.query(User).findOneOrUndefined();
            if (!users) {
                throw new Error('Sorry, not user found.');
            }
        </textarea>

        <h4>findField()</h4>

        <p>
            <code>findField()</code> returns an array of fields. If the result is empty then an empty array is returned.
        </p>

        <textarea codeHighlight="">
            const usernames = await database.query(User).findField('username');
        </textarea>

        <h4>findOneField()</h4>

        <p>
            <code>findOneField()</code> returns a field of a single entity instance and throws an <code>ItemNotFound</code> if not found.
        </p>

        <textarea codeHighlight="">
            const username = await database.query(User).findOneField('username');
        </textarea>

        <h4>findOneFieldOrUndefined()</h4>

        <p>
            <code>findOneFieldOrUndefined()</code> returns a field of a single entity instance or undefined when not found.
        </p>

        <h3>Order</h3>
        <p>
            With <code>orderBy(field, order)</code> the order can be changed.
        </p>

        <textarea codeHighlight>
            const users = await session.query(User).orderBy('created', 'desc').find();
        </textarea>

        <h3>Paging</h3>

        <p>
            With the methods <code>itemsPerPage()</code> and <code>page()</code> can the results be paginated.
            Page starts at 1.
        </p>

        <textarea codeHighlight>
            const users = await session.query(User).itemsPerPage(50).page(1).find();
        </textarea>

        <p>
            Alternative methods <code>limit</code> and <code>skip</code> allow you to paginate manually.
        </p>

        <textarea codeHighlight>
            const users = await session.query(User).limit(5).skip(10).find();
        </textarea>


        <h3>Joins</h3>

        <p>
            Per default references from the schema are neither included in queries nor loaded. To include
            a join in the query without loading the reference, use <code>join()</code> (left join) or <code>innerJoin</code>.
            To include a join in the query <i>and</i> load the reference use <code>joinWith</code> or <code>innerJoinWith</code>.
        </p>

        <p>
            All following examples assume this model schemas:
        </p>

        <textarea codeHighlight>
            @entity.name('group')
            class Group {
                @t.primary.autoIncrement public id: number = 0;
                @t created: Date = new Date;
        
                constructor(@t public username: string) {
                }
            }
        
            @entity.name('user').collectionName('users')
            class User {
                @t.primary.autoIncrement public id: number = 0;
                @t created: Date = new Date;
                
                @t.reference() group?: Group;
        
                constructor(@t public username: string) {
                }
            }
        </textarea>

        <textarea codeHighlight>
            //select only users with a group assigned (INNER JOIN)
            const users = await session.query(User).innerJoin('group').find();
            for (const user of users) {
                user.group; //error, since reference was not loaded
            }
        </textarea>

        <textarea codeHighlight>
            //select only users with a group assigned (INNER JOIN) and load the relation
            const users = await session.query(User).innerJoinWith('group').find();
            for (const user of users) {
                user.group.name; //works
            }
        </textarea>

        <p>
            To change join queries, use the same methods but with the <i>use</i> prefix: <code>useJoin</code>,
            <code>useInnerJoin</code>, <code>useJoinWith</code>, or <code>useInnerJoinWith</code>.
            To end the modification of the join query, use on it <code>end()</code> to get the parent
            query back.
        </p>

        <textarea codeHighlight>
            //select only users with a group with name 'admins' assigned (INNER JOIN)
            const users = await session.query(User)
                .useInnerJoinWith('group')
                    .filter({name: 'admins'})
                    .end()
                .find();
            
            for (const user of users) {
                user.group.name; //always admin
            }
        </textarea>

        <h3>Aggregation</h3>

        <p>
            Aggregation methods allow you to count records and aggregate fields.
        </p>

        <p>
            Following examples assume this model schema:
        </p>

        <textarea codeHighlight>
            @entity.name('file')
            class File {
                @t.primary.autoIncrement public id: number = 0;
                @t created: Date = new Date;
        
                @t downloads: number = 0;
            
                @t category: string = 'none';
        
                constructor(@t.index() public path: string) {
                }
            }
        </textarea>

        <p>
            <code>groupBy</code> allows you to group the result into the given field.
        </p>

        <textarea codeHighlight="">
            await database.persist(
                plainToClass(File, {path: 'file1', category: 'images'}),
                plainToClass(File, {path: 'file2', category: 'images'}),
                plainToClass(File, {path: 'file3', category: 'pdfs'})
            );
            
            //[ { category: 'images' }, { category: 'pdfs' } ]
            await session.query(File).groupBy('category').find();
            
        </textarea>

        <p>
            There are several aggregation methods:
            <code>withSum</code>,
            <code>withAverage</code>,
            <code>withCount</code>,
            <code>withMin</code>,
            <code>withMax</code>,
            <code>withGroupConcat</code>. Each requires a field name as first argument, and an optional second
            argument to change the alias.
        </p>

        <textarea codeHighlight>
            await database.query(File).filter({path: 'images/file1'}).patchOne({$inc: {downloads: 15}});
            await database.query(File).filter({path: 'images/file2'}).patchOne({$inc: {downloads: 5}});
        
            //[{ category: 'images', downloads: 20 },{ category: 'pdfs', downloads: 0 }]
            await session.query(File).groupBy('category').withSum('downloads').find();
            
            //[{ category: 'images', downloads: 10 },{ category: 'pdfs', downloads: 0 }]
            await session.query(File).groupBy('category').withAverage('downloads').find();
            
            //[ { category: 'images', amount: 2 }, { category: 'pdfs', amount: 1 } ]
            await session.query(File).groupBy('category').withCount('id', 'amount').find();
        </textarea>

        <h3>Lift</h3>

        <p>
            Lifting a query means adding new functionality to it. This is usually used by either
            plugins or complex architectures in order to split bigger query classes up in
            multiple handy ones.
        </p>

        <textarea codeHighlight>
            import { FilterQuery, Query } from '@deepkit/orm';
            
            class UserQuery<T extends {birthdate?: Date}> extends Query<T>  {
                hasBirthday() {
                    const start = new Date();
                    start.setHours(0,0,0,0);
                    const end = new Date();
                    end.setHours(23,59,59,999);
        
                    return this.filter({$and: [{birthdate: {$gte: start}}, {birthdate: {$lte: end}}]} as FilterQuery<T>);
                }
            }
        
            await session.query(User).lift(UserQuery).hasBirthday().find();
        </textarea>

        <h3>Patch</h3>

        <p>
            Patch is a modification query that patches records that the query describes. 
            The methods <code>patchOne</code> and <code>patchMany</code> terminate the query and execute the patch.
        </p>

        <textarea codeHighlight>
            await database.query(User).filter({username: 'User1'}).patchOne({birthdate: new Date});
            await database.query(User).filter({username: 'User1'}).patchOne({$inc: {visits: 1}});
            
            await database.query(User).patchMany({visits: 0});
        </textarea>

        <h4>Returning</h4>
        
        <p>
            To return the new value for changed fields, use <code>returning</code>.
        </p>
        
        <textarea codeHighlight>
            await database.query(User).patchMany({visits: 0});
            
            //{ modified: 1, returning: { visits: [ 5 ] }, primaryKeys: [ 1 ] }
            const result = await database.query(User)
                .filter({username: 'User1'})
                .returning('username', 'visits')
                .patchOne({$inc: {visits: 5}});
        </textarea>

        <p>
            All official database adapters support the <i>returning</i> feature. Its a way to return
            changed fields from a patch query.
        </p>

        <h3>Delete</h3>
        
        <p>
            Delete is a modification query that deletes records that the query describes.
            The methods <code>deleteOne</code> and <code>deletemany</code> terminate the query and execute the delete.
        </p>
        
        <textarea codeHighlight="">
            const result = await database.query(User)
                .filter({visits: 0})
                .deleteMany();
            
            const result = await database.query(User).filter({id: 4}).deleteOne();
        </textarea>

    `
})
export class DocORMQueryComponent {
}
