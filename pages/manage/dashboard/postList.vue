<template>
  <div class="main-container">
    <div class="manipulate-wrap">
      <div class="icon-wraps">
        <el-button type="primary" @click="goAddPost">新增帖子</el-button>
        <span style="margin-left: 20px;color: #787878;">新增帖子后默认处于未上架状态，需要在内容管理中拨为上架状态</span>
      </div>
    </div>
    <!-- 帖子内容行 -->
    <el-table class="table" :data="showTableData" border>
      <el-table-column prop="event_id" label="编号" />
      <el-table-column prop="title_cn" label="中文标题" />
      <el-table-column prop="title_en" label="英文标题" />
      <el-table-column prop="university_cn" label="院校中文名称" />
      <el-table-column prop="date" label="更新日期" />
      <el-table-column prop="is_public" label="上架状态" />
      <el-table-column
        fixed="right"
        label="操作">
        <template slot-scope="scope">
          <el-button v-if="scope.row.is_public === '已上架'" type="text" @click="viewPost(scope.row)">查看</el-button>
          <el-button @click="editPost(scope.row)" type="text">编辑</el-button>
          <el-button v-if="scope.row.is_public === '未上架'" @click="changePostPublicStatus(scope.row, true)" type="text">上架</el-button>
          <el-button v-if="scope.row.is_public === '已上架'" @click="changePostPublicStatus(scope.row, false)" type="text">下架</el-button>
          <el-button type="text" @click="deleteItem(scope.row) ">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="page">
      <el-pagination
        layout="prev, pager, next"
        :page-size="pageSize"
        :page-index="pageIndex"
        :total="total"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
    <edit-post ref="editPostDialog" @reloadTable="getListData(pageSize, pageIndex)" />
  </div>
</template>

<script>
import editPost from './components/editPost.vue'
export default {
  name: 'IndexPage',
  components: {
    editPost
  },
  data() {
    return {
      data: {
        all: 130,
        posted: 125,
        unposted: 5,
      },

      contentlist: [],
      pageSize: 8,
      pageIndex: 1,
      total: 100,
      selectedTab: 'all',
      queryValue: '',
    }
  },
  computed: {
    showTableData() {
      return this.contentlist.map((l) => {
        const u = {...l}
        u.is_public = l.is_public === 1 ? "已上架" : "未上架"
        return u;
      })
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.getListData(this.pageSize, this.pageIndex);
    },
    goAddPost() {
      window.open(`https://gisphere.info/addPost`);
    },
    viewPost(row) {
      window.open(`https://gisphere.info/post/${row.event_id}`);
    },
    editPost(item) {
      this.$refs.editPostDialog.open(item);
    },
    /**
     * 更换当前页
     * @param {number} val 页数
     */
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.getListData(this.pageSize, this.pageIndex);
    },
    /**
     * 获取帖子列表
     * @param {number} pageSize
     * @param {number} pageIndex
     */
    async getListData(pageSize, pageIndex) {
      const url = 'api/manage/post?pageSize=' + pageSize + '&&pageIndex=' + pageIndex;
      await this.$axios
        .$get(url)
        .then((res) => {
          this.contentlist = res.data;
          this.total = res.count;
        })
        .catch((e) => {
          alert(e)
        })
    },
    deleteItem(item) {
      this.$confirm('此操作将永久删除该帖子, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          console.log('item :>> ', item);
          const url = 'api/manage/post/' + item.event_id
          this.$axios
            .delete(url)
            .then((res) => {
              if (res.data?.msg === 'success') {
                this.$router.push('/manage/dashboard/');
                this.$message({
                  type: 'success',
                  message: '删除成功!',
                })
                this.getListData(this.pageSize, this.pageIndex);
              } else {
                alert(res.msg)
              }
            })
            .catch((error) => {
              console.log('error', error)
              alert(error)
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
    changePostPublicStatus(row, newStatus) { 
      const payload = {
        is_public: newStatus? 1:0,
        event_id: row.event_id,
      }
      const url = 'api/manage/post/status'
      this.$axios
        .post(url, payload)
        .then((res) => {
          if (res.data?.msg === 'success') {
            this.$router.push('/manage/dashboard/');
            this.$message({
              type: 'success',
              message: '修改成功!',
            })
            this.getListData(this.pageSize, this.pageIndex);
          } else {
            alert(res.msg)
          }
        })
        .catch((error) => {
          console.log('error', error)
          alert(error)
        })
    }
  },
}
</script>

<style lang="less" scoped>
.main-container {
  width: 100%;
  height: 100%;
  text-align: center;
  padding: 40px;
  background-color: #EBEEF5;;
  box-sizing: border-box;
  position: relative;
  overflow: auto;
  z-index: 2;
  .table{
    width: 100%;
  }
  .page {
    text-align: left;
    margin-top: 15px;
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
  .manipulate-wrap {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 28px;
    .icon-wraps {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
  }
}
</style>