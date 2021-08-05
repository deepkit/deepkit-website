const webpack = require('webpack');

module.exports = {
    externals: {
      'better-sqlite3': 'commonjs @deepkit/type', //just use something that exists, and is NOT better-sqlite3.
    }
}
