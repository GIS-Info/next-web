<template>
  <!-- 此页面不做服务端渲染 -->
  <client-only>
    <el-main v-loading="loading" class="main">
      <div class="list">
        <div
          v-for="post in postListData"
          :key="post.event_id"
          class="entry"
          @click="goPost(post.event_id)"
        >
          <div class="entry-title">
            {{ (lang == 'zh' ? post.title_cn : post.title_en) || '-' }}
          </div>
          <div class="entry-content-brief">{{ post?.description || '-' }}</div>
          <div class="entry-bottom-flex">
            <span>{{
              (lang == 'zh' ? post.country_cn : post.country_en) || '-'
            }}</span>
            <!-- 改写上面这行代码为：如果是中文的时候就是 ‘发布于’，如果是英文的时候就是 ‘Published on’ -->
            <span
              >{{ lang == 'zh' ? '发布于' : 'Published on' }}
              <b>{{ post.date || '未知时间' }}</b></span
            >
          </div>
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

      <!-- 中文filter -->
      <div class="filter">
        <div class="filter-title">
          {{lang == 'zh' ? "按内容搜索" : "Search By Content"}}
          <hr />
        </div>
        <div>
          <input
            v-model="searchText"
            type="text"
            class="search"
            @keyup.enter="queryBySearchtext()"
          />
          <button class="button-search" @click="queryBySearchtext()">
            <svg
              class="icon-search"
              viewBox="0 -3 20 20"
              xmlns="http://www.w3.org/2000/svg"
              height="19"
              width="19"
            >
              <path
                fill-rule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <div class="filter-title">
          {{lang == 'zh' ? "按截止时间搜索" : "Search by Deadline" }}
          <hr />
        </div>

        <select v-model="selected" class="filter-year" @change="handleYearChange">
          <option
            v-for="(option, index) in options"
            :key="index"
            :value="option.value"
          >
            {{ option.text }}
          </option>
        </select>
        <table v-if="lang == 'zh'" class="by-month">
          <tr>
            <td v-for="month1 in months1" :key="month1">
              <button class="button-month" @click="queryByDate(month1)">
                {{ month1 }}月
              </button>
            </td>
          </tr>
          <tr>
            <td v-for="month2 in months2" :key="month2">
              <button class="button-month" @click="queryByDate(month2)">
                {{ month2 }}月
              </button>
            </td>
          </tr>
        </table>
        <table v-else class="by-month">
          <tr>
            <td v-for="i in 6" :key="i - 1">
              <button class="button-month" @click="queryByDate(i)">
                {{ months[i - 1] }}
              </button>
            </td>
          </tr>
          <tr>
            <td v-for="i in 6" :key="i + 5">
              <button class="button-month" @click="queryByDate(i + 6)">
                {{ months[i + 5] }}
              </button>
            </td>
          </tr>
        </table>
        <div class="filter-title">
          {{lang == 'zh' ? "按专业领域搜索" : "Search by Field" }}
          <hr />
        </div>
        <div class="by-field">
          <button class="button-field" @click="filterByLabel('gis')">{{lang == 'zh' ? '地理信息科学' : 'GIScience'}}</button>
          <button class="button-field" @click="filterByLabel('rs')">{{lang == 'zh' ? '遥感' : 'Remote Sensing'}}</button>
          <button class="button-field" @click="filterByLabel('physical_geo')">{{lang == 'zh' ? '自然地理学' : 'Physical Geography'}}</button>
          <button class="button-field" @click="filterByLabel('human_geo')">{{lang == 'zh' ? '人文地理学' : 'Human Geography'}}</button>
          <button class="button-field" @click="filterByLabel('urban')">{{lang == 'zh' ? '城市规划' : 'Urban Planing'}}</button>
          <button class="button-field" @click="filterByLabel('rs')">{{lang == 'zh' ? '卫星导航' : 'GNSS'}}</button>
        </div>
      </div>
    </el-main>
  </client-only>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'PostList',
  data() {
    return {
      postListData: [],
      pageIndex: 1,
      searchText: '',
      pageSize: 7,
      totalCount: 0,
      filter: {
        queryType: '', // 从url带入的查询类型 ['academic', 'business', '']
      },
      loading: true,
      selected: '2023',
      months1: ['1', '2', '3', '4', '5', '6'], // 上半年
      months2: ['7', '8', '9', '10', '11', '12'], // 下半年
      months: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ], // 英文界面
      date: '',
      month: '',
      options: [
        { text: '2023', value: '2023' }, // 中文版选项
        { text: '2022', value: '2022' }, // 中文版选项
      ],
    }
  },
  head() {
    return {
      title: 'GISphere | 资讯',
    }
  },
  computed: {
    ...mapState({ lang: 'language' }),
  },
  async mounted() {
    // 从url带入的查询类型
    this.filter.queryType = this.$route.query?.type
    // 加载列表数据
    await this.getPostListData()
  },
  methods: {
    queryBySearchtext() {
      if (this.month !== '') this.pageIndex = 1 // 如果从月份搜索直接跳转到内容搜索，页面也应该重置为1
      this.$axios
        .post('api/post_querystring', {
          queryString: this.searchText,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
        })
        .then((res) => {
          if (res?.data?.code === 0) {
            // 前端做一个提醒以防后端没有数据
            if (!res.data.data || res.data.data.length === 0) {
              this.$message({
                message: '没有相关信息',
                type: 'error',
                duration: 1000,
              })
            }
            // 把后端传回的data存到此文件的postdata中，将description字段从html转字符串
            this.postListData = res.data.data.map((i) => {
              const l = { ...i }
              l.description = i.description
                .replace(/(<([^>]+)>)/g, '')
                .replace(/\\n/g, '')
              return l
            })
            this.totalCount = res.data.count
          } else {
            alert('请求错误: ' + res.msg)
          }
        })
        .catch((error) => {
          alert(error)
        })
    },
    queryByDate(e) {
      if (e !== this.month) this.pageIndex = 1 // 如果在原来的月份基础上跳转到另一个月，那么页数应该从1开始
      const dateParam = this.selected + '-' + (e < 10 ? '0' + e : e);
      this.date = dateParam;
      this.month = e
      this.$axios
        .get('api/post_closedate', {
          params: {
            year: this.selected, // 选择的年份
            month: e, // 选择的月份
            pageSize: this.pageSize,
            pageIndex: this.pageIndex,
          },
        })
        .then((res) => {
          if (res?.data?.code === 0) {
            if (!res.data.data || res.data.data.length === 0) {
              this.$message({
                message: 'without related information',
                type: 'error',
                duration: 1000,
              })
            }
            // 把后端传回的data存到此文件的postdata中，将description字段从html转字符串
            this.postListData = res.data.data.map((i) => {
              const l = { ...i }
              l.description = i.description
                .replace(/(<([^>]+)>)/g, '')
                .replace(/\\n/g, '')
              return l
            })
            this.totalCount = res.data.count
          } else {
            alert('request error: ' + res.msg)
          }
        })
        .catch((error) => {
          alert(error)
        })
    },
    goPost(id) {
      this.$router.push('/post/' + id.toString())
    },
    goAddPost() {
      this.$router.push('/addPost')
    },
    getPostListData() {
      this.loading = true
      return this.$axios
        .get('/api/post', {
          params: {
            pageSize: this.pageSize,
            pageIndex: this.pageIndex,
            // date:this.date//把按日期搜索合并在这里方便翻页的时候请求数据
          },
        })
        .then((res) => {
          if (res?.data?.code === 0) {
            // 把后端传回的data存到此文件的postdata中，将description字段从html转字符串
            this.postListData = res.data.data.map((i) => {
              const l = { ...i }
              l.description = i.description
                .replace(/(<([^>]+)>)/g, '')
                .replace(/\\n/g, '')
              return l
            })
            this.totalCount = res.data.count
          } else {
            alert('请求错误: ' + res.msg)
          }
          this.loading = false
        })
        .catch((error) => {
          alert(error)
          this.loading = false
        })
    },
    handlePageChange(i) {
      this.pageIndex = i
      if (this.date !== '') {
        this.queryByDate(this.month)
      } // 如果之前按照日期搜索成功了，那么记录下这个信息，用于翻页时的下次请求
      else if (this.searchText !== '') this.queryBySearchtext()
      else this.getPostListData() // 否则正常翻页所有的数据
    },

    // pengyu--添加年份更换
    async handleYearChange() {
        // 当年份切换时，重置页面索引为 1
        this.pageIndex = 1;
        await this.$nextTick(); // 添加短暂的延迟，等待数据重置完成
        // 调用查询方法，传递新的年份
        if (this.date !== '') {
          this.queryByDate(this.month);
        } else if (this.searchText !== '') {
          this.queryBySearchtext();
        } else {
          await this.getPostListData(); // 重新获取帖子列表
        }
      },

    // pengyu--添加根据专业筛选功能
    filterByLabel(label) {
        // 发送请求给后端，按标签筛选帖子
        this.$axios
          .get('api/post_major', {
            params: {
              label,
              pageIndex: this.pageIndex,
              pageSize: this.pageSize,
            },
          })
          .then((res) => {
            // 处理后端返回的数据
            if (res?.data?.code === 0) {
              // 更新帖子列表和总数
              this.postListData = res.data.data.map((i) => {
                const l = { ...i };
                l.description = i.description
                  .replace(/(<([^>]+)>)/g)
                  .replace(/\\n/g);
                return l;
              });
              this.totalCount = res.data.count;
            } else {
              alert('request error: ' + res.msg);
            }
          })
          .catch((error) => {
            alert(error);
          });
    },
    
    error(err) {
      alert(err)
    },
  },
}
</script>

