<template>
<div>

</div>
</template>
<script>
export default {
  created(){
      const json = require('./map.json')
      const arr = json.data.split(',')
      console.log(arr)
  }
}
</script>
<style scoped>
</style>