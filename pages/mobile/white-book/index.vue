<template>
  <div>
    GISphere移动端仍在建设中，建议通过PC端访问本网站 gisphere.info
    或查看移动端 <el-button type="text" @click="goPostList"> GISphere 招生资讯 </el-button>
  </div>
</template>

<script>
export default {
  layout: 'mobile',
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