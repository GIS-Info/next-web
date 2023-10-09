<template>
  <Main lang="zh" />
</template>

<script>
import { mapState } from 'vuex'
import Main from './components/Main'

export default {
  name: 'SchoolZh',
  fetchKey: 'SchoolInfoZh',
  components: {
    Main,
  },
  data() {
    return {}
  },
  async fetch() {},
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
