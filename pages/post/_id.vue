<template>
  <div class="main">
    <!-- 中文情况下 -->
    <div v-if="lang =='zh'" class="page-banner">
      <div class="prev-button">上一页</div>
      <div class="next-button">下一页</div>
      <div class="back2list-button">返回列表</div>
    </div>
    <!-- 英文情况下 -->
    <div v-if="lang =='en'" class="page-banner">
      <div class="prev-button">PREV</div>
      <div class="next-button">NEXT</div>
      <div class="back2list-button">Back to List</div>
    </div>
    <!-- 中文情况下 -->
    <div v-if="lang =='zh'" class="page-main">
      <div class="title">地理信息科学研究助理</div>
      <div class="detail">发布时间: 03 Feb 2022</div>
      <div class="detail">截止日期: 05 Mar 2022</div>
      <div class="detail">院校名称: 新加坡国立大学</div>
      <div class="detail">地理位置: 欧洲，英国，英格兰，伦敦</div>
      <div class="detail">招聘状态: <a href="">招募中</a></div>
      <div class="button" style="left: 68px">申请链接</div>
      <div class="button" style="left: 83px">联系邮箱</div>
      <div class="description">职位描述<br/>80 多年来，GfK 一直是世界上最大的公司和领先品牌的可靠和值得信赖的洞察合作伙伴，他们改变了每个消费者的生活——我们将继续在此基础上再接再厉。我们将数据、科学和创新的数字研究解决方案联系起来，为围绕消费者、市场、品牌和媒体的关键业务问题提供答案。我们的总部位于德国，业务遍及全球约 60 个国家/地区，您可以从我们拥有约 9,000 名员工的多元化社区的全球公司中受益。利用我们员工的力量，我们拥有的最大资产就是我们的员工。作为 GfK 的一部分，您可以将自己的未来掌握在自己手中。我们重视人才、技能和责任，并在我们的国际团队中支持您的发展。我们为我们的传统和我们的未来感到自豪：目前，我们正处于从传统市场研究公司转变为由创新技术支持的规范数据分析的可信赖提供商转型之旅的后期。这只有在非凡的人身上才有可能，这就是为什么我们正在寻找您来帮助创造我们的未来。对于我们的员工以及我们的客户，我们追求一个目标：从知识中成长！ GfK Marketing & Consumer Intelligence 正在寻找一位热情和有抱负的高级研究执行级别的候选人加入其品牌和消费者专家团队，因为对于一个雄心勃勃、有组织的研究人员来说，这是一个令人兴奋的机会，可以成为已建立团队的关键部分。与专家和专家一起工作，您将帮助向英国和全球的各种客户提供成功和高价值的品牌和消费者洞察力，涵盖电信、在线赌场和博彩、家居、汽车等众多行业，和媒体。</div>
    </div>
    <!-- 英文情况下 -->
    <div v-if="lang =='en'" class="page-main">
      <div class="title">GIS Research Analyst</div>
      <div class="detail">Publish Date: 03 Feb 2022</div>
      <div class="detail">Apply Deadline: 05 Mar 2022</div>
      <div class="detail">School: National University of Singapore</div>
      <div class="detail">Location: Europe, London, England, United Kingdom</div>
      <div class="detail">Status: <a href="">Active</a></div>
      <div class="button" style="left: 68px">Apply Link</div>
      <div class="button" style="left: 83px">Contact Email</div>
      <div class="description">Job Description<br/>
      For over 80 years, GfK has been a reliable and trusted insight partner for the world’s biggest companies and leading brands who make a difference in every consumer’s life - and we will continue to build on this. We connect data, science and innovative digital research solutions to provide answers for key business questions around consumers, markets, brands and media. With our headquarters in Germany and a presence in around 60 countries worldwide, you benefit from our global company with a diverse community of ~9,000 employees.<br/>
      Harnessing the power of our workforce, the greatest asset we have is our people. As part of GfK, you can take your future into your own hands. We value talent, skills and responsibility and support your development within our international teams. We are proud of our heritage and our future: Currently we are in the latter stages of a transformational journey from a traditional market research company to a trusted provider of prescriptive data analytics powered by innovative technology. This is only possible with extraordinary people and this is why we are looking for YOU to help create our future. For our employees as well as for our clients we pursue one goal: Growth from Knowledge!<br/>
      GfK Marketing & Consumer Intelligence is looking for an enthusiastic and ambitions Senior Research Executive level candidate to to join its team of brand and consumer specialists as<br/>
      This is an exciting opportunity for an ambitious and organised researcher to become a key part of an established team. Working alongside experts and specialists, you will be helping to deliver successful and highly valued brand and consumer insights to a diverse list of clients – both UK and global – covering a wide variety of industries from telecoms, online casinos and betting, home furnishings, automotive, and media.</div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex';
