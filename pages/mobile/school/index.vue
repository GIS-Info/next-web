<template>
  <Main lang="en" />
</template>

<script>
import { mapState } from 'vuex'
import Main from './components/Main'

export default {
  name: 'schoolEn-mobile',
  components: {
    Main,
  },
  layout: 'mobile',
  fetchKey: 'SchoolInfo',
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
  mounted() {},
  methods: {
  },
}
</script>

<style></style>