<style scoped>
.main {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
  text-align: center;
  width: 100%;
  height: 100%;
  background-color: rgb(241, 241, 241);
  position: relative;
}

.page-banner {
  position: absolute;
  width: 100%;
  height: 50px;
  left: 0px;
  top: 0px;
  background: #f5f7fa;
  box-shadow: 0px 0px 0px rgba(255, 255, 255, 0.12);
  border-radius: 0px;
}

.dropdown-button {
  /* Font and Color */
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  font-weight: bold;
  color: rgba(48, 49, 51, 0.75);
  /* Button Feature */
  line-height: 20px;
  text-align: center;
  background: #53389e;
  border-radius: 20px;
  border-width: 0px;
  padding: 5px 15px;
}

.dropdown-content {
  display: none;
  position: absolute;
  z-index: 1;
}

.dropdown-content a {
  width: 100px;
  margin-top: 5px;
  padding: 10px 16px;
  text-decoration: none;
  display: inline-block;
  border-radius: 20px;
  font-size: 12px;
  background-color: #ffffff;
  color: #303133;
}

.dropdown-content a:hover {
  box-shadow: 0px 0 15px #53389e;
  border-radius: 20px;
  background-color: #ffffff;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.dropdown:hover .dropdown-button {
  background-color: #42d791;
}

