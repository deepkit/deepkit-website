import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import {Application, KernelModule} from '@deepkit/framework';
import {AngularUniversalModule} from '@deepkit/angular-universal';
import {MongoDatabase} from "./db";
import {appConfig} from "./config";
import {FrameworkController, FrameworkHttpController} from './controller/framework.controller';
import {AuthListener} from "./auth";
import {dirname} from 'path';

Application.create({
    providers: [],
    controllers: [
        FrameworkController,
        FrameworkHttpController,
    ],
    listeners: [
        AuthListener
    ],
    config: appConfig,
    imports: [
        KernelModule.configure({
            publicDir: __dirname + '/../../dist/browser',
            databases: [MongoDatabase],
            debug: true,
            workers: 1,
        }),
        AngularUniversalModule.configure({
            browserPath: __dirname + '/../../dist/browser',
            serverPath: __dirname + '/../../dist/server',
        }),
    ]
}).run();
