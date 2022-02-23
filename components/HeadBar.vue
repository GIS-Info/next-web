<template>
  <div class="container">
    GIS 留学指南
    <!--
    这里是标题栏
    todo: 增加返回首页和前往管理页面的按钮
    -->
    <div class="shortcuts">
      <el-button>
        主页
      </el-button>
      <el-button>
        管理
      </el-button>
    </div>
  </div>
</template>
<style scoped>
.container {
  height: 100px;
  line-height: 100px;
  font-size: 40px;
  background-color: rgb(58, 112, 94);
  color: #ffffff;
  text-align: center;
  width: 100%;
  overflow: hidden;
}
.shortcuts{
  position: absolute;
  right: 20px;
  top: 0px;
  bottom: 0px;
  line-height: 100px;
}
</style>