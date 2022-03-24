// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import MonthPicker from './MonthPicker.vue'
import MonthPickerInput from './MonthPickerInput.vue'

Vue.config.productionTip = false

/* eslint-disable no-new */



new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})

function plugin(Vue) {
  Vue.component('month-picker', MonthPicker)
  Vue.component('month-picker-input', MonthPickerInput)
}

// Install by default if using the script tag
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
}

export default plugin

export {
  MonthPicker,
  MonthPickerInput
}
