import { Component } from '@angular/core';

@Component({
    template: `
        <div class="subline">Type</div>

        <h2>Validation</h2>

        <p>
            Validation is the process of checking data types and data content of a type.
            Deepkit Type supports runtime type checking as well as data validation. Runtime type checking is built-in
            and doesn't require
            any additional type decoration. Data validation on the other hand is completely user-specific and needs to
            be manually
            annotated.
        </p>

        <p>
            There are several functions available to validate a type: <code>validate</code> and <code>is</code>
            (which is the same as <code>validates</code>).
        </p>

        <p>
            <code>validate</code> returns an array of <code>ValidationErrorItem</code> on validation error and an empty
            array if
            successful.
        </p>

        <p>
            <code>is</code> returns a boolean, which can be used for type guarding.
        </p>

        <h3>Validation with error reporting</h3>

        <textarea codeHighlight title="app.ts">
            import { validate } from '@deepkit/type';
            
            validate<string>('abc'); //[]
            validate<string>(123); //[{path: '',code: 'type', message: 'Not a string'}]
            
            interface Article {
                id: number;
                title?: string;
            }
            
            validate<Article>({id: 1}); //[]
            validate<Article>({}); //[{path: 'id', code: 'type', message: 'Not a number'}]
        </textarea>

        <p>
            There can be many errors in the returned array, but only one for each property (the first encountered
            validation error).
        </p>

        <h3>Type guarding with <code>is</code></h3>

        <textarea codeHighlight title="app.ts">
            import { is } from '@deepkit/type';

            is<string>('abc'); //true
            is<string>(123); //false
            
            interface Article {
                id: number;
                title?: string;
            }
            
            const data: any = {title: 'asd'};
            
            if (is<Article>(data)) {
                //data is now type guarded and has the type defined in the schema.
                //however, this will never be true since given data is not valid for the type Article.
                data.title;
            }
        </textarea>

        <h3>Data validation</h3>

        <p>
            To validate data (the content/value) you need to use a validation type, for example <code>MinLength&lt;2&gt;)</code>.
        </p>

        <textarea codeHighlight>
            type ID = integer & Minimum<0> & Maximum<1000>;
            
            is<ID>(0); //true
            is<ID>(0.3); //false
            is<ID>(-1); //false
            is<ID>(10001); //false
            
            interface User {
                username: string & MinLength<3> & MaxLength<32>; 
            }

            is<User>({username: ''}); //false
            is<User>({username: 'Peter'}); //true
        </textarea>

        <table class="pretty">
            <tr>
                <th style="width: 250px;">Type decoration</th>
                <th>Description</th>
            </tr>
            <tr>
                <td>Validate&lt;typeof myValidator&gt;</td>
                <td>
                    Custom validation function.
                    See the next chapter "Custom validation" of this page for more information.
                    <textarea codeHighlight>
                        type T = string & Validate<typeof myValidator>
                    </textarea>
                </td>
            </tr>
            <tr>
                <td>Pattern&lt;typeof myRegexp&gt;</td>
                <td>Defines a regular expression as validation pattern. Usually used for E-Mail validation or more
                    complex content validation.
                    <textarea codeHighlight>
                        const myRegExp = /[a-zA-Z]+/;
                        type T = string & Pattern<typeof myRegExp>
                    </textarea>
                </td>
            </tr>
            <tr>
                <td>Alpha</td>
                <td>
                    Validation for alpha characters (a-Z).
                    <textarea codeHighlight>
                        type T = string & Alpha;
                    </textarea>
                </td>
            </tr>
            <tr>
                <td>Alphanumeric</td>
                <td>
                    Validation for alpha and numeric characters.
                    <textarea codeHighlight>
                        type T = string & Alphanumeric;
                    </textarea>
                </td>
            </tr>
            <tr>
                <td>Ascii</td>
                <td>
                    Validation for ASCII characters.
                    <textarea codeHighlight>
                        type T = string & Ascii;
                    </textarea>
                </td>
            </tr>
            <tr>
                <td>Decimal&lt;number, number&gt;</td>
                <td>
                    Validation for string represents a decimal number, such as 0.1, .3, 1.1, 1.00003, 4.0, etc.
                    <textarea codeHighlight>
                        type T = string & Decimal<1, 2>;
                    </textarea>
                </td>
            </tr>
            <tr>
                <td>MultipleOf&lt;number&gt;</td>
                <td>
                    Validation of numbers that are a multiple of given number.
                    <textarea codeHighlight>
                        type T = number & MultipleOf<3>;
                    </textarea>
                </td>
            </tr>
            <tr>
                <td>MinLength&lt;number&gt;,
                    MaxLength&lt;number&gt;
                </td>
                <td>
                    Validation for min/max length for arrays or strings of given number.
                    <textarea codeHighlight>
                        type T = any[] & MinLength<1>;
                        type T = string & MinLength<3> & MaxLength<16>;
                    </textarea>
                </td>
            </tr>
            <tr>
                <td>Includes&lt;'any'&gt;
                    Excludes&lt;'any'&gt;
                </td>
                <td>
                    Validation for an array item or sub string being included/excluded.
                    <textarea codeHighlight>
                        type T = any[] & Includes<'abc'>;
                        type T = string & Excludes<' '>;
                    </textarea>
                </td>
            </tr>
            <tr>
                <td>Minimum&lt;number&gt;, Maximum&lt;number&gt;</td>
                <td>Validation for a value being minimum or maximum given number. Same as <code>&gt;=</code>
                    <code>&lt;=</code>.
                    <textarea codeHighlight>
                        type T = number & Minimum<10>;
                        type T = number & Minimum<10> & Maximum<1000>;
                    </textarea>
                </td>
            </tr>
            <tr>
                <td>ExclusiveMinimum&lt;number&gt;,
                    ExclusiveMaximum&lt;number&gt;
                </td>
                <td>
                    Same as minimum/maximum but excludes the value itself. Same as <code>&gt;</code> <code>&lt;</code>
                    <textarea codeHighlight>
                        type T = number & ExclusiveMinimum<10>;
                        type T = number & ExclusiveMinimum<10> & ExclusiveMaximum<1000>;
                    </textarea>
                </td>
            </tr>
            <tr>
                <td>Positive, Negative, PositiveNoZero, NegativeNoZero</td>
                <td>
                    Validation for a value being positive or negative.
                    <textarea codeHighlight>
                        type T = number & Positive;
                        type T = number & Negative;
                    </textarea>
                </td>
            </tr>
            <tr>
                <td>BeforeNow, AfterNow</td>
                <td>
                    Validation for a date value compared to now (new Date).
                    <textarea codeHighlight>
                        type T = Date & BeforeNow;
                        type T = Date & AfterNow;
                    </textarea>
                </td>
            </tr>
            <tr>
                <td>Email</td>
                <td>
                    Simple regexp validation of emails via <code>/^\\S+@\\S+$/</code>.
                    <textarea codeHighlight>
                        type T = Email;
                    </textarea>
                </td>
            </tr>
            <tr>
                <td>integer</td>
                <td>
                    Ensures that the number is a integer in the correct range.
                    <textarea codeHighlight>
                        type T = integer;
                        type T = uint8;
                        type T = uint16;
                        type T = uint32;
                        type T = int8;
                        type T = int16;
                        type T = int32;
                    </textarea>

                    See <a href="/documentation/type/types#integer-float">Special types: integer/floats</a>
                    for more information.
                </td>
            </tr>
        </table>

        <h3>Custom validation</h3>

        <p>
            If built-in validators are not sufficient, you can create own validation functions and use the decorator
            <code>Validate</code>
        </p>

        <textarea codeHighlight title="app.ts">
            import { ValidatorError, Validate, Type } from '@deepkit/type';

            function titleValidation(value: string, type: Type) {
                value = value.trim();
                if (value.length < 5) return new ValidatorError('tooShort', 'Value is too short');
            }
            
            interface Article {
                id: number;
                title: string & Validate<typeof titleValidation>;
            }
            
            console.log(validates(schema, {id: 1})); //false
            console.log(validates(schema, {id: 1, title: 'Peter'})); //true
            console.log(validates(schema, {id: 1, title: ' Pe     '})); //false
            console.log(validate(schema, {id: 1, title: ' Pe     '})); //[ValidationErrorItem]
        </textarea>

        <textarea codeHighlight>
            $ ts-node app.ts
            false
            true
            false
            [
              ValidationErrorItem {
                path: 'title',
                code: 'tooShort',
                message: 'Value is too short'
              }
            ]
        </textarea>

        <p>
            Note that your custom validation function is executed after all built-in type validators have been called.
            If one validator fails all subsequent validators are omitted for that property. Only one error is possible
            per property.
        </p>

        <h3>Generic validator</h3>

        <p>
            You get in your validator function the type object that can be used to retrieve more
            information about the type that uses your validator.
            There is also a way to define an arbitrary validator option that needs to be passed to the Validate type
            and makes the validator configurable.
            With this information and its parent references you can build powerful
            generic validators.
        </p>

        <textarea codeHighlight title="app.ts">
            import { ValidatorError, Validator, Type } from '@deepkit/type';

            function startsWith(value: any, type: Type, chars: string) {
                const valid = 'string' === typeof value && value.startsWith(chars);
                return valid ? undefined : new ValidatorError('startsWith', 'Does not start with ' + chars);
            }

            type MyType = string & Validate<typeof startsWith, 'a'>;
            
            expect(is<MyType>('aah')).toBe(true);
            expect(is<MyType>('nope')).toBe(false);
            expect(validate<MyType>('nope')).toEqual([{ path: '', code: 'startsWith', message: \`Does not start with a\` }]);
        </textarea>
    `
})
export class DocTypeValidationComponent {
}
