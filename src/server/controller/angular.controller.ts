import 'zone.js/dist/zone-node';

const domino = require('domino');
(global as any).window = global;
Object.assign(global, domino.impl);
// const {renderModuleFactory} = require('@angular/platform-server');

// import {http} from "@deepkit/framework";
// import {ɵCommonEngine as CommonEngine} from '@nguniversal/common/engine';
// import {IncomingMessage} from "http";
// import {AppServerModule} from '../../main.server';
// // import {AppServerModule} from '../../../dist/server/main';
// import {ngExpressEngine} from "@nguniversal/express-engine";
// import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
// import {AppServerModule, LAZY_MODULE_MAP} from '../../../dist/server/main';
// import * as all from '../../../dist/server/main';
// import {renderModule} from "@angular/platform-server";
import { ResourceLoader } from '@angular/compiler';
import {FileSystemResourceLoader} from "../../app/resource-loader";
import {ngExpressEngine} from "@nguniversal/express-engine";
import {IncomingMessage} from "http";
import {AppServerModule, renderModule} from "../../main.server";
import {http} from "@deepkit/framework";

// const angularEngine = new CommonEngine();
async function renderAngular(req: IncomingMessage) {
    // console.log('url', url, __dirname + '/../../app/app.server.module.ts');
    // process.chdir('src/app');

    // console.log('LAZY_MODULE_MAP', LAZY_MODULE_MAP);
    return await renderModule(AppServerModule, {
        url: req.url, document: '<app-root></app-root>', extraProviders: [
            // {provide: ResourceLoader, useClass: FileSystemResourceLoader, deps: []}
        ]
    });

    // (ngExpressEngine({
    //     bootstrap: AppServerModule,
    // }) as any)('/Users/marc/bude/deepkit-website/dist/browser/index.html', {url: req.url, req: req}, (error, html) => {
    //     console.log('done?!', error, html);
    // });

    // return await angularEngine.render({
    //     bootstrap: AppServerModule,
    //     url: url,
    //     // document: '<root></root>',
    //     documentFilePath: __dirname + '/../../../dist/browser/index.html'
    // });
}

@http.controller()
export class AngularController {

    @http.GET('')
    async index(req: IncomingMessage) {
        // console.log('req', req);
        return await renderAngular(req);
    }

    @http.GET(':path').regexp('path', '.*')
    async any(req: IncomingMessage) {
        return await renderAngular(req);
    }
}
