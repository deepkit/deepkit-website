import { Component } from '@angular/core';

@Component({
    selector: 'library-cards',
    template: `
        <div class="big-cards">
            <library-card class="card fancy-hover" package="@deepkit/type" title="Type" sub="Runtime type system">
                <p>Runtime TypeScript types with reflection, high-performance serialization and validation, and much more.</p>
            </library-card>

            <library-card class="card fancy-hover" package="@deepkit/orm" title="ORM" sub="Database abstraction layer">
                <p>High performance TypeScript ORM with unit-of-work, migrations, and much more.</p>
                <p>MySQL, PostreSQL, SQLite, MongoDB.</p>
            </library-card>

            <library-card class="card fancy-hover" package="@deepkit/orm-browser" title="ORM Browser" sub="Visual database browser">
                <p>Seed, migrate, or display the ER diagram of your database. With interactive query prompt.</p>
            </library-card>

            <library-card class="card fancy-hover" package="@deepkit/rpc" title="RPC" sub="Remote procedure call">
                <p>A modern high performance Remote Procedure Call (RPC) framework for TypeScript.</p>
            </library-card>

            <library-card class="card fancy-hover" package="@deepkit/desktop-ui" title="Desktop UI" sub="GUI library for desktop apps">
                <p>Angular Desktop GUI library for desktop/web user interfaces, with Electron features.</p>
            </library-card>

            <library-card class="card fancy-hover" package="@deepkit/broker" title="Broker" sub="Message Bus">
                <p>High performance typesafe message bus server for pub/sub pattern, key-value storage, and central atomic app locks.</p>
            </library-card>

<!--            <library-card class="card fancy-hover" package="@deepkit/debugger" title="Debugger" sub="Debugger and profiler">-->
<!--                <p>Interactive debugger for Deepkit Framework with high-level profiler, data management, and context debugging.</p>-->
<!--            </library-card>-->

<!--            <library-card class="card fancy-hover" package="@deepkit/bson" title="BSON" sub="BSON encoder/decoder">-->
<!--                <p>Fastest BSON parser and serializer. 13x faster than official bson-js/bson-ext, and 2x faster than JSON.</p>-->
<!--            </library-card>-->

<!--            <library-card class="card fancy-hover" package="@deepkit/mongo" title="Mongo" sub="MongoDB client">-->
<!--                <p>High performance MongoDB client for modern TypeScript: Full async error stack trace, BigInt support, and fully-->
<!--                    type-safe.</p>-->
<!--            </library-card>-->

            <library-card class="card fancy-hover" package="@deepkit/injector" doc="dependency-injection.html" title="Injector" sub="Dependency injection">
                <p>A compiling high performance dependency injection container, with constructor/property injection, type-safe configuration
                    system, compiler-passes, scopes, and tags.</p>
            </library-card>

            <library-card class="card fancy-hover" package="@deepkit/template" doc="template.html" title="Template" sub="HTML template engine">
                <p>Fully type-safe and fast template engine based on TSX, with support for dependency injection and async templates.</p>
            </library-card>

<!--            <library-card class="card fancy-hover" package="@deepkit/topsort" title="Topsort" sub="Topological sort">-->
<!--                <p>A fast implementation of a topological sort/dependency resolver with type grouping algorithm.</p>-->
<!--            </library-card>-->

            <library-card class="card fancy-hover" package="@deepkit/http" doc="http.html" title="HTTP" sub="HTTP kernel">
                <p>A HTTP kernel and router with async controller support based on workflow system and decorators.</p>
            </library-card>

            <library-card class="card fancy-hover" package="@deepkit/logger" doc="framework.html#logger" title="Logger" sub="Logging abstraction">
                <p>A logger library with support for colors, scopes, various transporter and formatter.</p>
            </library-card>

            <library-card class="card fancy-hover" package="@deepkit/event" doc="events.html" title="Event" sub="Event dispatcher">
                <p>Async typed decoupled event dispatcher.</p>
            </library-card>

<!--            <library-card class="card fancy-hover" package="@deepkit/workflow" title="Workflow" sub="Finite state machine">-->
<!--                <p>A workflow library to manage a workflow or finite state machine.</p>-->
<!--            </library-card>-->

<!--            <library-card class="card fancy-hover" package="@deepkit/type-angular" [linkDocumentation]="true" title="Type-Angular" sub="Type: Angular addon">-->
<!--                <p>A powerful form builder for Angular based on @deepkit/type.</p>-->
<!--            </library-card>-->
        </div>
    `
})
export class LibraryCardsComponent {

}
