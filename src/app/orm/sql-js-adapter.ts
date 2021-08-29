import {
    SQLiteConnection,
    SQLiteConnectionPool,
    SQLitePlatform,
    SQLiteStatement,
    SQLiteDatabaseAdapter as OriSQLiteDatabaseAdapter,
    SQLiteDatabaseTransaction
} from '@deepkit/sqlite';
import { DatabaseLogger, DatabaseTransaction } from '@deepkit/orm';
import { Stopwatch } from '@deepkit/stopwatch';

export class SQLJSStatement extends SQLiteStatement {
    protected stmt: any;

    async get(params: any[] = []): Promise<any> {
        return this.stmt.get(...params);
    }

    async all(params: any[] = []): Promise<any[]> {
        const items: any[] = [];
        while (this.stmt.step()) {
            items.push(this.stmt.getAsObject());
        }
        return items;
    }

    release() {
        this.stmt.free();
    }
}

export class SQLJSConnection extends SQLiteConnection {
    getChanges(): Promise<number> {
        return Promise.resolve(0);
    }

    constructor(
        connectionPool: SQLJSConnectionPool,
        protected dbPath: string,
        logger?: DatabaseLogger,
        transaction?: DatabaseTransaction,
        stopwatch?: Stopwatch,
    ) {
        super(connectionPool, dbPath, logger, transaction, stopwatch);
    }

    async prepare(sql: string) {
        return new SQLJSStatement(this.logger, sql, this.db.prepare(sql));
    }

    async run(sql: string, params: any[] = []) {
        this.db.prepare(sql).run(params);
    }
}

export class SQLJSConnectionPool extends SQLiteConnectionPool {
    constructor() {
        super('');
    }


    protected createConnection(logger?: DatabaseLogger, transaction?: SQLiteDatabaseTransaction, stopwatch?: Stopwatch): SQLiteConnection {
        return new SQLJSConnection(this, '', logger, transaction, stopwatch);
    }
}

export class SQLiteDatabaseAdapter extends OriSQLiteDatabaseAdapter {
    public readonly connectionPool: SQLJSConnectionPool;
    public readonly platform = new SQLitePlatform();

    constructor() {
        super();

        this.connectionPool = new SQLJSConnectionPool();
    }
}
