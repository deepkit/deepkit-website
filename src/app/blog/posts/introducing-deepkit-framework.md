# Introducing Deepkit Framework

TypeScript has taken over the web and is here to stay. Its positive impact on how people and companies write web applications these days was and is massive.
But we believe that TypeScript's capabilities are not yet fully utilized, and we want to fill this gap with a completely new framework that has never existed before in this form.

TypeScript has an incredibly flexible and ergonomic type system that many developers love. 
Unfortunately, however, its capabilities in this regard are virtually non-existent in runtime. 
Types have a value, but we simply throw it away at compile time. 
Keeping types at runtime would have huge positive implications.

## Runtime Types

Having type information at runtime changes everything.
Serializers, validators, GraphQL/RPC frameworks, encoders, database abstractions, and many other solutions need type information to work properly. Many of the solutions somehow try to work around this problem and then rely on TypeScript decorators, others on completely custom domain specific languages (DSL) and even require code generators to work correctly. Some people try to convince the world that this is a "modern workflow", but we consider this a fundamental flaw we should not accept. There's a better way.

All this enormously increases the complexity of a project and - as it now turns out - is not necessary at all. We have now developed a compiler that converts TypeScript into bytecode and can thus not only dynamically compute types at runtime, but also retrieve all type information using a reflection API.

With this tool it is possible to enrich types with meta-data to use TypeScript itself to describe schemas for databases, GraphQL, or validators, and much more. But it goes beyond that and allows completely new ways of working with types.

For example, we can use a cast function in TypeScript that is fully functional. Since all type information is now available at runtime it's for the first time possible to have an actual real type cast in TypeScript.

```typescript
cast<string>(12); //"12"
cast<boolean>(1); //true
cast<number>("1.2"); //1.2
````

Of course, it does not stop at primitive types, but can be extended to complex types. Classes, interfaces, mapped types, and much more:

```typescript
class User {
    id: number = 0;
    created: Date = new Date;
    constructor(public username: string) {}
}

cast<User>({username: 'Peter'}); //User instance
cast<Partial<User>>({username: 'Peter'}); //{username: 'Peter'}

type Nums = {[name in `on${number}`]: number};
cast<Nums>({on2: '12'}); //{on2: 12}
```

This also works wonderfully for serializing to JSON (or any other encoding):

```typescript
serialize<Date>(new Date); //'2022-03-22T18:52:42.276Z'
```

Validation or type guards are also possible with it:

```typescript
is<string>('abc'); //true
is<string>(23); //false
is<Date>(new Date); //true
```

Deepkit comes out-of-the-box with type casting, de/serializer, validator, and automatic type guards, where all TypeScript types are supported. This includes: primitives (string, number, boolean, starts), array, tuples, date, classes, interfaces, object literals, mapped types, index signatures, template literals, and set/map. Basically all the types you can define in TypeScript.

## Type Decorators
To show another use case, database schemas, it is necessary to introduce a new concept before: Type Decorators.

In TypeScript itself, a pattern is known called Branded Types. We slightly adapt this concept to enrich types with meta-data. Meta data can be, for example, validation information or whether something is a primary key.

```typescript
type PrimaryKey = {__meta?: ['primaryKey']};
```

We can now add this type to others to append the meta information `['primaryKey']`.

```typescript
type ID = number & PrimaryKey;

interface User {
    id: ID;
    username: string;
}
```

At runtime, the meta-information is then retrievable so that tools like validators, serializers, or database libraries can work with it.

Deepkit comes with a whole set of such type decorators:
integer, int8, uint8, int16, int32, PrimaryKey, Reference, AutoIncrement, as well as ones for validation: Alpha, Alphanumeric, Positive, Negative, MinLength, Maximum, Includes, Excludes, Validator<Function>, as well as Group, Excluded, MapName, and many more. Equipped with these types, completely new workflows are possible to map guarantees into types.

For example, it is possible to define a type "Username" which has all semantic rules embedded in the type itself.

```typescript
type Username = string & MinLength<3> & MaxLength<23> & Alphanumeric;
```

And then to use it:

```typescript
is<Username>('Peter'); //true
is<Username>('xo'); //false
validate<Username>('xo'); //[{message: 'Too short, minimum 3 characters'}]

cast<Username>('xo'); //throws
cast<Username>('Peter'); //valid

