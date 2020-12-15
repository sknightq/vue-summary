const pages = {
  summary: {
    entry: 'src/views/summary/index.js',
    template: 'public/index.html',
    filename: 'summary.html',
    title: '年度总结',
    chunks: ['chunk-vendors', 'chunk-common', 'summary'],
    from: '/summary',
    to: '/summary.html'
  }
}

// console.log(pages)
module.exports = {
  pages,
  css: {
    loaderOptions: {
      sass: {
        // 设置公共样式变量
        prependData: `@import "@/assets/styles/variables.scss";`
      }
    },
    // 设置打包的样式是否内联（false 为内联）
    extract: true
  },
  publicPath: '/',
  chainWebpack: config => {
    config.module.rules.delete('eslint')
  }
}
