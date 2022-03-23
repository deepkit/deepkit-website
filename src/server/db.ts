import {Database} from '@deepkit/orm';
import {MongoDatabaseAdapter} from '@deepkit/mongo';
import { BenchmarkRun } from '../shared';
import { Config } from './config';

export class MongoDatabase extends Database {
    constructor(mongoUrl: Config['db']) {
        super(new MongoDatabaseAdapter(mongoUrl), [BenchmarkRun]);
    }
}
