import { DatabaseSession } from '@deepkit/orm';
import { SQLDatabaseAdapter, SQLDatabaseQueryFactory, SQLPersistence } from '@deepkit/sql';
import {
    SQLiteConnection,
    SQLiteConnectionPool,
    SQLiteDatabaseQueryFactory,
    SQLitePersistence,
    SQLitePlatform,
    SQLiteStatement
} from '@deepkit/sqlite';

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
    async prepare(sql: string) {
        return new SQLJSStatement(this.logger, sql, this.db.prepare(sql));
    }

    async run(sql: string, params: any[] = []) {
        this.db.prepare(sql).run(params);
    }
}

export class SQLJSConnectionPool extends SQLiteConnectionPool {
    async getConnection(): Promise<SQLJSConnection> {
        this.activeConnections++;
        return new SQLJSConnection(this, this.db);
    }
}

let lastDb: any;

export class SQLiteDatabaseAdapter extends SQLDatabaseAdapter {
    public readonly connectionPool: SQLJSConnectionPool;
    public readonly platform = new SQLitePlatform();
    protected db;

    constructor() {
        super();
        if (lastDb) {
            lastDb.close();
        }

        lastDb = this.db = new (window as any).SQL.Database();
        ;
        this.connectionPool = new SQLJSConnectionPool(this.db);
    }

    getName(): string {
        return 'sqlite';
    }

    getSchemaName(): string {
        return '';
    }

    createPersistence(session: DatabaseSession<any>): SQLPersistence {
        return new SQLitePersistence(this.platform, this.connectionPool, session);
    }

    queryFactory(databaseSession: DatabaseSession<any>): SQLDatabaseQueryFactory {
        return new SQLiteDatabaseQueryFactory(this.connectionPool, this.platform, databaseSession);
    }

    disconnect(force?: boolean): void {
        if (this.connectionPool.getActiveConnections() > 0) {
            throw new Error(`There are still active connections. Please release() any fetched connection first.`);
        }
        this.db.close();
    }
}
