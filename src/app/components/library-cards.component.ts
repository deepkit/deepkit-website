import { Component } from '@angular/core';

@Component({
    selector: 'library-cards',
    template: `

        <p class="wrapper">
            Deepkit libraries are a collection of open source TypeScript libraries under MIT license that work standalone or in combination.
            Each library lives in its own NPM package, is carefully optimised, and follows modern best practises. You can progressively
            adopt Deepkit libraries one by one or use all together in the full-fledged Deepkit Framework.
        </p>

        <div class="library-cards">
            <library-card package="@deepkit/type" title="Type" sub="Runtime type system">
                <p>Define TypeScript types for the JavaScript runtime and use those schemas for serialization, validation, and even database
                    entities.</p>
            </library-card>

            <library-card package="@deepkit/orm" title="ORM" sub="Database abstraction layer">
                <p>High performance TypeScript ORM with unit-of-work, migrations, and much more.</p>
                <p>MySQL, PostreSQL, SQLite, MongoDB.</p>
            </library-card>

            <library-card package="@deepkit/orm-browser" title="ORM Browser" sub="Visual database browser">
                <p>Manage your data of your ORM models directly in the browser.</p>
                <p>Seed, migrate, or display the ER Model of your database. With interactive query prompt.</p>
            </library-card>

            <library-card package="@deepkit/rpc" title="RPC" sub="Remote procedure call">
                <p>A modern high performance Remote Procedure Call (RPC) framework for TypeScript.</p>
            </library-card>

            <library-card package="@deepkit/desktop-ui" title="Desktop UI" sub="GUI library for desktop apps">
                <p>Angular Desktop GUI library for high-performance user interfaces, with Electron features.</p>
            </library-card>

            <library-card package="@deepkit/broker" title="Broker" sub="Message Bus">
                <p>High performance typesafe message bus server for pub/sub pattern, key-value storage, and central atomic app locks.</p>
            </library-card>

            <library-card package="@deepkit/debugger" [linkDocumentation]="true" title="Framework Debugger" sub="Debugger and profiler">
                <p>Interactive debugger for Deepkit Framework with high-level profiler, data management, and context debugging.</p>
            </library-card>

            <library-card package="@deepkit/bson" [linkDocumentation]="true" title="BSON" sub="BSON encoder/decoder">
                <p>Fastest BSON parser and serializer. 13x faster than official bson-js/bson-ext, and 2x faster than JSON.</p>
                <p>Based on @deepkit/type.</p>
            </library-card>

            <library-card package="@deepkit/mongo" [linkDocumentation]="true" title="Mongo" sub="MongoDB client">
                <p>High performance MongoDB client for modern TypeScript: Full async error stack trace, BigInt support, and fully
                    type-safe.</p>
                <p>Based on @deepkit/type.</p>
            </library-card>

            <library-card package="@deepkit/injector" [linkDocumentation]="true" title="Injector" sub="Dependency injection">
                <p>A compiling high performance dependency injection container, with constructor/property injection, type-safe configuration
                    system, compiler-passes, scopes, and tags.</p>
            </library-card>

            <library-card package="@deepkit/template" [linkDocumentation]="true" title="Template" sub="HTML template engine">
                <p>Fully type-safe and fast template engine based on TSX, with support for dependency injection and async templates.</p>
            </library-card>

            <library-card package="@deepkit/topsort" [linkDocumentation]="true" title="Topsort" sub="Topological sort">
                <p>A fast implementation of a topological sort/dependency resolver with type grouping algorithm.</p>
            </library-card>

            <library-card package="@deepkit/http" [linkDocumentation]="true" title="HTTP" sub="HTTP kernel">
                <p>A HTTP kernel and router with async controller support based on workflow system and decorators.</p>
            </library-card>

            <library-card package="@deepkit/logger" [linkDocumentation]="true" title="Logger" sub="Logging abstraction">
                <p>A logger library with support for colors, scopes, various transporter and formatter.</p>
            </library-card>

            <library-card package="@deepkit/event" [linkDocumentation]="true" title="Event" sub="Event dispatcher">
                <p>Async typed decoupled event dispatcher.</p>
            </library-card>

            <library-card package="@deepkit/workflow" [linkDocumentation]="true" title="Workflow" sub="Finite state machine">
                <p>A workflow library to manage a workflow or finite state machine.</p>
            </library-card>

            <library-card package="@deepkit/type-angular" [linkDocumentation]="true" title="Type-Angular" sub="Type: Angular addon">
                <p>A powerful form builder for Angular based on @deepkit/type.</p>
            </library-card>
        </div>
    `
})
export class LibraryCardsComponent {

}
