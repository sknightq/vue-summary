const merge = require('webpack-merge')
const baseConfig = require('./base')

const devConfig = merge(baseConfig, {
  devServer: {
    // before: frameRequest,
    port: 8080
  },
  configureWebpack: {
    devtool: 'source-map',
    plugins: [
      // insert CDN js
      // new HtmlWebpackTagsPlugin({
      //   append: false,
      //   publicPath: false,
      //   tags: ['http://somecdn.js']
      // })
    ]
  }
})

module.exports = devConfig
