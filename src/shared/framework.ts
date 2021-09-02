import { ControllerSymbol } from '@deepkit/rpc';
import { entity, t } from '@deepkit/type';

@entity.name('benchmarkEntry')
export class BenchmarkEntry {
    @t hz!: number;
    @t elapsed!: number;
    @t rme!: number;
    @t mean!: number;
}

@entity.name('benchmarkRun')
export class BenchmarkRun {
    @t.primary.autoIncrement id?: number;
    @t created: Date = new Date();

    @t cpuName: string = '';
    @t cpuClock: number = 0;
    @t cpuCores: number = 0;
    @t memoryTotal: number = 0;

    @t os: string = '';
    @t commit: string = '';

    @t.map(t.map(BenchmarkEntry))
    data: { [fileName: string]: { [method: string]: BenchmarkEntry } } = {};
}

export const FrameworkControllerInterface = ControllerSymbol<FrameworkControllerInterface>('framework', [BenchmarkRun, BenchmarkEntry]);

export interface FrameworkControllerInterface {
    getLastBenchmarkRuns(): Promise<BenchmarkRun[]>;
}
