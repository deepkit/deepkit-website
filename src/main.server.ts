import 'reflect-metadata';
import {enableProdMode} from '@angular/core';

Error.stackTraceLimit = 100;

enableProdMode();

export {AppServerModule} from './app/app.server.module';
export {renderModule, renderModuleFactory, platformDynamicServer, INITIAL_CONFIG} from '@angular/platform-server';
export {Router} from '@angular/router';
