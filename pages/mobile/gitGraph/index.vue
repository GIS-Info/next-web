<template>
  <git-graph-page />
</template>

<script>
// 全局 device-redirect 中间件会把移动端 UA 打到 /mobile/*，
// 这里复用桌面端页面组件，只换 layout，避免重复实现。
import GitGraphPage from '~/pages/gitGraph/index.vue'

export default {
  name: 'MobileGitGraphPage',
  components: { GitGraphPage },
  layout: 'mobile',
}
</script>
