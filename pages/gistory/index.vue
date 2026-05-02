<template>
  <div class="gistory-page">
    <header class="page-header">
      <div class="header-inner">
        <div class="header-eyebrow">
          <span class="eyebrow-line"></span>
          <span class="eyebrow-text">An interview series by GISphere</span>
          <span class="eyebrow-line"></span>
        </div>
        <h1 class="page-title">
          <span class="title-main">GIStory</span>
        </h1>
        <p class="page-subtitle">
          Conversations with geographers, scientists, and practitioners shaping
          the future of GIScience.
        </p>
      </div>
    </header>

    <div v-if="loading" class="loading-state">
      <div class="loading-pulse"></div>
      <p>Loading stories…</p>
    </div>

    <main v-else class="content">
      <section v-if="featured" class="featured" @click="goToDetail(featured)">
        <div class="featured-image-wrap">
          <img
            v-if="featured.image"
            :src="featured.image"
            :alt="featured.title"
            class="featured-image"
          />
          <div v-else class="featured-placeholder">GIStory</div>
          <div class="featured-badge">Latest Issue</div>
        </div>
        <div class="featured-content">
          <span class="featured-issue">{{ getIssueLabel(featured.name) }}</span>
          <h2 class="featured-title">{{ getCleanTitle(featured.title) }}</h2>
          <p class="featured-excerpt">
            Read the latest conversation in our ongoing interview series.
          </p>
          <span class="featured-cta">
            Read interview
            <svg width="20" height="10" viewBox="0 0 20 10" fill="none">
              <path d="M0 5h18M14 1l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
        </div>
      </section>

      <div class="section-divider">
        <span class="divider-label">All Issues</span>
      </div>

      <section class="article-grid">
        <article
          v-for="(file, index) in restOfArticles"
          :key="file.name"
          class="article-card"
          :style="{ animationDelay: (index * 60) + 'ms' }"
          @click="goToDetail(file)"
        >
          <div class="card-image-wrap">
            <img
              v-if="file.image"
              :src="file.image"
              :alt="file.title"
              class="card-image"
              loading="lazy"
            />
            <div v-else class="card-placeholder">GIStory</div>
            <div class="card-issue-tag">{{ getIssueNumber(file.name) }}</div>
          </div>
          <div class="card-body">
            <span class="card-issue">{{ getIssueLabel(file.name) }}</span>
            <h3 class="card-title">{{ getCleanTitle(file.title) }}</h3>
            <span class="card-arrow" aria-hidden="true">
              <svg width="16" height="8" viewBox="0 0 16 8" fill="none">
                <path d="M0 4h14M11 1l3 3-3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
          </div>
        </article>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      markdownFiles: [],
    };
  },
  computed: {
    featured() {
      return this.markdownFiles[0] || null;
    },
    restOfArticles() {
      return this.markdownFiles.slice(1);
    },
  },
  async mounted() {
    try {
      const res = await this.$axios.get(
        'https://api.github.com/repos/Pengyu-gis/markdown_repo/contents/'
      );
      const mdFiles = res.data
        .filter(file => file.name.endsWith('.md'))
        .sort((a, b) => {
          const numA = parseInt(a.name.match(/\d+/)?.[0] || 0, 10);
          const numB = parseInt(b.name.match(/\d+/)?.[0] || 0, 10);
          return numB - numA;
        });

      this.markdownFiles = await Promise.all(
        mdFiles.map(async file => {
          try {
            const contentRes = await this.$axios.get(file.download_url);
            const content = contentRes.data;
            return {
              name: file.name,
              url: file.download_url,
              title: this.extractTitle(content),
              image: this.extractFirstImage(content),
            };
          } catch (err) {
            return {
              name: file.name,
              url: file.download_url,
              title: '⚠️ loading failed',
              image: null,
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
      // 提取 HTML 格式的图片链接
      const imageRegex = /<img[^>]+src="([^">]+)"/i;
      // 提取 Markdown 格式的图片链接
      const mdImageRegex = /!\[.*?\]\((.*?)\)/;
      let imageUrl = null;
      const htmlMatch = content.match(imageRegex);
      if (htmlMatch) {
        imageUrl = htmlMatch[1];
      } else {
        const mdMatch = content.match(mdImageRegex);
        if (mdMatch) imageUrl = mdMatch[1];
      }
      // 如果没找到图片，返回 null
      if (!imageUrl) return null;
      if (imageUrl.startsWith('./')) {
        // 将其替换为GitHub 仓库的 Raw 原文件绝对地址
        const githubRawBaseUrl = 'https://raw.githubusercontent.com/Pengyu-gis/markdown_repo/main';
        return imageUrl.replace('./', githubRawBaseUrl + '/');
      }
      if (imageUrl.includes('.r2.dev')) {
        return `https://wsrv.nl/?url=${encodeURIComponent(imageUrl)}`;
      }
      return imageUrl;
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
      }
      return 'Untitled';
    },
    goToDetail(file) {
      const encodedUrl = encodeURIComponent(file.url);
      this.$router.push(`/gistory/detail?url=${encodedUrl}`);
    },
    getIssueLabel(filename) {
      const num = parseInt(filename.match(/\d+/)?.[0] || 0, 10);
      return `Issue ${String(num).padStart(2, '0')}`;
    },
    getIssueNumber(filename) {
      const num = parseInt(filename.match(/\d+/)?.[0] || 0, 10);
      return String(num).padStart(2, '0');
    },
    getCleanTitle(title) {
      return title.replace(/^GIStory\s+Issue\s+\d+\s*\|\s*/i, '').trim();
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,500;0,600;0,700&display=swap');

/* ================================
   Design Tokens
================================ */
.gistory-page {
  --ink: #1a1a1a;
  --ink-soft: #4a4a4a;
  --ink-muted: #8a8a8a;
  --paper: #ffffff;        /* Changed to pure white */
  --paper-warm: #f9f9f9;   /* Adjusted to match the white background better */
  --rule: #eaeaea;         /* Adjusted border/rule color for white background */
  --accent: #c0392b;       /* editorial red */
  --accent-deep: #8e2a20;
  --highlight: #d4a72c;    /* mustard accent */

  /* Changed primary fonts to Montserrat */
  --serif: 'Montserrat', system-ui, sans-serif;
  --sans:  'Montserrat', system-ui, sans-serif;
  --mono:  'JetBrains Mono', 'Courier New', monospace;

  background: var(--paper);
  color: var(--ink);
  min-height: 100vh;
  font-family: var(--sans);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Subtle paper texture */
.gistory-page::before {
  content: '';
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  background-image:
    radial-gradient(circle at 20% 30%, rgba(192, 57, 43, 0.03) 0%, transparent 40%),
    radial-gradient(circle at 80% 70%, rgba(212, 167, 44, 0.03) 0%, transparent 40%);
}

/* ================================
   Header
================================ */
.page-header {
  position: relative;
  padding: 80px 24px 56px;
  text-align: center;
  border-bottom: 1px solid var(--rule);
  background:
    linear-gradient(180deg, var(--paper-warm) 0%, var(--paper) 100%);
}

.header-inner {
  max-width: 680px; /* Made window slightly smaller (was 720px) */
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.header-eyebrow {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  margin-bottom: 28px;
}

.eyebrow-line {
  width: 40px;
  height: 1px;
  background: var(--ink-muted);
}

.eyebrow-text {
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--ink-soft);
}

.page-title {
  font-family: var(--serif);
  font-size: clamp(64px, 9vw, 112px);
  font-weight: 700; /* Increased weight for Montserrat */
  line-height: 0.95;
  letter-spacing: -0.02em;
  margin: 0 0 24px;
  color: var(--ink);
}

.title-script {
  font-style: italic;
  color: var(--accent);
  font-weight: 400;
}

.title-main {
  font-weight: 700; /* Increased weight for Montserrat */
}

.page-subtitle {
  font-family: var(--serif);
  font-size: clamp(16px, 2vw, 20px); /* Slightly reduced size for Montserrat */
  font-style: normal; /* Removed italic since Montserrat handles normal better for subtitles */
  font-weight: 400;
  line-height: 1.6;
  color: var(--ink-soft);
  max-width: 540px;
  margin: 0 auto 36px;
}

.header-meta {
  display: inline-flex;
  align-items: center;
  gap: 18px;
  font-family: var(--mono);
  font-size: 12px;
  letter-spacing: 0.05em;
  color: var(--ink-soft);
  padding: 10px 24px;
  border: 1px solid var(--rule);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(8px);
}

.meta-item {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.meta-item strong {
  color: var(--ink);
  font-weight: 600;
}

.meta-divider {
  color: var(--ink-muted);
  opacity: 0.5;
}

/* ================================
   Loading
================================ */
.loading-state {
  text-align: center;
  padding: 120px 24px;
  color: var(--ink-muted);
  font-family: var(--mono);
  font-size: 13px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.loading-pulse {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--accent);
  margin: 0 auto 16px;
  animation: pulse 1.4s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(0.8); opacity: 0.6; }
  50%      { transform: scale(1);   opacity: 1;   }
}

/* ================================
   Content layout
================================ */
.content {
  max-width: 1080px; /* Made window slightly smaller (was 1200px) */
  margin: 0 auto;
  padding: 64px 24px 96px;
  position: relative;
  z-index: 1;
}

/* ================================
   Featured Article
================================ */
.featured {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 48px;
  align-items: center;
  padding: 32px;
  margin-bottom: 80px;
  background: #fff;
  border: 1px solid var(--rule);
  border-radius: 4px;
  cursor: pointer;
  transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1),
              box-shadow 0.4s ease;
  position: relative;
  overflow: hidden;
}

.featured::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: var(--accent);
  transform: scaleY(0);
  transform-origin: top;
  transition: transform 0.4s ease;
}

.featured:hover {
  transform: translateY(-4px);
  box-shadow: 0 24px 48px -16px rgba(26, 26, 26, 0.15);
}

.featured:hover::before {
  transform: scaleY(1);
}

.featured-image-wrap {
  position: relative;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  border-radius: 2px;
  background: var(--paper-warm);
}

.featured-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
  filter: saturate(0.95);
}

.featured:hover .featured-image {
  transform: scale(1.04);
}

.featured-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--serif);
  font-weight: 500;
  font-size: 32px;
  color: var(--ink-muted);
  background: var(--paper-warm);
}

