<script>
import SuggestionPage from '../../suggestion/index.vue'

// 复用桌面端"信息更新"页（样式已自适应），仅改用移动端布局
export default {
  name: 'MobileSuggestionPage',
  extends: SuggestionPage,
  layout: 'mobile',
}
</script>
