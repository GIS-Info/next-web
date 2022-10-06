<template>
  <div class="main">

    <!-- 暂时不显示 banner -->
    <!-- 中文banner -->
    <!--
    <div v-if="lang =='zh'" class="page-banner">

      <div class="dropdown level">
        <button class="dropdown-button">职位层次 &#9660;</button>
        <div class="dropdown-content">
          <a href="#">博士</a>
          <a href="#">硕士</a>
          <a href="#">本科</a>
        </div>
      </div>

      <div class="dropdown loc">
        <button class="dropdown-button">国家及地区 &#9660;</button>
        <div class="dropdown-content">
          <a href="#">美国</a>
          <a href="#">中国香港</a>
          <a href="#">德国</a>
        </div>
      </div>


      <div class="dropdown start-term">
        <button class="dropdown-button"> 开始时间 &#9660;</button>
        <div class="dropdown-content">
          <a href="#">春季 (学期制)</a>
          <a href="#">春季 (学季制)</a>
          <a href="#">夏季 (学期制)</a>
        </div>
      </div>
      <div class="dropdown uni">
        <button class="dropdown-button">学校 &#9660;</button>
        <div class="dropdown-content">
          <a href="#">伊利诺伊大学香槟分校</a>
          <a href="#">纽约大学</a>
          <a href="#">哥伦比亚大学</a>
        </div>
      </div>


      <button class="reset_button">重置</button>
      <button class="addPost_button" @click="goAddPost">添加招聘</button>
    </div>
    -->

    <!-- 英文banner -->
    <!--
    <div v-if="lang =='en'" class="page-banner">

      <div class="dropdown level">
        <button class="dropdown-button">Level &#9660;</button>
        <div class="dropdown-content">
          <a href="#">Ph.D.</a>
          <a href="#">Master</a>
          <a href="#">Bachelor</a>
        </div>
      </div>

      <div class="dropdown loc">
        <button class="dropdown-button">Country / Region &#9660;</button>
        <div class="dropdown-content">
          <a href="#">United States</a>
          <a href="#">Hongkong,China</a>
          <a href="#">Germany</a>
        </div>
      </div>



      <div class="dropdown start-term">
        <button class="dropdown-button"> Start Term &#9660;</button>
        <div class="dropdown-content">
          <a href="#">Spring (Semester)</a>
          <a href="#">Spring (Quarter)</a>
          <a href="#">Summer (Semester)</a>
        </div>
      </div>

      <div class="dropdown uni">
        <button class="dropdown-button">University &#9660;</button>
        <div class="dropdown-content">
          <a href="#">University of Illinois, Urbana-Champaign</a>
          <a href="#">New York University</a>
          <a href="#">Columbia University</a>
        </div>
      </div>
      <button class="reset_button">Reset</button>
      <button class="addPost_button" @click="goAddPost">Add Post</button>
    </div>
    -->

    <div class="list">
      <div v-for="post in postListData" :key="post.event_id" class="entry" @click="goPost(post.event_id)" >
        <div class="entry-title">{{ (lang == 'zh'? post.title_cn : post.title_en) || '-' }}</div>
        <div class="entry-content-brief">{{ post.description || '-' }}</div>
        <div class="entry-bottom-flex">
          <span>{{ (lang == 'zh'? post.country_cn : post.country_en) || '-' }}</span>
          <span>发布于 <b>{{ post.date || '未知时间' }}</b></span>
        </div>
      </div>

      <el-pagination
        background
        layout="prev, pager, next"
        :current-page="pageIndex"
        :total="totalCount"
        :page-size="pageSize"
        @current-change="handlePageChange">
      </el-pagination>
    </div>

    <!-- 页码 中英文-->
    <!--
    <div class="page-div">
      <button class="button-changePage" v-if="lang =='zh'" @click="goPrevPage"><strong>上一页</strong></button>
      <button class="button-changePage" v-if="lang =='en'" @click="goPrevPage"><strong>PREV</strong></button>
      <button class="button-page">1</button>
      <button class="button-changePage" v-if="lang =='en'" @click="goNextPage"><strong>NEXT</strong></button>
      <button class="button-changePage" v-if="lang =='zh'" @click="goPrevPage"><strong>下一页</strong></button>
    </div>
    -->

    <!-- 中文filter -->
    <div v-if="lang =='zh'" class="filter" @click="error('相关功能还在开发中')">
      <div class="filter-title">按内容搜索 <hr> </div>
      <div>
        <input v-model="searchText" type="text" class="search" />
        <button class="button-search">
          <svg class="icon-search"
               viewBox="0 -3 20 20"
               xmlns="http://www.w3.org/2000/svg"
               height="19"
               width="19">
            <path fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"></path>
          </svg>
        </button>
      </div>
      <div class="filter-title">按截止时间搜索 <hr> </div>
      <select class="filter-year">
        <option>2020年</option>
        <option>2021年</option>
        <option>2022年</option>
      </select>
      <table class="by-month">
        <tr>
          <td><button class="button-month">1月</button></td>
          <td><button class="button-month">2月</button></td>
          <td><button class="button-month">3月</button></td>
          <td><button class="button-month">4月</button></td>
          <td><button class="button-month">5月</button></td>
          <td><button class="button-month">6月</button></td>
        </tr>
        <tr>
          <td><button class="button-month">7月</button></td>
          <td><button class="button-month">8月</button></td>
          <td><button class="button-month">9月</button></td>
          <td><button class="button-month">10月</button></td>
          <td><button class="button-month">11月</button></td>
          <td><button class="button-month">12月</button></td>
        </tr>
      </table>
      <div class="filter-title">按专业领域搜索 <hr> </div>
      <table class="by-field">
        <tr>
          <td><button class="button-field">空间分析</button></td>
          <td><button class="button-field">遥感</button></td>
          <td><button class="button-field">地质</button></td>
        </tr>
        <tr>
          <td><button class="button-field">智慧城市</button></td>
          <td><button class="button-field">城市规划</button></td>
          <td><button class="button-field">制图</button></td>
        </tr>
        <tr>
          <td><button class="button-field">倾斜3D</button></td>
          <td><button class="button-field">云GIS</button></td>
          <td><button class="button-field">可视化</button></td>
        </tr>
      </table>
    </div>

    <!-- 英文filter -->
    <div v-if="lang =='en'" class="filter">
      <div class="filter-title">Search by Content <hr> </div>
      <div>
        <input v-model="searchText" type="text" class="search" />
        <button class="button-search">
          <svg class="icon-search"
               viewBox="0 0 20 20"
               xmlns="http://www.w3.org/2000/svg"
               height="19"
               width="19">
            <path fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"></path>
          </svg>
        </button>
      </div>
      <div class="filter-title">Search by Deadline <hr> </div>
      <select class="filter-year">
        <option>2020</option>
        <option>2021</option>
        <option>2022</option>
      </select>
      <table class="by-month">
        <tr>
          <td><button class="button-month">Jan</button></td>
          <td><button class="button-month">Feb</button></td>
          <td><button class="button-month">Mar</button></td>
          <td><button class="button-month">Apr</button></td>
          <td><button class="button-month">May</button></td>
          <td><button class="button-month">Jun</button></td>
        </tr>
        <tr>
          <td><button class="button-month">Jul</button></td>
          <td><button class="button-month">Aug</button></td>
          <td><button class="button-month">Sep</button></td>
          <td><button class="button-month">Oct</button></td>
          <td><button class="button-month">Nov</button></td>
          <td><button class="button-month">Dec</button></td>
        </tr>
      </table>
      <div class="filter-title">Search by Field <hr> </div>
      <table class="by-field">
        <tr>
          <td><button class="button-field">Spatial Analysis</button></td>
          <td><button class="button-field">Remote Sensing</button></td>
          <td><button class="button-field">Geology</button></td>
        </tr>
        <tr>
          <td><button class="button-field">Urban Informatics</button></td>
          <td><button class="button-field">Urban Planning</button></td>
          <td><button class="button-field">Cartography</button></td>
        </tr>
        <tr>
          <td><button class="button-field">Oblique 3D</button></td>
          <td><button class="button-field">CloudGIS</button></td>
          <td><button class="button-field">Visualization</button></td>
        </tr>
      </table>
    </div>

  </div>
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    name: 'IndexList',
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
      };
    },
    computed: {
      ...mapState({ lang: 'language' }),
    },
    mounted() {
      // 从url带入的查询类型
      this.filter.queryType = this.$route.query?.type
      this.getPostListData();
    },
    methods: {
      goPost(id) {
        this.$router.push('/post/' + id.toString());
      },
      goAddPost() {
        this.$router.push('/addPost');
      },
      getPostListData() {
        this.$axios.get('https://gisphere.info/api/post', {
          params: {
            pageSize: this.pageSize,
            pageIndex: this.pageIndex,
          }
        }).then(res => {
          if(res?.data?.code === 0){
            // 把后端传回的data存到此文件的postdata中
            this.postListData = res.data.data;
            this.totalCount = res.data.count;
          }else{
            alert('请求错误: ' + res.msg)
          }
        }).catch(error => {
          alert(error);
        });
      },
      handlePageChange(i){
        this.pageIndex = i;
        this.getPostListData();
      },
      error(err) {
        alert(err)
      }
    }
  }
