<template>
  <div class="main-container">
    <!-- <b>todo: 这里是审核、编辑、删除帖子的页面</b> -->
    <div class="search-wrap">
      <el-autocomplete
        v-model="queryValue"
        :fetch-suggestions="querySearchAsync"
        placeholder="search"
        @select="handleSelect"
      ></el-autocomplete>
      <!-- <i class="el-icon-edit"></i> -->
    </div>
    <div class="tab-wrap">
      <span :class="['tab', selectedTab=='all'?'tab-selected': '']" @click="changeTab('all')" >全部{{data.all}}</span>
      <span :class="['tab', selectedTab=='posted'?'tab-selected': '']" @click="changeTab('posted')">已发布{{data.posted}}</span>
      <span :class="['tab', selectedTab=='unposted'?'tab-selected': '']" @click="changeTab('unposted')">未发布{{data.unposted}}</span>
    </div>
    <div class="content">

    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return {
       data: {
         all: 130,
         posted: 125,
         unposted: 5
       },
       selectedTab: 'all',
       queryValue: ''
    }
  },
  methods: {
    // 切换tab
    changeTab(value) {
      console.log(8888, value);
      this.selectedTab = value
    },
    // 查询
    querySearchAsync() {

    },
    // 模糊搜索选中触发
    handleSelect() {

    }

  }
}
</script>

<style lang="less" scoped>
.main-container {
  width: 100%;
  height: 100%;
  text-align: center;
  padding: 40px 0 0 40px;
  background-color: #EBEEF5;;
  display: flex;
  flex-direction: column!important;
  // justify-content: left!important;
  text-align: left!important;

  .search-wrap {
    margin-bottom: 40px;
    .el-input {
      width: 618px!important;
    }
  }
  .tab-wrap {
    .tab {
      display: inline-block;
      width: 167px;
      height: 56px;
      box-sizing: border-box;
      background-color: #EBEEF5;
      border: 2px solid white;
      border-radius: 30px;
      margin-right: 30px;
      text-align: center;
      line-height: 56px;
      // 颜色、水平阴影位置、垂直阴影位置、模糊距离、阴影大
      //  #f44336 -2px -2px 0 1px, 
      box-shadow: rgb(161, 161, 161) 0px 2px 5px 1px;
      &:hover {
        cursor: pointer;
      }
    }
    .tab-selected {
      background-color: #DCDFE6;
    }
  }

}
</style>