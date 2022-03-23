import { eventDispatcher } from '@deepkit/event';
import { httpWorkflow } from '@deepkit/http';
import { Config } from './config';

export class AuthListener {
    constructor(protected authToken: Config['benchmarkAuthToken']) {
    }

    @eventDispatcher.listen(httpWorkflow.onAuth)
    async onAuth(event: typeof httpWorkflow.onAuth.event) {
        if (event.route.groups.includes('benchmarkAuth')) {
            if (event.request.headers.authorization !== this.authToken) {
                event.response.writeHead(403);
                event.response.end('Nope');
            }
        }
    }
}
