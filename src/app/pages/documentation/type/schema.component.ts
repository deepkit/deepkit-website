import { Component } from '@angular/core';

@Component({
    template: `
        <div class="subline">Type</div>

        <h2>Schema</h2>

        <p>
            Creating a schema is the base for type serialization in Deepkit Type. 
            There are two ways to define class schemas: Using classes and using the functional approach.
            All information of that schema can be read via the <a href="/documentation/type/reflection">Reflection API</a>.
        </p>

        <h3>Class schemas</h3>

        <p>
            Since TypeScript's data structure is removed during transpilation, Deepkit Type uses decorator metadata to
            save as much as possible and make them available in the JavaScript runtime. Since not all data types can be rescued
            this way, you have to manually annotate (aka decorate) certain data types using the <code>@t</code> decorator.
        </p>

        <textarea codeHighlight>
            import { t, uuid } from '@deepkit/type';
            
            class MyModel {
                @t.primary.uuid()
                id: string = uuid();

                @t created: Date = new Date;
            
                constructor(@t public name: string) {
                }
            }
        </textarea>

        <p>
            Deepkit type tries to extract as much as possible from the transpiled source/runtime. This has certain limitations:
        </p>

        <ul>
            <li>
                Required and optional properties can only be detected from strict TypeScript code.
                You have to use <code>@t.required</code> or <code>@t.optional</code> explicitly when you have code like
                <textarea codeHighlight>@t.required title!: name;</textarea>
                This is required in strict TypeScript combined with the <code>!</code> operator.
                
                If you don't have strict TypeScript enabled and have code like
                <textarea codeHighlight>@t.required title: name;</textarea>
                without setting a value for <code>title</code> in the
                constructor it is considered non-strict code (and won't compile without errors with strict TypeScript enabled),
                you have to use <code>@t.required</code> as well, as there is no way to detect whether that property is optional or not.
                It's recommended to use always strict TypeScript and do not use the <code>!</code> operator. This way all properties will
                correctly and automatically detected as optional or required.
            </li>
            <li>
                Constructor properties names need to survive a minification process.
                Or need to be named explicitly using <code>@t.name('propertyName')</code>. If you have for example a build step and a
                minification process that renames constructor arguments to something different, you have to use this approach, otherwise
                constructor properties are not correctly assigned. 
                This is only needed for constructor properties due to technical reasons. 
                It's recommended to disable the minification of variable names and use GZIP compression on HTTP level instead. 
                <textarea codeHighlight>
                    constructor(@t.name('name') public name: string) {
                    }
                </textarea>
            </li>
        </ul>

        <h3>Type annotation</h3>

        Many basic types can be extracted automatically like String, Date, Number, Boolean, and classes like custom classes or native classes.
        In the class schema approach above anything else need to be annotated again using a more detailed <code>t</code> decorator.

        <table class="pretty">
            <tr>
                <th>TypeScript type</th>
                <th>Class schema needed?</th>
                <th>Type decoration</th>
            </tr>
            <tr>
                <td>property: string;</td>
                <td>No</td>
                <td>t.string</td>
            </tr>
            <tr>
                <td>property: number;</td>
                <td>No</td>
                <td>t.number</td>
            </tr>
            <tr>
                <td>property: boolean;</td>
                <td>No</td>
                <td>t.boolean</td>
            </tr>
            <tr>
                <td>property: Date;</td>
                <td>No</td>
                <td>t.date</td>
            </tr>
            <tr>
                <td>property: bigint;</td>
                <td>No</td>
                <td>t.bigint</td>
            </tr>
            <tr>
                <td>property: 'a';</td>
                <td>Yes</td>
                <td>t.literal('a')</td>
            </tr>
            <tr>
                <td>property: MyEnum;</td>
                <td>Yes</td>
                <td>t.enum(MyEnum)</td>
            </tr>
            <tr>
                <td>property: MyClass;</td>
                <td>No</td>
                <td>t.type(MyClass)</td>
            </tr>
            <tr>
                <td>property?: string;</td>
                <td>No</td>
                <td>t.string.optional</td>
            </tr>
            <tr>
                <td>property: string | null;</td>
                <td>Yes</td>
                <td>t.string.nullable</td>
            </tr>
            <tr>
                <td>property!: string;</td>
                <td>Yes</td>
                <td>t.date.required</td>
            </tr>
            <tr>
                <td>property: string | number;</td>
                <td>Yes</td>
                <td>t.union(t.string, t.number)</td>
            </tr>
            <tr>
                <td>property: string[];</td>
                <td>Yes</td>
                <td>t.array(t.string)</td>
            </tr>
            <tr>
                <td>property: string[][];</td>
                <td>Yes</td>
                <td>t.array(t.array(t.string))</td>
            </tr>
            <tr>
                <td>property: (number | undefined)[];</td>
                <td>Yes</td>
                <td>t.array(t.string.optional)</td>
            </tr>
            <tr>
                <td>property: (number | string)[];</td>
                <td>Yes</td>
                <td>t.array(t.union(t.number, t.string))</td>
            </tr>
            <tr>
                <td>property: {{"{"}}[name: string]: boolean{{"}"}};</td>
                <td>Yes</td>
                <td>t.map(t.boolean)</td>
            </tr>
            <tr>
                <td>property: ArrayBuffer;</td>
                <td>No</td>
                <td>t.type(ArrayBuffer)</td>
            </tr>
            <tr>
                <td>property: Uint8Array;</td>
                <td>No</td>
                <td>t.type(Uint8Array)</td>
            </tr>
        </table>

        Additional special modifiers are available (for database mapping for example).

        <table class="pretty">
            <tr>
                <th style="width: 170px;">Type decoration</th>
                <th>Description</th>
            </tr>
            <tr>
                <td>t.uuid</td>
                <td>Can be combined with default value of <code>uuid()</code>.</td>
            </tr>
            <tr>
                <td>t.discriminant</td>
                <td>Marks this field as discriminant for the discriminator in union types.</td>
            </tr>
            <tr>
                <td>t.primary</td>
                <td>Marks this field as primary key.</td>
            </tr>
            <tr>
                <td>t.autoIncrement</td>
                <td>Marks this field as auto increment.</td>
            </tr>
            <tr>
                <td>t.mongoId</td>
                <td>Marks this field as ObjectId for MongoDB. Resolves as a string.</td>
            </tr>
            <tr>
                <td>t.reference()</td>
                <td>Marks this field as a reference. Also known as Foreign Key in database context.</td>
            </tr>
            <tr>
                <td>t.backReference()</td>
                <td>Marks this field as a back reference. Needed for the reversed side of a reference.</td>
            </tr>
        </table>

        <p>
            "Class schema needed?" indicated whether you have to add "Type decoration" in front of your property. 
            For example this doesn't need a detailed type decorator (it does not <code>@t</code> though):

            <textarea codeHighlight>
                class MyModel {
                    @t title: string = 'Wohoo';
                }
            </textarea>

            But this requires more than simply the <code>@t</code> since those type information are not available in the runtime:

            <textarea codeHighlight>
                class MyModel {
                    @t.array(t.string) categories: string[] = ['a', 'b'];
                }
            </textarea>
        </p>

        <p>
            There are even more functions on <code>t</code>, see its definition with its documentation in your code editor
            to get more information.
        </p>

        <h3>Functional schemas</h3>

        <p>
            With the functional approach, you don't use any classes, but use the <code>t</code> function the same and annotate each
            schema property explicitly. All limitations above are solved using this approach. You can see in the table above which types
            are possible.
        </p>

        <textarea codeHighlight>
            import { t, uuid } from '@deepkit/type';
            
            const myModelSchema = t.schema({
                id: t.string.primary.uuid.default(() => uuid()),
                created: t.date.default(() => new Date),
                name: t.string
            });
        </textarea>

        <p>
            Note that its the default behavior that a property is marked as "required".
            So, if you want to specify a property as optional, you have to use <code>t.optional</code>.
        </p>

        You can use the <code>myModelSchema</code> as you would with the class above. Furthermore, you can define a name for that
        schema, which will be used as class name for all created instances of that schema.

        <textarea codeHighlight>
            import 'reflect-metadata';
            import { t, plainToClass, uuid } from '@deepkit/type';
            
            const myModelSchema = t.schema({
                id: t.string.primary.uuid.default(() => uuid()),
                created: t.date.default(() => new Date),
                name: t.string
            }, {name: 'MyModel'});
            
            const myModel = plainToClass(myModelSchema, {
                id: 'f2ee05ad-ca77-49ea-a571-8f0119e03038',
                created: 'Sat Oct 13 2018 14:17:35 GMT+0200',
                name: 'Peter',
            });
            
            console.log('Is MyModel?', myModel instanceof myModelSchema.classType);
            console.log('Date converted?', myModel.created instanceof Date);
            console.log(myModel);
        </textarea>

        This would output:

        <textarea codeHighlight>
            $ ts-node app.ts
            Is MyModel? true
            Date converted? true
            MyModel {
              id: 'f2ee05ad-ca77-49ea-a571-8f0119e03038',
              created: 2018-10-13T12:17:35.000Z,
              name: 'Peter'
            }
        </textarea>

        <p>
            The <code>myModelSchema</code> is a <code>ClassSchema</code> instance which allows you to read all information
            about that class including properties and sub properties using the 
            <a href="/documentation/type/reflection">Reflection API</a>.
        </p>
        
        
        <p>
            To use the type of the schema itself in other places, you can use it like that:
        </p>
        
        <textarea codeHighlight>
            import { t } from '@deepkit/type';

            const userSchema = t.schema({
                username: t.string,
            });
            type User = InstanceType<typeof userSchema.classType>;
            
            function addUser(user: User) {
                user.username;
            }
            addUser({username: 'Peter'});
        </textarea>
        
        <p>
            That's the small disadvantage of using the functional approach to define a schema: You have to define on another line
            the actual type, or use <code>InstanceType&lt;typeof userSchema.classType&gt;</code> everywhere. For the class approach this is
            not necessary.
        </p>

        <h3>Validation</h3>
        
        <p>
            To add additional validation checks there are several pre defined decorators available. 
            To add custom validation functions and learn more about validation, see the chapter <a href="/documentation/type/validation">Validation</a>.
        </p>

        <table class="pretty">
            <tr>
                <th>Type decoration</th>
                <th>Description</th>
            </tr>
            <tr>
                <td>t.pattern(RegExp)</td>
                <td>Defines a regular expression as validation pattern. Usually used for E-Mail validation or more complex content validation.</td>
            </tr>
            <tr>
                <td>t.alpha()</td>
                <td>Validation for alpha characters (a-Z).</td>
            </tr>
            <tr>
                <td>t.alphanumeric()</td>
                <td>Validation for alpha and numeric characters.</td>
            </tr>
            <tr>
                <td>t.ascii()</td>
                <td>Validation for ASCII characters</td>
            </tr>
            <tr>
                <td>t.dataURI()</td>
                <td>Validation for data URI, e.g. <code>data:plain/text;base64,SGVsbG8=</code>.</td>
            </tr>
            <tr>
                <td>t.decimal()</td>
                <td>Validation for string represents a decimal number, such as 0.1, .3, 1.1, 1.00003, 4.0, etc.</td>
            </tr>
            <tr>
                <td>t.multipleOf(number)</td>
                <td>Validation of numbers that are a multiple of given number.</td>
            </tr>
            <tr>
                <td>t.minLength(number)
                    t.maxLength(number)</td>
                <td>Validation for min/max length for arrays or strings of given number.</td>
            </tr>
            <tr>
                <td>t.includes(any)
                    t.excludes(any)</td>
                <td>Validation for an array item being included/excluded.</td>
            </tr>
            <tr>
                <td>t.minimum(number)/t.maximum(number)</td>
                <td>Validation for a value being minimum or maximum given number. Same as <code>&gt;=</code> <code>&lt;=</code>.</td>
            </tr>
            <tr>
                <td>t.exclusiveMinimum(number) 
                    t.exclusiveMaximum(number)</td>
                <td>Same as minimum/maximum but exludes the value itself. Same as <code>&gt;</code> <code>&lt;</code></td>
            </tr>
            <tr>
                <td>t.positive(includingZero?: boolean)
                    t.negative(includingZero?: boolean)</td>
                <td>Validation for a value being positive or negative.</td>
            </tr>
        </table>
        
        <h3>Custom data</h3>

        <p>Each property can add additional meta data that can be read via the <a href="/documentation/type/reflection">Reflection API</a>.</p>

        <textarea codeHighlight>
            import { t } from '@deepkit/type';
            
            class MyModel {
                @t.data('key', 12345) title: string = 'Title';
            }
        </textarea>

        <h3>Group</h3>

        <p>
            Properties can be grouped together. For serialization you can for example exclude a group from serialization.
            See the chapter <a href="/documenation/type/serialization">Serialization</a> for more information.
        </p>

        <textarea codeHighlight>
            import { t } from '@deepkit/type';
            
            class MyModel {
                @t.group('a') title: string = 'Title';
            }
        </textarea>

        <h3>Discriminated unions</h3>

        Simple unions like <code>string | number</code> can be resolved automatically in the serialization process. As soon
        as a custom class is involved like <code>string | MyModel</code> this class needs a discriminant which the serialization engine uses
        to detect which class to load. The discriminant needs to be a literal.

        <textarea codeHighlight title="Class schema">
            import { t } from '@deepkit/type';
            
            class Config {
                @t.literal('a').discriminant type: 'a' = 'a';
            }
            
            class User {
                @t.union(t.string, t.type(Config)) config: string | Config = '';
            }
        </textarea>

        <textarea codeHighlight title="Functional schema">
            import { t } from '@deepkit/type';
            
            const configSchema = t.schema({
                a: t.literal('a').discriminant,
            });

            const userSchema = t.schema({
                config: t.union(t.string, t.type(Config))
            });
        </textarea>

        <h3>Generics</h3>

        <p>
            Generic types have template arguments that can be annotated using <code>t.generic</code>.
        </p>

        <textarea codeHighlight>
            import { t } from '@deepkit/type';
            
            class Subject<T> {
                type: T;
            }

            const userSchema = t.schema({
                subject: t.type(Subject).generic(t.string)
            });
        </textarea>

        <h3>Custom decorators</h3>

        <p>
            You can group several decorators or write custom decorator and use them via <code>t.use</code>.
            Make sure to use at least one base type like t.string, t.number, etc. so that the resulting schema
            gets a valid TypeScript type assigned.
        </p>

        <textarea codeHighlight>
            import { t, PropertySchema } from '@deepkit/type';
            
            function ID(target: object, property: PropertySchema) {
                property.isId = true;
                property.type = 'uuid';
                property.data.myId = 1234;
            }
            
            const userSchema = t.schema({
                id: t.string.use(ID),
            });
        </textarea>
        
        <h3>Exclude</h3>
        
        <p>
            Each property can be excluded from the serialization process for a specific target.
        </p>
        
        <textarea codeHighlight>
            import { t, classToPlain, plainToClass } from '@deepkit/type';

            const schema = t.schema({
                title: t.string,
                password: t.string.exclude('json'),
            });
            
            const item = plainToClass(schema, {title: 'Peter', password: 'secret'});
            
            item.password; //undefined, since plainToClass's serializer is called \`json\`
            
            item.password = 'secret';
            
            const json = classToPlain(schema, item);
            json.password; //again undefined, since classToPlain's serializer is called \`json\`
        </textarea>
        
        <p>
            If you have a custom serialization target, you can specify its name in <code>t.exclude()</code>.
        </p>
        

        <h3>External classes</h3>
        
        <p>
            Sometimes you want to decorator or serialize a external class you have no control over.
        </p>

        <textarea codeHighlight>
            import { MyExternalClass } from 'external-package';

            const externalSchema = t.schema({
                title: t.string,
            }, {classType: MyExternalClass});
        </textarea>
        
        Using this approach, the <code>externalSchema</code> registers itself for the class MyExternalClass. MyExternalClass can now be
        used in serialization functions and in the reflection API.
    `
})
export class DocTypeSchemaComponent {
}
