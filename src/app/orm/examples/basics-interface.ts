import { Database } from '@deepkit/orm';
import { Entity, MinLength, PrimaryKey, integer } from '@deepkit/type';
import { SQLiteDatabaseAdapter } from '@deepkit/sqlite';

interface User extends Entity<{collection: 'users'}> {
    id: integer & PrimaryKey;
    createdAt: Date;
    lastName?: string;
    firstName?: string;
    username: string & MinLength<3>;
}

const database = new Database(new SQLiteDatabaseAdapter()).register<User>();
await database.migrate();

await database.persist(
    { id: 0, username: 'Peter', createdAt: new Date },
    { id: 1, username: 'Daniel', createdAt: new Date }
);

const items = await database.query<User>().select('username').find();
console.log('items', items);

console.log('ids', await database.query<User>().findField('id'));
