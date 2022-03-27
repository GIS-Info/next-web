<template>
  <div class="main">
    <div class="welcome-page">
      <map-background />
      <div class="welcome-content">
        <div v-if="lang == 'zh'" class="welcome-heading">
          在此寻找<br/>
          最激动人心的地理信息系统学术职位
        </div>
        <div v-if="lang == 'en'" class="welcome-heading">
          Find the most<br/>
          exciting GIS academic positions
        </div>
        <div v-if="lang =='zh'" class="welcome-description">
          下一个大事件，<br />
          从这里开始。
        </div>
        <div v-if="lang =='en'" class="welcome-description">
          The next big thing <br />
          starts here.
        </div>
        <div v-if="lang =='zh'" class="welcome-buttons">
          <el-button class="explore-hirings">浏览招聘</el-button>
          <el-button class="explore-programs">探索项目</el-button>
        </div>
        <div v-if="lang =='en'" class="welcome-buttons">
          <el-button class="explore-hirings">Explore Hirings</el-button>
          <el-button class="explore-programs">Explore Programs</el-button>
        </div>
      </div>
        <div v-if="lang =='zh'" class="contact-us">
          <el-button type="info" round class="contact-us-button">联系我们/加入我们</el-button>
        </div>
        <div v-if="lang =='en'" class="contact-us">
          <el-button type="info" round class="contact-us-button">Contact Us / Join Us</el-button>
        </div>
    </div>
    <div class="introduce-page">
      What is included?
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
  name: 'IndexPage',
  computed: {
    ...mapState({lang: 'language'}),
  },
}
</script>

<style scoped>
  .main{
    width: 100%;
    height: 100%;
  }
  .welcome-page{
    height:100%;
    width:100%;
  }
  .introduce-page{
    height:auto;
    width:100%;
  }
  .welcome-content{
    position: absolute;
    left: calc((492/1440)*100vw);
    margin-left: -399px;
    top: calc((427/1080)*100vh);
    margin-top: -136px;
    width: 798px;
    height: 272px;
    border: 2px solid #900000;
  }
  .welcome-heading{
    font-style: normal;
    font-weight: 800;
    font-size: 50px;
    line-height: 60px;
    letter-spacing: -2px;
    color: #0073FF;

  }
  .welcome-description {
    margin-top: 15px;
    font-size: 20px;
    letter-spacing: 2px;
    color: #FFFFFF;
  }
  .welcome-buttons {
    margin-top: 39px;
  }
  .explore-hirings {
    border-color: #FFFFFF;
    background-color: #FFFFFF;
    color: #0073FF;
  }

  .explore-programs {
    border-color: #0073FF;
    background-color: transparent;
    color: #0073FF;
  }
  .explore-hirings:active,
  .explore-hirings:hover,
  .explore-programs:active,
  .explore-programs:hover {
    border-color: #0073FF;
    background-color: #0073FF;
    color: #FFFFFF;
    transition: 300ms ease-in-out;
  }
  .contact-us {
    position:absolute;
    top: 600px; 
    right: 40px;
  }
  .contact-us-button {
    background-color: #909399;
    border-color: transparent;
  }
  .contact-us-button:active,
  .contact-us-button:hover {
    background-color: #C0C4CC;
  }
</style>
