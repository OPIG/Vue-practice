import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import axios from './http'
import VConsole from 'vconsole/dist/vconsole.min.js'

Vue.config.productionTip = false
Vue.prototype.$axios = axios;
let vConsole = new VConsole()

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