.level {
  position: absolute;
  width: 150px;
  height: 25px;
  left: 8%;
  top: 10px;
}

.loc {
  position: absolute;
  width: 150px;
  height: 25px;
  left: 20%;
  top: 10px;
}

.start-term {
  position: absolute;
  width: 150px;
  height: 25px;
  left: 30%;
  top: 10px;
}

.uni {
  position: absolute;
  width: 150px;
  height: 25px;
  left: 40%;
  top: 10px;
}

.reset_button {
  /* Font and Color */
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  font-weight: bold;
  color: rgba(48, 49, 51, 0.75);
  /* Button Feature */
  line-height: 20px;
  text-align: center;
  background: #e6a23c;
  border-radius: 20px;
  border-color: black;
  border-width: 0px;
  padding: 0px 10px;
  cursor: pointer;
  /* Position */
  position: absolute;
  width: 100px;
  height: 25px;
  right: 15%;
  top: 10px;
}

.reset_button:hover {
  background-color: #ed9005;
}

.addPost_button {
  /* Font and Color */
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  font-weight: bold;
  color: rgba(48, 49, 51, 0.75);
  /* Button Feature */
  text-align: center;
  background: #ffffff;
  border-radius: 20px;
  border-color: #53389e;
  border-width: 5px;
  padding: 0px 10px;
  cursor: pointer;
  /* Position */
  position: absolute;
  width: 100px;
  height: 25px;
  right: 40%;
  top: 10px;
}

