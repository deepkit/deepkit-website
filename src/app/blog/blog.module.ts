import { Component, Input, NgModule, OnDestroy } from '@angular/core';
import { ActivatedRoute, RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subscription } from "rxjs";
import { MarkdownModule } from 'ngx-markdown';

const blogPosts = (require as any).context('!!raw-loader!src/app/blog/posts', true, /.*(\.md)$/);

@Component({
    template: `
        <div class="page wrapper">
            <div class="page-text" style="max-width: 700px;">
                <markdown [data]="markdown"></markdown>
            </div>
        </div>
    `
})
class BlogComponent implements OnDestroy {
    paramSub: Subscription;

    posts: { [id: string]: string } = {};

    markdown: string = '';

    constructor(private route: ActivatedRoute) {
        for (const file of blogPosts.keys()) {
            if (!file.startsWith('src/app/blog/posts/')) continue;
            this.posts[file.replace('src/app/blog/posts/', '').replace('.md', '')] = blogPosts(file).default;
        }

        this.paramSub = route.params.subscribe((params) => {
            this.markdown = this.posts[params.id];
        });
    }

    ngOnDestroy(): void {
        this.paramSub.unsubscribe();
    }
}

@Component({
    selector: 'post',
    template: `
        <a routerLink="/blog/{{url}}">
            <img alt="post visual" src="/assets/blog/{{url}}.svg"/>
            <div class="title">{{title}}</div>
            <div class="below">
                <div>By <span>{{by}}</span></div>
                <div><span>{{date}}</span></div>
            </div>
        </a>
    `,
    styleUrls: ['./blog-list-item.scss']
})
class BlogListItem {
    @Input() title!: string;
    @Input() url!: string;
    @Input() by!: string;
    @Input() date!: string;
}

@Component({
    template: `
        <div class="page wrapper">
            <div class="overline">STAY INFORMED</div>
            <h1>BLOG</h1>

            <div class="posts">
                <post title="Introducing Deepkit Framework" by="Marc J. Schmidt" date="23. March 2022" url="introducing-deepkit-framework"></post>
            </div>
        </div>
    `,
    styleUrls: ['./blog.scss']
})
class BlogStartPageComponent {
}

const routes: Routes = [
    { path: '', component: BlogStartPageComponent },
    { path: ':id', component: BlogComponent },
];

@NgModule({
    declarations: [
        BlogComponent,
        BlogStartPageComponent,
        BlogListItem,
    ],
    providers: [],
    imports: [
        CommonModule,
        FormsModule,
        MarkdownModule.forRoot(),
        RouterModule.forChild(routes),
    ]
})
export class BlogModule {

}
