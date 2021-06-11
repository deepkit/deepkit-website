import { Component } from '@angular/core';

@Component({
    template: `
        <div class="subline">Framework</div>

        <h2>Fundamentals</h2>
        
        <p>
            Deepkit framework consists of 6 fundamental concepts you need to be aware of to write
            efficient and well structured applications. There is a single <i>application</i> and there are 
            <i>modules</i>, <i>services</i>, <i>controllers</i>, <i>events</i>, <i>and models</i>. 
        </p>

        <h3>Application</h3>
        
        <p>
            There is usually only one application per project. Each application has at least one module -- the root module, which is automatically
            created. It can import additional custom modules. In the background it imports system modules like the 
            <i>KernelModule</i> and <i>HttpModule</i> automatically.
        </p>
        
        <h3>Module</h3>
        
        <p>
            A module is a container of services, controllers, and event listeners. A module has a configuration and can be imported 
            by other modules (also the application, which is the root module).
            See the chapter <a routerLink="/documentation/framework/modules">Modules</a> for more information.
        </p>
        
        <h3>Service</h3>
        
        <p>
            A service is typically a class with a narrow, well-defined purpose. It should do something specific and do it well.
            Services are usually unit tested, consume configuration options, models, and other services. This is where your most functionality/code lives.
            See the chapter <a routerLink="/documentation/framework/services">Services</a> for more information.
        </p>
        
        <h3>Controller</h3>
        
        <p>
            There are three types of controllers: CLI controller, HTTP controller, and RPC controller. Each serves its own purpose, but
            all have in common that they act as API to an external client. HTTP controllers define routes, RPC controllers define actions,
            and CLI controllers define commands.<br/> 
            They are the <i>entrypoint</i> to your application.

            See each chapter 
            <a routerLink="/documentation/framework/http/controller">HTTP controller</a>,
            <a routerLink="/documentation/framework/rpc/controller">RPC controller</a>,
            <a routerLink="/documentation/framework/cli">CLI</a>
            for more information.
        </p>
        
        <h3>Events</h3>
        
        <p>
            Event listener are special services that receive events based on <i>event tokens</i>. 
            They usually react on events by using models or calling actions on other services.
            Events can be dispatched by services, controllers, and event listeners using the <i>EventDispatcher</i>.
            See the chapter <a routerLink="/documentation/framework/events">Events</a> for more information.
        </p>
        
        <h3>Model</h3>
        
        <p>
            A model is the instantiation and loaded interface for specific data. They can be received from database abstraction libraries like Deepkit ORM and many others.
            Usually services and controllers load models based on an action/event and work with their content, probably saving changes
            back to where the model was loaded.
            See the chapter <a routerLink="/documentation/framework/database">Database</a> for more information.
        </p>
    `
})
export class DocFrameworkFundamentalsComponent {
}
