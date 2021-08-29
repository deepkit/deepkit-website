import {rpc} from '@deepkit/rpc';
import {BenchmarkRun, FrameworkControllerInterface} from '../../shared';
import {MongoDatabase} from '../db';
import {t} from '@deepkit/type';
import { injectable } from '@deepkit/injector';
import { http } from '@deepkit/http';

@rpc.controller(FrameworkControllerInterface)
export class FrameworkController implements FrameworkControllerInterface {
    constructor(protected db: MongoDatabase) {
    }

    @rpc.action()
    @t.array(BenchmarkRun)
    async getLastBenchmarkRun(): Promise<BenchmarkRun> {
        return await this.db.query(BenchmarkRun).sort({id: 'desc'}).findOne();
    }
}

@injectable
export class FrameworkHttpController {
    constructor(protected db: MongoDatabase) {
    }

    @http.POST('benchmark/add').group('benchmarkAuth')
    async postBenchmark(@http.body() body: BenchmarkRun) {
        const session = this.db.createSession();
        const dataSize = Object.keys(body.data).length;
        if (!dataSize) {
            throw new Error('Data empty');
        }

        if (dataSize === 1) {
            console.log('benchmark not added, since only one data point');
            return false;
        }

        session.add(body);
        await session.commit();

        console.log('benchmark added', body);
        return true;
    }

    @http.GET('benchmark').group('benchmarkAuth')
    benchmarkAuthTest() {
        return 'Hello!';
    }
}
