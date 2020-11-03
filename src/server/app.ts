import 'reflect-metadata';
import {Application, Databases} from '@deepkit/framework';
import {MongoDatabase} from "./db";
import {AngularController} from "./controller/angular.controller";


Application.run({
    providers: [
    ],
    controllers: [AngularController],
    imports: [
        Databases.for(MongoDatabase)
    ]
});
