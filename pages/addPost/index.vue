<template>
  <div class="container">
    <div class="main">
      <div class="section">

      </div>
      <div class="section">

      </div>
    </div>
    <div class="bottom-bar"></div>
  </div>
</template>

<script>
export default {
  name: 'AddPost',
  data() {
    return {
      form: {
        title: '',
        content: ''
      }
    }
  },
}
</script>

<style lang="less" scoped>
.container{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .main{
    height: 200px;
    flex-grow: 1;
    flex-shrink: 1;
    display: flex;
    flex-direction: row;
    overflow-y: scroll;
    flex-wrap: wrap;
    justify-content:center;
    align-items: flex-start;
    .section{
      width: 800px;
      margin: 20px;
      height: 1600px;
      background-color: bisque;
    }
  }
  .bottom-bar{
    width: 100%;
    height: 120px;
    flex-grow: 0;
    flex-shrink: 0;
    background-color: #DCDFE6;

  }
}
</style>