// Can be used in other types as well.
interface User {
	username: Username;
}

cast<User>({username: 'xo'}); //throws
cast<User>({username: 'Peter'}); //valid
```

And just like that do we have a much more powerful type system. But it doesn't stop there.

## Database Schemas
We can use these type decorators in much more places. For example database schemas. We can use types to declare what is a primary key, foreign key, indexes, uniques, and more.

```typescript
interface User {
    id: integer & PrimaryKey & AutoIncrement;
    username: Username & Unique;
    createdAt: Date & MapName<'created_at'>;
    image?: Image & Reference; //becomes a Foreign Key
    posts: Post[] & BackReference;
}
```

In fact, Deepkit ORM is based on exactly these types, which makes it possible to use just TypeScript to describe your database entities. No more code generation or experimental class-only property decorators necessary.

Deepkit ORM is the only ORM that supports all TypeScript types out of the box. This includes: embedded documents, generics, index signatures, unions, const enums, and everything else. Validation of all types is automatically on board. This is a big leap in regards of merging the power of TypeScript with database abstractions like ORMs.

## Router
In HTTP routes the same game: when defining the types for route parameters, they are automatically converted and validated. This works for query parameters, url parameters, as well as for body types.

```typescript

router.get('/user/:id', (id: number & Positive) => {
	//id is guaranteed to be a number and positive.
});

type UserCreate = Omit<User, 'id' | 'createdAt'>;

router.post('/user', (body: HttpBody<UserCreate>) => {
	//body is guaranteed to be that exact constructed shape
});
```

This allows massive savings in all the code that would otherwise have to be written in the router controller to validate and convert the input.

## Dependency Injection
In backend frameworks it was not possible until recently to write properly modular applications and libraries, because as soon as a dependency injection container is used with TypeScript, one is more or less forced to develop against implementations instead of abstractions. This is simply because TypeScript interfaces do not exist at runtime. Partial workarounds were used, but all of them don't scale and don't look nice either. But that's in the past.

With Deepkit Injector, you can now write truly modular code based on abstractions. That is, interfaces can be used as dependencies.

```typescript
interface Logger {
    log(...message: any[]): void;
}

class MyService {
    constructor(private logger: Logger) {}
}

class LoggerImplementation implements Logger {
    log(...message: any[]): void {
        console.log(...message);
    }
}

new App({
	providers: [MyService, LoggerImplementation]
}).run();
```

And just like that did you perfectly decouple MyService from any logger library. The class MyService does no longer depend on a concrete implementation like you would currently need in many other frameworks, but a loosely coupled interface, to which you only have to provide a proper service that satisfies it. It will then be automatically injected into MyService. This way of wiring dependencies is well known in languages like PHP and Java, and is now part of TypeScript as well.

## Configuration
Getting configuration options in services has always been quite tedious. However, with types at runtime and the ability to get computation information, a novel pattern can be used here that has never existed before.

```typescript
class Config {
    debug: boolean = false;
    domain: string = 'localhost';
}

class MyService {
    constructor(private domain: Config['domain']) {}

    doIt() {
        this.domain; //localhost
    }
}

new App({
    config: Config,
    providers: [MyService]
}).run();
```

By simply defining `Config['domain']` as a dependency, the actual value behind `domain` is injected by the dependency injection container. The type itself of the property `domain` is `string` and can be easily provided in unit tests. Completely decoupled from the framework.

```typescript
new MyServce('localhost');
```

Also partial configuration options are possible:

```typescript

class MyService {
    constructor(private config: Pick<Config, 'domain' | 'debug'>) {}
}

