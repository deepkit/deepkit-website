import { Component } from '@angular/core';

@Component({
    template: `
        <div class="subline">Type</div>

        <h2>Serialization</h2>

        <p>
            Serialization is the process of converting data types to a format suited for example for transportation or storage.
            Deserialization is the process that reverts that. This happens lossless, which means the data can be converted
            to and from a serialization target without losing data type information or data itself.
        </p>

        <p>
            In JavaScript serialization happens usually between JavaScript objects and JSON. JSON supports only string, number, boolean,
            object, and arrays. Whereas JavaScript supports many more like BigInt, ArrayBuffer, typed arrays, Date, custom class instances,
            and much more. To transmit now JavaScript data to a server using JSON you need a serialization process (on the client) and a
            deserialization process (on the receiving server), or vice-versa if the servers sends data serialized as JSON to the client.
        </p>

        <p>
            Deepkit Type supports custom serialization targets but comes pre-bundled with a JSON serialization target. Using @deepkit/bson
            you could also use BSON as serialization target. To build you own serialization target (for example for a database driver),
            see the chapter <a href="/documentation/type/serialization-target">Serialization target</a>.
        </p>

        <h3>JSON</h3>

        For JSON there are three main functions available: <code>plainToClass</code>, <code>classToPlain</code>, and <code>validatedPlainToClass</code>.
        Under the hood of these functions the globally available JSON serializer <code>jsonSerializer</code> is used.

        <p>
            Note that properties that are not decorated with <code>@t</code> for classes are not included in the de-/serialization process.
        </p>

        <p>
            Note that validation is not run automatically. Use <code>validatedPlainToClass</code> to use validation while deserializing.
            You can use the functions <code>validate</code> or <code>validates</code> on instantiated schemas, see chapter 
            <a href="/documentation/type/validation">Validation</a>. 
        </p>

        <h4>Function <code>plainToClass</code></h4>

        <code>plainToClass</code> converts JSON data types to JavaScript types using a created schema or decorated class.
        This is usually called deserialization, as it converts data from our serialization target (in our case JSON) to the data types
        of the runtime.

        <textarea codeHighlight title="app.ts">
            import 'reflect-metadata';
            import { t, plainToClass, uuid } from '@deepkit/type';

            class MyModel {
                @t.primary.uuid
                id: string = uuid();

                @t created: Date = new Date;
            
                constructor(@t public name: string) {
                }
            }

            const myModel = plainToClass(MyModel, {
                id: 'f2ee05ad-ca77-49ea-a571-8f0119e03038',
                created: 'Sat Oct 13 2018 14:17:35 GMT+0200',
                name: 'Peter',
            });
        </textarea>

        <p>
            The above deserialization call via <code>plainToClass</code> is equal to this code:
        </p>

        <textarea codeHighlight>
            import { jsonSerializer } from '@deepkit/type';
            jsonSerializer.for(MyModel).deserialize(myModel);
        </textarea>

        <p>
            When JavaScript types are passed they are used as is. For example, if you'd pass a <code>Date</code> object to
            <code>created</code>, then the works as well.
        </p>


        <h5>Soft type convertion</h5>

        <p>
            The deserialization processes has a soft type convertion implemented. This means it accept strings and numbers for number
            property,
            or a number for a string property. This is useful for example when accepting data via a URL query and passing
            it to the schema deserializer. Since URL query is string only, Deepkit Type tries to resolve the types nonetheless for numbers
            and booleans.
        </p>

        <ul>
            <li>
                <strong>t.number</strong>: Properties marked as number accept string numbers. It will be tried to convert to number via
                <code>parseFloat</code>.
            </li>
            <li>
                <strong>t.boolean</strong>: Properties marked as boolean accept numbers and strings. <br/>
                0, '0', 'false' will be interpreted as boolean <code>false</code>.<br/>
                1, '1', 'falsetrue' will be interpreted as boolean <code>true</code>.
            </li>
        </ul>

        <h4>Function <code>classToPlain</code></h4>

        <code>classToPlain</code> converts JavaScript data types to JSON using a created schema or decorated class.
        This is usually called serialization, as it serializes a data structure to a target format (in our case JSON).

        <textarea codeHighlight title="app.ts">
            import 'reflect-metadata';
            import { t, classToPlain, uuid } from '@deepkit/type';
            
            class MyModel {
                @t.primary.uuid
                id: string = uuid();

                @t created: Date = new Date;
            
                constructor(@t public name: string) {
                }
            }
            
            const myModel = new MyModel('Peter');
            
            const jsonObject = classToPlain(MyModel, myModel);
            console.log(jsonObject);
        </textarea>

        This would output:

        <textarea codeHighlight="json">
            {
              id: '826151dd-fb02-4717-82a6-b319328695a2',
              created: '2021-06-10T15:07:24.292Z',
              name: 'Peter'
            }
        </textarea>

        <p>
            The above serialization call via <code>classToPlain</code> is equal to this code:
        </p>

        <textarea codeHighlight>
            import { jsonSerializer } from '@deepkit/type';
            jsonSerializer.for(MyModel).serialize(myModel);
        </textarea>

        <h4>Function <code>validatedPlainToClass</code></h4>

        <p>
            <code>validatedPlainToClass</code> validates given data and when successfull converts JSON data types to JavaScript types using
            a created schema.
            Throws a detailed error object when validation fails.
        </p>

        <p>
            The above deserialization call via <code>validatedPlainToClass</code> is equal to this code:
        </p>

        <textarea codeHighlight>
            import { jsonSerializer } from '@deepkit/type';
            jsonSerializer.for(MyModel).validatedDeserialize(myModel);
        </textarea>

        <h3>Groups</h3>

        <p>
            The serialization and deserialization functions support a few options, two of which are: <code>groups</code> and <code>excludeGroups</code>,
            which allows you to exclude or limit the de-/serialization process to a group of properties.
        </p>

        <textarea codeHighlight>
            import { jsonSerializer, plainToClass, t } from '@deepkit/type';

            const schema = t.schema({
                title: t.string,
                password: t.string.group('private'),
            });
            
            const instance1 = plainToClass(schema, { title: 'Peter' }, { groupsExclude: ['a'] });
            
            const instance2 = jsonSerializer.for(schema).deserialize({ title: 'Peter' }, { groupsExclude: ['a'] });
        </textarea>

        <p>
            Note: Using grouped serialization is much slower than regular serialization. If performance is important, consider rearranging
            your data into multiple classes instead.
        </p>
    `
})
export class DocTypeSerializationComponent {
}
