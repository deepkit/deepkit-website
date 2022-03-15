import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ElementRef,
    Inject,
    OnDestroy,
    PLATFORM_ID,
    ViewChild
} from '@angular/core';
import * as ts from 'typescript';
import {
    CompilerHost,
    createSourceFile,
    Program,
    ScriptKind,
    ScriptTarget,
    SourceFile,
    TransformationContext
} from 'typescript';
import * as type from '@deepkit/type';
import * as typeCompiler from '@deepkit/type-compiler';
import * as orm from '@deepkit/orm';
import { Database } from '@deepkit/orm';
// import * as DeepkitSQLite from '@deepkit/sqlite';
import * as sqlJs from './sql-js-adapter';
import type { editor } from 'monaco-editor';
import { SQLDatabaseAdapter } from '@deepkit/sql';
import { isPlatformBrowser } from '@angular/common';
import { SQLiteConnection } from '@deepkit/sqlite';
import * as lzstring from 'lz-string';
import { createDefaultMapFromCDN, createSystem, createVirtualCompilerHost } from '@typescript/vfs';

const typingFiles = (require as any).context('!!raw-loader!node_modules/@deepkit/', true, /(\/(type|core|sql|sqlite|orm|stopwatch)\/dist\/esm\/).*(\.d\.ts)$/);

@Component({
    selector: 'orm-playground',
    template: `
        <div class="wrapper">
            <div class="layout">
                <div class="browser">
                    <div class="actions">
                        <select [ngModel]="example" (ngModelChange)="setExample($event)">
                            <option [value]="kv.key" *ngFor="let kv of examples|keyvalue">
                                {{kv.key}}
                            </option>
                        </select>
                    </div>
                    <div class="content" style="overflow: visible" #container></div>
                </div>
                <div class="browser">
                    <div class="actions">
                        <div style="display: flex; align-items: center">
                            <button class="primary" style="font-size: 13px; line-height: 15px;" (click)="transpile()">
                                Run
                            </button>
                        </div>

                        <div class="tabs">
                            <button class="tab" [class.active]="tab === 'list'" (click)="openTab('list')">Tables
                            </button>
                            <button class="tab" [class.active]="tab === 'sql'" (click)="openTab('sql')">SQL</button>
                        </div>
                    </div>
                    <div class="content">
                        <div class="tables" *ngIf="tab === 'list'">
                            <table *ngFor="let table of tables; trackBy: trackByIndex">
                                {{table.name}}
                                <tr>
                                    <th *ngFor="let name of table.columns; trackBy: trackByIndex">
                                        {{name}}
                                    </th>
                                </tr>
                                <tr *ngFor="let row of table.items; trackBy: trackByIndex">
                                    <td *ngFor="let name of table.columns; trackBy: trackByIndex">
                                        {{row[name] === undefined ? 'undefined' : (row[name]|json)}}
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div class="dql" *ngIf="tab === 'sql'">
                            <div codeHighlight="sql" [code]="dql"></div>
                        </div>
                    </div>
                    <div class="console">
                        <div *ngFor="let log of logs; trackBy: trackByIndex">{{log}}</div>
                    </div>
                </div>
            </div>
        </div>
    `,
    styleUrls: ['./orm-playground.component.scss']
})
export class OrmPlaygroundComponent implements AfterViewInit, OnDestroy {
    examples: { [name: string]: string } = {
        'basics class': require('!!raw-loader!./examples/basics-class.ts').default,
        'basics interface': require('!!raw-loader!./examples/basics-interface.ts').default,
    };
    example: string = 'basics class';
    js: string = '';
    dql: string = '';

    tab: string = 'list';

    tables: { name: string, items: any[], columns: string[] }[] = [];

    @ViewChild('container') container?: ElementRef;

    protected databases: Database[] = [];

    protected editor?: editor.IStandaloneCodeEditor;

    public logs: string[] = [];
    protected isBrowser: boolean = true;

    protected program?: {
        program: Program,
        host: { compilerHost: CompilerHost, updateFile: (sourceFile: SourceFile) => boolean },
        fsMap: Map<string, string>,
    };
    protected loadingProgram = false;

