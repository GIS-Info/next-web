<template>
  <div class="head-wrapper">
    <div class="container">
      <div class="title-div" @click="goPage('/mobile')">
        <img class="logo" src="./logo.png" />
        <span class="title-text">GISphere</span>
      </div>
      <div class="links-div">
        <div class="link" @click="toggleLanguage">
          {{ lang == 'zh' ? 'EN' : '中文' }}
        </div>
        <div class="link menu-btn" @click="menuOpen = !menuOpen">
          <i :class="menuOpen ? 'el-icon-close' : 'el-icon-menu'"></i>
        </div>
      </div>
    </div>
    <transition name="slide">
      <nav v-if="menuOpen" class="menu">
        <div
          v-for="item in menuItems"
          :key="item.path"
          class="menu-item"
          @click="goPage(item.path, item.query)"
        >
          {{ lang == 'zh' ? item.zh : item.en }}
        </div>
      </nav>
    </transition>
    <div v-if="menuOpen" class="mask" @click="menuOpen = false"></div>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'

export default {
  data() {
    return {
      menuOpen: false,
      menuItems: [
        { zh: '首页', en: 'Home', path: '/mobile' },
        { zh: '招生资讯', en: 'Academic Recruiting', path: '/mobile/postList', query: { type: 'academic' } },
        { zh: '院校指南', en: 'Institutions', path: '/mobile/school' },
        { zh: 'GIScience 访谈', en: 'GIStory Interviews', path: '/mobile/gistory' },
        { zh: '白皮书', en: 'White Book', path: '/mobile/white-book' },
        { zh: '信息更新', en: 'Update Info', path: '/mobile/suggestion' },
        { zh: '反馈', en: 'Feedback', path: '/mobile/feedback' },
        { zh: '关于我们', en: 'About', path: '/mobile/aboutUs' },
      ],
    }
  },
  computed: {
    ...mapState({ lang: 'language' }),
  },
  mounted() {
    const query = JSON.parse(JSON.stringify(this.$route.query))
    if (query?.lang && query?.lang !== this.lang) {
      this.setGlobalLanguage(query?.lang)
    }
  },
  methods: {
    ...mapMutations(['setLanguage']),
    goPage(path, query) {
      this.menuOpen = false
      if (this.$route.path === path) return
      this.$router.push({ path, query })
    },
    toggleLanguage() {
      this.setGlobalLanguage(this.lang === 'zh' ? 'en' : 'zh')
    },
    setGlobalLanguage(lang) {
      const query = JSON.parse(JSON.stringify(this.$route.query))
      query.lang = lang
      this.$router.replace({ path: this.$route.path, query })
      this.setLanguage(lang)
    },
  },
}
</script>
<style scoped>
.head-wrapper {
  position: relative;
}
.container {
  height: 16vw;
  background: #dcdfe6;
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  padding: 4vw 6vw;
  box-sizing: border-box;
  position: relative;
  z-index: 220;
}
.title-div {
  background: #dcdfe6;
  width: 20vw;
  height: 8vw;
  display: flex;
  flex-direction: row;
  justify-content: left;
  cursor: pointer;
}
.logo {
  display: block;
  width: 8vw;
  height: 8vw;
}
.title-text {
  margin-left: 3vw;
  line-height: 8vw;
  font-style: normal;
  font-weight: 400;
  font-size: 5vw;
  color: #303133;
}
.links-div {
  height: 8vw;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  flex-grow: 1;
}
.link {
  font-style: normal;
  font-weight: 400;
  font-size: 5vw;
  line-height: 8vw;
  height: 8vw;
  color: #303133;
  margin-left: 6vw;
  cursor: pointer;
}
.link:hover {
  color: #0073ff;
  transition: 200ms ease-in-out;
}
.menu-btn i {
  font-size: 6vw;
  line-height: 8vw;
}
.menu {
  position: absolute;
  top: 16vw;
  left: 0;
  right: 0;
  background: #ffffff;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
  z-index: 210;
}
.menu-item {
  padding: 4vw 6vw;
  font-size: 4.2vw;
  color: #303133;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
}
.menu-item:last-child {
  border-bottom: none;
}
.menu-item:active {
  background: #f5f7fa;
  color: #0073ff;
}
.mask {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 200;
}
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.2s ease, opacity 0.2s ease;
}
.slide-enter,
.slide-leave-to {
  transform: translateY(-8px);
  opacity: 0;
}
</style>
