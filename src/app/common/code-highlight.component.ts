import { AfterViewInit, Directive, DoCheck, ElementRef, OnChanges, OnInit } from '@angular/core';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-json';
import { Input } from '@angular/core';

function removeIndent(str: string): string {
    const matches = str.match(/^ +/g);
    if (!matches) return str;
    const initial = matches[0].length;
    const re = RegExp(`^.{${initial}}`, 'gm');
    return str.replace(re, '');
}

@Directive({
    selector: '[codeHighlight]'
})
export class CodeHighlightComponent implements OnInit, OnChanges, AfterViewInit, DoCheck {
    @Input() codeHighlight: string = 'typescript';
    @Input() code?: string;
    @Input() title?: string;

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

    ngAfterViewInit() {
        this.render();
    }

    ngDoCheck() {
        queueMicrotask(() => {
            this.elementRef.nativeElement.after(this.pre);
        });
    }

    render() {
        if (this.elementRef.nativeElement instanceof HTMLTextAreaElement) {
            this.code = removeIndent(this.elementRef.nativeElement.value).trim();
        }

        if (!this.pre) {
            this.pre = document.createElement('pre');
            this.pre.classList.add('code');
            this.pre.classList.add('codeHighlight');
            if (this.title) {
                this.pre.setAttribute('title', this.title);
            }
            this.elementRef.nativeElement.style.display = 'none';
            this.elementRef.nativeElement.after(this.pre);
        }

        const lang = this.codeHighlight || 'typescript';
        const highlighted = highlight(this.code, languages[lang], lang);
        this.pre.innerHTML = highlighted;
    }
}
