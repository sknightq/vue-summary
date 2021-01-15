const merge = require('webpack-merge')
const baseConfig = require('./base')

const devConfig = merge(baseConfig, {
  devServer: {
    // before: frameRequest,
    port: 8080
  },
  configureWebpack: {
    devtool: 'source-map',
    plugins: [],
    optimization: {
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: Infinity,
        cacheGroups: {
          dayjs: {
            test: /[\\/]node_modules[\\/]dayjs[\\/]/,
            name() {
              return 'dayjs'
            }
          },
          amap: {
            test: /[\\/]node_modules[\\/]@amap[\\/]/,
            name() {
              return 'amap'
            }
          },
          qrcode: {
            test: /[\\/]node_modules[\\/]qrcode-module[\\/]/,
            name() {
              return 'qrcode'
            }
          },
          // html2canvas: {
          //   test: /[\\/]node_modules[\\/]html2canvas[\\/]/,
          //   name() {
          //     return 'html2canvas'
          //   }
          // },
          swiper: {
            test: /[\\/]node_modules[\\/]tiny-swiper[\\/]/,
            name() {
              return 'tiny-swiper'
            }
          },
          vue: {
            test: /[\\/]node_modules[\\/]@vue[\\/]/,
            name() {
              return 'vue'
            }
          }
        }
      }
    }
  }
})

module.exports = devConfig
