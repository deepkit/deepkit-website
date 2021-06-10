import { Component } from '@angular/core';

@Component({
    template: `
        <div class="subline">Type</div>
        
        <h2>Getting Started</h2>
        
        
        <h3>Installation</h3>
        
        <textarea codeHighlight="bash">
            npm install @deepkit/type reflect-metadata @deepkit/core
        </textarea>

        <p>
            Deepkit Type uses reflect-metadata and the decorator metadata of TypeScript. 
            Make sure you have <code>experimentalDecorators</code> and <code>emitDecoratorMetadata</code> enabled in <code>tsconfig.json</code>:
        </p>
        
        <textarea codeHighlight="json">
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
        </textarea>
        
        <p>
            Since decorator metadata are stored using Metadata Reflection API using <code>Reflect.defineMetadata()</code>,
            you have to make sure these methods are defined. The package <code>reflect-metadata</code> provides an excellent implementation.
            For every entry point of your application you have to import <code>reflect-metadata</code> at the very beginning <strong>before</strong>
            you use any @deepkit/type code.
        </p>

        <h3>Using</h3>
        
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
            
            console.log('Is MyModel?', myModel instanceof MyModel);
            console.log('Date converted?', myModel.created instanceof Date);
            console.log(myModel);
        </textarea>
        
        You can run this script using <code>ts-node app.ts</code>.
        
        <textarea codeHighlight>
            $ ts-node app.ts
            Is MyModel? true
            Date converted? true
            MyModel {
              name: 'Peter',
              id: 'f2ee05ad-ca77-49ea-a571-8f0119e03038',
              created: 2018-10-13T12:17:35.000Z
            }
        </textarea>
        
        <h3>Schema</h3>
        
        <p>
            It's important to use the <code>@t</code> decorators to correctly define your schema given in the class itself.
            To see which decorators exist and which data types are supported, see the next chapter 
            <a href="/documentation/type/schema">Schema</a>.
        </p>
        
    `
})
export class DocTypeGettingStartedComponent {
}
