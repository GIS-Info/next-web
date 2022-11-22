<!-- eslint-disable vue/no-v-html -->
<template>
  <div class="main-container">
    <!-- 中文情况下 -->
    <div v-if="lang =='zh'" class="post-content">
      <div class="content-title">{{ postdata.title_cn || '-' }}</div>
      <div class="content-detail">发布时间: <span class="normal">{{ postdata.date || '-' }}</span></div>
      <div class="content-detail">院校名称: <span class="normal">{{ postdata.university_cn || '-' }}</span></div>
      <div class="content-detail">地理位置: <span class="normal">{{ postdata.country_cn || '-' }}</span></div>
      <div class="content-detail">岗位类型: <span class="normal">{{ postdata.job_cn || '-' }}</span></div>
      <div class="content-description"><p>职位描述</p><div v-html="description"></div></div>
    </div>

    <!-- 英文情况下 -->
    <div v-if="lang =='en'" class="post-content">
      <div class="content-title">{{ postdata.title_en || 'unknown' }}</div>
      <div class="content-detail">Publish Date: <span class="normal">{{ postdata.date || 'unknown' }}</span></div>
      <div class="content-detail">School: <span class="normal">{{ postdata.university_en || 'unknown' }}</span></div>
      <div class="content-detail">Location: <span class="normal">{{ postdata.country_en || 'unknown' }}</span></div>
      <div class="content-detail">Type: <span class="normal">{{ postdata.job_en || 'unknown' }}</span></div>
      <div class="content-description"><p>Job Description</p><div v-html="description"></div></div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  layout: 'mobile',
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
    getStatusCN(){
      if(this.postdata.status){
        return '招募中';
      } else {
        return '已截止';
      }
    },
    // 英文模式下，招募状态情况
    getStatusEN(){
      if(this.postdata.status){
        return 'Active';
      } else {
        return 'Closed';
      }
    },
    description() {
      // 将\n替换为<br/>，为url增加<a>
      return this.postdata?.description?.replace(/\\n/gm,'<br/>').replace(/(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/gm, "<a href='$1$2'>$1$2</a>") || '';
    }
  },
}
</script>

<style scoped>

.main-container{
  width: 100%;
  height: 100%;
  overflow: scroll;
  background: #EBEEF5;
  text-align: center;
}

.post-content{
  padding-bottom: 60px;
  width: 100%;
  top: 60px;
  background: #EBEEF5;
  border-radius: 0px;
  word-wrap: break-word;
}
.content-title{
  margin-top: 30px;
  margin-left: 30px;
  margin-right: 30px;
  margin-bottom: 27px;
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
  text-align: left;
  color: rgba(48, 49, 51, 0.9);
}
.content-detail{
  margin-left: 30px;
  margin-right: 30px;
  font-style: normal;
  font-weight: 700;
  font-size: 13px;
  line-height: 20px;
  text-align: left;
  color: #909399;
}
.content-description{
  margin-left: 30px;
  margin-right: 30px;
  margin-top: 40px;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  text-align: left;
  color: rgba(48, 49, 51, 0.9);
}
</style>
