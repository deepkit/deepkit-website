import { Component } from '@angular/core';

@Component({
    selector: 'page-window',
    template: `
        <h1>Window</h1>

        <textarea codeHighlight>
        import {DuiWindowModule} from '@deepkit/desktop-ui';
        </textarea>

        <p>
            A window is built of multiple key components, you need for almost all of your desktop applications. The frame,
            header, header toolbar, content, footer.
        </p>

        <p>
            If you use electron, you need to make sure the electron window is rendering without borders. You do this by setting to
            titleBarStyle to none.
            To work correctly, this library requires you to set certain window options correctly. Following is an example:
        </p>

        <textarea codeHighlight>
        win = new BrowserWindow({
            center: true,
            width: 750,
            height: 750,
            vibrancy: 'window',
            transparent: true, //necessary for vibrancy fix on macos
            backgroundColor: "#80FFFFFF", //necessary for vibrancy fix on macos
            webPreferences: {
            scrollBounce: true,
            allowRunningInsecureContent: false,
            preload: __dirname + '/../../node_modules/@deepkit/desktop-ui/preload.js',
            nativeWindowOpen: true,
            },
            titleBarStyle: 'hidden',
            icon: path.join(assetsPath, 'icons/64x64.png')
        });
        </textarea>

        <code-frame>
            <dui-window>
                <dui-window-header>
                    Angular Desktop UI
                </dui-window-header>
                <dui-window-content>
                    <div>
                        This is the window content
                    </div>
                </dui-window-content>
            </dui-window>
            <textarea codeHighlight="html">
            <dui-window>
                <dui-window-header>
                    Angular Desktop UI
                </dui-window-header>
                <dui-window-content>
                    <div>
                        This is the window content
                    </div>
                </dui-window-content>
            </dui-window>
            </textarea>
        </code-frame>

        <code-frame>
            <dui-window>
                <dui-window-header>
                    Angular Desktop UI
                    <dui-window-toolbar>
                        <dui-button-group>
                            <dui-button textured icon="envelop"></dui-button>
                        </dui-button-group>
                        <dui-button-group float="right">
                            <dui-input textured icon="search" placeholder="Search" round clearer></dui-input>
                        </dui-button-group>
                    </dui-window-toolbar>
                </dui-window-header>
                <dui-window-content>
                    <div>
                        This is the window content
                    </div>
                </dui-window-content>
            </dui-window>

            <textarea codeHighlight="html">
                <dui-window>
                    <dui-window-header>
                        Angular Desktop UI
                        <dui-window-toolbar>
                            <dui-button-group>
                                <dui-button textured icon="envelop"></dui-button>
                            </dui-button-group>
                            <dui-button-group float="right">
                                <dui-input textured icon="search" placeholder="Search" round clearer></dui-input>
                            </dui-button-group>
                        </dui-window-toolbar>
                    </dui-window-header>
                    <dui-window-content>
                        <div>
                            This is the window content
                        </div>
                    </dui-window-content>
                </dui-window>
            </textarea>
        </code-frame>

        <code-frame>
            <dui-window>
                <dui-window-header>
                    Angular Desktop UI
                    <dui-window-toolbar>
                        <dui-button-group>
                            <dui-button textured icon="envelop"></dui-button>
                        </dui-button-group>
                        <dui-button-group float="right">
                            <dui-input textured icon="search" placeholder="Search" round clearer></dui-input>
                        </dui-button-group>
                    </dui-window-toolbar>
                </dui-window-header>
                <dui-window-content>
                    <div>
                        This is the window content
                    </div>
                </dui-window-content>
                <dui-window-footer>
                    This is the footer.
                </dui-window-footer>
            </dui-window>
            <textarea codeHighlight="html">
            <dui-window>
                <dui-window-header>
                    Angular Desktop UI
                    <dui-window-toolbar>
                        <dui-button-group>
                            <dui-button textured icon="envelop"></dui-button>
                        </dui-button-group>
                        <dui-button-group float="right">
                            <dui-input textured icon="search" placeholder="Search" round clearer></dui-input>
                        </dui-button-group>
                    </dui-window-toolbar>
                </dui-window-header>
                <dui-window-content>
                    <div>
                        This is the window content
                    </div>
                </dui-window-content>
                <dui-window-footer>
                    This is the footer.
                </dui-window-footer>
            </dui-window>
            </textarea>
        </code-frame>
    `
})
export class WindowComponent {
    disabled = false;
}
