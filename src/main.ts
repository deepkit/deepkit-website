import 'reflect-metadata';
import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';

if (environment.production) {
    enableProdMode();
}

(window as any)._require = (window as any).require;
(window as any).require = undefined;

platformBrowserDynamic().bootstrapModule(AppModule, {
    ngZone: 'noop'
})
    .catch(err => console.error(err));
