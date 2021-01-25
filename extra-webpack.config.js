// const ExtraEntryWebpackPlugin = require('extra-entry-webpack-plugin');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    plugins: [
        new webpack.IgnorePlugin({resourceRegExp: /better_sqlite3/}),
        new MonacoWebpackPlugin({
            languages: ['javascript', 'typescript'],
        }),
    ],
    externals: {
      'better-sqlite3': {root: 'window'}, //just use something that exists, and is NOT better-sqlite3.
    },
}
