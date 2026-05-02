<template>
  <div class="detail-page">
    <!-- Loading -->
    <div v-if="loading" class="loading-state">
      <div class="loading-pulse"></div>
      <p>Loading story…</p>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="error-state">
      <p class="error-title">Failed to load this interview</p>
      <p class="error-message">{{ error }}</p>
      <button class="back-button" @click="goBack">← Back to all interviews</button>
    </div>

    <!-- Article -->
    <article v-else class="article">
      <!-- Top nav: back link -->
      <div class="article-topbar">
        <button class="back-link" @click="goBack" aria-label="Back to list">
          <svg width="16" height="8" viewBox="0 0 16 8" fill="none">
            <path d="M16 4H2M5 1L2 4l3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>All interviews</span>
        </button>
      </div>

      <!-- Header -->
      <header class="article-header">
        <div class="header-eyebrow">
          <span class="eyebrow-line"></span>
          <span class="eyebrow-text">{{ issueLabel }} · GIStory</span>
          <span class="eyebrow-line"></span>
        </div>
        <h1 class="article-title">{{ cleanTitle }}</h1>
      </header>

      <!-- Body — rendered markdown -->
      <div class="article-body markdown-body" v-html="renderedContent"></div>

      <!-- Footer -->
      <footer class="article-footer">
        <div class="footer-divider">
          <span>End of interview</span>
        </div>
        <button class="back-button" @click="goBack">← Back to all interviews</button>
      </footer>
    </article>
  </div>
</template>

<script>
import { marked } from 'marked';

