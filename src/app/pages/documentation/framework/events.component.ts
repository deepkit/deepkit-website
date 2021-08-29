import { Component } from '@angular/core';

@Component({
    template: `
        <div class="subline">Framework</div>

        <h2>Events</h2>

        <p>
            Event listeners are services that allow you to listen for and respond to dispatched events. You can dispatch events
            using event tokens via the <i>EventDispatcher</i>.
        </p>
        
        <p>
            You can create your own events or use already defined one, for example from the @deepkit/framework package.
        </p>
        
        <h3>Event token</h3>
        
        <p>
            Event token is a way to specify an event: An event id and the actual event. For example a "user added" event has an id
            of "user-added" and an event of type "UserEvent".
        </p>
        
        <textarea codeHighlight>
            import { EventToken, BaseEvent } from '@deepkit/event';
            
            interface User {
                username: string;
            }
            
            class UserEvent extends BaseEvent {
                constructor(public user: User) {
                    super();
                }
            }
            
            const UserAdded = new EventToken('user-added', UserEvent);
        </textarea>
        
        A more simple event token without a custom event class would look like that:

        <textarea codeHighlight>
            import { EventToken, DataEvent } from '@deepkit/event';

            interface User {
                username: string;
            }

            const UserAdded = new EventToken('user-added', DataEvent<User>);
        </textarea>

        <h3>Dispatch event</h3>

        <p>
            An event token can be dispatched from services, controllers, or event listeners. Basically from everywhere where the dependency injection
            container is used. Let's use the TestCommand from the Getting Started chapter again.
        </p>
        
        <textarea codeHighlight>
            import { cli, Command } from '@deepkit/app';
            import { EventDispatcher } from '@deepkit/event';

            @cli.controller('test')
            export class TestCommand implements Command {
                constructor(protected eventDispatcher: EventDispatcher) {
                }
            
                async execute() {
                    this.eventDispatcher.dispatch(UserAdded, new UserEvent({ username: 'Peter' }));
                }
            }
        </textarea>

        <p>
            Note: Controllers are handled and instantiated by the dependency injection container, like services, and have thus access
            to all other registered services (like the EventDispatcher). 
            See the chapter <a routerLink="/documentation/framework/dependency-injection">Dependency injection</a> for more details.
        </p>
        
        <h3>Event listener</h3>
        
        <p>
            The last part is now to listen and react on dispatched events. Create a new class, add one or multiple methods
            with the <code>@eventDispatcher.listen</code> decorator, and register it under <i>listeners</i> in your application or module.
        </p>
        
        <p>
            Event listeners are handled and instantiated by the dependency injection container, like services and controllers, and have thus access
            to all other registered services.
            See the chapter <a routerLink="/documentation/framework/dependency-injection">Dependency injection</a> for more details.
        </p>

        <textarea codeHighlight>
            import { eventDispatcher } from '@deepkit/event';
            
            class MyListener {
                @eventDispatcher.listen(UserAdded)
                onUserAdded(event: typeof UserAdded.event) {
                    console.log('User added!', event.user.username);
                }
            }
            
            new Application({
                listeners: [MyListener],
            }).run();
        </textarea>
        
        <p>
            The full example of an event in action based on the code above:
        </p>
        
        <textarea codeHighlight>
#!/usr/bin/env ts-node-script
import 'reflect-metadata';
import { Application } from '@deepkit/framework';
import { cli, Command } from '@deepkit/app';
import { EventToken, BaseEvent, EventDispatcher, eventDispatcher } from '@deepkit/event';

@cli.controller('test')
export class TestCommand implements Command {
    constructor(protected eventDispatcher: EventDispatcher) {
    }

    async execute() {
        this.eventDispatcher.dispatch(UserAdded, new UserEvent({ username: 'Peter' }));
    }
}


interface User {
    username: string;
}

class UserEvent extends BaseEvent {
    constructor(public user: User) {
        super();
    }
}

const UserAdded = new EventToken('user-added', UserEvent);

class MyListener {
    @eventDispatcher.listen(UserAdded)
    onUserAdded(event: typeof UserAdded.event) {
        console.log('User added!', event.user.username);
    }
}

new Application({
    controllers: [TestCommand],
    listeners: [MyListener],
}).run();
        </textarea>

        <h3>Framework events</h3>
        
        <p>
            Deepkit Framework itself has several events you can listen to. 
        </p>

        <textarea codeHighlight>
            import { Application, onServerMainBootstrap } from '@deepkit/framework';
            import { eventDispatcher } from '@deepkit/event';
            
            class MyListener {
                @eventDispatcher.listen(onServerMainBootstrap)
                onUserAdded(event: typeof onServerMainBootstrap.event) {
                    console.log('Server bootstrapped!');
                }
            }
            
            new Application({
                listeners: [MyListener],
            }).run();
        </textarea>

        <table class="pretty">
            <tr>
                <th>Name</th>
                <th>Description</th>
            </tr>
            <tr>
                <td>onServerMainBootstrap</td>
                <td>Bootstrap event for the main process.</td>
            </tr>
            <tr>
                <td>onServerMainBootstrapDone</td>
                <td>Boostrap done event for the main process</td>
            </tr>
            <tr>
                <td>onServerWorkerBootstrap</td>
                <td>Bootstrap event for each worker process.</td>
            </tr>
            <tr>
                <td>ServerShutdownEvent</td>
                <td>Shutdown event for the main process.</td>
            </tr>
        </table>
    `
})
export class DocFrameworkEventsComponent {
}
