import { Component } from '@angular/core';

@Component({
    template: `
        <div class="subline">ORM</div>


        <h2>Composite Primary Key</h2>

        <p>
            Composite primary keys describe an entity that has multiple primary keys that are automatically combined
            in one "composite primary key". This way of modelling your database has advantages and disadvantages.
            We believe that composite primary keys have enormous practical disadvantages that don't justify its advantages to a point
            that it should be considered a bad practise, and should thus be avoided. 
            Deepkit ORM does not support composite primary keys.
            In this chapter we explain why and point out (better) alternatives.
        </p>

        <h3>Disadvantages</h3>

        <p>
            Joins are not trivial, although highly optimised in RDBMS, they are constantly a
            complexity in applications that can easily get out of hand and introduce performance issues.
            Performance not only necessarily in terms of query execution time, but also in developer time.
        </p>


        <h4>Joining</h4>

        <p>
            Each and every join gets more complicated when multiple fields are involved. While many database have
            optimisations implemented to not make joins with multiple fields slower per se, it requires from the developer
            to think about those joins constantly in more detail as for example forgetting keys can lead to subtle bugs
            (as the join happily works without specifying all keys) and thus the developer needs to know the full composite primary key structure.
        </p>

        <h4>Indexes</h4>

        <p>
            Indexes with multiple fields (which composite primary keys are) suffer from the field order problem in queries. While database
            systems can optimise certain queries, its hard in complex structures to write efficient operations that correctly
            utilise all defined indexes. In a multi-field index (like a composite primary key),
            its usually required to define the fields in-order to actually let the database use the index. If the order is not
            correctly given (for example in a WHERE clause) it can easily lead the engine to not at all use the index and do
            a full table scan instead. Knowing which database optimizes queries in which way is advanced knowledge new developers
            usually don't have, but is required as soon as you work with composite primary keys in order to get the most
            out of your database and don't waste resources.
        </p>

        <h4>Migrations</h4>

        <p>
            As soon as you decide that a certain entity needs an additional field to uniquely identify a row, it leads
            to adjust each and every entity in your database that has relations to it.
        </p>

        <p>
            Let's say you have for example an entity User with composite primary key and decide to use in various tables
            a foreign key to that user, for example an "audit_log", groups pivot table, and "posts". As soon as you change the
            primary key of User, all those tables need to be adjusted in a migration as well.
        </p>

        <p>
            This does not only make migration files much more complex but can also lead to greater down times during the execution
            of migration files as schema changes usually require either a full database lock or at least a table lock.
            The more tables are effected from a big change like an index change, the longer the migration takes.
            Also, the bigger a table, the longer a migration takes. Think about the "audit_log" table from above. Such tables have
            usually many records (like millions) and you have to touch them in a schema change only because you
            decided to use a composite primary key and add an additional field to User's primary key.
            Depending on the size of all those tables, it makes migration changes
            either unnecessarily more expensive or in some cases even too expensive to a point where a primary key change
            of User is financially not justifiable anymore. This usually leads to workarounds (like adding a unique index
            to the user table instead) that introduces technical debt and sooner or later lands on the list of legacy decisions.
        </p>

        <p>
            It can lead in big projects to enormous down times (from minutes to hours) and even leads sometimes to
            introducing a whole new migration abstraction system that essentially copies tables, and inserts records
            in ghost tables, and after migration happened moves tables back and forth.
            Again, this additional complexity is forced on each entity that has a relation
            to another entity with a composite primary key and gets bigger the bigger your database structure gets.
            The problem gets worse and worse, without a way of solving it eventually (except by removing the composite primary key entirely).
        </p>

        <h4>Discoverability</h4>

        <p>
            If you are a database administrator or data engineer/scientists, you usually work on the database directly and explore
            the data as you need them. Having composite primary keys requires each user who writes SQL directly to know
            of all tables involved the correct primary key (and the column order to get correct index optimisations).
            This additional overhead does not only make it harder for someone who explores data, generates reports, etc,
            but can also lead to bugs in older SQL when a composite primary key is suddenly changed. The old SQL is likely still
            valid and runs just fine, but suddenly yields wrong results as the new field in the composite primary key is missing in the join. 
            It's much easier to have a convention like an auto-increment "id" column as primary. This allows easier discoverability of data
            and ensures that old SQL queries still work correctly, even if you decide to change the way an User object
            is uniquely identified.
        </p>

        <h4>Refactoring</h4>

        <p>
            Once a composite primary key is used in an entity, a refactoring of its key can lead to substantial amount
            of additional refactoring. Since an entity with a composite primary key usually has no single unique field,
            all filtering and joins need to have all composite key values. This means usually that code 
            relies on the knowledge of the composite primary key in a way that all fields need to be annotated and retrieved 
            (for example for URLs like /user/:key1/:key2). As soon as this key is changed, it requires to refactor all places
            where this knowledge is explicitly used like URLs, custom SQL queries, and other places.
        </p>
        
        <p>
            While ORMs usually build joins automatically without specifying the values manually, it can not automatically
            cover refactoring automatically for all other use cases like URL structures or custom SQL queries, and especially
            not places where the ORM is not even used, like in report systems and all external systems.
        </p>
        
        <h4>ORM complexity</h4>
        
        <p>
            By supporting composite primary keys, the code complexity of a high-performance ORM like Deepkit ORM increases
            enormously. Not only is the code and maintenance more complex and thus expensive, but there will also be more edge-cases that
            will arise from users, which need to be fixed and maintained. The complexity of the query layer, the change detection,
            the migration system, the internal tracking of relations, etc increases substantially. 
            The overall costs that comes with building and supporting an ORM
            with composite primary key is, all things considered, are too high and not justifiable, hence why Deepkit doesn't support it.
        </p>

        <h3>Advantages</h3>

        <p>
            That being said, composite primary keys also have advantages, although only very shallow ones.
            By using the least amount of indexes for each tables it makes writing (inserting/updating) data
            more efficient since less indexes need to be maintained. 
            It also makes the model structure slightly cleaner (by having usually one column less). 
            However, the difference between having a sequentially ordered auto-increment primary key and not is these
            days completely negligible as disk space is cheap 
            and the operation is usually only an append-only operation, which is very very fast.
        </p>

        <p>
            There might be certainly a few edge-cases (and for a few very specific database systems) where its initially preferable
            to work with composite primary keys. However, even in those systems might it be more valuable overall
            (all costs considered) to not use them and switch to a different strategy.
        </p>

        <h3>Alternative</h3>

        <p>
            An alternative system to composite primary keys is to use a single auto-increment numeric primary key, usually called "id"
            and move the composite primary key to a multi-field unique index. Depending on the primary key used (depends on the expected row count)
            the id uses either 4 or 8 bytes per record. 
        </p>
        
        <p>
            By using this strategy you are not forced anymore to think and find a solution for all the issues described above
            and thus decreases costs of projects that get bigger and bigger enormously.
        </p>
        
        <p>
            The strategy means concretely that each entity has a "id" field, usually at the very beginning, and this
            field is then used to identify per default unique rows and in joins.
        </p>
        
        <textarea codeHighlight>
            class User {
                id: number & PrimaryKey & AutoIncrement = 0;
            
                constructor(public username: string) {}
            }
        </textarea>

        <p>
            As alternative to a composite primary key, you would instead use a unique multi-field index. 
        </p>
        
        <textarea codeHighlight>
            @entity.index(['tenancyId', 'username'], {unique: true})
            class User {
                id: number & PrimaryKey & AutoIncrement = 0;
            
                constructor(
                    public tenancyId: number,
                    public username: string,
                ) {}
            }
        </textarea>
        
        <p>
            Deepkit ORM supports auto-increment primary keys, even for MongoDB. It is the preferred way of identifying records in your
            database. However, for MongoDB you might want to use its ObjectId (<code>_id: MongoId & Primary = ''</code>) as single primary key. 
            An alternative to numeric auto-increment primary key is an UUID, which works equally well 
            (however has slightly different performance characteristics as indexing is more expensive).
        </p>

        <h3>Summary</h3>

        <p>
            Composite primary keys essentially mean that once it is introduced all future changes and practical usage have a much greater cost.
            While it looks at the beginning like a clean architecture to have (because you have one less column), 
            it leads to substantial practical costs once the project is actually developed and the costs keep increasing the bigger the project gets.
        </p>

        <p>
            By looking at the asymmetries of advantages vs disadvantages it clearly shows that having composite
            primary keys are most of the time just not justifiable. The cost is much bigger than the benefit. Not only for you as 
            user, but also for us as author and maintainer of the ORM code. Hence why Deepkit ORM does not support composite primary keys.
        </p>

    `
})
export class DocORMCompositePrimaryKeyComponent {
}
