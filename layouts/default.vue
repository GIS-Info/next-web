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
  }
  .main{
    flex-grow: 1;
    position: relative;
  }
  .head{
    flex-grow: 0;
  }
</style>