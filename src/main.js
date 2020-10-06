import Vue from 'vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueCookies from 'vue-cookies'
import BootstrapVue from 'bootstrap-vue'
import App from './App.vue'

import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(VueCookies)
Vue.use(VueAxios, axios)
Vue.config.productionTip = false
axios.defaults.baseURL = 'http://localhost:8001/api'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
