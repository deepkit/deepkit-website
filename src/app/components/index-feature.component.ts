import { Component, Input } from "@angular/core";

@Component({
    selector: 'index-feature',
    template: `
      <div class="image"><img src="assets/images/features/{{img}}.svg"/></div>
      <div class="text">
        <h4>{{header}}</h4>
        <p>
          {{text}}
        </p>
      </div>
    `,
    styleUrls: ['./index-feature.component.scss']
})
export class IndexFeatureComponent {
    @Input() img!: string;
    @Input() header!: string;
    @Input() text!: string;
}