// In unit tests:
new MyService({domain: 'localhost', debug: false});
```

With the ability to attach validation information to any type already introduced, the necessary configuration of a service or application can thus be described entirely in TypeScript and the framework ensures that everything is correctly deserialized and validated from for example environment variables.

## How It Works
The type compiler is, at its core, a TypeScript transformer that extracts explicitly declared type information into bytecode, which is then executed at runtime in a mini virtual machine. The result is a type object (`{kind: ReflectionKind.string}`) which contains all information.

Once `@deepkit/type-compiler` is installed, the transformer is installed in the local installed `typescript` package, so it works right off the bat with Angular, ts-node, Webpack & co. Alternatively you can also configure the transformer manually in a build system like webpack and ts-loader.

If you want to have a very detailed explanation of how all this works read <a target="_blank" href="https://github.com/microsoft/TypeScript/issues/47658">TypeScript Bytecode Interpreter / Runtime Types</a>


## Framework

Deepkit Framework is much more than just runtime TypeScript types. It's a full-featured framework
like PHP Symfony and Java Spring Boot, but just for TypeScript. It is the only framework available
that fully utilises TypeScript types in runtime. This allows to write less and more efficient code.

Deepkit Framework contains:

- Validator
- Serializer
- Dependency Injection Container
- Configuration System
- Module System
- HTTP Framework
- RPC Framework
- CLI Framework
- Event System
- Interactive Debugger and Profiler
- Database ORM
- Template engine

and more. 

There were no mature libraries that leveraged the power of the TypeScript type system at runtime before. 
Now, in order to provide a framework that enables fundamentally new approaches, 
such as utilizing runtime TypeScript types in an HTTP router, it was necessary to build 
fundamental libraries that take full advantage of a TypeScript type system at runtime first.
Therefore, we spared no time and effort to redevelop even basic functionalities such as validation and
serialization to leverage the power of TypeScript throughout the application. 
The functionalities are split in multiple packages so that they can be used standalone,
or all together in the framework.

Since everything comes from one vendor, all libraries are perfectly designed for each other. 
This allows not only to better apply enterprise design patterns, but also to implement a variety of use cases 
much more efficiently, since glue-code between vastly different third-party libraries is not needed.

## High Performance

For us, high-performance means not only fast execution time, but also constant fast development time.

One of the most difficult problems in software development is to maintain a high development speed even after months or years, especially when the code and the team grow. There are many frameworks that promise to get you started quickly and allow you to cobble together more complex applications on your own in a very short time. However, these usually have the common issue that the development speed decreases drastically the older the project or the larger the team becomes. It is not uncommon that even after a few months and only a handful of developers, the development speed drops to 1% of the original speed. To counteract this phenomenon it is necessary to apply established design patterns and to use the right framework and libraries in advance. Enterprise design patterns have established themselves for the reason that they scale excellently even with larger applications and large teams. Correctly applied, they develop their capabilities especially when a project is to be developed over a longer period of time (several months to years).

Design patterns have their advantages in theory, but in practice almost every pattern also has its disadvantages. These disadvantages are different depending on the language and framework, because the language and the framework itself determines how ergonomically a pattern can be applied. Just because a certain pattern can be used in a language, it does not mean that it automatically makes development better and faster. Some languages are better suited than others for applying certain patterns. With JavaScript or even TypeScript itself, various design patterns are often usable in the core, but there are limitations here that massively affect the user experience and thus speed. For example, Typescript decorators with all their idiosyncrasies may become necessary if a dependency injection framework specifies and is based on them. Deepkit’s runtime type system ensures that in the most ergonomic way and with as little boilerplate as possible, these design patterns can be applied, unlocking their power so that high development speed is maintained not only initially, but also in the long term.

However, fast execution time is also important to us.
By having all the detailed type information available in runtime it's possible to create JIT optimised functions for all kind of work: serialization, validation, change detection, and much more.
Deepkit utilises the type information in runtime and does exactly that. Its serializer, validator, and ORM build on demand highly optimised functions that do the job much better
and faster than any general purpose version. This is also the reason why Deepkit ORM is the fastest JavaScript ORM on the market.
The JSON serializer, BSON encoder, and validator are optimised as well, which make in turn Deepkit RPC, the HTTP router, configuration system, and many other features very fast. 

![ORM Performance](/assets/blog/deepkit-orm-performance.png)

## Debugger and Profiler

The bigger and more complex a project gets the more important it is to have sophisticated debugging and profiler tools that are specifically tailored
to the framework. We want to make sure that you get a feeling of how the application behaves instead of messing around in the dark using console.log().

We want to bring the same developer experience to TypeScript that developer already enjoy in framework in other languages like Symfony/Laravel. 

![Profiler](/assets/screenshots-profiler/overview.png)

## Join Us

If you have any questions or are just curious, join our Discord and chat with us!

<a class="button" target="_blank" href="https://discord.gg/U24mryk7Wq">Join Deepkit Discord</a>

And if you have read until here, it's time to give it a try!

<a class="button" href="https://docs.deepkit.io/english/framework.html">Getting started</a>



