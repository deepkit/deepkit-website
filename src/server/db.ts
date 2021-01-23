import {Database} from "@deepkit/orm";
import {MongoDatabaseAdapter} from "@deepkit/mongo";
import {inject} from "@deepkit/framework";
import {appConfig} from "./config";

export class MongoDatabase extends Database {
    constructor(@inject(appConfig.token('db')) mongoUrl: string) {
        super(new MongoDatabaseAdapter(mongoUrl));
    }
}
