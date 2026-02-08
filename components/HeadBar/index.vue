<template>
  <div class="header-container">
    <div class="brand-section" @click="goPageByRouteName('')">
      <img class="logo" src="./logo.png" alt="GISphere Logo" />
      <span class="title-text">GISphere</span>
    </div>

    <nav class="nav-links">
      <div 
        v-for="(item, index) in currentMenuItems" 
        :key="index" 
        class="nav-item" 
        @click="handleNavClick(item)"
      >
        {{ item.label }}
      </div>
    </nav>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  computed: {
    ...mapState({ lang: 'language' }),
    // Generate menu items dynamically based on language
    currentMenuItems() {
      const isZh = this.lang === 'zh';
      return [
        { label: isZh ? '关于我们' : 'About', action: 'route', value: 'aboutUs' },
        { label: isZh ? '填写建议' : 'Suggest Edit', action: 'route', value: 'suggestion' },
        // Language Switcher
        { label: isZh ? 'English' : '中文', action: 'lang', value: isZh ? 'en' : 'zh' },
        // Admin Login (Simplified text)
        { label: isZh ? '管理员' : 'Admin', action: 'route', value: 'manage/dashboard' },
      ];
    }
  },
  mounted() {
    const query = this.$route.query;
    if (query?.lang && query?.lang !== this.lang) {
      this.setGlobalLanguage(query.lang);
    }
  },
  methods: {
    ...mapMutations(['setLanguage']),
    
    // Unified handler for clicks
    handleNavClick(item) {
      if (item.action === 'route') {
        this.goPageByRouteName(item.value);
      } else if (item.action === 'lang') {
        this.setGlobalLanguage(item.value);
      }
    },
    goPageByRouteName(name) {
      // Avoid redundant navigation error
      if (this.$route.name !== name) { 
         this.$router.push(`/${name}`).catch(err => {}); 
      }
    },
    setGlobalLanguage(lang) {
      const query = { ...this.$route.query, lang };
      this.$router.replace({ path: this.$route.path, query });
      this.setLanguage(lang);
    }
  }
}
</script>

<style scoped>
.header-container {
  height: 64px; /* Reduced from 88px for a sleeker look */
  background: #DCDFE6; /* White background */
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center; /* Vertically center everything */
  padding: 0 40px; /* Reduced side padding */
  box-sizing: border-box;
  /* Adds a subtle shadow for separation */
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);
  position: relative;
  z-index: 100;
}

.brand-section {
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
}

.logo {
  width: 32px; /* Slightly smaller to match new height */
  height: 32px;
  display: block;
}

.title-text {
  margin-left: 12px;
  font-weight: 600; /* Made slightly bolder */
  font-size: 20px;
  color: #303133;
  letter-spacing: 0.5px;
}

.nav-links {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.nav-item {
  font-weight: 500;
  font-size: 15px;
  color: #606266; /* Softer gray for text */
  margin-left: 32px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.nav-item:hover {
  color: #0073FF;
}

/* Optional: Add a small active indicator on hover */
.nav-item::after {
  content: '';
  position: absolute;
  bottom: -6px;
  left: 0;
  width: 0%;
  height: 2px;
  background-color: #0073FF;
  transition: width 0.3s ease;
}

.nav-item:hover::after {
  width: 100%;
}
</style>

