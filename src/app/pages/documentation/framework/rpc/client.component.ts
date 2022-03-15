import { Component } from '@angular/core';

@Component({
    template: `
        <div class="subline">Framework</div>

        <h2>RPC Client</h2>

        <p>
            To use a registered controller of your server application, you need to instantiate a client, connect to it, and call
            actions. RPC controllers registered in Deepkit Framework are per default exposed via WebSockets.
        </p>

        <p>
            To connect to it you should use the <code>DeepkitClient</code> class, which connects per default via
            WebSockets.
        </p>

        <textarea codeHighlight title="client.ts">
            #!/usr/bin/env ts-node-script
            import { DeepkitClient } from '@deepkit/rpc';
            import { MyRPCInterface } from './my-rpc';
            
            async function main() {
                const client = new DeepkitClient('ws://localhost:8080');
                const myRpcController = client.controller(MyRPCInterface);
            
                console.log(await myRpcController.helloWorld());
            
                client.disconnect();
            }
            
            main();
        </textarea>

        <p>
            <code>DeepkitClient</code> tries to automatically use the global <code>WebSocket</code> object (for browser environments)
            or falls back to require the <code>ws</code> package (for node environments).
        </p>

        <p>
            Connection is automatically established on the first action call. An error is thrown if connection can not be established or
            access is denied. You can manually connect using <code>await client.connect()</code>.
        </p>

        <p>
            More information about how to use the client and its features like error forwarding, streaming, upload/download tracking
            can be found in the full documentation about <a routerLink="/documentation/rpc/client">Deepkit RPC client</a>.
        </p>

        <h3>TCP</h3>

        <p>
            You can also connect to a Deepkit RPC server via TCP (or any other transport protocol). <code>@deepkit/rpc-tcp</code> provides
            a connection adapter for TCP based on Node's <code>net</code> and a faster TCP implementation using turbo-tcp.
        </p>

        <textarea codeHighlight title="client.ts">
            import { RpcClient } from '@deepkit/rpc';
            import { TcpRpcClientAdapter } from '@deepkit/rpc-tcp';

            const client = new RpcClient(new TcpRpcClientAdapter('localhost:8881'));
        </textarea>

        <p>
            This requires to start the RPC server via a TCP implementation. RPC controllers in Deepkit Framework
            are not exposed via TCP, so you have to start a RPC TCP server manually. More information can be found in the
            full documentation about <a routerLink="/documentation/rpc">Deepkit RPC</a>.
        </p>
    `
})
export class DocFrameworkRPCClientComponent {
}
