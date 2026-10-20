<script>
import CalendarPage from '../../calendar/index.vue'

// 日历功能尚未上线（桌面端同为占位页），这里仅保证移动端路由可达
export default {
  name: 'MobileCalendarPage',
  extends: CalendarPage,
  layout: 'mobile',
}
</script>
