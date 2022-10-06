<template>
  <div class="default-container">
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
    /* 全局字体，参考 elementUI */
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
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