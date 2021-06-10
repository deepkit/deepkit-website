import { Component } from '@angular/core';

@Component({
    template: `
        <div class="subline">Type</div>
        
        <h2>Reflection</h2>
        
        <p>
            Once you have created a schema, you can read its type information via the class <code>ClassSchema</code>.
            To do so call <code>getClassSchema()</code> with the class or schema object as argument.
        </p>
        
        <textarea codeHighlight>
            import 'reflect-metadata';
            import { t, getClassSchema } from '@deepkit/type';
            
            class MyModel {
                @t.optional title?: string;
            
                constructor(@t public id: number) {
                }
            }
            
            const schema = getClassSchema(MyModel);
            
            schema.getProperties().length; //2
            schema.getProperty('title').name; //title
            schema.getProperty('title').isOptional; //true
            schema.getProperty('title').type; //string
            
            schema.getProperty('id').name; //id
            schema.getProperty('id').type; //number
            schema.getProperty('id').isOptional; //false
            
            const constructorParameters = schema.getMethodProperties('constructor');
            const first = constructorParameters[0];
            first.name; //id
            first.type; //number
            first.isOptional; //false
        </textarea>
        
        <p>There are a lot more methods available. Use your editor to discover them all.</p>
        
        <p>
            You can also modify the schema, but note that the schema itself is attached to the given class (or schema), and
            thus if other code made assumptions or read values from that schema those changes
            are usually not reflected. So make sure to apply changes before anyone reads and stores information about that schema.
        </p>
        
        <h2>Functional schema</h2>
        
        <p>When you work with a functional schema, your created object is already a <code>ClassSchema</code> instance, so there is no need
        to call getClassSchema.</p>

        <textarea codeHighlight>
            import { t } from '@deepkit/type';
            
            const myModelSchema = t.schema({
                title: t.string.optional,
                id: t.number,
            }, {name: 'MyModel'});
            
            myModelSchema.getProperties().length; //2
            myModelSchema.getProperty('title').name; //title
            myModelSchema.getProperty('title').isOptional; //true
            myModelSchema.getProperty('title').type; //string
        </textarea>
    `
})
export class DocTypeReflectionComponent {
}
