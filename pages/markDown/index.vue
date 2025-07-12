<template>
  <div class="markdown-page">

    <div v-if="loading">加载中...</div>

    <div v-else>
      <div class="file-grid">
  <div
    class="file-card"
    v-for="file in markdownFiles"
    :key="file.name"
    @click="goToDetail(file)"
  >
    <div class="card-image-wrapper">
          <img v-if="file.image" :src="file.image" class="card-image" />
          <div v-else class="card-placeholder">No Image</div>
        </div>
        <div class="card-title">{{ file.title }}</div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
export default {

  data() {
    return {
      loading: true,
      rendering: false,
      markdownFiles: [], // [{ name, url, title }]
      selectedUrl: '',
      renderedContent: ''
    }
  },
  async mounted() {
    try {
      const res = await this.$axios.get(
        'https://api.github.com/repos/AmazingMts/test/contents/'
      )
      const mdFiles = res.data.filter(file => file.name.endsWith('.md'))

      this.markdownFiles = await Promise.all(
      mdFiles.map(async file => {
        try {
          const contentRes = await this.$axios.get(file.download_url)
          const content = contentRes.data
          const title = this.extractTitle(content)
          const image = this.extractFirstImage(content)
          return {
            name: file.name,
            url: file.download_url,
            title,
            image
          }
        } catch (err) {
          return {
            name: file.name,
            url: file.download_url,
            title: '⚠️ 加载失败',
            image: null
          }
        }
      })
    )

    } catch (err) {
      console.error('加载文件列表失败:', err)
    } finally {
      this.loading = false
    }
  },
  methods: {
      extractFirstImage(content) {
        const imageRegex = /<img[^>]+src="([^">]+)"/i
        const mdImageRegex = /!\[.*?\]\((.*?)\)/
        const htmlMatch = content.match(imageRegex)
        if (htmlMatch) return htmlMatch[1]
        const mdMatch = content.match(mdImageRegex)
        if (mdMatch) return mdMatch[1]
        return null
  },
      goToDetail(file) {
        console.log(file)
      const encodedUrl = encodeURIComponent(file.url)
      this.$router.push(`/markdown/detail?url=${encodedUrl}`)
    },

    extractTitle(content) {
      const lines = content.split('\n')
      const titleLine = lines.find(line =>
        line.startsWith('title:') || line.startsWith('# ')
      )
      if (titleLine?.startsWith('title:')) {
        return titleLine.replace('title:', '').trim()
      } else if (titleLine?.startsWith('# ')) {
        return titleLine.replace('#', '').trim()
      } else {
        return 'Untitled'
      }
    }
  }
}
</script>

<style scoped>
.file-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 每行4列 */
  gap: 20px;
  margin-bottom: 30px;
}

.file-card {
  background: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.06);
  cursor: pointer;
  transition: transform 0.2s ease;
  display: flex;
  flex-direction: column;
  height: 250px; /* 固定卡片高度 */
}

.file-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.card-image-wrapper {
  height: 140px; /* 固定图片区域 */
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
}

.card-placeholder {
  font-size: 14px;
  color: #999;
}

.card-title {
  padding: 12px;
  font-weight: 600;
  font-size: 14px;
  text-align: center;
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

</style>
