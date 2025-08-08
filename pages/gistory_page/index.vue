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
      markdownFiles: [],
      selectedUrl: '',
      renderedContent: ''
    };
  },
  async mounted() {
    try {
      const res = await this.$axios.get(
        'https://api.github.com/repos/Pengyu-gis/markdown_repo/contents/'
      );
      const mdFiles = res.data.filter(file => file.name.endsWith('.md'))
      .sort((a, b) => {
        const numA = parseInt(a.name.match(/\d+/)?.[0] || 0, 10);
        const numB = parseInt(b.name.match(/\d+/)?.[0] || 0, 10);
        return numB - numA; // 倒序，数字大的在前
      });


      this.markdownFiles = await Promise.all(
        mdFiles.map(async file => {
          try {
            const contentRes = await this.$axios.get(file.download_url);
            const content = contentRes.data;
            const title = this.extractTitle(content);
            const image = this.extractFirstImage(content);
            return {
              name: file.name,
              url: file.download_url,
              title,
              image
            };
          } catch (err) {
            return {
              name: file.name,
              url: file.download_url,
              title: '⚠️ loading failed',
              image: null
            };
          }
        })
      );
    } catch (err) {
      console.error('加载文件列表失败:', err);
    } finally {
      this.loading = false;
    }
  },
  methods: {
    extractFirstImage(content) {
      const imageRegex = /<img[^>]+src="([^">]+)"/i;
      const mdImageRegex = /!\[.*?\]\((.*?)\)/;
      const htmlMatch = content.match(imageRegex);
      if (htmlMatch) return htmlMatch[1];
      const mdMatch = content.match(mdImageRegex);
      if (mdMatch) return mdMatch[1];
      return null;
    },
    goToDetail(file) {
      const encodedUrl = encodeURIComponent(file.url);
      this.$router.push(`/markdown/detail?url=${encodedUrl}`);
    },
    extractTitle(content) {
      const lines = content.split('\n');
      const titleLine = lines.find(
        line => line.startsWith('title:') || line.startsWith('# ')
      );
      if (titleLine?.startsWith('title:')) {
        return titleLine.replace('title:', '').trim();
      } else if (titleLine?.startsWith('# ')) {
        return titleLine.replace('#', '').trim();
      } else {
        return 'Untitled';
      }
    }
  }
};
</script>

<style scoped>
.markdown-page {
  padding: 32px 16px;
}

.file-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 每行三列 */
  gap: 24px;
  padding: 0 16px;
  margin: 0 auto 30px auto; /* 水平居中 + 底部间距 */
  max-width: 1024px; /* 控制最大宽度 */
  justify-content: center; /* 水平居中对齐 */
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
  height: 240px;
}

.file-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.card-image-wrapper {
  height: 140px;
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
}

</style>
