import { ChangeDetectorRef, Component, Injectable, Input, OnChanges, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Converter} from 'showdown';

type ApiDocFlags = {
    isProtected?: true,
    isPrivate?: true,
    isExported?: true
};
type ApiDocGroups = { title: string, kind: number, children: number[] }[];
type ApiDocSources = { fileName: string, line: number, character: number }[];

type ApiDocTypeDeclarationType = {
    kind: 65536; // type literal
    signatures?: ApiDocTypeDeclaration[];
    children?: ApiDocTypeDeclarationVariable[];
};

type ApiDocTypeDeclarationCallSignature = {
    kind: 4096; // call signature
    parameters: ApiDocTypeDeclarationParameter[];
    type: ApiDocType;
};

type ApiDocTypeDeclarationParameter = {
    kind: 32768; // Parameter
    kindString: 'Parameter';
    name: string;
    type: ApiDocType;
};
type ApiDocTypeDeclarationVariable = {
    kind: 32; // Parameter
    kindString: 'Variable';
    name: string;
    type: ApiDocType;
};

type ApiDocTypeDeclaration = ApiDocTypeDeclarationType | ApiDocTypeDeclarationCallSignature | ApiDocTypeDeclarationParameter;
// type ApiDocTypeDeclaration = {
//     kind: number
//     kindString: string
//     signatures: Array(1)
//     flags: { isExported: true }
//     id: 709
//     kind: 4096
//     kindString: 'Call signature'
//     name: '__call'
//     parameters: Array(1)
//     0: { id: 710, name: 'bla', kind: 32768, kindString: 'Parameter', flags: { … }, … }
//     length: 1
//     __proto__: Array(0)
//     type: { type: 'union', types: Array(2) }
// };
type ApiDocType =
    { type: 'array', elementType: ApiDocType }
    | { type: 'stringLiteral', value: any }
    | { type: 'intrinsic', name: string }
    | { type: 'union', types: ApiDocType[], }
    | { type: 'reference', name: string, typeArguments?: ApiDocType[] }
    | { type: 'typeParameter', name: string, }
    | { type: 'reflection', declaration: ApiDocTypeDeclaration, }
// |{ type: string, name: string, types?: ApiDocType[], typeArguments?: ApiDocType[] }
    ;


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
        parameters?: ApiDocTypeDeclarationParameter[],
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

export function isOptional(type?: ApiDocType) {
    if (!type) {
        return false;
    }

    if (type.type === 'union') {
        return type.types.some(v => v.type === 'intrinsic' && v.name === 'undefined');
    }
    return false;
}

export function typeToString(type?: ApiDocType, d: number = 0): string {
    if (!type) {
        return '';
    }

    if ((type as any).name === 'Observable') {
        console.log(type);
    }

    if (type.type === 'stringLiteral') {
        return `'${type.value}'`;
    }

    if (type.type === 'union') {
        if (d === 0) {
            return type.types
                .filter(v => !(v.type === 'intrinsic' && v.name === 'undefined'))
                .map(v => typeToString(v, d + 1)).join(' | ');
        }
        return '(' + type.types.map(v => typeToString(v, d + 1)).join(' | ') + ')';
    }

    if (type.type === 'array') {
        return typeToString(type.elementType, d + 1) + '[]';
    }

    if (type.type === 'intrinsic') {
        return type.name;
    }

    if (type.type === 'reference') {
        if (type.typeArguments) {
            return `${type.name}<${type.typeArguments.map(typeToString).join(', ')}>`;
        }
        return type.name;
    }

    if (type.type === 'typeParameter') {
        return type.name;
    }

    if (type.type === 'reflection' && type.declaration.kind === 65536) {
        if (type.declaration.children) {
            // object signature
            const vars: string[] = [];
            for (const c of type.declaration.children) {
                vars.push(
                    c.name + (isOptional(c.type) ? '?' : '') + ': ' + typeToString(c.type)
                );
            }
            return `{${vars.join(', ')}}`;
        }

        if (type.declaration.signatures) {
            // function signature
            for (const sig of type.declaration.signatures) {
                if (sig.kind === 4096) {
                    const params: string[] = [];
                    if (sig.parameters) {
                        for (const p of sig.parameters) {
                            params.push(
                                p.name + (isOptional(p.type) ? '?' : '') + ': ' + typeToString(p.type)
                            );
                        }
                    }

                    return `(${params.join(', ')}) => ` + typeToString(sig.type, 1);
                }
            }
        }
    }

    console.log('type name empty', type);

    return '';
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
                this.comment += '\n\n' + docs.comment.text;
            }
            const converter = new Converter();
            this.comment = converter.makeHtml(this.comment);
        }

        if (docs.children) {
            for (const prop of docs.children) {
                if (prop.kindString === 'Property' && prop.decorators) {
                    for (const decorator of prop.decorators) {
                        if (decorator.name === 'Input') {
                            this.tableData.push({
                                name: prop.name + (isOptional(prop.type) ? '?' : ''),
                                type: 'input',
                                dataType: typeToString(prop.type),
                                comment: prop.comment ? prop.comment.shortText : ''
                            });
                        }

                        if (decorator.name === 'Output') {
                            this.tableData.push({
                                name: prop.name + (isOptional(prop.type) ? '?' : ''),
                                type: 'output',
                                dataType: typeToString(prop.type),
                                comment: prop.comment ? prop.comment.shortText : ''
                            });
                        }
                    }
                }

                if (prop.kindString === 'Method' && !prop.flags.isProtected && !prop.flags.isPrivate) {
                    if (prop.name.startsWith('ng')) {
                        continue;
                    }

                    const params: string[] = !prop.signatures[0].parameters ?
                        [] :
                        prop.signatures[0].parameters.map(v => v.name + (isOptional(v.type) ? '?' : '') + ': ' + typeToString(v.type));

                    this.tableData.push({
                        name: prop.name + '(' + params.join(', ') + ')',
                        type: 'method',
                        dataType: typeToString(prop.signatures[0].type, 1),
                        comment: prop.comment ? prop.comment.shortText : ''
                    });
                }
            }
        }
        this.cd.detectChanges();
    }
}

