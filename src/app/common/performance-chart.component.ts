import { AfterViewInit, ChangeDetectorRef, ContentChildren, QueryList } from '@angular/core';
import { Component, Directive, Input } from '@angular/core';

@Directive({
    selector: 'performance-entry',
})
export class PerformanceEntryDirective {
    @Input() title: string = '';
    @Input() value: number = 0;
}

@Component({
    selector: 'performance-chart',
    template: `
      <div class="boards">
        <div class="bar" [style.height.px]="item.height" *ngFor="let item of items">
          <div class="label" [style.bottom.px]="item.labelPos">{{item.title}}</div>
          <div class="value">{{item.value|number:format}}</div>
          <div class="line" *ngIf="item.labelPos > item.height"
               [style.bottom.px]="item.height"
               [style.height.px]="item.labelPos-item.height"
          ></div>
        </div>
      </div>
      <div class="y">
        <div>{{yAxis}}</div>
      </div>
    `,
    styles: [`
        :host {
            display: flex;
            margin: 15px 0;
        }

        .y {
            position: relative;
            flex: 0 0 30px;
        }

        .y div {
            transform: rotate(-90deg);
            position: absolute;
            left: 0;
            bottom: 0;
            width: 210px;
            text-align: left;
            transform-origin: top left;
            font-size: 12px;
        }

        .boards {
            flex: 1;
            position: relative;
            display: flex;
            align-items: flex-end;
        }

        .bar {
            width: 30px;
            margin-right: 25px;
            position: relative;
            background: #363636;
            border-radius: 4px;
        }

        .label {
            position: absolute;
            right: 0;
            text-align: right;
            white-space: nowrap;
            opacity: 0.8;
            padding-right: 5px;
            font-size: 14px;
            text-shadow: -1px -1px 0 rgba(255, 255, 255, 0.6), 1px -1px 0 rgba(255, 255, 255, 0.6), -1px 1px 0 rgba(255, 255, 255, 0.6), 1px 1px 0 rgba(255, 255, 255, 0.6);
        }

        .line {
            position: absolute;
            right: 14px;
            border-right: 1px solid #000;
        }

        .value {
            position: absolute;
            bottom: -24px;
            right: 0;
            text-align: right;
            font-size: 12px;
        }
    `],
    host: {
        '[style.height.px]': 'height',
    }
})
export class PerformanceChartComponent implements AfterViewInit {
    @ContentChildren(PerformanceEntryDirective) entries?: QueryList<PerformanceEntryDirective>;
    @Input() label: string = '';
    @Input() yAxis: string = '';

    @Input() height: number = 250;
    @Input() sort: 'asc' | 'desc' = 'desc';
    @Input() format: string = '0.2-2';

    items: { title: string, value: number, height: number, labelPos: number }[] = [];

    constructor(protected cd: ChangeDetectorRef) {
    }


    ngAfterViewInit(): void {
        if (!this.entries) return;
        this.items = [];

        let y = 0;
        const items = this.entries.toArray();
        let max = 0;

        if (this.sort === 'desc') {
            items.sort((a, b) => {
                if (a.value > b.value) return +1;
                if (a.value < b.value) return -1;
                return 0;
            });
        } else {
            items.sort((a, b) => {
                if (a.value > b.value) return -1;
                if (a.value < b.value) return +1;
                return 0;
            });
        }

        for (const item of items) {
            if (item.value > max) max = item.value;
        }

        const offset = (items.length + 1) * 14;

        for (const entry of items) {
            const valueRelative = entry.value / max;
            const height = (this.height - offset) * valueRelative;

            this.items.push({ height: height, value: entry.value, title: entry.title, labelPos: this.height - y });
            y += 25;
        }

        this.items.reverse();
        this.cd.detectChanges();
    }
}
