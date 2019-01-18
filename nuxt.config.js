const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const pkg = require('./package')

module.exports = {
  mode: 'universal',

  /*
   ** Headers of the page
   */
  head: {
    title: '尖峰咖',
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: pkg.description
      }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }],
    script: [{
      src: 'http://dup.baidustatic.com/js/ds.js'
    }]
  },

  env: {
    commonUrl: 'http://123.207.11.165/image/',
    commonFileUrl: 'http://123.207.11.165/',
    baseURL: 'http://123.207.11.165/api',
    isGetHost: false,
    userToken: ''
  },

  // router: {
  //   middleware: ['getHost', 'baidu-statistics', 'setStore'],
  //   base: '/pc'
  // },
  router: {
    // base: `/pc/`,
    middleware: ['getHost', 'baidu-statistics', 'setStore'],
  },
  /*
   ** Customize the progress-bar color
   ** https://zh.nuxtjs.org/api/configuration-loading/
   */
  // loading: {
  //   color: '#fff'
  // },

  /*
   ** Global CSS
   */
  css: [
    // 项目中使用 less 的文件
    // '@/assets/style/common/common.less',
    '@/assets/css/base.css',
    'element-ui/lib/theme-chalk/index.css',
    "swiper/dist/css/swiper.css",
    'font-awesome/css/font-awesome.css',
    'summernote/dist/summernote-lite.css'
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '@/plugins/babel-polyfill',
    '@/plugins/element-ui',
    {
      src: '@/plugins/v-distpicker',
      ssr: false
    },
    '@/plugins/vue-swiper',
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // styleResource
    '@nuxtjs/style-resources',
    // 'babel-polyfill',
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    // Doc: https://bootstrap-vue.js.org/docs/
    // 'bootstrap-vue/nuxt'
  ],
  // 注册全局
  styleResources: {
    less: 'assets/style/common/basic.less'
  },
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  // 个性化配置 nuxt 应用的路由
  // router: {
  // base: '/app/',
  // 创建路由
  // extendRoutes(routes, resolve) {
  //   routes.push({
  //     name: 'custom',
  //     path: '*',
  //     component: resolve(__dirname, 'pages/404.vue')
  //   })
  // },

  // linkActiveClass: '',
  // linkExactActiveClass: '',

  // 在每页渲染前运行 middleware/user-agent.js 中间件的逻辑
  // middleware: 'user-agent',

  // 路由切换滚动行为
  // scrollBehavior(to, from, savedPosition) {
  //   return {
  //     x: 0,
  //     y: 0
  //   }
  // }
  // },

  // 配置 nuxt.js 应用是开发还是生产
  // dev: {},

  // 定义应用客户端和服务端的环境变量
  // env: {},

  // generate: {
  // nuxt 只会生成路由 '/' 对应的静态文件
  // 处理动态路由需要配置到 routes 数组中
  // routes: []
  // },

  /*
   ** Build configuration
   */
  build: {
    vendor: ['jquery', 'bootstrap'],
    plugins: [
      // set shortcuts as global for bootstrap
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery'
      })
    ],
    // analyze: true,
    // babel: {
    //   presets: ['es2015', 'stage-2'],
    //   plugins: ["transform-vue-jsx", "transform-runtime"],
    // },
    optimization: {
      // minimizer: [new UglifyJsPlugin({
      //   test: /\.js(\?.*)/i,
      //   include: /\/pages/,
      //   // 缓存
      //   // cache: true,
      //   // 允许多进程
      //   // parallel: true
      // })]
      splitChunks: {
        chunks: 'all',
        minSize: 20000,
        maxSize: 0,
        minChunks: 1
      }
    },
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // console.log('extend', config, ctx)
      config.resolve = merge(config.resolve, {
        alias: {
          'components': path.resolve(__dirname, 'components'),
          'http': path.resolve(__dirname, 'http'),
          'assets': path.resolve(__dirname, 'assets'),
          'utils': path.resolve(__dirname, 'utils')
        }
      })
    },
    // publicPath: '/pc/pc/'
  }
}
