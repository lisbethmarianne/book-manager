import Vue from 'vue'
import vSelect from 'vue-select'

import App from './App.vue'
import router from './router'
import store from './store/index.js'

import './assets/normalize.css'
import './assets/skeleton.css'

Vue.component('v-select', vSelect)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
