import { rpc } from '@deepkit/rpc';
import { BenchmarkRun, FrameworkControllerInterface } from '../../shared';
import { MongoDatabase } from '../db';
import { HtmlResponse, http, HttpBody } from '@deepkit/http';
import { readFile } from 'fs/promises';
import { dirname, join } from 'path';
import { getCurrentFileName } from "@deepkit/core";

@rpc.controller(FrameworkControllerInterface)
export class FrameworkController implements FrameworkControllerInterface {
    constructor(protected db: MongoDatabase) {
    }

    @rpc.action()
    async getLastBenchmarkRuns(): Promise<BenchmarkRun[]> {
        return await this.db.query(BenchmarkRun).sort({ id: 'desc' }).limit(30).find();
    }
}

export class FrameworkHttpController {
    constructor(protected db: MongoDatabase) {
    }

    @http.GET('benchmarks')
    async benchmarks() {
        //we serve it manually to not have SSR. We should add this as feature in @deepkit/angular-universal
        const path = join((process.env.DIST || dirname(getCurrentFileName()) + '/../../../dist/') + 'browser', 'index.html');
        return new HtmlResponse(await readFile(path, 'utf8'));
    }

    @http.POST('benchmark/add').group('benchmarkAuth')
    async postBenchmark(body: HttpBody<BenchmarkRun>) {
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
