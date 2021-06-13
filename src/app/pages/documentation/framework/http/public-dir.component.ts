import { Component } from '@angular/core';

@Component({
    template: `
        <div class="subline">Framework</div>

        <h2>Public directory</h2>

        <p>
            The kernel provides a way to serve static files like images, PDFs, binary files, etc. The configuration
            option <code>kernel.publicDir</code> allows you to specify which folder should be used as default entry point for
            requests that don't lead to a HTTP controller route. Per default this behavior is disabled (empty value).
        </p>
        
        <p>
            To enable serving public files set <code>kernel.publicDir</code> to folder you want. Usually you would pick a name
            like <code>publicDir</code> to make things obvious.
        </p>

        <textarea codeHighlight>
            .
            ├── app.ts
            └── publicDir
                └── logo.jpg
        </textarea>
        
        <p>
            To hard configure the  <code>kernel.publicDir</code> you can import <code>KernelModule</code> and modify it via <code>configure</code>.
        </p>

        <textarea codeHighlight title="app.ts">
            import { Application, KernelModule } from '@deepkit/framework';
            
            // your config and http controller here 
            
            Application.create({
                config: config,
                controllers: [MyWebsite],
                imports: [
                    KernelModule.configure({
                        publicDir: 'publicDir'
                    })
                ]
            })
                .run();
        </textarea>
        
        <p>
            All files inside that configured folder are now accessible via HTTP. For example could you now open
            <code>http://localhost:8080/logo.jpg</code> and you see the image <i>logo.jpg</i> put in <i>publicDir</i>.
        </p>
    `
})
export class DocFrameworkHttpPublicDirComponent {
}
