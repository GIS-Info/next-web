<template>
  <div class="container">
    <div class="title-div" @click="goHomePage">
      <img class="logo" src="./logo.svg" />
      <span class="title-text">GISphere</span>
    </div>
    <!-- 中文情况下的链接 -->
    <div v-if="lang == 'zh'" class="links-div">
      <div class="link" @click="goHomePage">关于我们</div>
      <div class="link" @click="goManagePage">管理员登录</div>
      <div class="link" @click="setLanguage('en')">English</div>
    </div>
    <!-- 英文情况下的链接 -->
    <div v-if="lang == 'en'" class="links-div">
      <div class="link" @click="goHomePage">About</div>
      <div class="link" @click="goManagePage">Login (Admin Only)</div>
      <div class="link" @click="setLanguage('zh')">切换中文</div>
    </div>
  </div>
</template>
<script>
import {mapState, mapMutations} from 'vuex';
export default {
  computed: {
    ...mapState({lang: 'language'}),
  },
  methods: {
    ...mapMutations([  
        'setLanguage',
    ]),
    goHomePage(){
      this.$router.push('/')
    },
    goManagePage(){
      this.$router.push('/manage/dashboard')
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
  font-family: 'Inter';
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
  justify-content: right;
  flex-grow: 1;
  overflow: hidden;
}
.link{
  font-family: 'Inter';
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