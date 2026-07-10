// eslint-disable-next-line nuxt/no-cjs-in-config
const axios = require('axios');

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head

  head: {
    title: 'GISphere | GIS 留学指南',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'GISphere is a non-profit initiative led by a group of graduate students and young scholars in GIS-related fields (e.g., remote sensing, urban studies, other subfields in Geography). We have helped students interested in professional development and graduate programs to access the up-to-date information on global M.S./Ph.D. opportunities, funding availabilities, webinars, and competitions through our project website, blogs, online forums, and other virtual events.' },
      { hid: 'keywords', name: 'keywords', content: 'GIS, 留学, GISphere' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/favicon-16x16.png' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&display=swap' }
    ],
    script: [
      { src: 'https://www.googletagmanager.com/gtag/js?id=G-8CZVFCBGBQ', async: true },
      {
        innerHTML:
          "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-8CZVFCBGBQ');"
      }
    ],
    __dangerouslyDisableSanitizers: ['script'],
    bodyAttrs: {
      style: 'margin: 0'
    }
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  // Element UI 的样式由自定义主题 theme/index.css 提供（在 element-ui 插件中引入）
  // quill 样式改由 QuillEditor 组件按需引入，不再全局加载
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['@/plugins/element-ui'],
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // 全局路由中间件：服务端按 UA 做 PC / 移动端跳转
  router: {
    middleware: 'device-redirect'
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    '@nuxtjs/sitemap',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: 'https://gisphere.info',
    proxy: true, // 表示开启代理
    credentials: true // 表示跨域请求时是否需要使用凭证
  },
  // 开发环境配置跨域
  proxy: {
    "/api/":{
      target:'https://gisphere.info', // 代理指向线上
      // target:'http://127.0.0.1:8000/', // 代理指向本地
      changeOrigin: true,
    }
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^element-ui/]
  },
  sitemap: {
    path: '/sitemap.xml',
    hostname: 'https://gisphere.info/',
    exclude: ['**'],
    cacheTime: 1000 * 60 * 60, // 更新频率
    routes: async () => {
      const urls = [
        '',
        '/postList',
        '/aboutUs',
        '/school',
        '/school/zh',
        '/white-book',
        '/feedback'
      ];
      // 帖子页面的路由
      const res = await axios.get('https://gisphere.info/api/post?pageSize=99999&pageIndex=1')
      res?.data?.data?.forEach((d)=>{
        urls.push(`/post/${d.event_id}`);
        urls.push(`/mobile/post/${d.event_id}`);
        urls.push(`/post/${d.event_id}?lang=zh`);
        urls.push(`/mobile/post/${d.event_id}?lang=zh`);
      })
      return urls;
    }
  }
}
