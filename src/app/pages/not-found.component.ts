import {RESPONSE} from '@deepkit/angular-universal/tokens';
import type {HttpResponse} from '@deepkit/framework';
import {Component, OnInit, Inject, Optional} from '@angular/core';

@Component({
    template: `
        <div class="wrapper main text">
            <h1>404</h1>

            <p>I am afraid I can not do that.</p>
        </div>
    `,
})
export class NotFoundComponent implements OnInit {

    constructor(@Optional() @Inject(RESPONSE) protected response?: HttpResponse) {
    }

    ngOnInit() {
        if (this.response) {
            // response will only be if we have express
            // this.response.statusCode = 404;
            this.response.status(404);
        }
    }

}
