import {Component, OnInit} from "@angular/core";
import {ControllerClient} from "../../client";
import {BenchmarkRun} from "../../../shared";

@Component({
    template: `Hi
    
    <ng-container *ngIf="benchmarkRun">
        {{benchmarkRun.id}}
    </ng-container>
    `
})
export class BenchmarkComponent implements OnInit {
    public benchmarkRun?: BenchmarkRun;

    constructor(protected client: ControllerClient) {
    }

    async ngOnInit() {
        this.benchmarkRun = await this.client.framework.getLastBenchmarkRun();
    }
}
