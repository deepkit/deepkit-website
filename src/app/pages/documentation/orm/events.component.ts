import { Component } from '@angular/core';

@Component({
    template: `
        <div class="subline">ORM</div>

        <h2>Events</h2>

        <p>
            Events are a way to hook into Deepkit ORM and allow you to write powerful plugins.
            There are two categories of events: Query events and Unit of Work events. Plugin authors usually
            use both to support both ways to manipulate data.
        </p>


        <h3>Query events</h3>

        <p>
            Query events are triggered when the a query via <code>Database.query()</code> or <code>Session.query()</code>
            is executed.
        </p>
        
        <p>
            Each event has its own additional properties like the ClassSchema of the entity, the query itself, and database session.
            You can overwrite the query by setting a new query on Event.query.
        </p>
        
        <textarea codeHighlight="">
            const database = new Database(...);
            
            const subscription = database.queryEvents.onFetch.subscribe(async event => {
                //overwrite the query of the user, so something else is executed.
                event.query = event.query.addFilter(deletedAtName, undefined);
            });
            
            //to delete the hook call unsubscribe
            subscription.unsubscribe();
        </textarea>
        
        <p>
            To get a more complex example of a plugin using events, take a look at the 
            <a href="https://github.com/deepkit/deepkit-framework/blob/master/packages/orm/src/plugin/soft-delete.ts">SoftDelete plugin</a>.
        </p>

        <h4>onFetch</h4>

        <p>
            <code>onFetch</code> is triggered for all query methods related to fetching data: find(), findOne(), count(), has(), and so on.
            It's triggered before the actual method implementation is called.
        </p>

        <h4>onDeletePre / onDeletePost</h4>

        <p>
            <code>onDeletePre</code> and <code>onDeletePost</code> are triggered before and after <code>Query.deleteOne()</code> or
            <code>Query.deleteMany()</code>.
        </p>

        <h4>onPatchPre / onPatchPost</h4>

        <p>
            <code>onPatchPre</code> and <code>onPatchPost</code> are triggered before and after <code>Query.patchOne()</code> or
            <code>Query.patchMany()</code>.
        </p>
        
        <h3>Unit of Work events</h3>
        
        <p>
            Unit of work events are triggered when a new Session has been created and is then committed.
        </p>
        
        <p>
            For the unit of work there are a couple of events: <code>onUpdatePre</code>, <code>onUpdatePost</code>,
            <code>onInsertPre</code>, <code>onInsertPost</code>,
            <code>onDeletePre</code>, <code>onDeletePost</code>,
            <code>onCommitPre</code>.
            Each with its own event. Take a look at the event type to see what information you can extract with that hook.
        </p>
        
        <textarea codeHighlight>
            const database = new Database(...);

            const subscription = database.unitOfWorkEvents.onInsertPre.subscribe(event => {
                console.log(event.classSchema.getName(), 'added', events.items.length, 'new items'),
            });

            //to delete the hook call unsubscribe
            subscription.unsubscribe();
        </textarea>
    `
})
export class DocORMEventsComponent {
}
