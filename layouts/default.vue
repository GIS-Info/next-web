<template>
  <div class="container">
    <head-bar class="head"/>
    <div class="main">
      <nuxt />
    </div>
  </div>
</template>
<style scoped>
  .container{
    font-size: 16px;
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    /* 全局字体，参考 elementUI */
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