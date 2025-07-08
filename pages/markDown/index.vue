<template>
  <div class="markdown-page">
    <h2>📄 Markdown 文档预览</h2>

    <div v-if="loading">加载中...</div>

    <div v-else>
      <select v-model="selectedUrl" @change="loadMarkdown">
        <option disabled value="">请选择一个 Markdown 文件</option>
        <option v-for="file in markdownFiles" :key="file.name" :value="file.url">
          {{ file.name }}
        </option>
      </select>

      <div v-if="rendering" style="margin-top: 20px;">正在加载内容...</div>
      <div v-else v-html="renderedContent" class="markdown-content"></div>
    </div>
  </div>
</template>

<script>
const marked = require('marked')

export default {
  data() {
    return {
      loading: true,
      rendering: false,
      markdownFiles: [],
      selectedUrl: '',
      renderedContent: ''
    }
  },
  async mounted() {
    try {
      const res = await this.$axios.get(
        'https://api.github.com/repos/AmazingMts/test/contents/'
      )
      this.markdownFiles = res.data
        .filter(file => file.name.endsWith('.md'))
        .map(file => ({
          name: file.name,
          url: file.download_url
        }))
    } catch (err) {
      console.error('加载文件列表失败:', err)
    } finally {
      this.loading = false
    }
  },
  methods: {
    async loadMarkdown() {
      if (!this.selectedUrl) return
      this.rendering = true
      try {
        const res = await this.$axios.get(this.selectedUrl)
        this.renderedContent = marked(res.data)
      } catch (err) {
        console.error('加载 Markdown 内容失败:', err)
        this.renderedContent = '<p>❌ 加载失败</p>'
      } finally {
        this.rendering = false
      }
    }
  }
}
</script>

<style scoped>
.markdown-page {
  max-width: 900px;
  margin: 40px auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}
select {
  padding: 6px 10px;
  margin-top: 20px;
}
.markdown-content {
  margin-top: 30px;
  border-top: 1px solid #ddd;
  padding-top: 20px;
  line-height: 1.6;
}
</style>