.addPost_button:hover {
  background-color: #dcdfe6;
}

.list {
  position: absolute;
  top: 50px;
  left: 10%;
  width: 50%;
}

.entry {
  margin-top: 8px;
  margin-bottom: 8px;
  display: flex;
  flex-direction: column;
  background-color: #f5f7fa;
  height: 65px;
  cursor: pointer;
  overflow: hidden;
  text-align: left;
  white-space: nowrap;
  padding: 10px;
}

.entry:hover {
  box-shadow: 0px 0 2px #53389e;
}

.entry-title {
  font-size: 16px;
  height: 35px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.entry-content-brief {
  font-size: 10px;
  height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #909399;
}

.entry-bottom-flex {
  height: 20px;
  display: flex;
  flex-direction: row;
  font-size: 10px;
  color: #909399;
  justify-content: space-between;
}

.page-div {
  position: absolute;
  top: 900px;
  left: 10%;
  width: 50%;
  padding-bottom: 50px;
}

.button-page {
  border-width: 0px;
  margin: 5px;
  padding: 0px;
  height: 40px;
  width: 40px;
  color: #909399;
  cursor: pointer;
  background-color: #ffffff;
  transition: all 0.3s ease 0s;
  border-radius: 25px;
}

.button-page:hover {
  background-color: #53389e;
  color: black;
}

.button-page:active {
  box-shadow: 0px 0 15px #53389e;
}

.button-changePage {
  border-width: 0px;
  color: #909399;
  cursor: pointer;
  background-color: none;
  transition: all 0.3s ease 0s;
  border-radius: 25px;
}

.button-changePage:hover {
  font-size: 15px;
}

.filter {
  position: relative;
  top: 50px;
  left: 60%;
  width: 40%;
}

.filter-title {
  position: relative;
  display: block;
  left: 30%;
  top: 20px;
  bottom: 50px;
  width: 40%;
}

.search {
  height: 35px;
  width: 50%;
  max-width: 500px;
  border-radius: 20px;
  outline: none;
  border: 3px solid #53389e;
  padding: 0 20px;
  color: #606266;
  background: #ffffff;
  margin-top: 20px;
}

.button-search {
  margin-left: -50px;
  border-radius: 20px;
  width: 40px;
  border: 0;
  outline: none;
  cursor: pointer;
  background-color: #ffffff;
  transition: all 0.3s ease 0s;
  margin-bottom: 50px;
}

.button-search:hover {
  background-color: var(--color-4);
}

.filter-title hr {
  background-color: #53389e;
  border: 1px solid #53389e;
  width: 35%;
}

.filter-year {
  position: relative;
  top: 20px;
  left: 0px;
  border: 0px solid #53389e;
  padding: 5px;
  word-spacing: 30px;
}

.by-month {
  position: relative;
  top: 20px;
  width: 80%;
  left: 10%;
  right: 10%;
  margin-bottom: 50px;
}

.button-month {
  border-width: 0px;
  margin: 5px;
  padding: 0px;
  height: 35px;
  width: 40px;
  color: #909399;
  border-radius: 10%;
  cursor: pointer;
  background-color: #ffffff;
  transition: all 0.3s ease 0s;
}

.button-month:hover {
  background-color: #53389e;
  color: #ffffff;
}

.by-field {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  left: 3%;
  top: 20px;

  .button-field {
    flex: 1 0 27%;
    margin: 1.5%;
    border-color: #dcdfe6;
    border-width: 1px;
    border-radius: 20px;
    height: 39px;
    color: #909399;
    cursor: pointer;
    background-color: #ffffff;
    transition: all 0.3s ease 0s;
  }
  .button-field:hover {
    background-color: #53389e;
    color: #fff;
  }
}

</style>