.featured-badge {
  position: absolute;
  top: 16px;
  left: 16px;
  padding: 6px 12px;
  background: var(--accent);
  color: #fff;
  font-family: var(--mono);
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  border-radius: 2px;
}

.featured-content {
  padding: 16px 16px 16px 0;
}

.featured-issue {
  display: inline-block;
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 16px;
}

.featured-title {
  font-family: var(--serif);
  font-size: clamp(24px, 3vw, 36px);
  font-weight: 600;
  line-height: 1.25;
  letter-spacing: -0.01em;
  color: var(--ink);
  margin: 0 0 20px;
}

.featured-excerpt {
  font-family: var(--serif);
  font-size: 16px;
  line-height: 1.6;
  color: var(--ink-soft);
  margin: 0 0 28px;
  max-width: 440px;
}

.featured-cta {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-family: var(--sans);
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--ink);
  padding-bottom: 4px;
  border-bottom: 1px solid var(--ink);
  transition: gap 0.3s ease, color 0.3s ease;
}

.featured:hover .featured-cta {
  gap: 18px;
  color: var(--accent);
  border-bottom-color: var(--accent);
}

/* ================================
   Section Divider
================================ */
.section-divider {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 48px;
}

.section-divider::before,
.section-divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--rule);
}

.divider-label {
  font-family: var(--mono);
  font-size: 12px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--ink-soft);
}

