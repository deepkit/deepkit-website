import { Component } from '@angular/core';

@Component({
    template: `
        <div class="subline">Type</div>
        
        <h2>Performance</h2>
        
        <p>
            Deepkit Type uses under the hood a JIT process that creates on-the-fly highly optimized serialization, deserialization, and
            validation, and change detection functions for each schema. This is the reason why its one (if not the) fastest
            full featured TypeScript serializer on the market. It's thus important to not create too many schemas on the fly as this would 
            totally destroy all the performance benefits Deepkit Type brings in the first place.
        </p>
        
        <p>
            Due to its JIT nature, all the generated functions get faster over time when the JavaScript runs its JIT compiler/optimizer as well.
            This happens usually when those functions are called rather frequently. Our generated functions are generated in a way that are
            very JIT optimization friendly, which means an performance increase of 5x-10x between the first call of a serialization and the 100th is rather common.
            Since most web application use an (long running) application server this place nicely with current methodologies.
        </p>
        
        <p>
            To get the most performance out of your critical code sections here are a few advices to follow.
        </p>
        
        <h3>Use the factory function</h3>
        
        <p>
            Usually, when you call for example <code>jsonSerializer.for(MyClass)</code> or <code>plainToClass(MyClass, ...)</code>
            what happens in the background is that a Map (<code>Map&lt;ClassType, Function&gt;</code>) is asked whether a serializer function is already registered, if not create it and
            assign it to the map. Accessing such maps can be a performance bottleneck in critical code, especially since serialization itself is very very fast with
            Deepkit Type and accessing that Map is a considerable cost factor.
        </p>
            
        <p>
            To work around that you can request the serialization function directly and save it in a variable of your choice. To make things
            easier and you can use the serializer directly and cache the result of the <code>for()</code> method.
        </p>
        
        <textarea codeHighlight>
            import { jsonSerializer, t } from '@deepkit/type';
            
            const schema = t.schema({
                title: t.string,
                password: t.string.exclude('json'),
            });
            
            const schemaSerializer = jsonSerializer.for(schema);
            
            for (let i = 0; i < 10000; i++) {
                schemaSerializer.deserialize({ title: 'Peter' });
            }
        </textarea>
        
        <p>
            The object <code>schemaSerializer</code> stores automatically the generated serialization functions, so storing that object
            is enough to avoid the Map lookup and maintain high performance.
        </p>
        
        <h3>Use BSON</h3>
        
        <p>
            JSON is for most use-cases good enough. However, when high performance, bandwidth bottlenecks, or storage limitations have to be considered,
            then another transportation/storage encoding could be used. BSON is an standard from MongoDB that can be used for a variety of use cases.
            It is a binary format which means that binary data (like ArrayBuffer, think of images) are encoded as is, contrary to JSON where binary
            data needs to encoded in base64 (which is roughly 33% bigger and slower to encode/decode). 
        </p>
        
        <p>
            To use BSON with Deepkit Type, you can use our official high performance <a href="/library/bson">Deepkit BSON encoder</a>. 
        </p>
    `
})
export class DocTypePerformanceComponent {
}