    constructor(
        protected cd: ChangeDetectorRef,
        @Inject(PLATFORM_ID) protected platformId: any,
    ) {
        this.isBrowser = isPlatformBrowser(platformId);
    }

    openTab(tab: string) {
        this.tab = tab;
        this.cd.detectChanges();
    }

    trackByIndex(index: number) {
        return index;
    }

    ngOnDestroy(): void {
        if (this.editor) {
            this.editor.dispose();
        }
    }

    async loadProgram() {
        if (this.loadingProgram) return;
        this.loadingProgram = true;
        const compilerOptions: ts.CompilerOptions = {
            target: ts.ScriptTarget.ES2015,
            allowNonTsExtensions: true,
            module: ts.ModuleKind.CommonJS,
            moduleResolution: ts.ModuleResolutionKind.NodeJs,
            experimentalDecorators: true,
            esModuleInterop: true,
        };
        const fsMap = await createDefaultMapFromCDN(compilerOptions, ts.version, true, ts, lzstring);
        fsMap.set('index.ts', '');
        const knownModules: { [name: string]: boolean } = {};
        for (const file of typingFiles.keys()) {
            if (!file.includes('node_modules/@deepkit')) continue;
            fsMap.set('/' + file, typingFiles(file).default);
            const moduleName = file.match(/node_modules\/@deepkit\/([\w]+)/)[1];
            if (!knownModules[moduleName]) {
                knownModules[moduleName] = true;
                fsMap.set(
                    `/node_modules/@deepkit/${moduleName}/package.json`,
                    JSON.stringify({
                        name: '@deepkit/' + moduleName, version: '1.0.0',
                        typings: './dist/esm/index.d.ts'
                    })
                );
            }
        }

        const system = createSystem(fsMap);
        fsMap.delete('/lib.webworker.d.ts'); //this throws type errors otherwise

        const host = createVirtualCompilerHost(system, compilerOptions, ts);
        (ts as any).sys = { useCaseSensitiveFileNames: true };
        const program = ts.createProgram({
            rootNames: ['index.ts'],
            options: compilerOptions,
            host: host.compilerHost,
        });
        this.program = { program, host, fsMap };
    }

    async ngAfterViewInit() {
        if (!this.isBrowser) {
            return;
        }

        await this.loadProgram();
        let Sqlite3: any;
        if (this.container) {
            (window as any)._require.config({ paths: { vs: `monaco-editor/vs` } });
            (window as any)._require(['vs/editor/editor.main'], (monaco: any) => {
                monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
                    target: monaco.languages.typescript.ScriptTarget.ESNext,
                    allowNonTsExtensions: true,
                    experimentalDecorators: true,
                    moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
                    module: monaco.languages.typescript.ModuleKind.ESNext,
                    noEmit: true,
                    esModule: true
                });

                const knownModules: { [name: string]: boolean } = {};
                for (const file of typingFiles.keys()) {
                    if (!file.includes('node_modules/@deepkit')) continue;
                    if (file.includes('tests/')) continue;
                    const moduleName = file.match(/node_modules\/@deepkit\/([\w]+)/)[1];
                    const path = 'file:///' + file; //.replace('@', '_');
                    // console.log('register', moduleName, path);
                    const content = typingFiles(file).default;
                    monaco.languages.typescript.typescriptDefaults.addExtraLib(content, path);

                    if (!knownModules[moduleName]) {
                        knownModules[moduleName] = true;
                        monaco.languages.typescript.typescriptDefaults.addExtraLib(
                            JSON.stringify({
                                name: '@deepkit/' + moduleName, version: '1.0.0',
                                typings: './dist/esm/index.d.ts'
                            }), `file:///node_modules/@deepkit/${moduleName}/package.json`);
                    }
                }

                monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
                    noSemanticValidation: false,
                    noSyntaxValidation: false
                });

