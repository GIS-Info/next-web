<template>
  <div class="main">
    <!-- 中文情况下 -->
    <div v-if="lang =='zh'" class="post-header">
      <!-- 求助！请问@click="goPost()"该怎么传入参数？ -->
      <button class="header-prev-button" @click="goPost(postdata.prevId)">&#9664; 上一页</button>
      <button class="header-next-button" @click="goPost(postdata.nextId)">下一页 &#9654;</button>
      <button class="header-back2list-button" @click="goPostList">返回列表</button>
    </div>
    <!-- 英文情况下 -->
    <div v-if="lang =='en'" class="post-header">
      <button class="header-prev-button" @click="goPost(postdata.prevId)">&#9664; PREV</button>
      <button class="header-next-button" @click="goPost(postdata.nextId)">NEXT &#9654;</button>
      <button class="header-back2list-button" @click="goPostList">Back to List</button>
    </div>

    <!-- 中文情况下 -->
    <div v-if="lang =='zh'" class="post-content">
      <div class="content-title">{{ postdata.label + postdata.label }}</div>
      <div class="content-detail">发布时间: <span class="normal">{{ postdata.postDate }}</span></div>
      <div class="content-detail">截止日期: <span class="normal">{{ postdata.closeDate }}</span></div>
      <div class="content-detail">院校名称: <span class="normal">{{ postdata.label }}</span></div>
      <div class="content-detail">地理位置: <span class="normal">{{ postdata.label }}</span></div>
      <div class="content-detail">学历要求: <span class="normal">硕士</span></div>
      <div class="content-detail">岗位数量: <span class="normal">3</span></div>
      <div class="content-detail">招聘状态: <span class="active">招募中</span></div>

      <div class="dropdown">
        <button class="dropdown-button">申请链接 &#x2709;</button>
        <div class="dropdown-content">
          <a :href="'{{ postdata.applyURL }}'" target="_blank">{{ postdata.applyURL }}</a>
        </div>
      </div>

      <div class="dropdown">
        <button class="dropdown-button">联系人1: Dr.AAAA &#x2709;</button>
        <div class="dropdown-content">
          <a href="mailto:gisphere@outlook.com">gisphere@outlook.com</a>
        </div>
      </div>

      <div class="dropdown">
        <button class="dropdown-button">联系人2: Dr.BBB &#x2709;</button>
        <div class="dropdown-content">
          <a href="mailto:gisphere@outlook.com">gisphere@outlook.com</a>
        </div>
      </div>

      <div class="content-description">职位描述<br/>80 多年来，GfK 一直是世界上最大的公司和领先品牌的可靠和值得信赖的洞察合作伙伴，他们改变了每个消费者的生活——我们将继续在此基础上再接再厉。我们将数据、科学和创新的数字研究解决方案联系起来，为围绕消费者、市场、品牌和媒体的关键业务问题提供答案。</div>
    </div>

    <!-- 英文情况下 -->
    <div v-if="lang =='en'" class="post-content">
      <div class="content-title">GIS Research Analyst</div>
      <div class="content-detail">Publish Date: <span class="normal">03 Feb 2022</span></div>
      <div class="content-detail">Apply Deadline: <span class="normal">05 Mar 2022</span></div>
      <div class="content-detail">School: <span class="normal">National University of Singapore</span></div>
      <div class="content-detail">Location: <span class="normal">Europe, London, England, United Kingdom</span></div>
      <div class="content-detail">Required Degree: <span class="normal">Master</span></div>
      <div class="content-detail">Number of Vacancy: <span class="normal">3</span></div>
      <div class="content-detail">Status: <span class="active">Active</span></div>
      <div class="dropdown-button">Apply Link &#x2709;</div>
      <div class="dropdown-button">Contact Email 1: Dr.AAAA &#x2709;</div>
      <div class="dropdown-button">Contact Email 2: Dr.BBB &#x2709;</div>
      <div class="content-description">Job content-description<br/>
      For over 80 years, GfK has been a reliable and trusted insight partner for the world’s biggest companies and leading brands who make a difference in every consumer’s life - and we will continue to build on this. We connect data, science and innovative digital research solutions to provide answers for key business questions around consumers, markets, brands and media.</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import {mapState} from 'vuex'
import {isMobile} from '@/utils/index'

export default {
  name: 'IndexPage',
  // 这里存放数据
  data() {
    return {
      // postdata: []还是{}？
      postdata: {applyURL: 'https://www.gisphere.net/'},
    }
  },
  computed: {
    ...mapState({lang: 'language'}),
  },
  mounted() {
    // 请问填充内容的getPost函数和渲染移动端的函数有先后顺序吗？
    // 告知本页面开发人员（张心怡）后，请记得删除注释，thanks！
    // 为什么这里不加逗号？
    this.getPost()
    if(isMobile()){
      this.$router.push('/mobile'+this.$router.currentRoute.path);
    }
  },
  methods: {
    goPost(eventId){
      this.$router.push('/post/'+eventId.toString());
    },
    goPostList(){
      this.$router.push('../postList')
    },
    getPost(){
      // 首先获取id，注意是用const
      // const eventId = this.$route.query.id;
      // 测试时用1
      const eventId = 1;
      // 向后端发起请求，怎么解决跨域？正在学习中
      axios.get('http://43.154.149.214/api/post/'+eventId.toString()).then(res=>{
        // 把后端传回的data存到此文件的postdata中
        this.data = res.data.postdata;
      }).catch(error=>{
        console.log(error);
      });
    }
  }
}
</script>

<style scoped>
.main{
  width: 100%;
  height: 100%;
  background-color: rgb(241, 241, 241);
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
  position: absolute;
  padding-bottom: 60px;
  width: 1128px;
  left: 164px;
  top: 60px;
  background: #EBEEF5;
  border-radius: 0px;
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
  margin-top: 74px;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  text-align: left;
  color: rgba(48, 49, 51, 0.9);
}
</style>