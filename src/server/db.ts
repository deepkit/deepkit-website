import {Database} from '@deepkit/orm';
import {MongoDatabaseAdapter} from '@deepkit/mongo';
import {appConfig} from './config';
import { inject } from '@deepkit/injector';

export class MongoDatabase extends Database {
    constructor(@inject(appConfig.token('db')) mongoUrl: string) {
        super(new MongoDatabaseAdapter(mongoUrl));
    }
}
