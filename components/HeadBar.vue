<template>
  <div class="container">
    <el-button
      type="primary"
      icon="el-icon-s-home"
      class="button-left"
      round
      @click="goHomePage">
      主页
    </el-button>
    <span>GIS 留学指南</span>
    <el-button
      type="primary"
      icon="el-icon-edit"
      class="button-right"
      round
      @click="goManagePage">
      管理员
    </el-button>
  </div>
</template>
<script>
export default {
  methods: {
    goHomePage(){
      this.$router.push('/')
    },
    goManagePage(){
      this.$router.push('/manage/dashboard')
    }
  }
}
</script>>
<style scoped>
.container {
  height: 100px;
  line-height: 100px;
  font-size: 40px;
  background-color: rgb(58, 112, 94);
  color: #ffffff;
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
}
.button-left{
  background-color: rgba(0, 0, 0, 0);
  margin: 30px;
}
.button-right{
  background-color: rgba(0, 0, 0, 0);
  margin: 30px;
}
</style>