<template>
  <div class="markdown-detail">
    <div v-if="loading">加载中...</div>
    <div v-else v-html="renderedContent" class="markdown-content"></div>
  </div>
</template>

<script>
import { marked } from 'marked'

export default {
  data() {
    return {
      renderedContent: '',
      loading: true
    }
  },
  async mounted() {
    const url = this.$route.query.url
    if (!url) {
      this.renderedContent = '<p>❌ 无效 URL</p>'
      this.loading = false
      return
    }

    try {
      const res = await this.$axios.get(decodeURIComponent(url))
      this.renderedContent = marked(res.data)
    } catch (err) {
      console.error('加载失败', err)
      this.renderedContent = '<p>❌ 加载失败</p>'
    } finally {
      this.loading = false
    }
  }
}
</script>

<style scoped>
.markdown-detail {
  max-width: 900px;
  margin: 40px auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}
.markdown-content {
  margin-top: 20px;
  line-height: 1.6;
}
</style>
