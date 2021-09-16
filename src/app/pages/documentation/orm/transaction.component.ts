import { Component } from '@angular/core';

@Component({
    template: `
        <div class="subline">ORM</div>

        <h2>Transaction</h2>

        <p>
            A transaction is a sequential group of statements, queries, or operations such as select,
            insert, update or delete to perform as a one single work unit that can be committed or rolled back.
        </p>

        <p>
            Deepkit supports transactions for all official supported databases. By default for each query and
            <a routerLink="/documentation/orm/session">database session</a>
            no transactions are used. To enable transactions there are two main methods.
        </p>

        <h3>Session</h3>

        <p>
            You can start and assign on each created session a new transaction. This is the preferred way
            of interacting with the database, as you can easily pass around the session object and all
            queries instantiated from that session object are automatically assigned to its transaction.
        </p>

        <p>
            A typical pattern is to wrap all operations in a try-catch block and execute <code>commit()</code>
            in the very last line (that is only executed when all previous commands succeeded) and <code>rollback()</code>
            in the catch block to roll back all changes.
        </p>

        <p>
            Although there is an alternative API (see below), all transactions work only with database session objects.
            Usually, to commit open changes from the unit-of-work in a database session to the database, you would
            call <code>commit()</code>. In a transactional session, <code>commit()</code> not only flushes all
            pending changes to the database but also closes ("commits") the transaction, essentially closing the transaction.
            As an alternative, you can call <code>session.flush()</code> to flush all pending changes without commit and thus
            without closing the transaction. To commit a transaction without flushing the unit-of-work, use <code>session.commitTransaction()</code>.
        </p>

        <textarea codeHighlight>
            const session = database.createSession();
            
            //this assigns a new transaction, and starts it with the very next database operation.
            session.useTransaction();
            
            try {
                //this query is executed in the transaction
                const users = await session.query(User).find();
            
                await moreDatabaseOperations(session);
            
                await session.commit();
            } catch (error) {
                await session.rollback();
            }
            
        </textarea>

        <p>
            As soon as <code>commit()</code> or <code>rollback()</code> is executed on a session, the transaction is released.
            You have to call <code>useTransaction()</code> again if you want to continue working in a new transaction.
        </p>

        <p>
            Please note, that as soon as the first database operation is executed in a transactional session, the assigned
            database connection to this operation is assigned (sticky) to the current session object, and thus, all subsequent
            operations are executed on the same connection (and thus, in most databases, on the same database server).
        </p>

        <p>
            If a session is already associated with a transaction, a call to <code>session.useTransaction()</code>
            always returns the same object. Use <code>session.isTransaction()</code> to check whether the session
            has a transaction assigned.
        </p>

        <p>
            Nested transactions are not supported.
        </p>

        <h3>Callback</h3>

        <p>
            An alternative to transactional sessions is <code>database.transaction(callback)</code>.
        </p>

        <textarea codeHighlight>
            await database.transaction(async (session) => {
                //this query is executed in the transaction
                const users = await session.query(User).find();
            
                await moreDatabaseOperations(session);
            });
        </textarea>

        <p>
            The method <code>transaction(callback)</code> executes an async callback inside of a new transactional session.
            If the callback succeeds (not throwing), the session is automatically committed
            (and thus its transaction committed and all changes flushed). If the callback throws, the session executes
            <code>rollback()</code> automatically, and the error is rethrown.
        </p>

        <h3>Transaction isolation</h3>

        <p>
            Many databases support different kinds of transactions. To change the transaction behavior, you can
            call various methods on the returned transaction object from <code>useTransaction()</code>. The interface of this transaction
            object depends on the database adapter being used. For example, the transaction object returned from a MySQL database has different options from one returned from a MongoDB database.
            Use code-completion or look at the database adapter interface to get a list of potential options.
        </p>

        <textarea codeHighlight>
            
            const database = new Database(new MySQLDatabaseAdapter());
            
            const session = database.createSession();
            session.useTransaction().readUncommitted();
            
            try {
                //...operations
                await session.commit();
            } catch () {
                await session.rollback();
            }
            
            //or
            await database.transaction(async (session) => {
                //this works as long as no database operation has been exuected.
                session.useTransaction().readUncommitted();
            
                //...operations
            });
        </textarea>

        <h3>MongoDB</h3>

        <p>
            While transactions work for MySQL, PostgreSQL, and SQLite out of the box, MongoDB requires you to set it up as "replica set" first.
        </p>

        <p>
            To convert a standard MongoDB instance to a replica set, please read the official documentation
            <a href="https://docs.mongodb.com/manual/tutorial/convert-standalone-to-replica-set/">Convert a Standalone to a Replica Set</a>.
        </p>
    `
})
export class DocORMTransactionComponent {
}
