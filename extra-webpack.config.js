// const ExtraEntryWebpackPlugin = require('extra-entry-webpack-plugin');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const webpack = require('webpack');
const {resolve} = require('path');
// const Visualizer = require('webpack-visualizer-plugin');


module.exports = {
    plugins: [
        new webpack.IgnorePlugin({resourceRegExp: /better_sqlite3/}),
        new MonacoWebpackPlugin({
            languages: ['javascript', 'typescript'],
        }),
        // new Visualizer({
        //     filename: './statistics.html'
        // }),
    ],
    // module: {
    //     rules: [
    //         {
    //             // test: /\.html$/, use: resolve(__dirname, './loader.js'),
    //             test: /\.ts$/, use: {
    //                 options: {
    //                 },
    //                 loader: resolve(__dirname, './loader.js')
    //             }
    //         },
    //     ]
    // },
    resolve: {
        alias: {
            '@angular/platform-serve': false,
            domino: false,
            util: false,
            fs: false,
            path: false,
            os: false,
            process: false,
            stream: false,
            '@deepkit/logger': false,
            "sqlite3": false,
            "electron": false,
            "ts-node": false,
            "perf_hooks": false,
            "fast-glob": false,
            "@deepkit/app": false,
            "better-sqlite3": false,
            "crypto": false
        }
    },
    externals: {
    }
}
