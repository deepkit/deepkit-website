import { Database } from '@deepkit/orm';
import { entity, PrimaryKey, AutoIncrement, MinLength } from '@deepkit/type';
import { SQLiteDatabaseAdapter } from '@deepkit/sqlite';

@entity.collection('users')
class User {
    id: number & PrimaryKey & AutoIncrement = 0;
    createdAt: Date = new Date;
    lastName?: string;
    firstName?: string;

    constructor(
        public username: string & MinLength<3>
    ) {
    }
}

const database = new Database(new SQLiteDatabaseAdapter(), [User]);
await database.migrate();

await database.persist(new User('Peter'), new User('Daniel'), new User('Marie'));

const items = await database.query(User).select('username').find();
console.log('items', items);

console.log('ids', await database.query(User).findField('id'));
