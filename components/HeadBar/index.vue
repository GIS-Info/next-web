<template>
  <div class="container">
    <div class="title-div" @click="goPageByRouteName('')">
      <img class="logo" src="./logo.png" />
      <span class="title-text">GISphere</span>
    </div>
    <!-- 中文情况下的链接 -->
    <div v-if="lang == 'zh'" class="links-div">
      <div class="link" @click="goPageByRouteName('aboutUs')">关于我们</div>
      <div class="link" @click="goPageByRouteName('suggestion')">填写建议</div>
      <div class="link" @click="setGlobalLanguage('en')">English</div>
      <div class="link" @click="goPageByRouteName('manage/dashboard')">管理员登录</div>
    </div>
    <!-- 英文情况下的链接 -->
    <div v-if="lang == 'en'" class="links-div">
      <div class="link" @click="goPageByRouteName('aboutUs')">About</div>
      <div class="link" @click="goPageByRouteName('suggestion')">SuggestEdit</div>
      <div class="link" @click="setGlobalLanguage('zh')">Chinese</div>
      <div class="link" @click="goPageByRouteName('manage/dashboard')">Login (Admin Only)</div>
    </div>
  </div>
</template>
<script>
import {mapState, mapMutations} from 'vuex';
export default {
  computed: {
    ...mapState({lang: 'language'}),
  },
  mounted() {
    const query=JSON.parse(JSON.stringify(this.$route.query))
    if(query?.lang && query?.lang !== this.lang){
      this.setGlobalLanguage(query?.lang)
    }
  },
  methods: {
    ...mapMutations([  
        'setLanguage',
    ]),
    goPageByRouteName(name){
      this.$router.push(`/${name}`)
    },
    setGlobalLanguage(lang) {
      const query=JSON.parse(JSON.stringify(this.$route.query))
      query.lang=lang
      this.$router.replace({ path: this.$route.path, query })
      this.setLanguage(lang);
    }
  }
}
</script>
<style scoped>
.container {
  height: 88px;
  background: #DCDFE6;
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  padding: 24px 80px;
  box-sizing: border-box;
}
.title-div{
  background: #DCDFE6;
  width:198px;
  height:40px;
  display:flex;
  flex-direction:row;
  justify-content: left;
  cursor: pointer;
}
.logo{
  display:block;
  width:40px;
  height:40px;
}
.title-text{
  margin-left:12px;
  line-height:40px;
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  color: #303133;
}
.links-div{
  height:40px;
  width: 40px;
  display:flex;
  flex-direction: row;
  justify-content: flex-end;
  flex-grow: 1;
  overflow: hidden;
}
.link{
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 40px;
  height: 40px;
  color: #303133;
  margin-left: 36px;
  cursor: pointer;
}
/* .link:active {
  color: #0073FF;
} */
.link:hover {
  color: #0073FF;
  transition: 200ms ease-in-out;
}
</style>