export default {
  data() {
    return {
      loading: true,
      error: null,
      rawContent: '',
      fileName: '',
    };
  },
  computed: {
    /** Render the cleaned markdown to HTML */
    renderedContent() {
      if (!this.rawContent) return '';
      const cleaned = this.formatMarkdownImages(this.rawContent);
      return marked.parse(cleaned, { breaks: true, gfm: true });
    },
    /** "9.md" -> "Issue 09" */
    issueLabel() {
      const num = parseInt(this.fileName.match(/\d+/)?.[0] || 0, 10);
      return num ? `Issue ${String(num).padStart(2, '0')}` : 'Issue';
    },
    /** Strip "title:" / leading "# " / "GIStory Issue N | " prefix */
    cleanTitle() {
      const lines = this.rawContent.split('\n');
      const titleLine = lines.find(
        line => line.startsWith('title:') || line.startsWith('# ')
      );
      let title = 'Untitled';
      if (titleLine?.startsWith('title:')) {
        title = titleLine.replace('title:', '').trim();
      } else if (titleLine?.startsWith('# ')) {
        title = titleLine.replace('#', '').trim();
      }
      return title.replace(/^GIStory\s+Issue\s+\d+\s*\|\s*/i, '').trim();
    },
  },
  async mounted() {
    const url = this.$route.query.url;
    if (!url) {
      this.error = 'No article URL provided.';
      this.loading = false;
      return;
    }

    try {
      const decodedUrl = decodeURIComponent(url);
      // Extract filename from the download_url (e.g. ".../main/9.md")
      this.fileName = decodedUrl.split('/').pop() || '';

      const res = await this.$axios.get(decodedUrl);
      this.rawContent = typeof res.data === 'string'
        ? res.data
        : JSON.stringify(res.data);

      // Strip the front-matter title line + first H1 from body, since we render
      // the title separately in the article header.
      this.rawContent = this.stripFrontTitle(this.rawContent);
    } catch (err) {
      console.error('加载文章失败:', err);
      this.error = '无法加载这篇文章，请稍后再试。';
    } finally {
      this.loading = false;
    }
  },
  methods: {
    /**
     * Rewrite image URLs inside a raw markdown string so that:
     *   - Relative paths (`./images/x.png`) → absolute GitHub raw URLs
     *   - R2 dev domains (`*.r2.dev/...`)  → proxied through wsrv.nl
     * Handles BOTH markdown image syntax `![alt](url)` and HTML `<img src="url">`.
     */
    formatMarkdownImages(rawContent) {
      const githubRawBaseUrl =
        'https://raw.githubusercontent.com/Pengyu-gis/markdown_repo/main';

      const rewriteUrl = (url) => {
        if (!url) return url;
        const trimmed = url.trim();
        if (trimmed.startsWith('./')) {
          // ./images/1.png  →  https://raw.githubusercontent.com/.../main/images/1.png
          return githubRawBaseUrl + '/' + trimmed.slice(2);
        }
        if (trimmed.includes('.r2.dev')) {
          // Route R2 dev URLs through wsrv.nl proxy to bypass cert/CORS issues
          return `https://wsrv.nl/?url=${encodeURIComponent(trimmed)}`;
        }
        return trimmed;
      };

      // 1) Markdown images: ![alt](url)
      let out = rawContent.replace(
        /!\[([^\]]*)\]\(([^)]+)\)/g,
        (_match, alt, url) => `![${alt}](${rewriteUrl(url)})`
      );

      // 2) HTML images: <img ... src="url" ...>
      out = out.replace(
        /<img([^>]*?)src="([^"]+)"([^>]*)>/gi,
        (_match, before, url, after) =>
          `<img${before}src="${rewriteUrl(url)}"${after}>`
      );

      return out;
    },
    /**
     * Remove the leading title line (`title: ...` or `# ...`) from the
     * markdown body since the page renders the title separately.
     */
    stripFrontTitle(content) {
      const lines = content.split('\n');
      let removed = false;
      const filtered = lines.filter((line) => {
        if (removed) return true;
        if (line.startsWith('title:') || line.startsWith('# ')) {
          removed = true;
          return false;
        }
        return true;
      });
      return filtered.join('\n').trimStart();
    },
    goBack() {
      // Prefer router back, fall back to list route
      if (window.history.length > 1) {
        this.$router.back();
      } else {
        this.$router.push('/gistory');
      }
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,500;0,600;0,700&display=swap');

/* ================================
   Design Tokens (matched to list page)
================================ */
.detail-page {
  --ink: #1a1a1a;
  --ink-soft: #4a4a4a;
  --ink-muted: #8a8a8a;
  --paper: #ffffff;
  --paper-warm: #f9f9f9;
  --rule: #eaeaea;
  --accent: #c0392b;
  --accent-deep: #8e2a20;
  --highlight: #d4a72c;

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

/* Subtle ambient tint, same as list page */
.detail-page::before {
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
   Loading & error
================================ */
.loading-state,
.error-state {
  text-align: center;
  padding: 140px 24px;
  color: var(--ink-muted);
  font-family: var(--mono);
  font-size: 13px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  position: relative;
  z-index: 1;
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

.error-state {
  text-transform: none;
  letter-spacing: 0;
  font-family: var(--sans);
  font-size: 15px;
}

.error-title {
  font-family: var(--serif);
  font-size: 22px;
  font-weight: 600;
  color: var(--ink);
  margin: 0 0 12px;
}

.error-message {
  margin: 0 0 28px;
  color: var(--ink-soft);
}

/* ================================
   Article layout
================================ */
.article {
  max-width: 760px;
  margin: 0 auto;
  padding: 40px 24px 96px;
  position: relative;
  z-index: 1;
}

.article-topbar {
  margin-bottom: 32px;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: none;
  border: none;
  cursor: pointer;
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--ink-soft);
  padding: 6px 0;
  transition: color 0.25s ease, gap 0.25s ease;
}

.back-link:hover {
  color: var(--accent);
  gap: 14px;
}

/* ================================
   Article header
================================ */
.article-header {
  text-align: center;
  padding: 32px 0 56px;
  border-bottom: 1px solid var(--rule);
  margin-bottom: 56px;
}

.header-eyebrow {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  margin-bottom: 28px;
}

.eyebrow-line {
  width: 32px;
  height: 1px;
  background: var(--ink-muted);
}

.eyebrow-text {
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--accent);
  font-weight: 600;
}

.article-title {
  font-family: var(--serif);
  font-size: clamp(28px, 4vw, 44px);
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.015em;
  color: var(--ink);
  margin: 0;
  max-width: 640px;
  margin: 0 auto;
}

/* ================================
   Article body — markdown rendered content
   (these can't be scoped to deep selectors easily,
    so we use a wrapper class)
================================ */
.article-body {
  font-family: var(--sans);
  font-size: 17px;
  line-height: 1.8;
  color: var(--ink);
}

/* Use ::v-deep / :deep() to style the v-html'd content */
.article-body ::v-deep(p),
.article-body :deep(p) {
  margin: 0 0 24px;
  color: var(--ink-soft);
  font-weight: 400;
}

.article-body :deep(h1),
.article-body :deep(h2),
.article-body :deep(h3),
.article-body :deep(h4) {
  font-family: var(--serif);
  color: var(--ink);
  font-weight: 700;
  letter-spacing: -0.01em;
  line-height: 1.3;
  margin: 56px 0 20px;
}

.article-body :deep(h2) {
  font-size: 26px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--rule);
}

.article-body :deep(h3) {
  font-size: 21px;
}

.article-body :deep(h4) {
  font-size: 17px;
  font-family: var(--mono);
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--accent);
}

