<template>
  <div class="container">
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-8CZVFCBGBQ"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-8CZVFCBGBQ');
    </script>
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
      const pathArr = this.$route.path.split('/');
      this.$router.push('/'+pathArr.slice(2, pathArr.length).join('/'))
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
    flex-shrink: 1;
  }
  .head{
    flex-grow: 0;
    flex-shrink: 0;
  }
</style>