import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ControllerClient } from '../client';
import type { Data, Layout } from 'plotly.js-dist-min';
import { BenchmarkEntry, BenchmarkRun } from '../../shared';
import { AnchorService } from '../provider/anchor';

type PlotData = Data & { x: number[], y: number[], first: number };
type Graph = { title: string, visible: boolean, id: string, markdown?: string, showMs?: true, data: PlotData[], layout: Partial<Layout> };

function sortByOps(a: PlotData, b: PlotData) {
    if (a.first > b.first) {
        return -1;
    }
    if (a.first < b.first) {
        return +1;
    }
    return 0;
}

function sortByMS(a: PlotData, b: PlotData) {
    if (a.first < b.first) {
        return -1;
    }
    if (a.first > b.first) {
        return +1;
    }
    return 0;
}

@Component({
    template: `
        <main>
            <h1>Benchmarks</h1>

            <p>
                Here you see last 30 benchmark runs (x axis) and their results (y axis). On the y axis you either see
                operations/second or milliseconds/operation. In each section you find more information, the link to
                the benchmark as well as the command to run to execute the benchmark on your machine.
            </p>

            <p>
                To prepare a local Deepkit Framework checkout, please follow <a routerLink="/documentation/benchmark">documentation/benchmark</a>.
            </p>

            <div *ngIf="graphs.length === 0">
                Loading ...
            </div>

            <div *ngIf="runs[0] as lastRun">
                <h4>Hardware used</h4>
                <table class="hardware">
                    <tr>
                        <td>CPU</td>
                        <td>{{lastRun.cpuName}}</td>
                    </tr>
                    <tr>
                        <td>CPU clock</td>
                        <td>{{lastRun.cpuCores}}x {{lastRun.cpuClock}}Ghz</td>
                    </tr>
                    <tr>
                        <td>Memory</td>
                        <td>{{lastRun.memoryTotal / 1024 / 1024 / 1024}}GB</td>
                    </tr>
                </table>
            </div>

            <h4>Available benchmarks</h4>

            <div class="benchmark-selection">
                <div *ngFor="let g of graphs">
                    <input [id]="'c' + g.id" [(ngModel)]="g.visible" (ngModelChange)="cd.detectChanges()"
                           type="checkbox"/> <label [for]="'c' + g.id">{{g.title}}</label>
                </div>
            </div>

            <ng-container *ngFor="let g of graphs">
                <div class="benchmark-run" *ngIf="g.visible">
                    <a [name]="g.id"></a>
                    <h3>{{g.title}}</h3>

                    <div class="description" *ngIf="g.markdown">
                        <markdown [data]="g.markdown"></markdown>
                    </div>

                    <div class="how-to-run">
                        <pre>$ npm run benchmark {{benchmarkArgFromId(g.id)}}</pre>
                    </div>

                    <div class="link">
                        <a routerLink="/benchmarks" [fragment]="g.id">Direct link</a>.
                        Link to source:
                        <a href="https://github.com/deepkit/deepkit-framework/tree/master/packages/benchmark/src/{{pathFromId(g.id)}}">github.com/deepkit/deepkit-framework</a>.<br/>
                    </div>

                    <div class="layout">
                        <div class="plot">
                            <plotly-plot [data]="g.data" [layout]="g.layout"></plotly-plot>
                        </div>
                        <div class="text">
                            <h4>Last run</h4>

                            <table class="last-results">
                                <tr *ngFor="let d of g.data">
                                    <td>{{d.name}}:</td>
                                    <td class="y">
                                        {{d.first|number:'0.3'}}
                                        {{g.showMs ? 'ms/op' : 'ops/s'}}
                                    </td>
                                </tr>
                            </table>

                            <div class="results-info" *ngIf="g.showMs">Milliseconds per operation. Less is better.</div>
                            <div class="results-info" *ngIf="!g.showMs">Operations per second. More is better.</div>
                        </div>
                    </div>
                </div>
            </ng-container>
        </main>
    `,
    styleUrls: ['./benchmarks.component.scss']
})
export class BenchmarksComponent implements OnInit {
    public graphs: Graph[] = [];
    public runs: BenchmarkRun[] = [];
    protected defaultLayout: Partial<Layout> = {
        autosize: true, height: 300,
        margin: {
            l: 50,
            r: 50,
            b: 50,
            t: 25,
            pad: 4
        }
    };

