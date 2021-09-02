import { Injectable } from '@angular/core';
import { DeepkitClient } from '@deepkit/rpc';
import { FrameworkControllerInterface } from '../shared';

@Injectable()
export class ControllerClient {
    constructor(protected client: DeepkitClient) {
    }

    public readonly framework = this.client.controller(FrameworkControllerInterface);

    static getServerHost(): string {
        const proto = location.protocol === 'https:' ? 'wss://' : 'ws://';
        return proto + (location.port === '4200' ? location.hostname + ':8080' : location.host);
    }

}
