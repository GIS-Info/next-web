<script>
import GistoryDetail from '../../gistory/detail.vue'

// 复用桌面端 GIStory 详情页，返回时回到移动端列表
export default {
  name: 'MobileGistoryDetail',
  extends: GistoryDetail,
  layout: 'mobile',
  methods: {
    goBack() {
      if (window.history.length > 1) {
        this.$router.back()
      } else {
        this.$router.push('/mobile/gistory')
      }
    },
  },
}
</script>
