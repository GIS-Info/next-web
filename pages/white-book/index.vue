<template>
  <div class="main-container">
    <div class="content">
      <h1 style="color:#53389e">{{ lang == 'zh' ? 'GISphere 留学指南-大数据报告白皮书' : 'GISphere Global Admission Annual Review' }}</h1>
      <p v-if="lang == 'zh'">为了全面洞察 GIS 及相关方向的海外留学录取情况和趋势，自 2021 年起，GISphere 基于社群的问卷调查年推出 GISphere 大数据报告白皮书。我们还汇总了来自中国的地理信息相关专业留学生的申请背景信息和留学目的地的空间分布，通过问卷调查和定量方法，首次分析了影响中国学生申请和选择海外 GIS 研究生项目因素，比如大学和导师的排名及声誉、目的地城市的安全性等，该内容已发表于 GIS 领域旗舰刊物 <i>Transactions in GIS</i>*。</p>
      <p v-else>Since 2021, We provides <i>GISphere Global Admission Annual Review</i>, based on community-based questionnaire surveys. Application background information and spatial distribution of study abroad destinations of students in geographical information related majors from China are summarized in the papers. This study can also been found in <i>Transactions in GIS</i>*。</p>
      <p>* <a href="https://onlinelibrary.wiley.com/doi/full/10.1111/tgis.13037"><i>Choosing GIS graduate programs from afar: Chinese students' perspectives</i></a></p>
      <br/>
      <div class="time-line">
        <div v-for="item in jsonData['white-book']" :key="item.year">
          <h2>YEAR {{ item.year }}</h2>
          <p><a :href="item.url">{{ item.url }}</a></p>
          <embed class="pdf" :src="item.url">
          <br/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import jsonData from './data.json'

export default {
  name: 'WhiteBook',
  data() {
    return {
      jsonData,
    }
  },
  async fetch() { },
  head() {
    return {
      title: 'GISphere | ' +
        this.lang === 'en' ? 'Global Admission Annual Review' : '留学指南-大数据报告白皮书',
    }
  },
  computed: {
    ...mapState({ lang: 'language' }),
  },
  mounted() {
  },
  methods: {},
}
</script>

<style scoped>
.main-container {
  width: 100%;
  height: 100%;
  background: #ebeef5;
  text-align: center;
  position: absolute;
  overflow: auto;
  padding-top: 40px;
}
.content {
  padding-bottom: 60px;
  width: 60%;
  margin: 0 auto;
  background: #ebeef5;
  border-radius: 0px;
  word-wrap: break-word;
  text-align: left;
}
.time-line{
  border-left: 10px solid #a08202;
  padding-left: 30px;
  padding-bottom: 30px;
  margin-bottom: 100px;
}
.pdf{
  width: 100%;
  height: 70vh;
}
a{
  text-decoration: none;
  color: rgb(60, 101, 166);
}
a:hover{
  background-color: rgb(198, 212, 235);
}
</style>
