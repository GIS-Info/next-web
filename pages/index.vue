<template>
  <div class="main">
    <b>todo: 这里是主页 展示文章列表</b>
    <MapBackground />
  </div>
</template>

<script>
import MapBackground from '@/components/MapBackground/index.vue'
export default {
  name: 'IndexPage',
  components: {
    MapBackground
  }
}
</script>

<style scoped>
.main{
  width: 100%;
  height: 100%;
}
</style>
