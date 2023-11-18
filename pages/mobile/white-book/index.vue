<template>
  <div>
    <p>为了全面洞察 GIS 及相关方向的海外留学录取情况和趋势，自 2021 年起，GISphere 基于社群的问卷调查年推出 GISphere 大数据报告白皮书。我们还汇总了来自中国的地理信息相关专业留学生的申请背景信息和留学目的地的空间分布，通过问卷调查和定量方法，首次分析了影响中国学生申请和选择海外 GIS 研究生项目因素，比如大学和导师的排名及声誉、目的地城市的安全性等，该内容已发表于 GIS 领域旗舰刊物 Transactions in GIS。</p>
    「GISphere｜白皮书」暂不支持移动端访问，建议通过PC端访问本页面 gisphere.info/white-book
    或查看移动端 <el-button type="text" @click="goPostList"> GISphere 招生资讯 </el-button>
  </div>
</template>

<script>
export default {
  layout: 'mobile',
  head() {
    return {
      title: 'GISphere | ' +
        this.lang === 'en' ? 'Global Admission Annual Review' : '留学指南-大数据报告白皮书',
    }
  },
  mounted() {},
  methods: {
    goPostList() {
      this.$router.push('/mobile/postList');
    }
  }
}
</script>

<style>

</style>