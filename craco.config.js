/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const path = require('path')

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    configure(webpackConfig) {
      // 只在生产环境
      if (webpackConfig.mode === 'production') {
        // 抽离公共代码，把基本不会变动的第三方代码拆分出去，使用缓存
        if (webpackConfig.optimization == null) {
          webpackConfig.optimization = {}
        }
        webpackConfig.optimization.splitChunks = {
          chunks: 'all',
          cacheGroups: {
            antd: {
              name: 'antd-chunk',
              test: /antd/,
              priority: 100,
            },
            reactDom: {
              name: 'reactDom-chunk',
              test: /react-dom/,
              priority: 99,
            },
            vendors: {
              name: 'vendors-chunk',
              test: /node_modules/,
              priority: 98,
            },
          },
        }
      }
      return webpackConfig
    },
  },
  devServer: {
    port: 8000,
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
}
