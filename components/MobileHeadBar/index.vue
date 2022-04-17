<template>
  <div class="container">
    <div class="title-div" @click="goHomePage">
      <img class="logo" src="./logo.svg" />
      <span class="title-text">GISphere</span>
    </div>
    <!-- 中文情况下的链接 -->
    <div v-if="lang == 'zh'" class="links-div">
      <div class="link" @click="goAboutUs">关于我们</div>
      <div class="link" @click="setLanguage('en')">English</div>
    </div>
    <!-- 英文情况下的链接 -->
    <div v-if="lang == 'en'" class="links-div">
      <div class="link" @click="goHomePage">About</div>
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
      this.$router.push('/mobile/')
    },
    goAboutUs(){
      this.$router.push('/mobile/aboutUs')
    }
  }
}
</script>
<style scoped>
.container {
  height: 16vw;
  background: #DCDFE6;
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  padding: 4vw 6vw;
  box-sizing: border-box;
}
.title-div{
  background: #DCDFE6;
  width:20vw;
  height:8vw;
  display:flex;
  flex-direction:row;
  justify-content: left;
  cursor: pointer;
}
.logo{
  display:block;
  width:8vw;
  height:8vw;
}
.title-text{
  margin-left:3vw;
  line-height:8vw;
  font-style: normal;
  font-weight: 400;
  font-size: 5vw;
  color: #303133;
}
.links-div{
  height:8vw;
  width: 8vw;
  display:flex;
  flex-direction: row;
  justify-content: flex-end;
  flex-grow: 1;
  overflow: hidden;
}
.link{
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
  color: #0073FF;
  transition: 200ms ease-in-out;
}
</style>
