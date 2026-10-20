<script>
import GistoryPage from '../../gistory/index.vue'

// 复用桌面端 GIStory 列表（样式已自适应），仅改用移动端布局与路由
export default {
  name: 'MobileGistoryPage',
  extends: GistoryPage,
  layout: 'mobile',
  methods: {
    goToDetail(file) {
      const encodedUrl = encodeURIComponent(file.url)
      this.$router.push(`/mobile/gistory/detail?url=${encodedUrl}`)
    },
  },
}
</script>
