import {Database} from "@deepkit/orm";
import {MongoDatabaseAdapter} from "@deepkit/mongo";
import {inject} from "@deepkit/framework";

export class MongoDatabase extends Database {
    constructor(@inject().config('mongo_url') mongoUrl: string) {
        super(new MongoDatabaseAdapter(mongoUrl));
        this.name = 'sqlite';
    }
}