                this.editor = monaco.editor.create(this.container!.nativeElement, {
                    roundedSelection: false,
                    renderLineHighlight: 'all',
                    automaticLayout: true,
                    minimap: {
                        enabled: false,
                    },
                    theme: 'vs-dark',
                    language: 'typescript',
                    model: monaco.editor.getModel('file:///index.ts') || monaco.editor.createModel(this.examples[this.example], 'typescript', monaco.Uri.parse('file:///index.ts'))
                });

                if (Sqlite3) this.transpile();
            });
        }

        Sqlite3 = (window as any).SQL = await (window as any).initSqlJs({
            // Required to load the wasm binary asynchronously. Of course, you can host it wherever you want
            // You can omit locateFile completely when running in node
            locateFile: (file: any) => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.4.0/dist/${file}`
        });
        SQLiteConnection.DatabaseConstructor = Sqlite3.Database;

        this.transpile();
    }

    async extractDatabaseTables() {
        this.tables = [];
        for (const db of this.databases) {
            if (db.adapter instanceof SQLDatabaseAdapter) {
                const tables = db.adapter.platform.createTables(db.entityRegistry);
                this.dql = '';
                for (const table of tables) {
                    this.dql += db.adapter.platform.getAddTableDDL(table).join('\n') + '\n';
                }
                console.log('this.dql', this.dql);
            }

            for (const entity of db.entityRegistry.entities) {
                this.tables.push({
                    name: entity.getName(),
                    columns: entity.getPropertyNames().map(v => String(v)),
                    items: await db.query(entity).find()
                });
            }
        }
    }

    setExample(name: string) {
        if (!this.editor) return;
        this.editor.getModel()?.setValue(this.examples[name]);
        this.transpile();
    }

    async transpile() {
        if (!this.editor) return;
        const model = this.editor.getModel();
        if (!model) return;

        (globalThis as any).process = undefined;

        if (!this.program) return;

        const sourceFile = createSourceFile('index.ts', this.editor ? model.getValue() : this.examples[this.example], ScriptTarget.ES2018, true, ScriptKind.TS);
        this.program.host.updateFile(sourceFile);
        this.program.fsMap.set('index.ts', this.editor ? model.getValue() : this.examples[this.example]);
        this.program.fsMap.delete('index.js');

        const program = ts.createProgram({
            rootNames: ['index.ts'],
            options: this.program.program.getCompilerOptions(),
            host: this.program.host.compilerHost,
        });

        program.emit(undefined, undefined, undefined, undefined, {
            before: [(context: TransformationContext) => new typeCompiler.ReflectionTransformer(context).withReflectionMode('always').forProgram(program)],
            // before: [(context: TransformationContext) => new typeCompiler.ReflectionTransformer(context).forProgram(program)],
        });

        this.js = (this.program.fsMap.get('index.js') || '').trim();
        console.log('generated', this.js);

        const old = {
            log: console.log,
        };

        console.log = (...args: any[]) => {
            this.logs.push(args.map(v => JSON.stringify(v)).join(' '));
        };

        for (const db of this.databases) {
            db.disconnect();
        }

        this.databases.length = 0;
        this.logs.length = 0;
        const dbs = this.databases;
        // const registeredEntities = { ...getGlobalStore().RegisteredEntities };
        // getGlobalStore().RegisteredEntities = {};

        class LoggedDatabase extends Database {
            constructor(adapter: any, schemas: any[] = []) {
                super(adapter, schemas);
                dbs.push(this);
            }
        }

        try {
            await new Function('require', 'exports', 'return async function() { ' + this.js + '}')((id: string) => {
                if (id === '@deepkit/type') {
                    return type;
                }
                if (id === '@deepkit/orm') {
                    return { ...orm, Database: LoggedDatabase };
                }
                if (id === '@deepkit/sqlite') {
                    return sqlJs;
                }
            }, {})();
        } catch (error: any) {
            console.error(error);
            console.log(error.message);
        } finally {
            Object.assign(console, old);
        }
        // getGlobalStore().RegisteredEntities = registeredEntities;
        await this.extractDatabaseTables();

        this.cd.detectChanges();
    }
}
