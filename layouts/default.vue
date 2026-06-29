<template>
  <div class="default-container">
    <head-bar class="default-head"/>
    <div class="default-main">
      <nuxt />
    </div>
  </div>
</template>
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