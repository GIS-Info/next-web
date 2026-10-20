<template>
  <Main lang="zh" />
</template>

<script>
import { mapState } from 'vuex'
import Main from './components/Main'

export default {
  name: 'SchoolZh',
  components: {
    Main,
  },
  data() {
    return {}
  },
  head() {
    return {
      title: 'GISphere | GIS 留学院校指南',
    }
  },
  computed: {
    ...mapState({ lang: 'language' }),
  },
  watch: {
    lang(val){
      if(val === 'en'){
        this.$router.push('/school');
      }
    }
  },
  mounted() {
    if(this.lang === 'en') {
      this.$router.push('/school');
    }
  },
  methods: {},
}
</script>

<style scoped>
</style>
