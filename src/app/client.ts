import { Injectable } from '@angular/core';
import { DeepkitClient } from '@deepkit/rpc';
import { FrameworkControllerInterface } from '../shared';

@Injectable()
export class ControllerClient {
    constructor(protected client: DeepkitClient) {
    }

    public readonly framework = this.client.controller(FrameworkControllerInterface);
}
