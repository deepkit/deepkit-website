import { AfterViewInit, Component, ContentChildren, Input, QueryList } from '@angular/core';
import { CodeHighlightComponent } from '../common/code-highlight.component';

@Component({
    selector: 'code-frame',
    template: `
        <dui-window-frame [height]="show === '' ? height : undefined">
            <div style="text-align: center;position: absolute; left: 0; right: 0; top: -40px;">
                <dui-button-group padding="none">
                    <dui-button (click)="showPage('')" [active]="show === ''">Preview</dui-button>
                    <dui-button *ngIf="hasType('html')" (click)="showPage('html')" [active]="show === 'html'">HTML
                    </dui-button>
                    <dui-button *ngIf="hasType('typescript')" (click)="showPage('typescript')"
                                [active]="show === 'typescript'">TS
                    </dui-button>
                    <dui-button *ngIf="hasType('scss')" (click)="showPage('scss')" [active]="show === 'scss'">SCSS
                    </dui-button>
                </dui-button-group>
            </div>
            <div *ngIf="show === 'html'">
                <ng-content select="[codeHighlight=html]"></ng-content>
            </div>
            <div *ngIf="show === 'typescript'">
                <ng-content select="[codeHighlight=typescript]"></ng-content>
            </div>
            <div *ngIf="show === 'scss'">
                <ng-content select="[codeHighlight=scss]"></ng-content>
            </div>
            <ng-container *ngIf="show === ''">
                <ng-content></ng-content>
            </ng-container>
        </dui-window-frame>
    `,
    styles: [`
        :host ::ng-deep highlighter {
            margin: 0;
        }
        :host ::ng-deep .hljs {
            background: transparent !important;
        }
    `]
})
export class CodeFrameComponent implements AfterViewInit {
    @ContentChildren(CodeHighlightComponent) highlights!: QueryList<CodeHighlightComponent>;

    @Input() height = 300;

    show: '' | 'html' | 'typescript' | 'scss' = '';

    showPage(show: '' | 'html' | 'typescript' | 'scss') {
        this.show = show;
    }

    public hasType(name: string): boolean {
        return Boolean(this.getHighlightForType(name));
    }

    ngAfterViewInit(): void {
    }

    public getHighlightForType(name: string): CodeHighlightComponent | undefined {
        for (const h of this.highlights.toArray()) {
            if (h.codeHighlight === name) {
                return h;
            }
        }

        return;
    }
}
