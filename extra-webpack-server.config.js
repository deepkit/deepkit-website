const webpack = require('webpack');

module.exports = {
    externals: {
        'better-sqlite3': 'commonjs better-sqlite3', //just use something that exists, and is NOT better-sqlite3.
        '@deepkit/sql': 'commonjs @deepkit/sql',
        'domino': 'commonjs domino',
        '@deepkit/sqlite': 'commonjs @deepkit/sqlite',
        '@deepkit/orm': 'commonjs @deepkit/orm',
        '@deepkit/type-compiler': 'commonjs @deepkit/type-compiler',
        '@typescript/vfs': 'commonjs @typescript/vfs',
        'typescript': 'commonjs typescript',
    },
    resolve: {
        alias: {
            'monaco-editor': false,
        }
    },
}
