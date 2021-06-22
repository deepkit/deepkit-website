import { Component } from '@angular/core';

@Component({
    template: `
        <div class="subline">ORM / Plugin</div>

        <h2>Soft Delete</h2>

        <p>
            The Soft Delete plugin allows to keep database records hidden without actually deleting them. 
            When a record is deleted, it only is marked as deleted and not really deleted. All queries automatically filter on that deleted property, so
            to the user it feels like they are actually deleted.
        </p>

        <p>
            To use the plugin, you have to instantiated the SoftDelete class and activate it for each entity.
        </p>

        <textarea codeHighlight>
            import { SoftDelete } from '@deepkit/orm';
            
            @entity.name('user')
            class User {
                @t.primary.autoIncrement public id: number = 0;
                @t created: Date = new Date;
            
                // this field is used as indicator whether the record is deleted.
                @t deletedAt?: Date;
            
                // this field is optional and can be used to track who/what deleted the record.
                @t deletedBy?: string;
            
            
                constructor(
                    @t public name: string
                ) {
                }
            }
            
            const softDelete = new SoftDelete(database);
            softDelete.enable(User);
            
            //or disable again
            softDelete.disable(User);
        </textarea>

        <h3>Delete</h3>

        <p>
            To soft delete records, you use the usual methods: <code>deleteOne</code> or <code>deleteMany</code> on a Query, or
            you use the unit of work to delete them. The Soft Delete plugin automatically handles in the background the rest.
        </p>

        <h3>Restore</h3>

        <p>
            Deleted records can be restored by using a lifted query via <code>SoftDeleteQuery</code>.
            It has <code>restoreOne</code> and <code>restoreMany</code>.
        </p>

        <textarea codeHighlight>
            import { SoftDeleteQuery } from '@deepkit/orm';
            
            await database.query(User).lift(SoftDeleteQuery).filter({ id: 1 }).restoreOne();
            await database.query(User).lift(SoftDeleteQuery).filter({ id: 1 }).restoreMany();
        </textarea>

        <p>
            The unit of work supports restoring elements as well.
        </p>

        <textarea codeHighlight>
            import { SoftDeleteSession } from '@deepkit/orm';
            
            const session = database.createSession();
            const user1 = session.query(User).findOne();
            
            session.from(SoftDeleteSession).restore(user1);
            await session.commit();
        </textarea>

        <h3>Hard delete</h3>

        <p>
            To hard delete records, use a lifted query via <code>SoftDeleteQuery</code>. This
            restores basically the old behavior without the plugin for a single query.
        </p>

        <textarea codeHighlight>
            import { SoftDeleteQuery } from '@deepkit/orm';
            
            await database.query(User).lift(SoftDeleteQuery).hardDeleteOne();
            await database.query(User).lift(SoftDeleteQuery).hardDeleteMany();
            
            //those are equal
            await database.query(User).lift(SoftDeleteQuery).withSoftDeleted().deleteOne();
            await database.query(User).lift(SoftDeleteQuery).withSoftDeleted().deleteMany();
        </textarea>

        <h3>Query deleted</h3>

        <p>
            On a lifted query via <code>SoftDeleteQuery</code> you can also include deleted record.
        </p>

        <textarea codeHighlight>
            import { SoftDeleteQuery } from '@deepkit/orm';
            
            // find all, soft deleted and not deleted
            await database.query(User).lift(SoftDeleteQuery).withSoftDeleted().find();
            
            // find only soft deleted
            await database.query(s).lift(SoftDeleteQuery).isSoftDeleted().count()
        </textarea>

        <h3>Deleted by</h3>

        <p>
            <code>deletedBy</code> can be set via query and unit of work.
        </p>

        <textarea codeHighlight>
            import { SoftDeleteSession } from '@deepkit/orm';
            
            const session = database.createSession();
            const user1 = session.query(User).findOne();
            
            session.from(SoftDeleteSession).setDeletedBy('Peter');
            session.remove(user1);

            await session.commit();
        </textarea>

        <textarea codeHighlight>
            import { SoftDeleteQuery } from '@deepkit/orm';
            
            database.query(User).lift(SoftDeleteQuery)
                .deletedBy('Peter')
                .deleteMany();
        </textarea>
    `
})
export class DocORMPluginSoftDeleteComponent {
}
