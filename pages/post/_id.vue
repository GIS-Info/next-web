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
    <div v-if="lang =='zh'" class="post-content" id="content">
      <div class="content-title">{{ postdata.title_cn || '-' }}</div>
      <div class="content-detail">发布时间: <span class="normal">{{ postdata.date || '-' }}</span></div>
      <div class="content-detail">院校名称: <span class="normal">{{ postdata.university_cn || '-' }}</span></div>
      <div class="content-detail">地理位置: <span class="normal">{{ postdata.country_cn || '-' }}</span></div>
      <div class="content-detail">岗位类型: <span class="normal">{{ postdata.job_cn || '-' }}</span></div>
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

      <div class="content-description"><p>职位描述</p><div v-html="description"></div></div>
    </div>

    <!-- 英文情况下 -->
    <div v-if="lang =='en'" class="post-content">
      <div class="content-title">{{ postdata.title_en || 'unknown' }}</div>
      <div class="content-detail">Publish Date: <span class="normal">{{ postdata.date || 'unknown' }}</span></div>
      <div class="content-detail">School: <span class="normal">{{ postdata.university_en || 'unknown' }}</span></div>
      <div class="content-detail">Location: <span class="normal">{{ postdata.country_en || 'unknown' }}</span></div>
      <div class="content-detail">Type: <span class="normal">{{ postdata.job_en || 'unknown' }}</span></div>
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

      <div class="content-description"><p>Job Description</p><div v-html="description"></div></div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'IndexPage',
  // 这里存放数据
  data() {
    return {
      postdata: {
        prevId: null,
        nextId: 2
      }
    }
  },
  /**
   * 使用 fetch 方法是为了服务端渲染，参考 https://nuxtjs.org/docs/features/data-fetching
   */
  async fetch() {
    const eventId = this.$route.params.id;
    // 向后端发起请求
    await this.$axios.get('/api/post/' + eventId.toString()).then(res=>{
      console.log('res', res);
      // 把后端传回的data存到此文件的postdata中
      this.postdata = res.data[0];
    }).catch(error=>{
      console.log('err', error);
      // 跳转到error界面
      this.$router.push('/error');
    });
  },
  head() {
    return {
      title: this.postdata.title_cn,
    };
  },
  computed: {
    ...mapState({lang: 'language'}),
    // 中文模式下，招募状态情况
    getStatusCN() {
      if(this.postdata.status){
        return '招募中';
      } else {
        return '已截止';
      }
    },
    // 英文模式下，招募状态情况
    getStatusEN() {
      if(this.postdata.status){
        return 'Active';
      } else {
        return 'Closed';
      }
    },
    description() {
      // 将\n替换为<br/>，为url增加<a>
      return this.postdata?.description?.replace(/\\n/gm,'<br/>').replace(/(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/gm, "<a href='$1$2'>$1$2</a>") || '';
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
    document.addEventListener("cut", e => {
      this.addCopy(e)
    });
    document.addEventListener("copy", e => {
      this.addCopy(e)
    });
    // window.storeChangeRc = this.storeChangeRc;
    // 不知道有没有加这句的必要，同时有alert的时候会有Uncaught的情况

  },

  methods: {
    goPost(eventId) {
      this.$router.push('/post/'+eventId.toString());
    },
    goPostList() {
      this.$router.push('../postList')
    },

    // 允许复制，版权提示--update:2023-01-29
    addCopy(e) {
      let copyTxt = ""
      e.preventDefault(); // 取消默认的复制事件
      copyTxt = window.getSelection(0).toString()
      copyTxt = `${copyTxt}\n\n————————————————\n作者：GISphere\n原文：${window.location.href}\n著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。`
      const clipboardData = e.clipboardData || window.clipboardData
      clipboardData.setData('text', copyTxt);
    },

  }
}
</script>

<style scoped>
.main-container{
  width: 100%;
  height: 100%;
  background: #EBEEF5;
  text-align: center;
}

/* header部分 */
.post-header{
  position: absolute;
  width: 100%;
  height: 60px;
  left: 0px;
  top: 0px;
  background: #E4E7ED;
  box-shadow: 0px 0px 0px rgba(255, 255, 255, 0.12);
  border-radius: 4px;
}
.header-prev-button{
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
.header-prev-button:hover{ 
  background-color: rgba(124, 227, 179, 0.9);
}
.header-next-button{
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
.header-next-button:hover{ 
  background-color: rgba(124, 227, 179, 0.9);
}
.header-back2list-button{
  position: absolute;
  width: 118px;
  height: 32px;
  left: 1163px;
  top: 14px;
  background: #E6A23C;
  border-radius: 15.9px;
  border-width: 0px;
  /* 字体部分 */
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  text-align: center;
  color: rgba(48, 49, 51, 0.9);
}
.header-back2list-button:hover{ 
  background-color: #CF9236;
}

/* content部分 */
.post-content{
  padding-bottom: 60px;
  width: 1128px;
  margin: auto;
  top: 60px;
  background: #EBEEF5;
  border-radius: 0px;
  word-wrap: break-word;
}
.content-title{
  position: relative;
  width: fit-content;
  height: 32px;
  left: 68px;
  top: 20px;
  margin-bottom: 27px;
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
  text-align: left;
  color: rgba(48, 49, 51, 0.9);
}
.content-detail{
  position: relative;
  width: fit-content;
  height: 20px;
  left: 68px;
  margin: 5px 0;
  font-style: normal;
  font-weight: 700;
  font-size: 13px;
  line-height: 20px;
  text-align: left;
  color: #909399;
}
/* 正常文本 */
.content-detail .normal{
  font-weight: 400;
  color: rgba(144,147,153,0.9);
}
/* 申请状态 */
.content-detail .active{
  font-weight: 400;
  color: rgba(0,115,255,0.75);
}
/* 下拉按钮 */
.dropdown{
  /* 定位 */
  position: relative;
  float: left;
  left: 68px;
  margin: 10px 15px 19px 0;
}
.dropdown-button{
  width: fit-content;
  height: 40px;
  padding: 0 32px;
  background: #7CE3B3;
  border-radius: 24px;
  border-width: 0px;
  /* 字体部分 */
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  text-align: center;
  color: rgba(0, 0, 0, 0.75);
}
.dropdown-content{
  display: none;
  position: absolute;
  z-index: 1;
}
.dropdown-content a{
  width: fit-content;
  margin-top: 5px;
  padding: 0 16px;
  display: inline-block;
  border-radius: 24px;
  font-size: 12px;
  background-color: #FFFFFF;
  color: #0073FF;
  line-height: 40px;
  cursor: pointer;
}
.dropdown-content a:hover {
  box-shadow: 0px 0 15px #7CE3B3;
  border-radius: 24px;
  background-color: #FFFFFF;
}
.dropdown:hover .dropdown-content{
  display: block;
}
.dropdown:hover .dropdown-button{
  background-color: #42D791;
}
/* 其余文本 */
.content-description{
  position: relative;
  width: 600px;
  left: 68px;
  margin-top: 40px;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  text-align: left;
  color: rgba(48, 49, 51, 0.9);
}
</style>