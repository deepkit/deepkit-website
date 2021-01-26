import { Component } from "@angular/core";

@Component({
    template: `
      <div class="banner">
        <div class="wrapper">
          <div class="blur1"></div>
          <div class="blur2"></div>
          <div class="blur3"></div>

          <div class="text">
            <h1>
              The high-performance Typescript Framework
            </h1>

            <p class="banner-text">
              A new high-performance web framework for sophisticated Typescript
              projects like complex admin interfaces, websites, games, desktop and mobile apps.
            </p>
            
            <p class="banner-text">
              By fully utilizing the advantages of isomorphic Typescript you are able to
              build web applications faster than ever before.
            </p>

            <div class="actions">
              <a routerLink="/documentation/framework" class="button primary">Get started</a>
              <a routerLink="/products/framework" class="button">Features</a>
            </div>
          </div>
          <div class="visual">
            <img alt="framework visual" src="assets/images/framework-visual.svg"/>
          </div>
        </div>
      </div>

      <div class="wrapper what-is-deepkit">
        <h2>What is Deepkit Framework?</h2>

        <p>
          Deepkit Framework is a Node.js Framework written in and for Typescript. It focuses on high-performance server
          side applications while also providing tools for the whole tech-stack that interact in the most efficient way 
          regarding performance and development efficiency.<br/>
          It is a set of reusable Typescript libraries and a framework for web applications.
        </p>
      </div>

      <div class="efficiency">
        <div class="wrapper">
          <div class="blur1"></div>
          <div class="layout">
            <div class="text">
              <h2>Major Leap in Efficiency</h2>
              <p>
                By using TypeScript for frontend and backend with a framework that fully utilizes all advantages of a
                single
                technology stack and allowing you to share code like models, validations, business logic, it skyrockets
                your
                performance and enables you to build web applications much faster.
              </p>
            </div>

            <div class="visual">
              <img alt="stack-comparison" src="assets/images/framework-stack-comparison-visual.png"/>
            </div>
          </div>

          <p>
            It is no longer economically reasonable to develop new web applications with a dual stack.
          </p>
        </div>

      </div>

      <separator></separator>

      <div class="wrapper features">
        <h2>Framework Features</h2>

        <div class="points">
          <index-feature img="icon-http" header="HTTP"
                         text="HTTP/REST router with automatic serialization and validation"></index-feature>
          <index-feature img="icon-rpc" header="RPC"
                         text="RPC with auto serialization, validation, error forwarding, and RxJS support."></index-feature>
          <index-feature img="icon-di" header="Dependency Injection"
                         text="DI container to have full control over how services are created."></index-feature>
          <index-feature img="icon-config" header="Configuration"
                         text="Type-safe configuration system from high-level to dependency-injection."></index-feature>
          <index-feature img="icon-dispatcher" header="Event Dispatcher"
                         text="Type-safe high-performance event dispatcher."></index-feature>
          <index-feature img="icon-modules" header="Modules"
                         text="Powerful module system to easily add your own plugins and separate code."></index-feature>
          <index-feature img="icon-template" header="Template"
                         text="Fully type-safe template engine with access to the DI container."></index-feature>
          <index-feature img="icon-debugger" header="Debugger"
                         text="Interactive local debugger for high-level application profiling and debugging."></index-feature>
          <index-feature img="icon-workflow" header="Workflow"
                         text="Workflow engine for complex finite state-machine use-cases."></index-feature>
          <index-feature img="icon-cli" header="CLI"
                         text="Easy-to-write API to write your own CLI tools."></index-feature>
          <index-feature img="icon-logger" header="Logger" text="Configurable application logger."></index-feature>
          <index-feature img="icon-live-database" header="Database Change-Feed"
                         text="Real-Time database change-feed and live-collections/entities."></index-feature>
        </div>

        <div>
          <a routerLink="/products/framework" class="button primary">Learn more</a>
        </div>
      </div>

      <div class="wrapper components">
        <h2>Libraries</h2>
        <p>
          Typescript libraries that you can use standalone but work best together in the realm of the Deepkit
          Framework.
        </p>

        <div class="points">
          <div routerLink="/products/type"><h3>Type</h3>
            <p>Runtime types, serialization, validation.</p><a routerLink="/">Learn more</a></div>
          <div routerLink="/products/orm"><h3>ORM</h3>
            <p>Fastest TypeScript ORM.</p><a routerLink="/">Learn more</a></div>
          <div><h3>Broker</h3>
            <p>Message bus with pub/sub, key/value, and more.</p><a routerLink="/">Learn more</a></div>
<!--          <div><h3>Desktop UI</h3>-->
<!--            <p>Angular & Electron desktop UI framework.</p><a routerLink="/">Learn more</a></div>-->
          <div><h3>RPC</h3>
            <p>Highly configurable RPC client/server.</p><a routerLink="/">Learn more</a></div>
          <div><h3>BSON</h3>
            <p>High-Performance BSON serializer and decoder.</p><a routerLink="/">Learn more</a></div>
          <div><h3>Type/Angular</h3>
            <p>Make Angular Forms easy.</p><a routerLink="/">Learn more</a></div>
        </div>
      </div>
    `,
    styleUrls: ['./index-page.component.scss']
})
export class IndexPageComponent {

}
