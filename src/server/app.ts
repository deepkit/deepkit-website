import 'zone.js/node';
// (global as any).Zone = {
//     current: {
//         get(): void { }
//     },
//     assertZonePatched: () => void 0,
// };
import 'reflect-metadata';
import { App, findParentPath } from '@deepkit/app';
import { FrameworkModule } from '@deepkit/framework';
import { AngularUniversalModule } from '@deepkit/angular-universal';
import { MongoDatabase } from './db';
import { Config } from './config';
import { FrameworkController, FrameworkHttpController } from './controller/framework.controller';
import { AuthListener } from './auth';
import path from "path";
import { getCurrentFileName } from '@deepkit/core';

// this stuff is needed for desktop-ui
(global as any).requestAnimationFrame = (callback: any, element: any) => {
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


const dist = process.env.DIST || findParentPath('/dist', path.dirname(getCurrentFileName()));

new App({                                                               
    providers: [
        MongoDatabase,
    ],
    controllers: [
        FrameworkController,
        FrameworkHttpController,
    ],
    listeners: [
        AuthListener
    ],
    config: Config,
    imports: [
        new FrameworkModule({
            publicDir: path.join(dist, 'browser'),
            debug: false,
            host: process.env.HOST || '127.0.0.1',
            migrateOnStartup: true,
        }),
        new AngularUniversalModule({
            browserPath: path.join(dist, 'browser'),
            serverPath: path.join(dist, 'server'),
        }),
    ]
})
    .loadConfigFromEnv()
    .run();
