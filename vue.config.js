module.exports = {
  pluginOptions: {
    webpackBundleAnalyzer: {
      openAnalyzer: false
    }
  },
  devServer: {
    host: 'localhost',
    watchOptions: {
      poll: true
    }
  }
};
