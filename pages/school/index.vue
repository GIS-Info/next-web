<template>
  <Main lang="en" />
</template>

<script>
import { mapState } from 'vuex'
import Main from './components/Main'

export default {
  name: 'School',
  fetchKey: 'SchoolInfo',
  components: {
    Main,
  },
  data() {
    return {}
  },
  async fetch() {},
  head() {
    return {
      title: 'GISphere | Institution Guide',
    }
  },
  computed: {
    ...mapState({ lang: 'language' }),
  },
  watch: {
    lang(val){
      if(val === 'zh'){
        this.$router.push('/school/zh');
      }
    }
  },
  mounted() {
    if(this.lang === 'zh') {
      this.$router.push('/school/zh');
    }
  },
  methods: {},
}
</script>

<style scoped>
</style>
