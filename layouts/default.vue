<template>
  <div class="container">
    <head-bar class="head"/>
    <nuxt class="main" />
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
  }
  .head{
    flex-grow: 1;
  }
</style>