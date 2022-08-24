import App from './App'
import store from './store'
import { http } from '@/api/service.js'
// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
Vue.prototype.$http = http
Vue.prototype.$store=store
// uview-ui
import uView from '@/uni_modules/uview-ui'
Vue.use(uView)

App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
	  store,
    app
  }
}
// #endif