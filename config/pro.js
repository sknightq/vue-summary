const merge = require('webpack-merge')
const baseConfig = require('./base')

const proConfig = merge(baseConfig, {
  configureWebpack: {}
})

module.exports = proConfig
