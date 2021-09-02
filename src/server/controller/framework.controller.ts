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
    async getLastBenchmarkRuns(): Promise<BenchmarkRun[]> {
        return await this.db.query(BenchmarkRun).sort({id: 'desc'}).limit(30).find();
    }
}

@injectable
export class FrameworkHttpController {
    constructor(protected db: MongoDatabase) {
    }

    @http.POST('benchmark/add').group('benchmarkAuth')
    async postBenchmark(@http.body() body: BenchmarkRun) {
        const dataSize = Object.keys(body.data).length;

        console.log('benchmark add', body);
        if (!dataSize) {
            throw new Error('Data empty');
        }

        await this.db.persist(body);

        console.log('benchmark added', body);
        return true;
    }

    @http.GET('benchmark').group('benchmarkAuth')
    benchmarkAuthTest() {
        return 'Hello!';
    }
}