    protected currentX: number = 0;

    protected graphFeeder: ((file: string, suit: { [entry: string]: BenchmarkEntry }) => void)[] = [];

    constructor(
        protected client: ControllerClient,
        public cd: ChangeDetectorRef,
        public anchor: AnchorService
    ) {
    }

    pathFromId(id: string) {
        id = id.includes(':') ? id.substr(0, id.lastIndexOf(':')) : id;
        return id.substr(0, id.lastIndexOf('/'));
    }

    benchmarkArgFromId(id: string) {
        id = id.includes(':') ? id.substr(0, id.lastIndexOf(':')) : id;
        return id;
    }

    protected createGraph(id: string, title: string, plots: { [file: string]: { label: string, entry: string } },
                          options: { markdown?: string, showMs?: true } = {}) {
        const showMs = !!options && options.showMs;
        const graph: Graph = {
            id,
            visible: true,
            title,
            ...options,
            data: Object.values(plots).map(v => {
                return { x: [], first: 0, y: [], mode: 'lines', name: v.label };
            }),
            layout: this.defaultLayout
        };
        this.graphs.push(graph);

        const fileToIndex: { [file: string]: { index: number, entry: string }[] } = {};
        let i = 0;
        for (let [file, desc] of Object.entries(plots)) {
            if (file.includes(':')) {
                file = file.substr(0, file.lastIndexOf(':'));
            }
            if (!fileToIndex[file]) {
                fileToIndex[file] = [];
            }
            fileToIndex[file].push({ entry: desc.entry, index: i++ });
        }

        this.graphFeeder.push((file: string, suit: { [entry: string]: BenchmarkEntry }) => {
            const plot = fileToIndex[file];
            if (plot === undefined) {
                return;
            }
            for (const p of plot) {
                const d = graph.data[p.index];
                if (!suit[p.entry]) {
                    return;
                }

                const y = showMs ? suit[p.entry].mean : suit[p.entry].hz;

                if (!d.first) {
                    d.first = y;
                }
                d.x.push(this.currentX);
                d.y.push(y);
            }
        });
    }

