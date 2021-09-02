import {rpc} from '@deepkit/rpc';
import {BenchmarkRun, FrameworkControllerInterface} from '../../shared';
import {MongoDatabase} from '../db';
import {t} from '@deepkit/type';
import { injectable } from '@deepkit/injector';
import { HtmlResponse, http } from '@deepkit/http';
import { readFile } from 'fs/promises';
import { join } from 'path';

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

    @http.GET('benchmarks')
    async benchmarks() {
        //we serve it manually to not have SSR. We should add this as feature in @deepkit/angular-universal
        const path = join((process.env.DIST || __dirname + '/../../../dist/') + 'browser', 'index.html');
        return new HtmlResponse(await readFile(path, 'utf8'));
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
