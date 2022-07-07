<template>
  <div class="main-container">
    <!-- <b>todo: 这里是审核、编辑、删除帖子的页面</b> -->
    <!-- 搜索行 -->
    <div class="search-wrap">
      <el-autocomplete
        v-model="queryValue"
        :fetch-suggestions="querySearchAsync"
        placeholder=""
        prefix-icon="el-icon-search"
        @select="handleSelect"
      ></el-autocomplete>
      <el-button class="search-btn">搜索</el-button>
    </div>
    <!-- 对帖子进行操作行 -->
    <div class="manipulate-wrap">
      <div class="tab-wrap">
        <span :class="['tab', selectedTab=='all'?'tab-selected': '']" @click="changeTab('all')" >全部{{data.all}}</span>
        <span :class="['tab', selectedTab=='posted'?'tab-selected': '']" @click="changeTab('posted')">已发布{{data.posted}}</span>
        <span :class="['tab', selectedTab=='unposted'?'tab-selected': '']" @click="changeTab('unposted')">未发布{{data.unposted}}</span>
      </div>
      <div class="icon-wraps">
        <span class="icon more" @click="selectItem"></span>
        <span class="icon add"></span>
        <span class="icon delete"></span>
      </div>
    </div>
    <!-- 帖子内容行 -->
    <div class="content">
      <ul class="content-list">
        <li 
        v-for="item in contentlist"
        :key="item.content"
        class="board"
        > 
          <!-- 左侧bander -->
          <div class="left-label">
            <span class="label-background"></span>
            <span class="text-label">招生</span>
          </div>
          <!-- 职位详情 -->
          <div class="detail">
            <div>
              <div class="position">地理信息科学研究助理</div>
              <div>
                <span class="bold-text">发布时间</span>
                <span class="normal-text">03 Feb 2022</span>
              </div>
              <div>
                <span class="bold-text">截止日期</span>
                <span class="normal-text">03 Mar 2022</span>
              </div>
              <div>
                <span class="bold-text">院校名称</span>
                <span class="normal-text">新加坡国立大学</span>
              </div>
            </div>
          </div>
          <!-- 右侧bander -->
          <div class="right-label"> 
            <div class="background-green">
            </div>
            <div class="check"></div>
          </div>
        </li>
      </ul>
       <!-- 分页 -->
       <div class="page">
        <el-pagination
          layout="prev, pager, next"
          :page-size="20"
          :pager-count="7"
          :total="400">
        </el-pagination>
       </div>
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
       contentlist: [
         {
           title: '招聘',
           content: '1111'
         },
         {
           title: '招生',
           content: '2222'
         },
         {
           title: '招聘',
           content: '3333'
         },
         {
           title: '招生',
           content: '4444'
         },
        // {
        //    title: '招生',
        //    content: '2222'
        //  },

       ],
       selectedTab: 'all',
       queryValue: ''
    }
  },
  methods: {
    // 选择， 支持多选
    selectItem() {
      
    },
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
  padding: 40px;
  background-color: #EBEEF5;;
  display: flex;
  flex-direction: column!important;
  // justify-content: left!important;
  text-align: left!important;
  box-sizing: border-box;
  position: relative;
  z-index: 2;

  .search-wrap {
    margin-bottom: 28px;

   /deep/.el-input {
      width: 619px;
   }
   /deep/ .el-input__inner {
     border-radius: 15px;
     
   }
   .search-btn {
     margin-left: 15px;
     border-radius: 15px;
   }

  }
  .content {
    height: calc(100% - 160px);
    // background-color: pink;
    // 分页
    .page {
      width: 1102px;
      text-align: center;
      margin-top: 15px;
      // /deep/ .btn-prev, .el-pager, .btn-next{
      //   background-color: #EBEEF5;
      // }
      /deep/ .number {
          background-color: #EBEEF5;
      }
      /deep/ .btn-prev {
          background-color: #EBEEF5;
      }
      /deep/ .btn-next {
          background-color: #EBEEF5;
      }
      /deep/ .el-icon-more {
          background-color: #EBEEF5;
      }
    }
    .content-list {
      height: calc(100% - 40px);
      padding-left: 0px!important;
      margin: 0px;
      overflow-y: scroll;  
      .board {
        // position: relative;
        display: flex;
        justify-content: row;
        width: 100%;
        height: 107px;
        background-color: #fff;
        list-style: none;
        margin-bottom: 5px;
        border-radius: 20px;
        .left-label {
          width: 10%;
          height: 100%;
          position: relative;
          // background-color: pink;
          .text-label {
              position: absolute;
              left: 10px;
              top: 20px;       
              transform: rotate(-45deg);
              color: #909399;
          }
          .label-background {
            position: absolute;
            left: 0px;
            top: 0px;
            display: inline-block;
            width: 100px;
            height: 100%;
            background: url('./imgs/label.png') no-repeat;
            background-size: 80%;
          }
        }
        .detail {
          width: 70%;
          height: 100%;
          // line-height: 107px;
          // background-color: green;
          display: flex;
          justify-content: column;
          align-items: center;
          .position {
            font-size: 18px;
            font-weight: 700
          }
          .bold-text {
            font-size: 13px;
            font-weight: 700
          }
          .normal-text {
            font-size: 13px;

          }
        }
        .right-label {
          width: 19%;
          height: 100%;
          position: relative;
          // background-color: blue;    
          .background-green {
            position: absolute;
            top: 0px;
            right: 20px;
            width: 43px;
            height: 61px;
            background: url(./imgs/green-label.png) no-repeat;
            background-size: 100%
          }
          .check {
            position: absolute;
            top: 7px;
            right: 26px;
            width: 31px;
            height: 31px;
            z-index: 1;
            background: url(./imgs/check-label.png) no-repeat;
            background-size: 100%;
          }
        }
 
      }
    }
  }
  .manipulate-wrap {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 28px;
    // background-color: yellow;
    .tab-wrap {
      display: inline-block;
      // background-color: green;
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
        color: #6A81A5;
        &:hover {
          cursor: pointer;
        }
      }
      .tab-selected {
        background-color: #DCDFE6;
        color: #0C2041
      }
    }
    .icon-wraps {
        display: flex;
        flex-direction: row;
        // background-color: blue;
        align-items: center;

        .icon {
          display: inline-block;
          width: 25px;
          height: 25px;
          // background-color: pink;
          margin-right: 10px;
          
          &:hover {
            cursor: pointer;
            // background-color: pink;
          }
        }
        .more {
            background: url('./imgs/more.png') no-repeat center;
            background-size: 90%;
            // transition: 0.5s;
            &:hover {
              background: url('./imgs/more-color.png') no-repeat center;
              background-size: 90%;
              cursor: pointer;
            }
        }
        .add {
          background: url("./imgs/add.png") no-repeat;
          background-size: 90%;
          &:hover {
            background: url('./imgs/add-color.png') no-repeat center;
            background-size: 90%;
            cursor: pointer;
          }
        }
        .delete {
          background: url("./imgs/delete.png") no-repeat;
          background-size: 90%;
          &:hover {
            background: url('./imgs/delete-color.png') no-repeat center;
            background-size: 90%;
            cursor: pointer;
          }
        }

    }
  }


}
</style>