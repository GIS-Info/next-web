<template>
  <div>
    <p>GIS-Info院校指南公益项目发起于2019年9月，旨在提供及时且全面的全球GIS及相关专业院校信息。信息由来自世界各地GIS及城市规划等相关专业名校的在读学生、近期毕业校友或青年教师提供，内容主要包括各院系的优势科研方向、开设学位和导师信息。希望这份指南能为有留学意向的GIS相关专业朋友们提供帮助和支持。</p>
    「GISphere｜院校指南」暂不支持移动端访问，建议通过PC端访问本页面 gisphere.info/school
    或查看移动端 <el-button type="text" @click="goPostList"> GISphere 招生资讯 </el-button>
  </div>
</template>

<script>
export default {
  layout: 'mobile',
  head() {
    return {
      title: 'GISphere | Institution Guide',
    }
  },
  mounted() { },
  methods: {
    goPostList() {
      this.$router.push('/mobile/postList');
    }
  }
}
</script>

<style>

</style>