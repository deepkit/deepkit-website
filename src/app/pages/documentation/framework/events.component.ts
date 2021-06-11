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
            You can create your own events or use already defined one, for example from the @deepkit/http or @deepkit/framework package.
        </p>
        
        <h3>Event token</h3>
        
        <p>
            Event token is away to specify an event: An event id and its parameters. For example a "user added" event has an id
            of "user-added" and a parameter of type "User".
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
        
        A more simple event without custom event class would look like that:

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
            container can be accessed. Let's use the TestCommand from the Getting Started chapter again.
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
        
        <h3>Event listener</h3>
        
        <p>
            The last part is now to listen and react on dispatched events. Create a new class, add one or multiple methods
            with the <code>@eventDispatcher.listen</code> decorator, and register it under <i>listeners</i> in your application or module.
        </p>

        <textarea codeHighlight>
            import { eventDispatcher } from '@deepkit/event';
            
            class MyListener {
                @eventDispatcher.listen(UserAdded)
                onUserAdded(event: typeof UserAdded.event) {
                    console.log('User added!', event.user.username);
                }
            }
            
            Application.create({
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

Application.create({
    controllers: [TestCommand],
    listeners: [MyListener],
}).run();
        </textarea>
        
        <h3>Framework events</h3>
        
        <p>
            Deepkit Framework itself has several events you can listen to. 
        </p>
    `
})
export class DocFrameworkEventsComponent {
}
