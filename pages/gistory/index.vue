<template>
  <div class="gistory-detail-page">
    <!-- Back navigation -->
    <nav class="detail-nav">
      <button class="back-btn" @click="goBack">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M10 3L5 8l5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span>Back to GIStory</span>
      </button>
    </nav>

    <!-- Loading state -->
    <div v-if="loading" class="loading-state">
      <div class="loading-pulse"></div>
      <p>Loading interview…</p>
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="error-state">
      <div class="error-icon">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="20" stroke="var(--accent)" stroke-width="1.5"/>
          <path d="M16 16l16 16M32 16L16 32" stroke="var(--accent)" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
      </div>
      <h2>Failed to load article</h2>
      <p>{{ error }}</p>
      <button class="retry-btn" @click="loadArticle">Retry</button>
    </div>

    <!-- Article content -->
    <article v-else class="article-container">
      <!-- Header info -->
      <header class="article-header">
        <span class="article-issue">{{ issueLabel }}</span>
        <h1 class="article-title">{{ cleanTitle }}</h1>
        <div class="article-meta">
          <span class="meta-date">{{ publishDate }}</span>
        </div>
      </header>

      <!-- Featured image -->
      <div v-if="featuredImage" class="article-hero-image">
        <img
          :src="featuredImage"
          :alt="cleanTitle"
          @error="handleImageError"
        />
      </div>

      <!-- Markdown content -->
      <div class="article-body markdown-body" v-html="renderedContent"></div>
    </article>
  </div>
</template>

<script>
import MarkdownIt from 'markdown-it';