    async ngOnInit() {
        this.runs = await this.client.framework.getLastBenchmarkRuns();

        this.createGraph('type/serialization/small', 'Serialization', {
            'type/serialization/small-deepkit': { label: 'deepkit/type', entry: 'serialize' },
            'type/serialization/small-class-transformer': { label: 'class-transformer', entry: 'serialize' },
            'type/serialization/small-cerialize': { label: 'cerialize', entry: 'serialize' },
        }, {
            markdown: `
            This benchmark tests the serialization from javascript types (Date, Array, objects, etc) to JSON objects.
            The model in question looks like that:
            \`\`\`typescript
            class Model {
                ready?: boolean;
                tags: string[] = [];
                priority: number = 0;
                constructor(public id: number, public name: string) {
                }
            }
            \`\`\`
        `
        });

        this.createGraph('type/serialization/small:deserialize', 'Deserialization', {
            'type/serialization/small-deepkit': { label: 'deepkit/type', entry: 'deserialize' },
            'type/serialization/small-class-transformer': { label: 'class-transformer', entry: 'deserialize' },
            'type/serialization/small-cerialize': { label: 'cerialize', entry: 'deserialize' },
        }, {
            markdown: `
            This benchmark tests the deserialization from JSON objects to javascript types (Date, Array, objects, etc).
            The model in question looks like that:
            \`\`\`typescript
            class Model {
                ready?: boolean;
                tags: string[] = [];
                priority: number = 0;
                constructor(public id: number, public name: string) {
                }
            }
            \`\`\`
        `
        });

        this.createGraph('type/validation/small', 'Validation', {
            'type/validation/small-deepkit': { label: 'deepkit/type', entry: 'validate' },
            'type/validation/small-class-validator': { label: 'class-validator', entry: 'validate' },
            'type/validation/small-avj': { label: 'Ajv', entry: 'validate' },
            'type/validation/small-io-ts': { label: 'io-ts', entry: 'validate' },
        }, {
            markdown: `
            This benchmark tests the validation performance of a data structure.
            The model in question looks like that:
            \`\`\`typescript
            const modelSchema = t.schema({
                number: t.number,
                negNumber: t.number.negative(),
                maxNumber: t.number.maximum(500),
                strings: t.array(t.string),
                longString: t.string,
                boolean: t.boolean,
                deeplyNested: t.type({
                    foo: t.string,
                    num: t.number,
                    bool: t.boolean
                })
            });
            \`\`\`
        `
        });

        this.createGraph('orm/end-to-end/mongo/', 'ORM MongoDB Fetch 10k', {
            'orm/end-to-end/mongo/deepkit-10k': { label: 'deepkit/type', entry: 'fetch' },
            'orm/end-to-end/mongo/type-orm-10k': { label: 'TypeORM', entry: 'fetch' },
            'orm/end-to-end/mongo/mongoose-10k': { label: 'mongoose', entry: 'fetch' },
            'orm/end-to-end/mongo/mongo-10k': { label: 'node-mongodb-native', entry: 'fetch' },
            'orm/end-to-end/mongo/mikro-orm-10k': { label: 'Mikro-ORM', entry: 'fetch' },
        }, {
            showMs: true,
            markdown: `
            This benchmark tests the performance of fetching 10.000 records from local MongoDB.
        `
        });

        this.createGraph('orm/end-to-end/mongo/:1', 'ORM MongoDB Fetch 1', {
            'orm/end-to-end/mongo/deepkit-10k': { label: 'deepkit/type', entry: 'fetch-1' },
            'orm/end-to-end/mongo/type-orm-10k': { label: 'TypeORM', entry: 'fetch-1' },
            'orm/end-to-end/mongo/mongoose-10k': { label: 'mongoose', entry: 'fetch-1' },
            'orm/end-to-end/mongo/mongo-10k': { label: 'node-mongodb-native', entry: 'fetch-1' },
            'orm/end-to-end/mongo/mikro-orm-10k': { label: 'Mikro-ORM', entry: 'fetch-1' },
        }, {
            showMs: true,
            markdown: `
            This benchmark tests the performance of fetching 1 record from local MongoDB.
        `
        });

        this.createGraph('orm/end-to-end/mongo/:insert', 'ORM MongoDB Insert 10k', {
            'orm/end-to-end/mongo/deepkit-10k': { label: 'deepkit/type', entry: 'insert' },
            'orm/end-to-end/mongo/type-orm-10k': { label: 'TypeORM', entry: 'insert' },
            'orm/end-to-end/mongo/mongoose-10k': { label: 'mongoose', entry: 'insert' },
            'orm/end-to-end/mongo/mongo-10k': { label: 'node-mongodb-native', entry: 'insert' },
            'orm/end-to-end/mongo/mikro-orm-10k': { label: 'Mikro-ORM', entry: 'insert' },
        }, {
            showMs: true,
            markdown: `
            This benchmark tests the performance of inserting 10.000 records in local MongoDB.
            Note that although Deepkit is a full-fledged ORM that does validation on each record before inserting,
            it is still on average faster than the official node mongodb client.
        `
        });

        this.createGraph('orm/end-to-end/sqlite/', 'ORM SQLite Fetch 10k', {
            'orm/end-to-end/sqlite/deepkit-10k': { label: 'deepkit/type', entry: 'fetch' },
            'orm/end-to-end/sqlite/sequelize-orm-10k': { label: 'Sequelize', entry: 'fetch' },
            'orm/end-to-end/sqlite/type-orm-10k': { label: 'TypeORM', entry: 'fetch' },
            'orm/end-to-end/sqlite/mikro-orm-10k': { label: 'Mikro-ORM', entry: 'fetch' },
        }, {
            showMs: true,
            markdown: `
            This benchmark tests the performance of fetching 10.000 records from a local SQLite database.
        `
        });


        this.createGraph('orm/end-to-end/sqlite/1:', 'ORM SQLite Fetch 1', {
            'orm/end-to-end/sqlite/deepkit-10k': { label: 'deepkit/type', entry: 'fetch-1' },
            'orm/end-to-end/sqlite/sequelize-orm-10k': { label: 'Sequelize', entry: 'fetch-1' },
            'orm/end-to-end/sqlite/type-orm-10k': { label: 'TypeORM', entry: 'fetch-1' },
            'orm/end-to-end/sqlite/mikro-orm-10k': { label: 'Mikro-ORM', entry: 'fetch-1' },
        }, {
            showMs: true,
            markdown: `
            This benchmark tests the performance of fetching 1 record from a local SQLite database.
        `
        });

        this.createGraph('orm/end-to-end/sqlite/:insert', 'ORM SQLite Insert 10k', {
            'orm/end-to-end/sqlite/deepkit-10k': { label: 'deepkit/type', entry: 'insert' },
            'orm/end-to-end/sqlite/sequelize-orm-10k': { label: 'Sequelize', entry: 'insert' },
            'orm/end-to-end/sqlite/type-orm-10k': { label: 'TypeORM', entry: 'insert' },
            'orm/end-to-end/sqlite/mikro-orm-10k': { label: 'Mikro-ORM', entry: 'insert' },
        }, {
            showMs: true,
            markdown: `
            This benchmark tests the performance of inserting 10.000 records to a local SQLite database.
        `
        });

        this.createGraph('orm/end-to-end/mysql/', 'ORM MySQL Fetch 10k', {
            'orm/end-to-end/mysql/deepkit-10k': { label: 'deepkit/type', entry: 'fetch' },
            'orm/end-to-end/mysql/sequelize-orm-10k': { label: 'Sequelize', entry: 'fetch' },
            'orm/end-to-end/mysql/prisma-10k': { label: 'Prisma', entry: 'fetch' },
            'orm/end-to-end/mysql/mikro-orm-10k': { label: 'Mikro-ORM', entry: 'fetch' },
            'orm/end-to-end/mysql/type-orm-10k': { label: 'TypeORM', entry: 'fetch' },
        }, {
            showMs: true,
            markdown: `
            This benchmark tests the performance of fetching 10.000 records from local MySQL.
        `
        });

        this.createGraph('orm/end-to-end/mysql/:1', 'ORM MySQL Fetch 1', {
            'orm/end-to-end/mysql/deepkit-10k': { label: 'deepkit/type', entry: 'fetch-1' },
            'orm/end-to-end/mysql/sequelize-orm-10k': { label: 'Sequelize', entry: 'fetch-1' },
            'orm/end-to-end/mysql/prisma-10k': { label: 'Prisma', entry: 'fetch-1' },
            'orm/end-to-end/mysql/mikro-orm-10k': { label: 'Mikro-ORM', entry: 'fetch-1' },
            'orm/end-to-end/mysql/type-orm-10k': { label: 'TypeORM', entry: 'fetch-1' },
        }, {
            showMs: true,
            markdown: `
            This benchmark tests the performance of fetching 1 record from local MySQL.
        `
        });

        this.createGraph('orm/end-to-end/mysql/:insert', 'ORM MySQL Insert 10k', {
            'orm/end-to-end/mysql/deepkit-10k': { label: 'deepkit/type', entry: 'insert' },
            'orm/end-to-end/mysql/sequelize-orm-10k': { label: 'Sequelize', entry: 'insert' },
            'orm/end-to-end/mysql/prisma-10k': { label: 'Prisma', entry: 'insert' },
            'orm/end-to-end/mysql/mikro-orm-10k': { label: 'Mikro-ORM', entry: 'insert' },
            'orm/end-to-end/mysql/type-orm-10k': { label: 'TypeORM', entry: 'insert' },
        }, {
            showMs: true,
            markdown: `
            This benchmark tests the performance of inserting 10.000 records to local MySQL.
        `
        });

        this.createGraph('orm/end-to-end/postgresql/', 'ORM PostgreSQL Fetch 10k', {
            'orm/end-to-end/postgresql/deepkit-10k': { label: 'deepkit/type', entry: 'fetch' },
            'orm/end-to-end/postgresql/sequelize-orm-10k': { label: 'Sequelize', entry: 'fetch' },
            'orm/end-to-end/postgresql/prisma-10k': { label: 'Prisma', entry: 'fetch' },
            'orm/end-to-end/postgresql/mikro-orm-10k': { label: 'Mikro-ORM', entry: 'fetch' },
            'orm/end-to-end/postgresql/type-orm-10k': { label: 'TypeORM', entry: 'fetch' },
        }, {
            showMs: true,
            markdown: `
            This benchmark tests the performance of fetching 10.000 records from local MySQL.
        `
        });

        this.createGraph('orm/end-to-end/postgresql/:1', 'ORM PostgreSQL Fetch 1', {
            'orm/end-to-end/postgresql/deepkit-10k': { label: 'deepkit/type', entry: 'fetch-1' },
            'orm/end-to-end/postgresql/sequelize-orm-10k': { label: 'Sequelize', entry: 'fetch-1' },
            'orm/end-to-end/postgresql/prisma-10k': { label: 'Prisma', entry: 'fetch-1' },
            'orm/end-to-end/postgresql/mikro-orm-10k': { label: 'Mikro-ORM', entry: 'fetch-1' },
            'orm/end-to-end/postgresql/type-orm-10k': { label: 'TypeORM', entry: 'fetch-1' },
        }, {
            showMs: true,
            markdown: `
            This benchmark tests the performance of fetching 10.000 records from local MySQL.
        `
        });

        this.createGraph('orm/end-to-end/postgresql/:insert', 'ORM PostgreSQL Insert 10k', {
            'orm/end-to-end/postgresql/deepkit-10k': { label: 'deepkit/type', entry: 'insert' },
            'orm/end-to-end/postgresql/sequelize-orm-10k': { label: 'Sequelize', entry: 'insert' },
            'orm/end-to-end/postgresql/prisma-10k': { label: 'Prisma', entry: 'insert' },
            'orm/end-to-end/postgresql/mikro-orm-10k': { label: 'Mikro-ORM', entry: 'insert' },
            'orm/end-to-end/postgresql/type-orm-10k': { label: 'TypeORM', entry: 'insert' },
        }, {
            showMs: true,
            markdown: `
            This benchmark tests the performance of inserting 10.000 records to local MySQL.
        `
        });

        this.createGraph('bson/parser', 'BSON Parser', {
            'bson/parser': { label: 'deepkit/bson', entry: 'deepkit/bson' },
            'bson/parser:1': { label: 'js-bson', entry: 'official-js-bson' },
            'bson/parser:2': { label: 'bson-ext', entry: 'official-bson-ext' },
            'bson/parser:3': { label: 'JSON.parse()', entry: 'JSON.parse()' },
        }, {
            markdown: `
            This benchmark tests the performance of parsing BSON of 10.000 JavaScript objects.
        `
        });

        this.createGraph('bson/serializer', 'BSON Serializer', {
            'bson/serializer': { label: 'deepkit/bson', entry: 'deepkit/bson' },
            'bson/serializer:1': { label: 'js-bson', entry: 'official-js-bson' },
            'bson/serializer:2': { label: 'bson-ext', entry: 'official-bson-ext' },
            'bson/serializer:3': { label: 'JSON.stringify()', entry: 'JSON.stringify()' },
        }, {
            markdown: `
            This benchmark tests the performance of serializing 10.000 JavaScript objects to BSON.
        `
        });

        this.currentX = this.runs.length;
        for (const run of this.runs) {
            this.currentX--;

            for (const [file, suit] of Object.entries(run.data)) {
                for (const feeder of this.graphFeeder) {
                    feeder(file, suit);
                }
            }
        }

        for (const graph of this.graphs) {
            if (graph.showMs) {
                graph.data.sort(sortByMS);
            } else {
                graph.data.sort(sortByOps);
            }
        }

        this.graphs = this.graphs.slice();
        this.cd.detectChanges();
        this.anchor.scrollToAnchor();
    }

}
