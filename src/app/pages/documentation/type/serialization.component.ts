import { Component } from '@angular/core';

@Component({
    template: `
        <div class="subline">Type</div>

        <h2>Serialization</h2>

        <p>
            Serialization is the process of converting data types to a format suited for example for transportation or storage.
            Deserialization is the process that reverts that. This happens losslessly, which means the data can be converted
            to and from a serialization target without losing data type information or data itself.
        </p>

        <p>
            In JavaScript, serialization usually occurs between JavaScript objects and JSON. JSON supports only string, number, boolean,
            object, and arrays. JavaScript, on the other hand, supports many more types such as BigInt, ArrayBuffer, typed arrays, Date, custom class instances,
            and many more. Now, to transmit JavaScript data to a server using JSON you need a serialization process (on the client) and a
            deserialization process (on the receiving server), or vice-versa if the server sends data serialized as JSON to the client.
        </p>

        <p>
            Deepkit Type supports custom serialization targets but comes pre-bundled with a JSON serialization target. Using @deepkit/bson
            you could also use BSON as serialization target. To build your own serialization target (for example for a database driver),
            see the chapter <a href="/documentation/type/custom-serializer">Customer Serializer</a>.
        </p>

        <p>
        There are three main functions available: <code>serialize</code>, <code>deserialize</code>, and <code>validatedDeserialize</code>.
        Under the hood of these functions the globally available JSON serializer <code>import {{"{"}} serializer {{"}"}} from '@deepkit/type'</code> is used.
        </p>

        <p>
            Note that validation is not run automatically. Use <code>validatedDeserialize</code> to use validation while deserializing.
            You can use the functions <code>validate</code> or <code>validates</code> on deserialized data, see chapter 
            <a href="/documentation/type/validation">Validation</a>. 
        </p>

        <h3><code>deserialize</code></h3>

        <p>
            <code>deserialize</code> converts data to JavaScript types based on the given type.
            Per default is uses the JSON <code>serializer</code>.
            This is usually called deserialization, as it converts data from our serialization target (in our case JSON) to the data types
            of the runtime. <code>cast</code> is an alias to <code>deserialize</code>.
        </p>

        <textarea codeHighlight title="app.ts">
            import { deserialize } from '@deepkit/type';

            class MyModel {
                id: number = 0;
                created: Date = new Date;
            
                constructor(public name: string) {
                }
            }

            const myModel = deserialize<MyModel>({
                id: 5,
                created: 'Sat Oct 13 2018 14:17:35 GMT+0200',
                name: 'Peter',
            });
        </textarea>

        <p>
            When data can not be converted correctly a <code>ValidationError</code> is thrown.
        </p>

        <p>
            When JavaScript types are passed, they are used as-is. For example, if you pass a <code>Date</code> object to
            <code>created</code>, then it works as well.
        </p>

        <h4>Soft type conversion</h4>

        <p>
            The deserialization processes has soft type conversion implemented. This means it can accept strings and numbers for number types,
            or a number for a string type. This is useful for example when accepting data via a URL query and passing
            it to the schema deserializer. Since URL query is string only, Deepkit Type tries to resolve the types nonetheless for numbers
            and booleans.
        </p>

        <ul>
            <li>
                <strong>number|bigint</strong>: Properties marked as number or bigint accept string numbers. <code>parseFloat</code> will be used.
            </li>
            <li>
                <strong>boolean</strong>: Properties marked as boolean accept numbers and strings. <br/>
                0, '0', 'false' will be interpreted as boolean <code>false</code>.<br/>
                1, '1', 'true' will be interpreted as boolean <code>true</code>.
            </li>
        </ul>

        <textarea codeHighlight>
            import { deserialize } from '@deepkit/type';
            
            deserialize<boolean>('false')).toBe(false);
            deserialize<boolean>('0')).toBe(false);
            deserialize<boolean>('1')).toBe(true);
            
            deserialize<number>('1')).toBe(1);
        </textarea>

        <h3><code>serialize</code></h3>

        <p>
            <code>serialize</code> converts JavaScript data types to the serialization formation. 
            Per default is uses the JSON <code>serializer</code>.
            This is usually called serialization, as it serializes a data structure to a target format (in our case JSON).
        </p>

        <p>
            In order to produce a JSON string, you have to call the JSON serializer, and then on the result JSON.stringify().
        </p>

        <textarea codeHighlight title="app.ts">
            import { serialize } from '@deepkit/type';
            
            class MyModel {
                id: number = 0;
                created: Date = new Date;
            
                constructor(public name: string) {
                }
            }
            
            const model = new MyModel('Peter');
            
            const jsonObject = serialize<MyModel>(model);
            console.log(jsonObject);
            const json = JSON.stringify(jsonObject);
        </textarea>

        This would output:

        <textarea codeHighlight="json">
            {
              id: 0,
              created: '2021-06-10T15:07:24.292Z',
              name: 'Peter'
            }
        </textarea>

        <h3><code>validatedDeserialize</code></h3>

        <p>
            <code>validatedDeserialize</code> deserializes the data and runs all validators.
            It throws a detailed error object when validation fails.
        </p>
    `
})
export class DocTypeSerializationComponent {
}
