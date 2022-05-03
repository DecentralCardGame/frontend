const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
const path = require('path')

module.exports = {
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      symlinks: false,
      alias: {
        vue$: path.resolve('./node_modules/vue/dist/vue.esm-bundler.js'),
      },
    },
    plugins: [new NodePolyfillPlugin()],
  },
  devServer: {
    proxy: 'http://v2202008103543124756.megasrv.de:1318',
  }
}

// vue.config.js
module.exports = {
  // options...

}
