import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import { Application, KernelModule } from '@deepkit/framework';
import { angularUniversalModule } from '@deepkit/angular-universal';
import { MongoDatabase } from './db';
import { appConfig } from './config';
import { FrameworkController, FrameworkHttpController } from './controller/framework.controller';
import { AuthListener } from './auth';

(global as any).requestAnimationFrame = (callback, element) => {
    let lastTime = 0;
    const currTime = new Date().getTime();
    const timeToCall = Math.max(0, 16 - (currTime - lastTime));
    const id = setTimeout(() => {
            callback(currTime + timeToCall);
        },
        timeToCall);
    lastTime = currTime + timeToCall;
    return id;
};

global.cancelAnimationFrame = (id) => {
    clearTimeout(id);
};


(global as any).matchMedia = () => {
    return {matches: false, media: '', addEventListener: () => {}};
};

(global as any).localStorage = {setItem: () => {}, getItem: () => {}, removeItem: () => {}};
(global as any).dispatchEvent = () => {};


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
        angularUniversalModule.configure({
            browserPath: (process.env.DIST || __dirname + '/../../dist/') + 'browser',
            serverPath: (process.env.DIST || __dirname + '/../../dist/') + 'server',
        }),
    ]
}).run();