import {isMobile} from '@/utils/index'

export default {
  name: 'IndexPage',
  computed: {
    ...mapState({lang: 'language'}),
  },
  mounted() {
    if(isMobile()){
      this.$router.push('/mobile'+this.$router.currentRoute.path);
    }
  },
}
</script>

<style scoped>
.main{
  width: 100%;
  height: 100%;
  background-color: rgb(241, 241, 241);
  text-align: center;
}
.page-banner{
  position: absolute;
  width: 100%;
  height: 60px;
  left: 0px;
  top: 0px;
  background: #E4E7ED;
  box-shadow: 0px 0px 0px rgba(255, 255, 255, 0.12);
  border-radius: 4px;
}
.prev-button{
  /* div部分 */
  position: absolute;
  width: 101px;
  height: 32px;
  left: 210px;
  top: 14px;
  background: rgba(124, 227, 179, 0.5);
  border-radius: 15.9px 0px 0px 15.9px;
  /* 字体部分 */
  font-family: 'Segoe UI';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 30px;
  text-align: center;
  color: rgba(48, 49, 51, 0.75);
}
.next-button{
  position: absolute;
  width: 101px;
  height: 32px;
  left: 312px;
  top: 14px;
  background: rgba(124, 227, 179, 0.5);
  border-radius: 0px 15.9px 15.9px 0px;
  font-family: 'Segoe UI';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 30px;
  text-align: center;
  color: rgba(48, 49, 51, 0.75);
}
.back2list-button{
  position: absolute;
  width: 118px;
  height: 32px;
  left: 1163px;
  top: 14px;
  background: #E6A23C;
  border-radius: 15.9px;
  /* 字体部分 */
  font-family: 'Segoe UI';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 30px;
  text-align: center;
  color: rgba(48, 49, 51, 0.9);
}
.page-main{
  position: absolute;
  padding-bottom: 60px;
  width: 1128px;
  left: 164px;
  top: 60px;
  background: #EBEEF5;
  border-radius: 0px;
}
.title{
  position: relative;
  width: fit-content;
  height: 32px;
  left: 68px;
  top: 20px;
  margin-bottom: 27px;
  font-family: 'Segoe UI';
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
  text-align: left;
  color: rgba(48, 49, 51, 0.9);
}
.detail{
  position: relative;
  width: fit-content;
  height: 20px;
  left: 68px;
  margin: 5px 0;
  font-family: 'Segoe UI';
  font-style: normal;
  font-weight: 700;
  font-size: 13px;
  line-height: 20px;
  text-align: left;
  color: #909399;
}
.button{
  position: relative;
  float: left;
  width: fit-content;
  height: 40px;
  padding: 0 32px;
  margin: 10px 0 19px;
  background: #7CE3B3;
  border-radius: 24px;
  /* 字体部分 */
  font-family: 'Segoe UI';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 36px;
  text-align: center;
  color: rgba(0, 0, 0, 0.75);
}
.description{
  position: relative;
  width: 600px;
  left: 68px;
  margin-top: 74px;
  font-family: 'Segoe UI';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  text-align: left;
  color: rgba(48, 49, 51, 0.9);
}
</style>