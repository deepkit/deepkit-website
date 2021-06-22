import { Component } from '@angular/core';

@Component({
    template: `
        <h1>Benchmark</h1>

        <p>
            Deepkit advertises high performance in many places and has high performance as top priority. 
            We don't only say that, we want to back that with actual data. 
            That's why we have a full <a href="https://github.com/deepkit/deepkit-framework/tree/master/packages/benchmark/src">suite of benchmarks</a> 
            where we ran our code against other libraries.
            We plan to setup a pipeline that automatically executes those benchmarks for every commit and track exactly
            where we have potential to improve. For the moment we execute them on a machine and publish the report on our product sites.
        </p>

        <p>
            In order to execute the benchmarks on your own machine, you have to checkout the deepkit-framework repository, install all dependencies,
            build the source, and then execute the benchmark you want.
        </p>

        <textarea codeHighlight="bash">
            $ git clone https://github.com/deepkit/deepkit-framework.git
            $ cd deepkit-framework
            $ npm install
            $ npm run bootstrap
            $ npm run link
            $ npm run build
            $ cd packages/benchmark
        </textarea>
        
        <p>
            Now you are in the <code>packages/benchmark</code> folder and can use <code>npm run benchmark NAME</code> to execute a benchmark.
        </p>
        
        <p>
            Note: Make sure your CPU is not throttled and not busy with other tasks. Also make sure enough memory is available.
        </p>
        
        <h3>Type benchmark</h3>

        <textarea codeHighlight="bash">
            $ npm run benchmark type/serialization/small
            > @deepkit/benchmark@1.0.1-alpha.0 benchmark /private/tmp/asdad/deepkit-framework/packages/benchmark
            > ../../node_modules/.bin/ts-node index.ts "type/serialization/small"
            
            filter by type/serialization/small
            🏃‍run type/serialization/small-cerialize
            Start benchmark cerialize
             🏎 x 2,309,192.1 ops/sec ±0.75% 0.0000004330518893 sec/op ▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇ deserialize
             🏎 x 3,387,520.66 ops/sec ±0.28% 0.0000002952011517 sec/op ▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇ serialize
             🏁 Fastest serialize
            🏃‍run type/serialization/small-class-transformer
            Start benchmark class-transformer
             🏎 x 285,183.85 ops/sec ±2.53% 0.0000035065099395 sec/op ▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇ deserialize
             🏎 x 304,463.74 ops/sec ±0.28% 0.0000032844633891 sec/op ▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇ serialize
             🏁 Fastest serialize
            🏃‍run type/serialization/small-deepkit
            Start benchmark deepkit
             🏎 x 25,992,840.79 ops/sec ±0.46% 0.0000000384721319 sec/op ▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇ deserialize
             🏎 x 32,102,573.21 ops/sec ±2.58% 0.0000000311501509 sec/op ▇▇▇▆▇▆▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇ serialize
             🏁 Fastest serialize
        </textarea>
        
        <h3>ORM benchmark</h3>

        <textarea codeHighlight="bash">
            $ sh setup.sh
            $ npm run benchmark orm/end-to-end/sqlite
            $ npm run benchmark orm/end-to-end/mongo
        </textarea>
        
        <h3>RPC benchmark</h3>

        <textarea codeHighlight="bash">
            $ npm run benchmark rpc/rpc-tcp-server
            $ npm run benchmark rpc/grpc
        </textarea>
        
        <h3>Broker benchmark</h3>
        
        <p>
            Note that in the redis benchmark the redis server uses a separate thread while Deepkit Broker runs single-threaded, which makes it in theory unfair.
            But it can keep up with it regardless of that fact.
        </p>

        <textarea codeHighlight="bash">
            $ npm run benchmark broker/node-redis
            $ npm run benchmark broker/tcp-broker
        </textarea>
    `
})
export class DocBenchmarkComponent {

}
