<template>
  <div class="container">
    <div class="main">
      <h1>{{ lang === 'zh' ? '代码图谱' : 'Code Graph' }}</h1>
      <p class="subtitle">
        {{
          lang === 'zh'
            ? 'GISphere 站点由前后端两个开源仓库驱动，下面是它们的提交历史。'
            : 'The GISphere site is powered by two open-source repositories. Their commit history is below.'
        }}
      </p>

      <el-tabs v-model="repoKey">
        <el-tab-pane
          :label="lang === 'zh' ? 'next-web · 前端' : 'next-web · Frontend'"
          name="web"
        />
        <el-tab-pane
          :label="
            lang === 'zh' ? 'next-server · 后端' : 'next-server · Backend'
          "
          name="server"
        />
      </el-tabs>

      <client-only>
        <div
          class="graph"
          :class="{ 'is-loading': !ready, 'has-error': failed }"
        >
          <p v-if="failed" class="graph-tip">
            {{
              lang === 'zh'
                ? '暂时读取不到提交历史。GitHub 公共接口对匿名请求限流（每小时 60 次），请稍后再试。'
                : 'Could not load the commit history. GitHub throttles anonymous API requests (60 per hour), so please try again later.'
            }}
          </p>
          <p v-else-if="!ready" class="graph-tip">
            {{ lang === 'zh' ? '正在加载…' : 'Loading…' }}
          </p>
        </div>
      </client-only>

      <p class="footnote">
        {{
          lang === 'zh'
            ? '只读视图，数据来自 GitHub 公共 API。'
            : 'Read-only view, data from the public GitHub API.'
        }}
        <a
          :href="`https://github.com/${repo}`"
          target="_blank"
          rel="noopener"
          >{{ repo }}</a
        >
      </p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

// 两个仓库都是公开的，直接走 GitHub 公共 API，不需要后端参与
const REPOS = {
  web: 'GIS-Info/next-web',
  server: 'GIS-Info/next-server',
}

export default {
  name: 'GitGraphPage',
  data() {
    return {
      repoKey: 'web',
      ready: false,
      failed: false,
      el: null,
      Provider: null,
    }
  },
  computed: {
    ...mapState({ lang: 'language' }),
    repo() {
      return REPOS[this.repoKey]
    },
  },
  head() {
    return {
      title: 'GISphere | Code Graph',
      // 隐蔽页面：不进搜索引擎，也不在 sitemap 里
      meta: [{ hid: 'robots', name: 'robots', content: 'noindex, nofollow' }],
    }
  },
  watch: {
    repoKey() {
      this.applyProvider()
    },
  },
  // web component 只在客户端注册，且用 createElement 挂载，
  // 避免 SSR 阶段访问 customElements，也避免 Vue 对未知标签告警。
  async mounted() {
    try {
      // 直接指向 dist 文件：webpack 4 不认 package.json 的 exports 字段
      const [{ defineWebGitGraph }, { GitHubGitGraphProvider }] =
        await Promise.all([
          import('@web-git-graph/web/dist/register.js'),
          import('@web-git-graph/web/dist/providers/github.js'),
        ])
      defineWebGitGraph()
      this.Provider = GitHubGitGraphProvider

      const host = this.$el.querySelector('.graph')
      if (!host) return
      this.el = document.createElement('web-git-graph')
      this.el.setAttribute('theme', 'light')
      this.el.addEventListener('gitgraph-error', this.onGraphError)
      host.appendChild(this.el)
      this.applyProvider()
      this.ready = true
    } catch (e) {
      this.failed = true
    }
  },
  beforeDestroy() {
    if (this.el) {
      this.el.removeEventListener('gitgraph-error', this.onGraphError)
      this.el.remove()
      this.el = null
    }
  },
  methods: {
    applyProvider() {
      if (!this.el || !this.Provider) return
      this.failed = false
      // provider 必须用 JS 属性赋值，不能写成 HTML attribute
      this.el.provider = new this.Provider({ repository: this.repo })
    },
    onGraphError() {
      this.failed = true
    },
  },
}
</script>

<style lang="less" scoped>
.container {
  overflow: auto;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  .main {
    width: 100%;
    max-width: 1200px;
    padding: 40px 20px;
    box-sizing: border-box;
  }
}
.subtitle {
  color: #606266;
}
.graph {
  height: 70vh;
  min-height: 420px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  overflow: hidden;
  // 与站点字体、强调色保持一致（自定义属性会继承进 shadow DOM）
  --wgg-font: 'Montserrat', sans-serif;
  &.is-loading,
  &.has-error {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  ::v-deep web-git-graph {
    display: block;
    height: 100%;
    --wgg-accent: #0073ff;
  }
  // 出错时藏掉图，避免旧仓库的提交和报错信息同时出现
  &.has-error ::v-deep web-git-graph {
    display: none;
  }
}
.graph-tip {
  color: #909399;
  padding: 0 20px;
  text-align: center;
}
.footnote {
  color: #909399;
  font-size: 14px;
  margin-top: 12px;
}
</style>
