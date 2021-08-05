// const ExtraEntryWebpackPlugin = require('extra-entry-webpack-plugin');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const webpack = require('webpack');
const {resolve} = require('path');
const Visualizer = require('webpack-visualizer-plugin');


module.exports = {
    plugins: [
        new webpack.IgnorePlugin({resourceRegExp: /better_sqlite3/}),
        new MonacoWebpackPlugin({
            languages: ['javascript', 'typescript'],
        }),
        new Visualizer({
            filename: './statistics.html'
        }),
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
    externals: {
        'better-sqlite3': {root: 'window'}, //just use something that exists, and is NOT better-sqlite3.
    }
}
