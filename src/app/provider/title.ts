import { Title } from '@angular/platform-browser';
import { Injectable } from '@angular/core';

@Injectable()
export class TitleService {

    constructor(
        protected title: Title,
    ) {
    }

    setTitle(name: string = '') {
        this.title.setTitle(
            (name ? name + ' | ' : '')
            + 'Deepkit - High-Performance TypeScript Framework'
        );
    }
}
