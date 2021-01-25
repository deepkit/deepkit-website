import { AfterViewInit, ChangeDetectorRef, Directive, ElementRef, OnChanges, OnInit, ViewChild } from "@angular/core";
import { highlight, languages } from 'prismjs';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { ContentChild } from "@angular/core";
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-sql';
import { Input } from "@angular/core";

function removeIndent(str: string): string {
    const matches = str.match(/^ +/g);
    if (!matches) return str;
    const initial = matches[0].length;
    let re = RegExp(`^.{${initial}}`, 'gm');
    return str.replace(re, '');
}

@Directive({
    selector: '[codeHighlight]'
})
export class CodeHighlightComponent implements OnInit, OnChanges {
    @Input() codeHighlight?: string;
    @Input() code?: string;

    protected pre?: HTMLPreElement;

    constructor(
        protected elementRef: ElementRef<HTMLTextAreaElement | HTMLDivElement>
    ) {
    }

    ngOnChanges(): void {
        this.render();
    }

    ngOnInit(): void {
        this.render();
    }

    render() {
        if (this.elementRef.nativeElement instanceof HTMLTextAreaElement) {
            this.code = removeIndent(this.elementRef.nativeElement.value).trim();
        }

        if (!this.pre) {
            this.pre = document.createElement('pre');
            this.pre.classList.add('code');
            this.elementRef.nativeElement.style.display = 'none';
            this.elementRef.nativeElement.after(this.pre);
        }

        const lang = this.codeHighlight || 'typescript';
        const highlighted = highlight(this.code, languages[lang], lang);
        this.pre.innerHTML = highlighted;
    }

}
