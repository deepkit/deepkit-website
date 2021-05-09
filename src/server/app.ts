import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import { Application, KernelModule } from '@deepkit/framework';
import { AngularUniversalModule } from '@deepkit/angular-universal';
import { MongoDatabase } from "./db";
import { appConfig } from "./config";
import { FrameworkController, FrameworkHttpController } from './controller/framework.controller';
import { AuthListener } from "./auth";

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
            publicDir: (process.env.DIST || __dirname + '/../../dist/') + 'browser',
            databases: [MongoDatabase],
            debug: false,
            host: process.env.HOST || '127.0.0.1',
            workers: 1
        }),
        AngularUniversalModule.configure({
            browserPath: (process.env.DIST || __dirname + '/../../dist/') + 'browser',
            serverPath: (process.env.DIST || __dirname + '/../../dist/') + 'server',
        }),
    ]
}).run();
