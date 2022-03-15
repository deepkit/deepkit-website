import { Component } from '@angular/core';

@Component({
    template: `
        <div class="subline">Type</div>

        <h2>Reflection</h2>

        <p>
            With Deepkit Type it's possible to get reflection information about types during runtime.
            There are mainly two ways to read the runtime type data: Either via Reflection classes or via raw type
            objects.
        </p>

        <h3>Type objects</h3>

        <p>
            Type objects are simple JavaScript objects representing all types of TypeScript. To get a type object
            from a type, use the <code>typeOf()</code> function.
        </p>


        <textarea codeHighlight>
            import { typeOf, ReflectionKind } from '@deepkit/type';
            
            typeOf<string>(); // {kind: ReflectionKind.string}
            typeOf<number>(); // {kind: ReflectionKind.number}
            typeOf<boolean>(); // {kind: ReflectionKind.boolean}
            
            typeOf<string | number>(); 
            // {kind: ReflectionKind.union, types: [{kind: ReflectionKind.string}, {kind: ReflectionKind.number}]}
            
            class MyClass {
                id: number = 0;
            }
            typeOf<MyClass>();
            //{kind: ReflectionKind.class, classType: MyClass, types: [
            //    {kind: ReflectionKind.property, name: 'id', type: {kind: ReflectionKind.number}, default: () => 0}
            //]}
        </textarea>

        <h3>Reflection classes</h3>

        <p>
            There are Reflection classes available mainly for classes and interfaces, and their properties and methods.
        </p>

        <textarea codeHighlight>
            import { ReflectionClass } from '@deepkit/type';
            
            class MyClass {
                id: number = 0;
            
                doIt(arg: string): void {}
            }
            
            const reflection = ReflectionClass.from(MyClass);
            reflection.getProperty('id').type; // {kind: ReflectionKind.number}
            reflection.getProperty('id').isOptional(); //false
            reflection.getPropertyNames(): ['id'];
            
            reflection.getMethod('doIt').getReturnType(); //{kind: ReflectionKind.void}
            reflection.getMethod('doIt').getParameter('arg').type; //{kind: ReflectionKind.string}
            
            //works with interfaces as well
            interface User {
                id: number;
            }
            const reflection = ReflectionClass.from<User>();
        </textarea>

        <h3>Stringify type</h3>

        <p>
            A type object can be printed as TypeScript source.
            <code>stringifyType</code> tries to print the least possible while
            <code>stringifyResolvedType</code> prints the full type (including properties etc.)
        </p>

        <textarea codeHighlight>
            import { typeOf, stringifyType, stringifyResolvedType } from '@deepkit/type';

            interface User {
                id: number;
            }

            const type = typeOf<User>();
            stringifyType(type); //User
            stringifyResolvedType(type); //User {id: number}
        </textarea>

        <h3>Type annotations</h3>

        <p>
            There are several special types available that annotate the types with various information.
            For example <code>UUID</code>, <code>PrimaryKey</code>, <code>Group</code>, <code>Excluded</code>,
            and more. See <a href="/documentation/type/types#special-types">Special types</a> for more information.
        </p>

        <p>
            Those special types add annotations to the type object in the <code>annotations</code> property.
        </p>

        <textarea codeHighlight>
            import { typeOf, PrimaryKey } from '@deepkit/type';
            type MyId = string & PrimaryKey;
            const type = typeOf<MyId>();
            console.log(type);
        </textarea>

        <p>
            This prints a bit of information already:
        </p>

        <textarea codeHighlight>
    {
      kind: 5,
      typeName: 'MyId',
      annotations: { [Symbol(primaryKey)]: [ true ] },
      decorators: [
        {
          kind: 30,
          typeName: 'PrimaryKey',
          types: [Array],
          annotations: {}
        }
      ]
    }
        </textarea>

        <p>
            In <code>decorators</code> the actual decorator type of <code>PrimaryKey</code> can be found, and in
            <code>annotations</code> the parsed annotation information. The annotation can be read in this case via:
        </p>

        <textarea codeHighlight>
            import { isPrimaryKeyType, primaryKeyAnnotation } from '@deepkit/type';
            
            isPrimaryKeyType(type); //true;
            
            primaryKeyAnnotation.getFirst(type); //true
        </textarea>
        
        <p>
            For special types that accept arguments, those values are usually available in one of the <code>*Annotation</code>
            objects. For example for <code>DatabaseField</code>:
        </p>

        <textarea codeHighlight>
            import { DatabaseField, databaseAnnotation } from '@deepkit/type';
            
            type MyField = string & DatabaseField<{type: 'VARCHAR(255)'}>;
            const type = typeOf<MyField>();
            databaseAnnotation.getFirst(type); //{ name: '*', options: { type: 'VARCHAR(255)' } }
        </textarea>
        
        <p>
            For special types that can be applied multiple times, they are available via the <code>*Annotation.getAnnotations()</code>
            method.
        </p>

        <textarea codeHighlight>
            import { Group, groupAnnotation } from '@deepkit/type';
            
            type MyField = string & Group<'a'> & Group<'b'>
            const type = typeOf<MyField>();
            
            groupAnnotation.getAnnotations(type); //[ 'a', 'b' ]
        </textarea>
        
        <h3>Custom special types</h3>
        
        <p>
            All the special types use the same pattern: They return an object literal with an optional <code>__meta</code>
            tuple, where the first entry is a unique id and all subsequent entries additional information.
            The runtime type processor handles those object literals with only an optional __meta property 
            in a special way and does not try to actually intersect the two types. Instead they will be treated as type decorators
            that generate type annotations.
        </p>
            
        <p>
            For example the PrimaryKey looks like that:
        </p>

        <textarea codeHighlight>
            export type PrimaryKey = { __meta?: ['primaryKey'] };
        </textarea>
        
        <p>
            It has no additional information. However, a type like <code>MapName</code> has two:
        </p>

        <textarea codeHighlight>
            export type MapName<Alias extends string, ForSerializer extends string = ''> = { __meta?: ['mapName', Alias, ForSerializer] };
        </textarea>

        <p>
            You can define and use your own special type just like that:
        </p>

        <textarea codeHighlight>
            import { metaAnnotation, stringifyType } from '@deepkit/type';
            
            type MyType<T extends string> = { __meta?: ['myType', T] };
            
            type myField = string & MyType<'option'>; 
            
            const type = typeOf<myField>();
            
            stringifyType(type); //string
            
            metaAnnotation.getAnnotations(type);
            //[{
            //  name: 'myType',
            //  options: [ { kind: ReflectionKind.literal, literal: 'option' ]
            //}]
        </textarea>
            
        <p>
            With those information now available in <code>metaAnnotation</code> you can change
            for example the serializer or validator to something special when that type annotation is found. 
        </p>
    `
})
export class DocTypeReflectionComponent {
}
