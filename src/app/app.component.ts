import { ChangeDetectorRef, Component, ElementRef, Inject, Injector, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, ActivationEnd, NavigationEnd, Router } from '@angular/router';
import { Docu } from './provider/docu';
import { TitleService } from './provider/title';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    header = true;
    startPage = false;
    fromStartPage = false;

    constructor(
        router: Router,
        elementRef: ElementRef,
        route: ActivatedRoute,
        cd: ChangeDetectorRef,
        injector: Injector,
        docu: Docu,
        title: TitleService,
        @Inject(PLATFORM_ID) platformId: any
    ) {
        router.events.subscribe((e) => {
            if (e instanceof NavigationEnd || e instanceof ActivationEnd) {
                const firstChild = route.firstChild;
                if (!firstChild) return;
                this.header = firstChild.snapshot.data.header !== false;
                const startPage = firstChild.snapshot.data.startPage === true;
                if (this.startPage) {
                    this.fromStartPage = !startPage;
                }
                this.startPage = startPage;

                if (firstChild.snapshot.data.title) {
                    title.setTitle(firstChild.snapshot.data.title);
                }

                const element = elementRef.nativeElement as HTMLElement;
                if (element) {
                    element.classList.add('fullHeight');
                    if (firstChild.snapshot.data.documentation) element.classList.remove('fullHeight');
                }

                cd.detectChanges();
            }
        });
    }
}
