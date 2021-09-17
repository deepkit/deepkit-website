import { Component } from '@angular/core';

@Component({
    template: `
        <div class="subline">Type</div>
        
        <h2>Patch</h2>
        
        <p>
            Patching is a process to update data only partially. Deepkit Type supports (de-)serializing patch structures with deep paths.
            This allows for example to correctly deserialize incoming JSON patch structures, or custom patch structures.
        </p>
        
        <textarea codeHighlight>
            import 'reflect-metadata';
            import { jsonSerializer, t } from '@deepkit/type';
            class Config {
                @t backgroundColor: number = 0x002200;
                @t profileColor: number = 0x552200;
            
                @t image?: Uint8Array;
            }
            
            class User {
                @t config: Config = new Config;
                @t.array(t.string) categories: string[] = [];
            }
            
            const userPatch = jsonSerializer.for(User).patchDeserialize({
                'config.backgroundColor': '24',
                'categories.0': 42
            });
            
            // automatically deserializes correctly
            typeof userPatch.['config.backgroundColor']; //number
            typeof userPatch.['categories.0']; //string
        </textarea>
        
        <p>
          This works for all types.
        </p>
        
        <h3>Apply patch</h3>
        
        Once you have deserialized a patch structure, you can apply the patch to an instance. This way you made sure
        that the object gets the correct data types from your incoming patch structure.
        
        <textarea codeHighlight>
            import { setPathValue } from '@deepkit/core';
            
            const user = new User();
            
            for (const [path, value] of Object.entries(userPatch)) {
                setPathValue(user, path, value);
            }
            
            console.log(user.config.backgroundColor); //24
        </textarea>
        
    `
})
export class DocTypePatchComponent {
}
