import Vue from 'vue'
import App from './App.vue'
import {stores} from './store/store.js'

new Vue({
  store:stores,
  el: '#app',
  render: h => h(App)
})
