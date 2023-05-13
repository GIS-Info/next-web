<template>
  <div>
    <div class="list">
      <div
        v-for="post in postListData"
        :key="post.event_id"
        @click="goPost(post.event_id)"
      >
        <el-card class="card">
          <div slot="header">
            {{ (lang == 'zh' ? post.title_cn : post.title_en) || '-' }}
          </div>
          <p class="one-line">{{ post.description || '-' }}</p>
          <span>{{
            (lang == 'zh' ? post.country_cn : post.country_en) || '-'
          }}</span>
          <span
            >发布于 <b>{{ post.date || '未知时间' }}</b></span
          >
        </el-card>
      </div>

      <el-pagination
        background
        layout="prev, pager, next"
        :current-page="pageIndex"
        :total="totalCount"
        :page-size="pageSize"
        @current-change="handlePageChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  layout: 'mobile',
  data() {
    return {
      postListData: [],
      pageIndex: 1,
      searchText: '',
      pageSize: 3,
      totalCount: 0,
      filter: {
        queryType: '', // 从url带入的查询类型 ['academic', 'business', '']
      },
    }
  },
  computed: {
    ...mapState({ lang: 'language' }),
  },
  mounted() {
    // 从url带入的查询类型
    this.filter.queryType = this.$route.query?.type
    this.getPostListData()
  },
  methods: {
    goPost(id) {
      this.$router.push('/mobile/post/' + id.toString())
    },
    goAddPost() {
      this.$router.push('/addPost')
    },
    getPostListData() {
      this.$axios
        .get('/api/post', {
          params: {
            pageSize: this.pageSize,
            pageIndex: this.pageIndex,
          },
        })
        .then((res) => {
          if (res?.data?.code === 0) {
            // 把后端传回的data存到此文件的postdata中
            this.postListData = res.data.data
            this.totalCount = res.data.count
          } else {
            alert('请求错误: ' + res.msg)
          }

          this.postListData = res.data.data.map((i) => {
            const l = { ...i }
            l.description = i.description
              .replace(/(<([^>]+)>)/g, '')
              .replace(/\\n/g, '')
            return l
          })
        })
        .catch((error) => {
          alert(error)
        })
    },
    handlePageChange(i) {
      this.pageIndex = i
      this.getPostListData()
    },
    error(err) {
      alert(err)
    },
  },
}
</script>

<style scoped>
.card {
  margin: 10px;
}
.one-line {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
