// const ExtraEntryWebpackPlugin = require('extra-entry-webpack-plugin');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = {
    // entry: {
    //     'editor.worker': 'node_modules/monaco-editor/esm/vs/editor/editor.worker.js',
    //     'json.worker': 'node_modules/monaco-editor/esm/vs/language/json/json.worker',
    //     'css.worker': 'node_modules/monaco-editor/esm/vs/language/css/css.worker',
    //     'html.worker': 'node_modules/monaco-editor/esm/vs/language/html/html.worker',
    //     'ts.worker': 'node_modules/monaco-editor/esm/vs/language/typescript/ts.worker'
    // },
    plugins: [
        // new ExtraEntryWebpackPlugin({
        //     entry: 'node_modules/monaco-editor/esm/vs/editor/editor.worker.js',
        //     outputName: 'editor.worker.bundle.js'
        // })
        // new Visualizer({
        //     filename: './statistics.html'
        // }),
        new MonacoWebpackPlugin({
            languages: ['javascript', 'typescript'],
        }),
    ],
}
