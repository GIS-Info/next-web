<template>
  <div>
    移动端页面仍在建设中，建议通过PC端访问本网站 gisphere.info
    <el-button></el-button>
  </div>
</template>

<script>
export default {
  layout: 'mobile',
  mounted() {
    this.$router.push('/mobile/postList');
  },
}
</script>

<style>

</style>