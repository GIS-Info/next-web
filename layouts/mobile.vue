<template>
  <div class="container">
    <mobile-head-bar class="head"/>
    <div class="main">
      <nuxt />
    </div>
  </div>
</template>
<script>
import {isMobile} from '@/utils/index';
export default {
  mounted() {
    //  如果不是移动端，则跳转到PC端视图
    if(!isMobile()){
      this.$router.push('/'+this.$router.currentRoute.path.split('/').shift().join('/'))
    }
  }
}
</script>
<style scoped>
  .container{
    font-size: 16px;
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  }
  .main{
    flex-grow: 1;
    position: relative;
    overflow: scroll;
  }
  .head{
    flex-grow: 0;
  }
</style>