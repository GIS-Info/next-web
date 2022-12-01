// eslint-disable-next-line nuxt/no-cjs-in-config
const axios = require('axios');

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head

  head: {
    title: 'GIS 留学指南',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'GISphere 是一个公益项目，由一批在全球不同院校从事地理信息及相关领域科研工作的中国青年学生学者于2019年9月提供一个分享世界各地GIS相关研究生项目、导师和学术前沿信息的在线平台，促进不同国家/地区的GIS相关院校与学生之间的交流、教育与发生的纠纷是合作，共同推动GIS学科和相关产业的发展。目前，旗下子项目包括：GIS-Info 网站 全面介绍海外 GIS 相关院校、专业及老师信息；GISphere 公众号 分享海外院校GIS相关专业学生的申请经验及就读体验；GISource 环球资讯速递 实时发布最新海外院校GIS相关硕士、博士等招生信息；GISpace 社区讨论群 为GIS相关专业的海外学者和学生提供交流平台；GISalon 圆桌讨论 和学长学姐“零距离”聊聊留学和职业发展那些事儿' },
      { hid: 'keywords', name: 'keywords', content: 'GIS, 留学, GISphere' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    bodyAttrs: {
      style: 'margin: 0'
    }
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  // element UI DIY theme: import "../theme/index.css"
  css: [
    'element-ui/lib/theme-chalk/index.css',
    'quill/dist/quill.snow.css',
    'quill/dist/quill.bubble.css',
    'quill/dist/quill.core.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/element-ui',
    {
      src: '~plugins/vue-quill-editor.js',
      ssr: false // 富文本组件仅在客户端渲染
    }
  ],
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

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
    exclude: [],
    // cacheTime: 60 * 60 * 6, //  更新频率
    // generate: false,
    routes: async () => {
      const urls = [
        '/postList',
        '/aboutUs'
      ];
      // 帖子页面的路由
      const { data } = await axios.get('https://gisphere.info/api/post');
      const count = data.count;
      for(let index = 1; index <= count; index ++){
        urls.push(`/post/${index}`);
        urls.push(`/mobile/post/${index}`);
      }
      return urls;
    }
  }
}
