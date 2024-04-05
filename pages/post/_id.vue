<!-- eslint-disable vue/no-v-html -->
<template>
  <div class="main-container">
    <!-- 暂不支持翻页功能 -->
    <!-- 中文情况下 -->
    <!--
    <div v-if="lang =='zh'" class="post-header">
      <button class="header-prev-button" @click="goPost(postdata.prevId)">&#9664; 上一页</button>
      <button class="header-next-button" @click="goPost(postdata.nextId)">下一页 &#9654;</button>
      <button class="header-back2list-button" @click="goPostList">返回列表</button>
    </div>
    -->
    <!-- 英文情况下 -->
    <!--
    <div v-if="lang =='en'" class="post-header">
      <button class="header-prev-button" @click="goPost(postdata.prevId)">&#9664; PREV</button>
      <button class="header-next-button" @click="goPost(postdata.nextId)">NEXT &#9654;</button>
      <button class="header-back2list-button" @click="goPostList">Back to List</button>
    </div>
    -->

    <!-- 中文情况下 -->
    <div v-if="lang == 'zh'" id="content" class="post-content">
      <h1 class="content-title">{{ postdata.title_cn || '-' }}</h1>
      <h3 class="content-detail">
        <i class="el-icon-date"></i>
        发布时间: <span class="normal">{{ postdata.date || '-' }}</span>
      </h3>
      <h3 class="content-detail">
        <i class="el-icon-school"></i>
        机构名称:
        <span class="normal">{{ postdata.university_cn || '-' }}</span>
      </h3>
      <h3 class="content-detail">
        <i class="el-icon-location-information"></i>
        地理位置: <span class="normal">{{ postdata.country_cn || '-' }}</span>
      </h3>
      <h3 class="content-detail">
        <i class="el-icon-collection-tag"></i>
        岗位类型: <span class="normal">{{ postdata.job_cn || '-' }}</span>
      </h3>
      <!-- 如果招聘状态为true，则css为active -->
      <!--
      <div class="content-detail">招聘状态: <span :class="postdata.still_open == true ? 'active' : 'normal'">{{ getStatusCN }}</span></div>

      <div class="dropdown">
        <button class="dropdown-button">申请链接 &#x2709;</button>
        <div class="dropdown-content">
          <a :href="'{{ postdata.applyURL }}'" target="_blank">{{ postdata.url }}</a>
        </div>
      </div>
      -->

      <!-- 判断是否有联系人，若无，则button不显示 -->
      <!--
      <div class="dropdown" :style="{'display' : postdata.email1 == null ? 'none' : 'inline-block'}">
        <button class="dropdown-button">联系人1: <span>{{ postdata.contact1 }}</span> &#x2709;</button>
        <div class="dropdown-content">
          <a href="'mailto:${ postdata.email1 }'">{{ postdata.email1 }}</a>
        </div>
      </div>

      <div class="dropdown" :style="{'display' : postdata.email2 == null ? 'none' : 'inline-block'}">
        <button class="dropdown-button">联系人2: <span>{{ postdata.contact2 }}</span> &#x2709;</button>
        <div class="dropdown-content">
          <a href="'mailto:${ postdata.email2 }'">{{ postdata.email2 }}</a>
        </div>
      </div>
      -->
      <div class="content-description">
        <h3>职位描述</h3>
        <div v-html="description"></div>
      </div>
    </div>

    <!-- 英文情况下 -->
    <div v-if="lang == 'en'" class="post-content">
      <h1 class="content-title">{{ postdata.title_en || 'unknown' }}</h1>
      <h3 class="content-detail">
        <i class="el-icon-date"></i>
        Publish Date:
        <span class="normal">{{ postdata.date || 'unknown' }}</span>
      </h3>
      <h3 class="content-detail">
        <i class="el-icon-school"></i>
        Organization:
        <span class="normal">{{ postdata.university_en || 'unknown' }}</span>
      </h3>
      <h3 class="content-detail">
        <i class="el-icon-location-information"></i>
        Location:
        <span class="normal">{{ postdata.country_en || 'unknown' }}</span>
      </h3>
      <h3 class="content-detail">
        <i class="el-icon-collection-tag"></i>
        Type: <span class="normal">{{ postdata.job_en || 'unknown' }}</span>
      </h3>
      <!-- 如果招聘状态为true，则css为active -->
      <!--
      <div class="content-detail">Status: <span :class="postdata.status == true ? 'active' : 'normal'">{{ getStatusEN }}</span></div>

      <div class="dropdown">
        <button class="dropdown-button">Apply Link &#x2709;</button>
        <div class="dropdown-content">
          <a :href="'{{ postdata.applyURL }}'" target="_blank">{{ postdata.applyURL }}</a>
        </div>
      </div>
      -->

      <!-- 判断是否有联系人，若无，则button不显示 -->
      <!--
      <div class="dropdown" :style="{'display' : postdata.email1 == null ? 'none' : 'inline-block'}">
        <button class="dropdown-button">Contact Email 1: <span>{{ postdata.contact1 }}</span> &#x2709;</button>
        <div class="dropdown-content">
          <a href="'mailto:${ postdata.email1 }'">{{ postdata.email1 }}</a>
        </div>
      </div>

      <div class="dropdown" :style="{'display' : postdata.email2 == null ? 'none' : 'inline-block'}">
        <button class="dropdown-button">Contact Email 2: <span>{{ postdata.contact2 }}</span> &#x2709;</button>
        <div class="dropdown-content">
          <a href="'mailto:${ postdata.email2 }'">{{ postdata.email2 }}</a>
        </div>
      </div>
      -->
      <div class="content-description">
        <h3>Job Description</h3>
        <div v-html="description"></div>
      </div>
    </div>

    <bottom-bar />

  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'IndexPage',
  // 这里存放数据
  data() {
    return {
      postdata: {
        prevId: null,
        nextId: 2,
      },
    }
  },
  /**
   * 使用 fetch 方法是为了服务端渲染，参考 https://nuxtjs.org/docs/features/data-fetching
   */
  async fetch() {
    const eventId = this.$route.params.id
    // 向后端发起请求
    await this.$axios
      .get('/api/post/' + eventId.toString())
      .then((res) => {
        // 把后端传回的data存到此文件的postdata中
        this.postdata = res.data[0]
      })
      .catch((error) => {
        console.log('err', error)
        // 跳转到error界面
        this.$router.push('/error')
      })
  },
  head() {
    return {
      title: 'GISphere | ' +
        this.lang === 'en' ? this.postdata.title_en : this.postdata.title_cn,
    }
  },
  computed: {
    ...mapState({ lang: 'language' }),
    // 中文模式下，招募状态情况
    getStatusCN() {
      if (this.postdata.status) {
        return '招募中'
      } else {
        return '已截止'
      }
    },
    // 英文模式下，招募状态情况
    getStatusEN() {
      if (this.postdata.status) {
        return 'Active'
      } else {
        return 'Closed'
      }
    },
    description() {
      // console.log("description log:", this.postdata.description);
      // 将\n替换为<br/>
      let descriptionData = this.postdata?.description || '';

      descriptionData = descriptionData.replace(/\\n/g, '<br/>');

      // 使用正则表达式查找URL，将其替换为<a>标签
      descriptionData = descriptionData.replace(/(https?:\/\/[^\s<]+)/g, function(url) {
        return `<a href="${url}" target="_blank">${url}</a>`;
      });

      // 将邮件地址转换为mailto链接
      descriptionData = descriptionData.replace(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi, function(email) {
        return `<a href="mailto:${email}">${email}</a>`;
      });

      return descriptionData;
    },
  },

  // 禁止复制的需求--update:2023-01-29
  mounted() {
    // 禁用功能，本来想写在created里但总是报错就写在这里了
    // document.oncopy = function(){return false;}

    // 监听ctrl+c键盘事件并弹窗
    // document.addEventListener('copy',(event) => {
    //   alert('著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。');
    // });

    // 允许复制，版权提示
    document.addEventListener('cut', (e) => {
      this.addCopy(e)
    })
    document.addEventListener('copy', (e) => {
      this.addCopy(e)
    })
    // window.storeChangeRc = this.storeChangeRc;
    // 不知道有没有加这句的必要，同时有alert的时候会有Uncaught的情况
  },

  methods: {
    goPost(eventId) {
      this.$router.push('/post/' + eventId.toString())
    },
    goPostList() {
      this.$router.push('../postList')
    },

    // 允许复制，版权提示--update:2023-01-29
    addCopy(e) {
      let copyTxt = ''
      e.preventDefault() // 取消默认的复制事件
      copyTxt = window.getSelection(0).toString()
      const urlPattern = /^\s*(?:(http|https|ftp):\/\/)?((?:[\w-]+\.)+[a-z0-9]+)((?:\/[^/?#]*)+)?(\?[^#]+)?(#.+)?$/i
      const emailPattern = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/i
      if(!urlPattern.test(copyTxt) && !emailPattern.test(copyTxt)){
        copyTxt = `${copyTxt}\n\n________________\n作者：GISphere\n原文：${window.location.href}\n著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。`
      }
      const clipboardData = e.clipboardData || window.clipboardData
      clipboardData.setData('text', copyTxt)
    },
  },
}
</script>

<style scoped>
.main-container {
  height: 100%;
  display: flex;
  flex-grow: 1;
  flex-shrink: 1;
  background: #f1f1f1;
  text-align: center;
  flex-direction: column;
  justify-content: space-between;
  overflow: auto; 
}

/* header部分 */
.post-header {
  position: absolute;
  width: 100%;
  height: 60px;
  left: 0px;
  top: 0px;
  background: #f1f1f1;
  box-shadow: 0px 0px 0px rgba(255, 255, 255, 0.12);
  border-radius: 4px;
}
.header-prev-button {
  /* div部分 */
  position: absolute;
  width: 101px;
  height: 32px;
  left: 210px;
  top: 14px;
  background: rgba(124, 227, 179, 0.5);
  border-radius: 15.9px 0px 0px 15.9px;
  border-width: 0px;
  /* 字体部分 */
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  text-align: center;
  color: rgba(48, 49, 51, 0.75);
}
.header-prev-button:hover {
  background-color: rgba(124, 227, 179, 0.9);
}
.header-next-button {
  position: absolute;
  width: 101px;
  height: 32px;
  left: 312px;
  top: 14px;
  background: rgba(124, 227, 179, 0.5);
  border-radius: 0px 15.9px 15.9px 0px;
  border-width: 0px;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  text-align: center;
  color: rgba(48, 49, 51, 0.75);
}
.header-next-button:hover {
  background-color: rgba(124, 227, 179, 0.9);
}
.header-back2list-button {
  position: absolute;
  width: 118px;
  height: 32px;
  left: 1163px;
  top: 14px;
  background: #e6a23c;
  border-radius: 15.9px;
  border-width: 0px;
  /* 字体部分 */
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  text-align: center;
  color: rgba(48, 49, 51, 0.9);
}
.header-back2list-button:hover {
  background-color: #cf9236;
}

/* content部分 */
.post-content {
  padding-top: 60px;
  padding-bottom: 60px;
  width: 60%;
  max-width: 1000px;
  margin: 0 auto;
  background: #f1f1f1;
  border-radius: 0px;
  word-wrap: break-word;
}
.content-title {
  position: relative;
  width: fit-content;
  top: 20px;
  margin-bottom: 50px;
  font-style: normal;
  font-weight: 700;
  line-height: 32px;
  text-align: left;
  color: rgba(48, 49, 51, 0.9);
}
.content-detail {
  position: relative;
  width: fit-content;
  height: 20px;
  margin: 5px 0;
  font-style: normal;
  font-weight: 700;
  line-height: 20px;
  text-align: left;
  color: #636569;
}
/* 正常文本 */
.content-detail .normal {
  font-weight: 400;
  color: rgba(86, 88, 93, 0.9);
}
/* 申请状态 */
.content-detail .active {
  font-weight: 400;
  color: rgba(0, 115, 255, 0.75);
}
/* 下拉按钮 */
.dropdown {
  /* 定位 */
  position: relative;
  float: left;
  margin: 10px 15px 19px 0;
}
.dropdown-button {
  width: fit-content;
  height: 40px;
  padding: 0 32px;
  background: #7ce3b3;
  border-radius: 24px;
  border-width: 0px;
  /* 字体部分 */
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  text-align: center;
  color: rgba(0, 0, 0, 0.75);
}
.dropdown-content {
  display: none;
  position: absolute;
  z-index: 1;
}
.dropdown-content a {
  width: fit-content;
  margin-top: 5px;
  padding: 0 16px;
  display: inline-block;
  border-radius: 24px;
  font-size: 12px;
  background-color: #ffffff;
  color: #0073ff;
  line-height: 40px;
  cursor: pointer;
}
.dropdown-content a:hover {
  box-shadow: 0px 0 15px #7ce3b3;
  border-radius: 24px;
  background-color: #ffffff;
}
.dropdown:hover .dropdown-content {
  display: block;
}
.dropdown:hover .dropdown-button {
  background-color: #42d791;
}
/* 其余文本 */
.content-description {
  position: relative;
  margin-top: 40px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  text-align: left;
  color: rgba(48, 49, 51, 0.9);
  font-size: 18px;
  line-height: 30px;
  border-top: #636569 solid 1px;
}
</style>
