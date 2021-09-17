import { Component } from '@angular/core';

@Component({
    template: `
        <div class="subline">Type</div>

        <h2>Validation</h2>

        <p>
            Validation is the process of checking data types and data content of a schema.
            Deepkit Type supports runtime type checking as well as data validation. Runtime type checking is built-in and doesn't require
            any additional type decoration. Data validation on the other hand is completely user-specific and needs to be manually
            annotated.
        </p>

        <p>
            There are two main functions available to validate a schema: <code>validate</code> and <code>validates</code>.
        </p>

        <p>
            <code>validate</code> returns an array of <code>ValidationFailedItem</code> on validation error and an empty array if
            successful.
        </p>

        <p>
            <code>validates</code> returns a boolean, which can be used for type guarding.
        </p>

        <h3>Validation with error reporting using <code>validate</code></h3>
        
        <textarea codeHighlight title="app.ts">
            import { t, validate } from '@deepkit/type';
            
            const schema = t.schema({
                title: t.string.optional,
                id: t.number,
            });
            
            validate(schema, {id: 1}).length; //0, means it validated successfully
            validate(schema, {}).length; //1, means there are validation errors
            
            console.log(validate(schema, {}));
        </textarea>
        
        <textarea codeHighlight>
            $ ts-node app.ts
            [
              ValidationFailedItem {
                path: 'id',
                code: 'required',
                message: 'Required value is undefined'
              }
            ]
        </textarea>
        
        <p>
            There can be many errors in the returned array, but only one for each property (the first encountered validation error).
        </p>

        <h3>Type guarding with <code>validates</code></h3>
        
        <textarea codeHighlight title="app.ts">
            import { t, validates } from '@deepkit/type';

            const schema = t.schema({
                title: t.string.optional,
                id: t.number,
            });
            
            const data: any = {title: 'asd'};
            
            if (validates(schema, data)) {
                //data is now type guarded and has the type defined in the schema
                data.title;
            }
        </textarea>


        <h3>Data validation</h3>

        <p>
            To validate data (the content/value of a property) you need to use a validation decorator, for example <code>t.minLength(2)</code>.
        </p>

        <textarea codeHighlight>
            import { t } from '@deepkit/type';
            
            class User {
                @t.pattern(/^\\S+@\\S+\\.\\S+$/) email?: string;
            
                constructor(@t.minLength(3).maxLength(32) public username: string) {
                }
            }
        </textarea>
        
        <p>
            See the chapter <a routerLink="/documentation/type/schema">Schema</a> to get a detailed list of all available validator decorators on the <code>t</code> object.
        </p>
        
        <h3>Custom validation</h3>

        <p>
            If built-in validators are not sufficient, you can create own validation functions and use the decorator <code>t.validator</code>
        </p>

        <textarea codeHighlight title="app.ts">
            import { PropertyValidatorError, t, validates, validate } from '@deepkit/type';

            function titleValidation(value: string) {
                value = value.trim();
                if (value.length < 5) 
                    throw new PropertyValidatorError('too_short', 'Value is too short');
            }
            
            const schema = t.schema({
                title: t.string.validator(titleValidation),
                id: t.number,
            });
            
            console.log(validates(schema, {id: 1})); //false
            console.log(validates(schema, {id: 1, title: 'Peter'})); //true
            console.log(validates(schema, {id: 1, title: ' Pe     '})); //false
            console.log(validate(schema, {id: 1, title: ' Pe     '})); //[ValidationFailedItem]
        </textarea>

        <textarea codeHighlight>
            $ ts-node app.ts
            false
            true
            false
            [
              ValidationFailedItem {
                path: 'title',
                code: 'too_short',
                message: 'Value is too short'
              }
            ]
        </textarea>

        <p>
            Note that your custom validation function is executed after all built-in type validators have been called.
            If one validator fails all subsequent validators are omitted for that property. Only one error is possible per property.
        </p>

        <h3>Generic validator</h3>

        <p>
            You get in your validator function the property schema and an optional <code>ClassType</code> that can be used to retrieve more
            information about
            the property that uses your validator. The ClassType is optional because validation can also be used on property schemas, where
            no class is involved.
        </p>

        <textarea codeHighlight title="app.ts">
            import { ClassType } from '@deepkit/core';
            import { getClassSchema, PropertyValidatorError, t } from '@deepkit/type';
            
            function titleValidation(value: any, property: PropertySchema, classType?: ClassType) {
                if (property.type === 'string') {
                    //we can assume that \`value\` is a string.
                    const stringValue = value as string;
                    if (stringValue.length < 5) throw new PropertyValidatorError('too_short', 'Value is too short');
                }
            }
            
            const schema = t.schema({
                title: t.string.validator(titleValidation),
            });

        </textarea>
    `
})
export class DocTypeValidationComponent {
}
