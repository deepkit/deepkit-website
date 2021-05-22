import { ChangeDetectorRef, Component, Injectable, Input, OnChanges, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';


type ApiDocFlags = {
    isProtected?: true,
    isPrivate?: true,
    isExported?: true
};
type ApiDocGroups = { title: string, kind: number, children: number[] }[];
type ApiDocSources = { fileName: string, line: number, character: number }[];
type ApiDocType = { type: string, name: string, types?: ApiDocType[], typeArguments?: ApiDocType[] };


interface ApiDocItemDecorator {
    name: string;
    arguments: { [name: string]: any };
    type: { type: string, name: string };
}

type ApiDocDecorators = ApiDocItemDecorator[];


interface ApiDocItemClassChildConstructor {
    id: number;
    kind: 512;
    name: 'constructor';
    kindString: 'Constructor';
    flags: ApiDocFlags;
    signature: any[];
    sources: ApiDocSources;
    decorators: undefined;
}

interface ApiDocItemClassChildMethod {
    id: number;
    name: string;
    kind: 2048;
    kindString: 'Method';

    // todo really?
    comment?: { shortText: string };

    inheritedFrom?: {
        type: string;
        name: string;
        id: number;
    };

    signatures: {
        id: number,
        name: string,
        kind: number,
        kindString: string,
        flags: ApiDocFlags,
        type: ApiDocType
    }[];
    flags: ApiDocFlags;
    decorators?: ApiDocDecorators;

    sources: ApiDocSources;
    type?: ApiDocType;
    defaultValue: string;
}

interface ApiDocItemClassChildProperty {
    id: number;
    name: string;
    kind: 1024;
    kindString: 'Property';

    comment?: { shortText: string };

    flags: ApiDocFlags;
    decorators?: ApiDocDecorators;

    sources: ApiDocSources;
    type?: ApiDocType;
    defaultValue: string;
}

interface ApiDocItemChildClass {
    id: number;
    name: string;
    kind: 128;
    kindString: 'Class';

    comment?: { shortText: string, text?: string };

    flags: ApiDocFlags;
    decorators: ApiDocDecorators;
    children?: (ApiDocItemClassChildProperty | ApiDocItemClassChildConstructor | ApiDocItemClassChildMethod)[];

    groups: ApiDocGroups;
    sources: ApiDocSources;
}

interface ApiDocModule {
    id: number;
    name: string;
    kind: 1;
    kindString: 'External module';
    flags: ApiDocFlags;
    originalName: string;
    children: (ApiDocItemChildClass)[];

    groups: ApiDocGroups;
    sources: ApiDocSources;
}

interface ApiDocPackage {
    id: number;
    name: string;
    kind: number;
    flags: ApiDocFlags;

    children: (ApiDocModule)[];
    groups: ApiDocGroups;
}

export function typeToString(type?: ApiDocType): string {
    if (!type) return '';

    if (type.types) {
        return '(' + type.types.map(v => typeToString(v)).join(' | ') + ')';
    }

    if (type.typeArguments) {
        return type.name + '<' + type.typeArguments.map(v => typeToString(v)).join(' | ') + '>';
    }

    return type.name;
}

@Injectable()
export class ApiDocProvider {
    protected docs?: any;

    constructor(private httpClient: HttpClient) {
    }

    async getDocs(): Promise<ApiDocPackage> {
        if (this.docs === undefined) {
            this.docs = await this.httpClient.get('assets/docs.json').toPromise();
        }

        return this.docs;
    }

    async findDocForComponent(module: string, component: string): Promise<ApiDocItemChildClass> {
        const docs = await this.getDocs();

        for (const child of docs.children) {
            if (JSON.parse(child.name) === module) {

                for (const compChild of child.children) {
                    if (compChild.name === component && compChild.kind === 128) {
                        return compChild;
                    }
                }

                throw new Error(`No component ${component} found in ${module}.`);
            }
        }

        throw new Error(`No module ${module} found.`);
    }
}


@Component({
    selector: 'api-doc',
    template: `
        <div class="title">
            <h2>API <code>{{selector}}</code></h2>
            <dui-input *ngIf="tableData.length" icon="search" placeholder="Search" [(ngModel)]="filterQuery"
                       clearer></dui-input>
        </div>
        <div *ngIf="!tableData.length">
            No API docs.
        </div>
        <p *ngIf="comment" [innerHTML]="comment">
        </p>
        <dui-table
            autoHeight
            *ngIf="tableData.length"
            [items]="tableData"
            [selectable]="true"
            [filterQuery]="filterQuery"
            [filterFields]="['name', 'type', 'dataType', 'comment']"
            noFocusOutline
        >
            <dui-table-column name="name" header="Name" [width]="240">
                <ng-container *duiTableCell="let row">
                    <ng-container *ngIf="row.type === 'input'">
                        @Input()
                    </ng-container>
                    <ng-container *ngIf="row.type === 'output'">
                        @Output()
                    </ng-container>
                    {{row.name}}
                </ng-container>
            </dui-table-column>
            <dui-table-column name="dataType" header="Type" [width]="150"></dui-table-column>
            <dui-table-column name="comment" header="Description" [width]="350"></dui-table-column>
        </dui-table>
    `,
    styleUrls: ['./api-doc.component.scss']
})
export class ApiDocComponent implements OnChanges {
    @Input() module!: string;
    @Input() component!: string;

    comment = '';

    selector = '';
    filterQuery = '';
    tableData: { name: string, type: 'input' | 'output' | 'method', dataType: string, comment: string }[] = [];

    constructor(
        private apiDocProvider: ApiDocProvider,
        private cd: ChangeDetectorRef,
    ) {

    }

    async ngOnChanges(changes: SimpleChanges) {
        const docs = await this.apiDocProvider.findDocForComponent(this.module, this.component);
        this.tableData = [];

        for (const decorator of docs.decorators) {
            if (decorator.name === 'Component' || decorator.name === 'Directive') {
                const match = decorator.arguments.obj.match(/['"]?selector['"]?\s?:\s?['"]+([^'"]+)['"]+/i);
                this.selector = match[1];
            }
        }

        if (docs.comment) {
            this.comment = docs.comment.shortText;
            if (docs.comment.text) {
                this.comment += '</br>' + docs.comment.text;
            }
            // const converter = new Converter;
            // this.comment = converter.makeHtml(this.comment);
        }

        if (docs.children) {
            for (const prop of docs.children) {
                if (prop.kindString === 'Property' && prop.decorators) {
                    for (const decorator of prop.decorators) {
                        if (decorator.name === 'Input') {
                            this.tableData.push({
                                name: prop.name,
                                type: 'input',
                                dataType: typeToString(prop.type),
                                comment: prop.comment ? prop.comment.shortText : ''
                            });
                        }

                        if (decorator.name === 'Output') {
                            this.tableData.push({
                                name: prop.name,
                                type: 'output',
                                dataType: typeToString(prop.type),
                                comment: prop.comment ? prop.comment.shortText : ''
                            });
                        }
                    }
                }

                if (prop.kindString === 'Method' && !prop.flags.isProtected && !prop.flags.isPrivate) {
                    if (prop.name.startsWith('ng')) continue;

                    this.tableData.push({
                        name: prop.name,
                        type: 'method',
                        dataType: typeToString(prop.signatures[0].type),
                        comment: prop.comment ? prop.comment.shortText : ''
                    });
                }
            }
        }

        this.cd.detectChanges();
    }
}