</script>

<style scoped>
  .main {
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
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
    background: #F5F7FA;
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
    background: #7CE3B3;
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
      background-color: #FFFFFF;
      color: #303133;
    }

      .dropdown-content a:hover {
        box-shadow: 0px 0 15px #7CE3B3;
        border-radius: 20px;
        background-color: #FFFFFF;
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
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    font-weight: bold;
    color: rgba(48, 49, 51, 0.75);
    /* Button Feature */
    line-height: 20px;
    text-align: center;
    background: #E6A23C;
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
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    font-weight: bold;
    color: rgba(48, 49, 51, 0.75);
    /* Button Feature */
    text-align: center;
    background: #FFFFFF;
    border-radius: 20px;
    border-color: #7CE3B3;
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
      background-color: #DCDFE6;
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
    background-color: #F5F7FA;
    height: 65px;
    cursor: pointer;
    overflow: hidden;
    text-align: left;
    white-space: nowrap;
    padding: 10px;
  }

    .entry:hover {
      box-shadow: 0px 0 15px #7CE3B3;
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

  .entry-bottom-flex{
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
    background-color: #FFFFFF;
    transition: all 0.3s ease 0s;
    border-radius: 25px;
  }

    .button-page:hover {
      background-color: #7CE3B3;
      color: black;
    }

    .button-page:active {
      box-shadow: 0px 0 15px #7CE3B3;
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
    position: fixed;
    top: 150px;
    left: 60%;
    width: 30%;
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
    border: 3px solid #7CE3B3;
    padding: 0 20px;
    color: #606266;
    background: #FFFFFF;
    margin-top: 20px;
  }

  .button-search {
    margin-left: -50px;
    border-radius: 20px;
    height: 30px;
    width: 40px;
    border: 0;
    outline: none;
    cursor: pointer;
    background-color: #FFFFFF;
    transition: all 0.3s ease 0s;
    margin-bottom: 50px;
  }

    .button-search:hover {
      background-color: var(--color-4);
    }

  .filter-title hr {
    background-color: #7CE3B3;
    border: 1px solid #7CE3B3;
    width: 35%
  }

  .filter-year {
    position: relative;
    top: 20px;
    left: 0px;
    border: 0px solid #7CE3B3;
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
    cursor: pointer;
    background-color: #FFFFFF;
    transition: all 0.3s ease 0s;
  }

    .button-month:hover {
      background-color: #7CE3B3;
      color: #303133;
    }

  .by-field {
    position: relative;
    left: 10%;
    right: 10%;
    width: 80%;
    top: 20px;
  }

  .button-field {
    border-color: #DCDFE6;
    border-width: 1px;
    border-radius: 20px;
    height: 30px;
    width: 120px;
    color: #909399;
    cursor: pointer;
    background-color: #FFFFFF;
    transition: all 0.3s ease 0s;
  }

    .button-field:hover {
      background-color: #7CE3B3;
      color: #303133;
    }
</style>
