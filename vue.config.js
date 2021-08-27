/*
 * @Date: 2021-03-03 18:01:20
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-25 19:41:55
 * @FilePath: \vue_operation_admin\vue.config.js
 */
const path = require('path')
const webpack = require('webpack')
const buildDate = JSON.stringify(new Date().toLocaleString())
// const VueLoaderPlugin = require('vue-loader/lib/plugin')

function resolve (dir) {
  return path.join(__dirname, dir)
}

const isProd = process.env.NODE_ENV === 'production'
const Timestamp = +new Date()

const assetsCDN = {
  // webpack build externals
  externals: {
    vue: 'Vue',
    'vue-router': 'VueRouter',
    vuex: 'Vuex',
    axios: 'axios'
  },
  css: [],
  // https://unpkg.com/browse/vue@2.6.10/
  js: [
    '//cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.min.js',
    '//cdn.jsdelivr.net/npm/vue-router@3.1.3/dist/vue-router.min.js',
    '//cdn.jsdelivr.net/npm/vuex@3.1.1/dist/vuex.min.js',
    '//cdn.jsdelivr.net/npm/axios@0.19.0/dist/axios.min.js'
  ]
}

// vue.config.js
const vueConfig = {
  publicPath: '/',
  productionSourceMap: false,
  lintOnSave: undefined,
  configureWebpack: {
    // webpack plugins
    plugins: [
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new webpack.DefinePlugin({
        APP_VERSION: `"${require('./package.json').version}"`,
        BUILD_DATE: buildDate
      })
      // new VueLoaderPlugin()
    ],
    output: { // 输出重构  打包编译后的 文件名称  【模块名称.时间戳】
      filename: `js/[name].${Timestamp}.js`,
      chunkFilename: `js/[name].${Timestamp}.js`
    },
    // if prod, add externals
    externals: isProd ? assetsCDN.externals : {}
  },

  chainWebpack: (config) => {
    config.resolve.alias
      .set('@$', resolve('src'))
    config
      .plugin('provide').use(webpack.ProvidePlugin, [{
        'window.Quill': 'quill'
      }])
    // if prod is on
    // assets require on cdn
    if (isProd) {
      config.plugin('html').tap(args => {
        args[0].cdn = assetsCDN
        return args
      })
    }
  },

  css: {
    loaderOptions: {
      less: {
        // DO NOT REMOVE THIS LINE
        javascriptEnabled: true,
        modifyVars: {
          // If you are using less-loader@5 please spread the lessOptions to options directly
          // modifyVars: {
          // 'primary-color': '#5CC96B',
          // 'link-color': '#5CC96B',
          'border-radius-base': '2px'
          // },
          // javascriptEnabled: true
        }
      }
    }
  },

  // devServer: {
  //   // If you want to turn on the proxy, please remove the mockjs /src/main.jsL11
  //   proxy: {
  //     '/api/admin': {
  //       target: process.env.VUE_APP_API_BASE_URL,
  //       // target: 'http://ultron.dk',
  //       // target: 'http://ultron.host:8888',
  //       ws: true,
  //       autoRewrite: true,
  //       changeOrigin: true,
  //       cookieDomainRewrite: true,
  //       pathRewrite: {
  //         '': ''
  //       }
  //     }
  //   }
  // },
  // babel-loader no-ignore node_modules/*
  transpileDependencies: []
}

module.exports = vueConfig
