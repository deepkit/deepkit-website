import 'zone.js/node';
import 'reflect-metadata';
import { App } from '@deepkit/app';
import { FrameworkModule } from '@deepkit/framework';
import { AngularUniversalModule } from '@deepkit/angular-universal';
import { MongoDatabase } from './db';
import { appConfig } from './config';
import { FrameworkController, FrameworkHttpController } from './controller/framework.controller';
import { AuthListener } from './auth';

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
    config: appConfig,
    imports: [
        new FrameworkModule({
            publicDir: (process.env.DIST || __dirname + '/../../dist/') + 'browser',
            debug: false,
            host: process.env.HOST || '127.0.0.1',
            migrateOnStartup: true,
        }),
        new AngularUniversalModule({
            browserPath: (process.env.DIST || __dirname + '/../../dist/') + 'browser',
            serverPath: (process.env.DIST || __dirname + '/../../dist/') + 'server',
        }),
    ]
})
    .loadConfigFromEnv()
    .run();