export default {
  name: 'GistoryDetail',
  data() {
    return {
      loading: true,
      error: null,
      rawMarkdown: '',
      articleUrl: '',
      featuredImage: null,
    };
  },
  computed: {
    issueLabel() {
      const filename = this.getFilenameFromUrl();
      const num = parseInt(filename.match(/\d+/)?.[0] || 0, 10);
      return `Issue ${String(num).padStart(2, '0')}`;
    },
    cleanTitle() {
      const title = this.extractTitle(this.rawMarkdown);
      return title.replace(/^GIStory\s+Issue\s+\d+\s*\|\s*/i, '').trim();
    },
    publishDate() {
      const filename = this.getFilenameFromUrl();
      const match = filename.match(/\d+/);
      if (match) {
        const issueNum = parseInt(match[0], 10);
        // 假设 Issue 1 是 2024年1月，每月一期
        const baseYear = 2024;
        const baseMonth = 0; // January
        const monthOffset = issueNum - 1;
        const date = new Date(baseYear, baseMonth + monthOffset, 1);
        return date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
        });
      }
      return '';
    },
    renderedContent() {
      if (!this.rawMarkdown) return '';

      // 先清洗 markdown 中的图片路径
      const cleanedMarkdown = this.formatMarkdownImages(this.rawMarkdown);

      // 使用 markdown-it 渲染
      const md = new MarkdownIt({
        html: true,
        linkify: true,
        typographer: true,
      });

      return md.render(cleanedMarkdown);
    },
  },
  mounted() {
    this.loadArticle();
  },
  methods: {
    // ═══════════════════════════════════════
    // 核心：图片路径清洗方法
    // ═══════════════════════════════════════
    formatMarkdownImages(rawContent) {
      const githubRawBaseUrl = 'https://raw.githubusercontent.com/Pengyu-gis/markdown_repo/main';

      // 1. 替换 Markdown 格式的图片: ![alt](./images/1.png) 或 ![alt](https://...r2.dev/1.png)
      let processedContent = rawContent.replace(
        /!\[([^\]]*)\]\(([^)]+)\)/g,
        (match, alt, url) => {
          let newUrl = url.trim();

          if (newUrl.startsWith('./')) {
            // 替换相对路径：./images/xxx.png → https://raw.githubusercontent.com/.../images/xxx.png
            newUrl = newUrl.replace('./', githubRawBaseUrl + '/');
          } else if (newUrl.includes('.r2.dev')) {
            // 替换 R2 测试域名（使用 wsrv.nl 代理洗白证书）
            newUrl = `https://wsrv.nl/?url=${encodeURIComponent(newUrl)}`;
          }

          return `![${alt}](${newUrl})`;
        }
      );

      // 2. 替换 HTML 格式的图片: <img src="./images/1.png">
      processedContent = processedContent.replace(
        /<img([^>]+)src="([^"]+)"([^>]*)>/gi,
        (match, before, url, after) => {
          let newUrl = url.trim();

          if (newUrl.startsWith('./')) {
            // 替换相对路径
            newUrl = newUrl.replace('./', githubRawBaseUrl + '/');
          } else if (newUrl.includes('.r2.dev')) {
            // 替换 R2 测试域名
            newUrl = `https://wsrv.nl/?url=${encodeURIComponent(newUrl)}`;
          }

          return `<img${before}src="${newUrl}"${after}>`;
        }
      );

      return processedContent;
    },

    // ═══════════════════════════════════════
    // 加载文章
    // ═══════════════════════════════════════
    async loadArticle() {
      this.loading = true;
      this.error = null;

      try {
        // 从 URL query 参数获取文章地址
        const urlParam = this.$route.query.url;
        if (!urlParam) {
          throw new Error('No article URL provided');
        }

        this.articleUrl = decodeURIComponent(urlParam);

        // 获取 markdown 内容
        const res = await this.$axios.get(this.articleUrl);
        this.rawMarkdown = res.data;

        // 提取首图用于 hero 展示
        this.featuredImage = this.extractFirstImage(this.rawMarkdown);

      } catch (err) {
        console.error('加载文章失败:', err);
        this.error = err.message || 'Failed to load article content';
      } finally {
        this.loading = false;
      }
    },

    // ═══════════════════════════════════════
    // 辅助方法
    // ═══════════════════════════════════════
    getFilenameFromUrl() {
      if (!this.articleUrl) return '';
      return this.articleUrl.split('/').pop() || '';
    },

    extractTitle(content) {
      const lines = content.split('\n');
      const titleLine = lines.find(
        line => line.startsWith('title:') || line.startsWith('# ')
      );
      if (titleLine?.startsWith('title:')) {
        return titleLine.replace('title:', '').trim();
      } else if (titleLine?.startsWith('# ')) {
        return titleLine.replace('# ', '').trim();
      }
      return 'Untitled';
    },

    extractFirstImage(content) {
      const imageRegex = /<img[^>]+src="([^">]+)"/i;
      const mdImageRegex = /!\[.*?\]\((.*?)\)/;

      let imageUrl = null;
      const htmlMatch = content.match(imageRegex);
      if (htmlMatch) {
        imageUrl = htmlMatch[1];
      } else {
        const mdMatch = content.match(mdImageRegex);
        if (mdMatch) imageUrl = mdMatch[1];
      }

      if (!imageUrl) return null;

      // 同样对提取到的首图做路径处理
      const githubRawBaseUrl = 'https://raw.githubusercontent.com/Pengyu-gis/markdown_repo/main';

      if (imageUrl.startsWith('./')) {
        imageUrl = imageUrl.replace('./', githubRawBaseUrl + '/');
      } else if (imageUrl.includes('.r2.dev')) {
        imageUrl = `https://wsrv.nl/?url=${encodeURIComponent(imageUrl)}`;
      }

      return imageUrl;
    },

    handleImageError(e) {
      // 图片加载失败时的处理
      console.warn('Image failed to load:', e.target.src);
      e.target.style.display = 'none';
    },

    goBack() {
      this.$router.push('/gistory');
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,500;0,600;0,700&display=swap');

/* ═══════════════════════════════════════
   Design Tokens
   ═══════════════════════════════════════ */
.gistory-detail-page {
  --ink: #1a1a1a;
  --ink-soft: #4a4a4a;
  --ink-muted: #8a8a8a;
  --paper: #ffffff;
  --paper-warm: #f9f9f9;
  --rule: #eaeaea;
  --accent: #c0392b;
  --accent-deep: #8e2a20;

  --serif: 'Montserrat', system-ui, sans-serif;
  --sans: 'Montserrat', system-ui, sans-serif;
  --mono: 'JetBrains Mono', 'Courier New', monospace;

  background: var(--paper);
  color: var(--ink);
  min-height: 100vh;
  font-family: var(--sans);
  -webkit-font-smoothing: antialiased;
}

/* ═══════════════════════════════════════
   Navigation
   ═══════════════════════════════════════ */
.detail-nav {
  max-width: 780px;
  margin: 0 auto;
  padding: 32px 24px 0;
}

.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: var(--mono);
  font-size: 12px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--ink-soft);
  background: none;
  border: 1px solid var(--rule);
  border-radius: 999px;
  padding: 10px 20px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.back-btn:hover {
  color: var(--accent);
  border-color: var(--accent);
  transform: translateX(-2px);
}

/* ═══════════════════════════════════════
   Loading & Error States
   ═══════════════════════════════════════ */
.loading-state,
.error-state {
  text-align: center;
  padding: 120px 24px;
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
  50% { transform: scale(1); opacity: 1; }
}

.error-state h2 {
  font-family: var(--serif);
  font-size: 24px;
  font-weight: 600;
  margin: 16px 0 8px;
}

.error-state p {
  color: var(--ink-muted);
  margin-bottom: 24px;
}