/* ================================
   Article Grid
================================ */
.article-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px 32px;
}

.article-card {
  background: transparent;
  cursor: pointer;
  position: relative;
  opacity: 0;
  animation: fadeInUp 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}

.card-image-wrap {
  position: relative;
  aspect-ratio: 4 / 5;
  overflow: hidden;
  background: var(--paper-warm);
  border-radius: 2px;
  margin-bottom: 20px;
}

.card-image-wrap::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    transparent 50%,
    rgba(26, 26, 26, 0.4) 100%
  );
  opacity: 0;
  transition: opacity 0.4s ease;
}

.article-card:hover .card-image-wrap::after {
  opacity: 1;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(0.15) saturate(0.95);
  transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1),
              filter 0.4s ease;
}

.article-card:hover .card-image {
  transform: scale(1.05);
  filter: grayscale(0) saturate(1.05);
}

.card-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--serif);
  font-weight: 500;
  font-size: 24px;
  color: var(--ink-muted);
}

.card-issue-tag {
  position: absolute;
  top: 12px;
  left: 12px;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
  border-radius: 50%;
  font-family: var(--mono);
  font-size: 12px;
  font-weight: 700;
  color: var(--ink);
  z-index: 2;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.card-body {
  padding: 0 4px;
}

.card-issue {
  display: block;
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 10px;
  font-weight: 600;
}

.card-title {
  font-family: var(--serif);
  font-size: 20px;
  font-weight: 600;
  line-height: 1.4;
  letter-spacing: -0.005em;
  color: var(--ink);
  margin: 0 0 16px;
  transition: color 0.3s ease;

  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.article-card:hover .card-title {
  color: var(--accent);
}

.card-arrow {
  display: inline-flex;
  align-items: center;
  color: var(--ink-muted);
  transition: transform 0.3s ease, color 0.3s ease;
}

.article-card:hover .card-arrow {
  transform: translateX(4px);
  color: var(--accent);
}

/* ================================
   Responsive
================================ */
@media (max-width: 960px) {
  .featured {
    grid-template-columns: 1fr;
    gap: 24px;
    padding: 20px;
  }
  .featured-content {
    padding: 8px 4px 16px;
  }
  .article-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 32px 20px;
  }
  .page-header {
    padding: 56px 20px 40px;
  }
  .content {
    padding: 40px 20px 64px;
  }
}

@media (max-width: 560px) {
  .article-grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }
  .header-meta {
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px 14px;
  }
  .featured {
    margin-bottom: 56px;
  }
}
</style>
