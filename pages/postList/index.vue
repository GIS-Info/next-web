<template>
 <div>
   文章列表页
 </div>
</template>
<script>
import {isMobile} from '@/utils/index'
export default {
  mounted() {
    if(isMobile()){
      this.$router.push('/mobile'+this.$router.currentRoute.path);
    }
  },
}
</script>
<style scoped>
</style>