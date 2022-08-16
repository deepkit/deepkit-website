import { Component } from '@angular/core';

@Component({
    template: `
        <div class="subline">Type</div>

        <h2>Types</h2>

        <p>
            Deepkit Type supports almost all TypeScript types out of the box. It could be a simple string, number,
            boolean,
            or more complex classes and interfaces, as well as computed types based on type functions like
            <code>Pick</code>,
            and even generics.
        </p>

        <p>
            Since Deepkit Type uses the runtime type information made available by the type compiler of
            @deepkit/type-compiler,
            there is nothing special you have to write to make the types available in runtime.
        </p>

        <h3>How to use</h3>

        <p>
            On of the common use cases of deepkit type is casting data types. Serialization, validation, 
            and database access are other use cases. All of them have in common that you pass the type as
            type argument to the function.
        </p>
           
        <p>
            So, if you have for example a <code>string</code> type and want to convert or validate a string 
            the code would look like that:
        </p>

        <textarea codeHighlight>
            import { cast, is } from '@deepkit/type';
            
            cast<string>(24); //becomes '24'
            is<string>(24); //false
            is<string>('24'); //true
            
            interface User {
                id: number;
                username: string;
            }
            
            cast<User>({id: '24', username: 'Peter'}); //becomes {id: 24, username: 'Peter'}
            
            is<User>({id: '24', username: 'Peter'}); //false
            is<User>({id: 24, username: 'Peter'}); //true
        </textarea>

        <p>
            Since the first type argument of <code>cast</code> could be any type, you could also write:
        </p>

        <textarea codeHighlight>
            import { cast } from '@deepkit/type';
            
            interface User {
                id: number;
                username: string;
            }
            cast<User['username']>(24); //becomes '24'
            
            is<User>({id: 0}); //false
            is<User>({id: , username: 'Peter'}); //true

            is<Partial<User>>({id: 0}); //true
        </textarea>

        <p>
            Or use other type functions.
        </p>

        <textarea codeHighlight>
            import { cast } from '@deepkit/type';
            
            interface User 
                id: string;
                createdAt: Date;
                username: string;
                firstName?: string;
                lastName?: string;
            }
            
            cast<Omit<User, 'id' | 'createdAt'>({username: 'Peter'}); //{username: 'Peter'}
            
            //or use aliases
            type UserCreate = Omit<User, 'id' | 'createdAt'>;
            cast<UserCreate>({username: 'Peter'});
        </textarea>

        <textarea codeHighlight>
            import { Maximum, Minimum } from '@deepkit/type';
            
            type ID = number & Minimum<0> & Maximum<100>;
            
            is<ID>(0); //true
            is<ID>(120); //false
        </textarea>

        <h3>Special types</h3>

        Deepkit Type comes with some special types as well as type annotations to enrich your types with additional
        information and behaviour.

        <h4>Integer/Float</h4>

        <p>
            Using one of the integer/float types ensures during deserializing and validation that a value is in the
            correct
            range. The information is also available in runtime and allows for example Deepkit ORM to
            use the correct table column type.
        </p>

        <textarea codeHighlight>
            import { cast, integer, int8, uint8 } from '@deepkit/type';
            
            cast<integer>(12.4); //becomes 12
            cast<integer>(12); //stays 12
            
            cast<int8>(127); //stays 127
            cast<int8>(233); //becomes 127
            
            cast<uint8>(-12); //becomes 0
            cast<uint8>(300); //becomes 255
        </textarea>

        <textarea codeHighlight>
            import { validates, integer, uint8 } from '@deepkit/type';
            
            validates<integer>(12); //true
            validates<integer>(12.4); //false, since not an integer
            
            validates<uint8>(420); //false, since max is 255
        </textarea>

        <table class="pretty">
            <tr>
                <th>Type</th>
                <th>Description</th>
            </tr>
            <tr>
                <td><code>integer</code></td>
                <td>An integer of arbitrary size.</td>
            </tr>
            <tr>
                <td><code>int8</code></td>
                <td>An integer between -128 and 127.</td>
            </tr>
            <tr>
                <td><code>uint8</code></td>
                <td>An integer between 0 and 255.</td>
            </tr>
            <tr>
                <td><code>int16</code></td>
                <td>An integer between -32768 and 32767.</td>
            </tr>
            <tr>
                <td><code>uint16</code></td>
                <td>An integer between 0 and 65535.</td>
            </tr>
            <tr>
                <td><code>int32</code></td>
                <td>An integer between -2147483648 and 2147483647.</td>
            </tr>
            <tr>
                <td><code>uint32</code></td>
                <td>An integer between 0 and 4294967295.</td>
            </tr>
            <tr>
                <td><code>float</code></td>
                <td>Same as <code>number</code>, but might have different meaning in database context.</td>
            </tr>
            <tr>
                <td><code>float32</code></td>
                <td>A float between -3.40282347e+38 and 3.40282347e+38. Note that JavaScript is not able to check
                    correctly the range due to precision issues, but the information might be handy for the database
                    or binary serializers.
                </td>
            </tr>
            <tr>
                <td><code>float64</code></td>
                <td>Same as <code>number</code>, but might have different meaning in database context.</td>
            </tr>
        </table>

        <h4>UUID</h4>

        <p>
            UUID v4 format. Can be combined with default value of <code>uuid()</code>. Deepkit ORM tries to save
            the UUID in a column type that is native to the database (usually as binary).
        </p>

        <textarea codeHighlight>
            import { UUID, serialize, is, uuid } from '@deepkit/type';
            
            serialize<UUID>('d06d7e9f-f229-479d-a1ee-67d17baa26d7'); //d06d7e9f-f229-479d-a1ee-67d17baa26d7
            is<UUID>('d06d7e9f-f229-479d-a1ee-67d17baa26d7'); //true
            is<UUID>('abcd'); //false
            
            class User {
                id: UUID = uuid();
            }
        </textarea>

        <h4>MongoId</h4>

        <p>
            Marks this field as ObjectId for MongoDB. Resolves as a string. Is stored in the MongoDB as binary.
        </p>

        <textarea codeHighlight>
            import { MongoId, serialize, is } from '@deepkit/type';
            
            serialize<MongoId>('507f1f77bcf86cd799439011'); //507f1f77bcf86cd799439011
            is<MongoId>('507f1f77bcf86cd799439011'); //true
            is<MongoId>('507f1f77bcf86cd799439011'); //false
            
            class User {
                id: MongoId = ''; //will automatically set in Deepkit ORM once user is inserted
            }
        </textarea>

        <h4>BinaryBigInt</h4>

        <p>
            Per default the normal <code>bigint</code> type serializes as number in JSON (and long in BSON).
            This has however limitation in what is possible to save as bigint in JavaScript has a unlimited potential
            size,
            where numbers in JavaScript and long in BSON are limited.
            To bypass this limitation the <code>BinaryBigInt</code> is available.
        </p>

        <p>
            Same as <code>bigint</code> but serializes to unsigned binary with unlimited size (instead of 8 bytes in
            most
            databases) in databases and string in JSON. Negative values will be converted to positive (abs(x)).
        </p>

        <textarea codeHighlight>
            import { BinaryBigInt } from '@deepkit/type';
            
            interface User {
                id: BinaryBigInt;
            }
            
            const user: User = {id: 24n};
            
            serialize<User>({id: 24n}); //{id: '24'}
            
            serialize<BinaryBigInt>(24); //'24'
            serialize<BinaryBigInt>(-24); //'0'
        </textarea>

        <p>
            Deepkit ORM stores BinaryBigInt as a binary field.
        </p>

        <h4>SignedBinaryBigInt</h4>

        <p>
            Same as <code>BinaryBigInt</code> but is able to store negative values as well.
        </p>

        <p>
            Deepkit ORM stores SignedBinaryBigInt as binary. The binary has an additional leading sign byte and is
            represented
            as an
            uint: 255 for negative, 0 for zero, or 1 for positive.
        </p>

        <textarea codeHighlight>
            import { SignedBinaryBigInt } from '@deepkit/type';

            interface User {
                id: SignedBinaryBigInt;
            }
        </textarea>

        <h4>MapName</h4>

        <p>
            To change the name of a property in the serialization.
        </p>

        <textarea codeHighlight>
            import { serialize, deserialize, MapName } from '@deepkit/type';
            
            interface User {
                firstName: string & MapName<'first_name'>;
            }
            
            serialize<User>({firstName: 'Peter'}) // {first_name: 'Peter'}
            deserialize<User>({first_name: 'Peter'}) // {firstName: 'Peter'}
        </textarea>

        <h4>Group</h4>

        <p>
            Properties can be grouped together. For serialization you can for example exclude a group from
            serialization.
            See the chapter <a href="/documenation/type/serialization">Serialization</a> for more information.
        </p>

        <textarea codeHighlight>
            import { serialize } from '@deepkit/type';
            
            interface Model {
                username: string;
                password: string & Group<'secret'>
            }
            
            serialize<Model>(
                { username: 'Peter', password: 'nope' },
                { groupsExclude: ['secret'] }
            ); //{username: 'Peter'}
        </textarea>

        <h4>Data</h4>

        <p>
            Each property can add additional meta data that can be read via the
            <a href="/documentation/type/reflection">Reflection API</a>.
        </p>

        <textarea codeHighlight>
            import { ReflectionClass } from '@deepkit/type';
            
            interface Model {
                username: string;
                title: string & Data<'key', 'value'>
            }
            
            const reflection = ReflectionClass.from<Model>();
            reflection.getProperty('title').getData()['key']; //value;
        </textarea>

        <h4>Excluded</h4>

        <p>
            Each property can be excluded from the serialization process for a specific target.
        </p>

        <textarea codeHighlight>
            import { serialize, deserialize, Excluded } from '@deepkit/type';

            interface Auth {
                title: string;
                password: string & Excluded<'json'>
            }
            
            const item = deserialize<Auth>({title: 'Peter', password: 'secret'});
            
            item.password; //undefined, since deserialize's default serializer is called \`json\`
            
            item.password = 'secret';
            
            const json = serialize<Auth>(item);
            json.password; //again undefined, since serialize's serializer is called \`json\`
        </textarea>

        <h4>Entity</h4>

        <p>
            To annotate interfaces with entity information. Only used in the database context.
        </p>

        <textarea codeHighlight>
            import { Entity, PrimaryKey } from '@deepkit/type';
            
            interface User extends Entity<{name: 'user', collection: 'users'> {
                id: number & PrimaryKey;
                username: string;
            }
        </textarea>

        <h4>PrimaryKey</h4>

        <p>
            Marks this field as primary key. Only used in the database context.
        </p>
        
        <textarea codeHighlight>
            import { PrimaryKey } from '@deepkit/type';
            
            interface User  {
                id: number & PrimaryKey;
                username: string;
            }
        </textarea>

            
        <h4>AutoIncrement</h4>

        <p>
            Marks this field as auto increment. The field is usually also a primary key.
            Only used in the database context.
        </p>
            
        <textarea codeHighlight>
            import { PrimaryKey, AutoIncrement } from '@deepkit/type';
            
            interface User  {
                id: number & PrimaryKey & AutoIncrement;
                username: string;
            }
        </textarea>

        <h4>Reference</h4>

        <p>
            Marks this field as a reference. Also known as Foreign Key in database context.
        </p>
            
        <textarea codeHighlight>
            import { PrimaryKey, Reference } from '@deepkit/type';
            
            interface Image {
                id: number & PrimaryKey;
                path: string;
                url: string;
            }
            
            interface User  {
                id: number & PrimaryKey;
                avatar: Image & Reference;
            }
        </textarea>

        <h4>BackReference</h4>

        <p>
            Marks this field as a back reference. Needed for the reversed side of a reference.
        </p>

        <textarea codeHighlight>
            import { PrimaryKey, Reference, BackReference } from '@deepkit/type';
            
            interface Image {
                id: number & PrimaryKey;
                path: string;
                url: string;
                users: User[] & BackReference; 
            }
            
            interface User  {
                id: number & PrimaryKey;
                avatar: Image & Reference;
            }
        </textarea>

        <h4>Index</h4>

        <p>
            Marks the field as an index.
        </p>

        <textarea codeHighlight>
            import { PrimaryKey, Index } from '@deepkit/type';
            
            interface User  {
                id: number & PrimaryKey;
                username: string & Index;
            }
        </textarea>
            
        <h4>Unique</h4>

        <p>
            Marks the field as an unique index.
        </p>

        <textarea codeHighlight>
            import { PrimaryKey, Unique } from '@deepkit/type';
            
            interface User  {
                id: number & PrimaryKey;
                username: string & Unique;
            }
        </textarea>

        <h4>Embedded</h4>

        <p>
            Marks the field as an embedded type.
        </p>

        <textarea codeHighlight>
            import { PrimaryKey, Embedded, serialize, deserialize } from '@deepkit/type';
            
            interface Address {
                street: string;
                postalCode: string;
                city: string;
                country: string;
            }
            
            interface User  {
                id: number & PrimaryKey;
                address: Embedded<Address>;
            }
            
            const user: User {
                id: 12,
                address: {
                    street: 'abc', postalCode: '1234', city: 'Hamburg', country: 'Germany'
                }
            };
            
            serialize<User>(user);
            {
                id: 12,
                address_street: 'abc',
                address_postalCode: '1234',
                address_city: 'Hamburg',
                address_country: 'Germany'
            }
            
            //for deserialize you have to provide the embedded structure
            deserialize<User>({
                id: 12,
                address_street: 'abc',
                //...
            });
        </textarea>

        <p>
            It's possible to change the prefix (which is per default the property name).
        </p>
            
        <textarea codeHighlight>
            interface User  {
                id: number & PrimaryKey;
                address: Embedded<Address, {prefix: 'addr_'}>;
            }
            
            serialize<User>(user);
            {
                id: 12,
                addr_street: 'abc',
                addr_postalCode: '1234',
            }
            
            //or remove it entirely
            interface User  {
                id: number & PrimaryKey;
                address: Embedded<Address, {prefix: ''}>;
            }
            
            serialize<User>(user);
            {
                id: 12,
                street: 'abc',
                postalCode: '1234',
            }
        </textarea>

        <h4>DatabaseField</h4>

        <p>
            This type allows to specify certain options to configure the database column/field definition.
            For example it enables you to define an explicit SQL database type, e.g. <code>VARCHAr(255)</code>.
        </p>

        <p>
            There are more specific versions of this type available via <code>MySQL</code>, <code>Postgres</code>,
            <code>SQLite</code>
        </p>

        <textarea codeHighlight>
            import { MySQL, SQLite, DatabaseField } from '@deepkit/type';
                    
            class User {
                username: string & MySQL<{ type: 'varchar(255)' }> = '';
                username: string & SQLite<{ type: 'varchar(255)' }> = '';
            
                //same as above but for all databases
                username: string & DatabaseField<{ type: 'varchar(255)' }> = '';
            }
        </textarea>
            
        <h4>InlineRuntimeType</h4>
            
        <p>
            This type allows to inject a dynamic built type object into the type system.
            The type processor includes the given variable content instead of inferring its type.
        </p>
            
        <textarea codeHighlight>
            import { InlineRuntimeType, Type, ReflectionKind, typeOf, stringifyType } from '@deepkit/type';
            
            const typeObject: Type = { kind: ReflectionKind.string };
            
            interface MyType
                a: InlineRuntimeType<typeof typeObject>;
            }
            
            const type = typeOf<MyType>();
            
            stringifyType(type); //MyType {a: string}
        </textarea>

        <h3>Explicit types</h3>

        <p>
            The type compiler only recognizes explicit type declarations, no inferring. That means if you want
            have types available in runtime make sure to explicitly define them. This is in most cases only
            necessary for class properties and function parameters.
        </p>

        <textarea codeHighlight>
            class User {
                id = 0; //not typed
                id: number = 0; //correctly typed
            }
        </textarea>

        <h3>Validation</h3>

        <p>
            To add additional validation checks there are several pre defined decorators available.
            To add custom validation functions and learn more about validation, see the chapter <a
                href="/documentation/type/validation">Validation</a>.
        </p>

        <table class="pretty">
            <tr>
                <th>Type decoration</th>
                <th>Description</th>
            </tr>
            <tr>
                <td>Validate&lt;typeof myValidator&gt;</td>
                <td>Custom validation function</td>
            </tr>
            <tr>
                <td>Pattern&lt;typeof myRegexp&gt;</td>
                <td>Defines a regular expression as validation pattern. Usually used for E-Mail validation or more
                    complex content validation.
                </td>
            </tr>
            <tr>
                <td>Alpha</td>
                <td>Validation for alpha characters (a-Z).</td>
            </tr>
            <tr>
                <td>Alphanumeric</td>
                <td>Validation for alpha and numeric characters.</td>
            </tr>
            <tr>
                <td>Ascii</td>
                <td>Validation for ASCII characters</td>
            </tr>
            <tr>
                <td>Decimal&lt;1, 34&gt;</td>
                <td>Validation for string represents a decimal number, such as 0.1, .3, 1.1, 1.00003, 4.0, etc.</td>
            </tr>
            <tr>
                <td>MultipleOf&lt;3&gt;</td>
                <td>Validation of numbers that are a multiple of given number.</td>
            </tr>
            <tr>
                <td>MinLength&lt;3&gt;,
                    MaxLength&lt;4&gt;
                </td>
                <td>Validation for min/max length for arrays or strings of given number.</td>
            </tr>
            <tr>
                <td>Includes&lt;'something'&gt;
                    Excludes&lt;'something'&gt;
                </td>
                <td>Validation for an array item being included/excluded.</td>
            </tr>
            <tr>
                <td>Minimum&lt;2&gt;, Maximum&lt;4&gt;</td>
                <td>Validation for a value being minimum or maximum given number. Same as <code>&gt;=</code>
                    <code>&lt;=</code>.
                </td>
            </tr>
            <tr>
                <td>ExclusiveMinimum&lt;3&gt;,
                    ExclusiveMaximum&lt;3&gt;
                </td>
                <td>Same as minimum/maximum but exludes the value itself. Same as <code>&gt;</code> <code>&lt;</code>
                </td>
            </tr>
            <tr>
                <td>Positive, Negative, PositiveNoZero, NegativeNoZero</td>
                <td>Validation for a value being positive or negative.</td>
            </tr>
            <tr>
                <td>BeforeNow, AfterNow</td>
                <td>Validation for a date value compared to now (new Date).</td>
            </tr>
            <tr>
                <td>Email</td>
                <td>Simple regexp validation of emails via <code>/^\\S+@\\S+$/</code>.</td>
            </tr>
        </table>

        <p>
            More information about validators can be found in the chapter 
            <a href="/documentation/type/validation">Validation</a>
        </p>

        <h3>External classes</h3>

        <p>
            Since TypeScript does not include type information per default, imported types/classes from
            other packages (that did not use @deepkit/type-compiler) will not have type information available.
        </p>
            
        <p>
            To annotate types for an external class, use <code>annotateClass</code> and make sure this function
            is executed in the bootstrap phase of your application before the imported class is used somewhere else.
        </p>

        <textarea codeHighlight>
            import { MyExternalClass } from 'external-package';
            import { annotateClass } from '@deepkit/type';

            interface AnnotatedClass {
                id: number;
                title: string;
            }
            
            annotateClass<AnnotatedClass>(MyExternalClass);
            
            //all uses of MyExternalClass return now the type of AnnotatedClass
            serialize<MyExternalClass>({...});
            
            //MyExternalClass can now also be used in other types
            interface User {
                id: number;
                clazz: MyExternalClass;
            }
        </textarea>

        <p>
            MyExternalClass can now be used in serialization functions and in the reflection API.
        </p>
            
        <p>To following shows how to annotate generic classes</p>
            
        <textarea codeHighlight>
            import { MyExternalClass } from 'external-package';
            import { annotateClass } from '@deepkit/type';
        
            class AnnotatedClass<T> {
                id!: T;
            }
        
            annotateClass(ExternalClass, AnnotatedClass);
        </textarea>
            

        <h3>Not supported types</h3>

        Not supported types are at the moment:

        <ol>
            <li>Key remapping in Mapped Types, e.g. <code>{{unsupported1}}</code></li>
        </ol>
    `
})
export class DocTypeTypesComponent {
    unsupported1 = '{ [P in keyof T & string as `${P}Change`]: T[P] }';
}
