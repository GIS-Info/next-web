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
            <span><b>{{
              (lang == 'zh' ? post.country_cn : post.country_en) || '-'
            }}</b></span>
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
          :current-page="queryParams.pageIndex"
          :total="totalCount"
          :page-size="pageSize"
          @current-change="handlePageChange"
        >
        </el-pagination>
      </div>

      <!-- filter -->
      <div class="filter">
        <button class="button-reset" @click="resetQueryParams">{{lang == 'en' ? 'Reset search criteria' : '重置搜索条件'}}</button>
        <div class="filter-title">
          {{lang == 'zh' ? "按内容搜索" : "Search By Content"}}
          <hr />
        </div>
        <div>
          <input
            v-model="queryString"
            type="text"
            class="search"
            @keyup.enter="handleTextChange()"
          />
          <button class="button-search" @click="handleTextChange()">
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
        <div class="by-date">
          <el-date-picker
            v-model="date"
            type="month"
            :editable="true"
            :placeholder="lang === 'zh' ? '选择月' : 'Select Month'"
            value-format="yyyy-M"
            @change="handleDateChange"
            >
          </el-date-picker>
        </div>
        <div class="filter-title">
          {{lang == 'zh' ? "按专业领域搜索" : "Search by Field" }}
          <hr />
        </div>
        <div class="by-field">
          <el-button round class="button-field" @click="handleLabelChange('gis')">{{lang == 'zh' ? '地理信息科学' : 'GIScience'}}</el-button>
          <el-button class="button-field" @click="handleLabelChange('rs')">{{lang == 'zh' ? '遥感' : 'Remote Sensing'}}</el-button>
          <el-button class="button-field" @click="handleLabelChange('physical_geo')">{{lang == 'zh' ? '自然地理学' : 'Physical Geography'}}</el-button>
          <el-button class="button-field" @click="handleLabelChange('human_geo')">{{lang == 'zh' ? '人文地理学' : 'Human Geography'}}</el-button>
          <el-button class="button-field" @click="handleLabelChange('urban')">{{lang == 'zh' ? '城市规划' : 'Urban Planing'}}</el-button>
          <el-button class="button-field" @click="handleLabelChange('rs')">{{lang == 'zh' ? '卫星导航' : 'GNSS'}}</el-button>
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
            queryString: '',
            pageSize: 7,
            totalCount: 0,
            filter: {
                queryType: '', // 从url带入的查询类型 ['academic', 'business', '']
            },
            date: '',
            label: '',
            queryParams: {},
            loading: true,
        };
    },
    head() {
        return {
            title: 'GISphere | 资讯',
        };
    },
    computed: {
        ...mapState({ lang: 'language' }),
    },
    async mounted() {
        // 第一次访问加载全部列表数据，否则按照之前的搜索状态请求数据
        const storedQueryParams = sessionStorage.getItem('queryParams');
        if (storedQueryParams !== null && storedQueryParams !== undefined) {
            this.queryParams = { ...JSON.parse(storedQueryParams) };
            await this.queryByParams(this.queryParams);
        }
        else {
            // 从url带入的查询类型
            this.filter.queryType = this.$route.query?.type;
            await this.queryByParams();
        }
    },
    methods: {
        // 还原搜索条件，展示完整初始列表
        async resetQueryParams() {
            await this.queryByParams();
            // 清除搜索条件
            this.queryParams = {};
            this.queryString = '';
            sessionStorage.removeItem('queryParams');
        },
        // 搜索框
        handleTextChange() {
            this.$set(this.queryParams, 'queryString', this.queryString);
            this.queryByParams(this.queryParams);
        },
        // 日期选择
        handleDateChange() {
            if (this.date) {
                const parts = this.date.split('-');
                // 提取年份和月份部分
                const year = parts[0];
                const month = parts[1];
                this.$set(this.queryParams, 'month', month);
                this.$set(this.queryParams, 'year', year);
                this.queryByParams(this.queryParams);
            }
        },
        // 标签选择
        handleLabelChange(label) {
            this.$set(this.queryParams, 'label', label);
            this.queryByParams(this.queryParams);
        },
        // 翻页
        handlePageChange(i) {
            this.queryParams = { ...this.queryParams, pageIndex: i };
            this.queryByParams(this.queryParams);
        },
        // 更新搜索状态到sessionStorage
        updateQueryParams() {
            const storedQueryParams = JSON.stringify(this.queryParams);
            sessionStorage.setItem('queryParams', storedQueryParams);
        },
        // 有条件的搜索请求
        queryByParams(params = {}) {
            this.loading = true;
            this.$axios.post('api/post_by_params', params)
                .then(res => {
                // 处理后端返回的数据
                if (res?.data?.code === 0) {
                    // 更新帖子列表和总数
                    this.postListData = res.data.data.map((i) => {
                        const l = { ...i };
                        l.description = l.description
                            .replace(/<\/?[^>]+(>|$)/g, '')
                            .replace(/\\n/g, '');
                        return l;
                    });
                    this.totalCount = res.data.count;
                }
                else {
                    alert('request error: ' + res.msg);
                }
            })
                .catch((error) => {
                alert(error);
            });
            this.loading = false;
        },
        goPost(id) {
            this.$router.push('/post/' + id.toString());
            // 用户跳转出去的时候保存页面状态
            this.updateQueryParams();
        },
        goAddPost() {
            this.$router.push('/addPost');
        },
        // 完整列表请求
        getPostListData() {
            this.loading = true;
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
                        const l = { ...i };
                        // l.description = i.description
                        //   .replace(/(<([^>]+)>)/g, '')
                        //   .replace(/\\n/g, '')
                        l.description = l.description
                            .replace(/^<p>|<\/p>$/g, '')
                            .replace(/\\n/g, ''); // 去除 \n 字符
                        return l;
                    });
                    this.totalCount = res.data.count;
                }
                else {
                    alert('请求错误: ' + res.msg);
                }
                this.loading = false;
            })
                .catch((error) => {
                alert(error);
                this.loading = false;
            });
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
  font-size: 18px;
  height: 35px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.entry-content-brief {
  font-size: 14px;
  height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #909399;
}

.entry-bottom-flex {
  height: 20px;
  display: flex;
  flex-direction: row;
  font-size: 14px;
  color: #909399;
  justify-content: space-between;
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
.button-reset {
    margin: 4.5%;
    padding: 4%;
    border-color: #dcdfe6;
    border-width: 1px;
    border-radius: 20px;
    color: #909399;
    cursor: pointer;
    background-color: #ffffff;
    transition: all 0.3s ease 0s;
  }
  .button-reset:hover {
    background-color: #53389e;
    color: #fff;
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

.by-date {
  display: flex;
  justify-content: center;
  /* position: relative;
  top: 20px;
  width: 80%;
  left: 10%;
  right: 10%; */
  margin: 30px 0 50px 0;
  /* .by-date > div {
    border: 0px solid #53389e !important;
  } */
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
.button-clicked {
  background-color: #53389e;
  color: #fff;
}
</style>
