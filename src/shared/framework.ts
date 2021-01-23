import {ControllerSymbol} from "@deepkit/rpc";
import {entity, t} from "@deepkit/type";


@entity.name('benchmark/entry')
export class BenchmarkEntry {
    @t hz!: number;
    @t elapsed!: number;
    @t rme!: number;
    @t mean!: number;
}

@entity.name('benchmark/run')
export class BenchmarkRun {
    @t.primary.autoIncrement id?: number;
    @t created: Date = new Date;

    @t.map(t.map(t.map(BenchmarkEntry)))
    data: { [fileName: string]: { [suite: string]: { [method: string]: BenchmarkEntry } } } = {};
}

export const FrameworkControllerInterface = ControllerSymbol<FrameworkControllerInterface>('framework');
export interface FrameworkControllerInterface {
    getLastBenchmarkRun(): Promise<BenchmarkRun>;
}
