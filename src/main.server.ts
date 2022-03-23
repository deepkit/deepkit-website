/***************************************************************************************************
 * Initialize the server environment - for example, adding DOM built-in types to the global scope.
 *
 * NOTE:
 * This import must come before any imports (direct or transitive) that rely on DOM built-ins being
 * available, such as `@angular/elements`.
 */
import '@angular/platform-server/init';

import {enableProdMode} from '@angular/core';

Error.stackTraceLimit = 100;

enableProdMode();

export {renderModule, platformDynamicServer, INITIAL_CONFIG} from '@angular/platform-server';
export {AppServerModule} from './app/app.server.module';
export {Router} from '@angular/router';
