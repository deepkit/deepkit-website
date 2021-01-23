import { AfterViewInit, ChangeDetectorRef, Directive, ElementRef, OnInit, ViewChild } from "@angular/core";
import { highlight, languages } from 'prismjs';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { ContentChild } from "@angular/core";
import 'prismjs/components/prism-typescript';

function removeIndent(str: string): string {
    const matches = str.match(/^ +/g);
    if (!matches) return str;
    const initial = matches[0].length;
    let re = RegExp(`^.{${initial}}`, 'gm');
    return str.replace(re, '');
}

@Directive({
    selector: 'textarea[codeHighlight]'
})
export class CodeHighlightComponent implements OnInit {
    constructor(
        protected elementRef: ElementRef<HTMLTextAreaElement>
    ) {
    }

    ngOnInit(): void {
        let code = removeIndent(this.elementRef.nativeElement.value).trim();

        const highlighted = highlight(code, languages['typescript'], 'typescript');

        const div = document.createElement('pre');
        div.classList.add('code');
        div.innerHTML = highlighted;
        this.elementRef.nativeElement.style.display = 'none';

        this.elementRef.nativeElement.after(div);
    }

}
