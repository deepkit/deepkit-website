import { ControllerSymbol } from '@deepkit/rpc';
import { AutoIncrement, entity, PrimaryKey, t } from '@deepkit/type';

@entity.name('benchmarkEntry')
export class BenchmarkEntry {
    hz!: number;
    elapsed!: number;
    rme!: number;
    mean!: number;
}

@entity.name('benchmarkRun')
export class BenchmarkRun {
    id: number & PrimaryKey & AutoIncrement = 0;
    created: Date = new Date();

    cpuName: string = '';
    cpuClock: number = 0;
    cpuCores: number = 0;
    memoryTotal: number = 0;

    os: string = '';
    commit: string = '';

    data: { [fileName: string]: { [method: string]: BenchmarkEntry } } = {};
}

export const FrameworkControllerInterface = ControllerSymbol<FrameworkControllerInterface>('framework', [BenchmarkRun, BenchmarkEntry]);

export interface FrameworkControllerInterface {
    getLastBenchmarkRuns(): Promise<BenchmarkRun[]>;
}