.retry-btn {
  font-family: var(--mono);
  font-size: 12px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #fff;
  background: var(--accent);
  border: none;
  border-radius: 4px;
  padding: 12px 28px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.retry-btn:hover {
  background: var(--accent-deep);
}

/* ═══════════════════════════════════════
   Article Container
   ═══════════════════════════════════════ */
.article-container {
  max-width: 780px;
  margin: 0 auto;
  padding: 48px 24px 96px;
}

/* ═══════════════════════════════════════
   Article Header
   ═══════════════════════════════════════ */
.article-header {
  text-align: center;
  margin-bottom: 48px;
  padding-bottom: 40px;
  border-bottom: 1px solid var(--rule);
}

.article-issue {
  display: inline-block;
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 20px;
}

.article-title {
  font-family: var(--serif);
  font-size: clamp(28px, 4vw, 48px);
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.02em;
  margin: 0 0 20px;
  color: var(--ink);
}

.article-meta {
  font-family: var(--mono);
  font-size: 12px;
  color: var(--ink-muted);
  letter-spacing: 0.05em;
}

/* ═══════════════════════════════════════
   Hero Image
   ═══════════════════════════════════════ */
.article-hero-image {
  margin-bottom: 48px;
  border-radius: 4px;
  overflow: hidden;
  background: var(--paper-warm);
}

.article-hero-image img {
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
}

/* ═══════════════════════════════════════
   Markdown Body Styles
   ═══════════════════════════════════════ */
.markdown-body {
  font-family: var(--serif);
  font-size: 17px;
  line-height: 1.8;
  color: var(--ink-soft);
}

.markdown-body :deep(h1),
.markdown-body :deep(h2),
.markdown-body :deep(h3),
.markdown-body :deep(h4) {
  font-family: var(--serif);
  font-weight: 600;
  color: var(--ink);
  margin-top: 48px;
  margin-bottom: 20px;
  line-height: 1.3;
}

.markdown-body :deep(h1) {
  font-size: 32px;
  letter-spacing: -0.02em;
}

.markdown-body :deep(h2) {
  font-size: 26px;
  letter-spacing: -0.01em;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--rule);
}

.markdown-body :deep(h3) {
  font-size: 22px;
}

.markdown-body :deep(p) {
  margin-bottom: 20px;
}

.markdown-body :deep(a) {
  color: var(--accent);
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: border-color 0.3s ease;
}

.markdown-body :deep(a:hover) {
  border-bottom-color: var(--accent);
}

/* 图片样式 */
.markdown-body :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 4px;
  margin: 32px 0;
  display: block;
}

.markdown-body :deep(figure) {
  margin: 32px 0;
}

.markdown-body :deep(figcaption) {
  font-family: var(--mono);
  font-size: 12px;
  color: var(--ink-muted);
  text-align: center;
  margin-top: 12px;
}

/* 引用块 */
.markdown-body :deep(blockquote) {
  margin: 32px 0;
  padding: 20px 24px;
  border-left: 4px solid var(--accent);
  background: var(--paper-warm);
  font-style: italic;
  color: var(--ink-soft);
}

.markdown-body :deep(blockquote p) {
  margin: 0;
}

/* 代码 */
.markdown-body :deep(code) {
  font-family: var(--mono);
  font-size: 14px;
  background: var(--paper-warm);
  padding: 2px 6px;
  border-radius: 3px;
  color: var(--accent-deep);
}

.markdown-body :deep(pre) {
  background: #1a1a1a;
  color: #f0f0f0;
  padding: 24px;
  border-radius: 4px;
  overflow-x: auto;
  margin: 32px 0;
}

.markdown-body :deep(pre code) {
  background: none;
  color: inherit;
  padding: 0;
  font-size: 14px;
  line-height: 1.6;
}

/* 列表 */
.markdown-body :deep(ul),
.markdown-body :deep(ol) {
  margin: 20px 0;
  padding-left: 28px;
}

.markdown-body :deep(li) {
  margin-bottom: 8px;
}

/* 表格 */
.markdown-body :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 32px 0;
  font-size: 15px;
}

.markdown-body :deep(th),
.markdown-body :deep(td) {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid var(--rule);
}

.markdown-body :deep(th) {
  font-weight: 600;
  color: var(--ink);
  font-family: var(--sans);
  font-size: 12px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  background: var(--paper-warm);
}

.markdown-body :deep(hr) {
  border: none;
  height: 1px;
  background: var(--rule);
  margin: 48px 0;
}

/* ═══════════════════════════════════════
   Responsive
   ═══════════════════════════════════════ */
@media (max-width: 640px) {
  .article-container {
    padding: 32px 20px 64px;
  }

  .markdown-body {
    font-size: 16px;
    line-height: 1.75;
  }

  .markdown-body :deep(h1) {
    font-size: 26px;
  }

  .markdown-body :deep(h2) {
    font-size: 22px;
  }

  .detail-nav {
    padding: 24px 20px 0;
  }
}
</style>
