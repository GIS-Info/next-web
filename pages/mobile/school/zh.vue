<template>
  <Main lang="zh" />
</template>

<script>
import { mapState } from 'vuex'
import Main from './components/Main'

export default {
  name: 'schoolZn-mobile',
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
    lang(val) {
      if (val === 'en') {
        this.$router.push('/school')
      }
    },
  },
  mounted() {},
  methods: {},
}
</script>

<style></style>
