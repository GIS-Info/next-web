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
          下一个大事件 <br />
          从这里开始。
        </div>
        <div v-if="lang =='en'" class="welcome-description">
          The next big thing <br />
          starts here.
        </div>

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
    font-family: 'Inter';
    font-style: normal;
    font-weight: 800;
    font-size: 50px;
    line-height: 60px;
    letter-spacing: -2px;
    color: #0073FF;

  }
  .welcome-description {
    border-top: 10px;
    font-family: 'Courier New', Courier, monospace;
    font-size: 20px;
    letter-spacing: 2px;
    color: #FFFFFF;
    /* border: 2px, solid, #FFFFFF; */
  }
</style>
