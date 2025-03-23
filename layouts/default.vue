<template>
  <div class="default-container">
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-8CZVFCBGBQ"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-8CZVFCBGBQ');
    </script>
    <head-bar class="default-head"/>
    <div class="default-main">
      <nuxt />
    </div>
  </div>
</template>
<script>
import {isMobile} from '@/utils/index';
export default {
  mounted() {
    //  如果是移动端，则跳转到移动端视图
    if(isMobile()){
      this.$router.push('/mobile'+this.$route.path);
    }
  }
}
</script>
<style scoped>
  .default-container{
    font-size: 16px;
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    position: fixed;
    /* 全局字体，使用 Montserrat */
    font-family: 'Montserrat', sans-serif;
  }
  .default-main{
    flex-grow: 1;
    flex-shrink: 1;
    overflow: auto;
  }
  .default-head{
    flex-grow: 0;
    flex-shrink: 0;
  }
</style>