.article-body :deep(a) {
  color: var(--accent);
  text-decoration: none;
  border-bottom: 1px solid rgba(192, 57, 43, 0.3);
  transition: border-color 0.2s ease;
}

.article-body :deep(a:hover) {
  border-bottom-color: var(--accent);
}

.article-body :deep(strong) {
  color: var(--ink);
  font-weight: 700;
}

.article-body :deep(em) {
  font-style: italic;
}

.article-body :deep(blockquote) {
  margin: 32px 0;
  padding: 4px 0 4px 24px;
  border-left: 3px solid var(--accent);
  font-family: var(--serif);
  font-size: 19px;
  font-weight: 500;
  font-style: italic;
  line-height: 1.6;
  color: var(--ink);
}

.article-body :deep(blockquote p) {
  margin: 0 0 12px;
  color: inherit;
}

.article-body :deep(blockquote p:last-child) {
  margin-bottom: 0;
}

.article-body :deep(ul),
.article-body :deep(ol) {
  margin: 0 0 24px;
  padding-left: 28px;
  color: var(--ink-soft);
}

.article-body :deep(li) {
  margin-bottom: 8px;
}

.article-body :deep(li::marker) {
  color: var(--accent);
}

.article-body :deep(hr) {
  border: none;
  border-top: 1px solid var(--rule);
  margin: 48px 0;
}

.article-body :deep(code) {
  font-family: var(--mono);
  font-size: 0.9em;
  background: var(--paper-warm);
  padding: 2px 6px;
  border-radius: 3px;
  color: var(--accent-deep);
}

.article-body :deep(pre) {
  background: var(--paper-warm);
  border: 1px solid var(--rule);
  border-radius: 4px;
  padding: 18px 20px;
  overflow-x: auto;
  margin: 0 0 24px;
}

.article-body :deep(pre code) {
  background: none;
  padding: 0;
  color: var(--ink);
  font-size: 14px;
}

.article-body :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 0 0 32px;
  font-size: 15px;
}

.article-body :deep(th),
.article-body :deep(td) {
  text-align: left;
  padding: 12px 14px;
  border-bottom: 1px solid var(--rule);
}

.article-body :deep(th) {
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--ink-soft);
  font-weight: 600;
  background: var(--paper-warm);
}

/* Images — the main reason this page exists 🙂 */
.article-body :deep(img) {
  display: block;
  max-width: 100%;
  height: auto;
  margin: 36px auto;
  border-radius: 4px;
  background: var(--paper-warm);
  box-shadow: 0 12px 32px -16px rgba(26, 26, 26, 0.15);
}

/* ================================
   Footer
================================ */
.article-footer {
  margin-top: 80px;
  padding-top: 40px;
  text-align: center;
}

.footer-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-bottom: 32px;
  color: var(--ink-muted);
}

.footer-divider::before,
.footer-divider::after {
  content: '';
  flex: 0 0 48px;
  height: 1px;
  background: var(--rule);
}

.footer-divider span {
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.back-button {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: none;
  border: 1px solid var(--ink);
  cursor: pointer;
  font-family: var(--sans);
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--ink);
  padding: 12px 24px;
  border-radius: 2px;
  transition: all 0.3s ease;
}

.back-button:hover {
  background: var(--ink);
  color: var(--paper);
}

/* ================================
   Responsive
================================ */
@media (max-width: 720px) {
  .article {
    padding: 24px 20px 64px;
  }

  .article-header {
    padding: 16px 0 40px;
    margin-bottom: 40px;
  }

  .article-body {
    font-size: 16px;
    line-height: 1.75;
  }

  .article-body :deep(h2) {
    font-size: 22px;
    margin: 40px 0 16px;
  }

  .article-body :deep(h3) {
    font-size: 19px;
    margin: 36px 0 14px;
  }

  .article-body :deep(blockquote) {
    font-size: 17px;
    padding-left: 20px;
  }

  .article-body :deep(img) {
    margin: 24px auto;
  }
}
</style>
