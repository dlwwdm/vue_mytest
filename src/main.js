import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'
import axios from 'axios'

Vue.config.productionTip = false
Vue.prototype.$http = axios
// 配置请求根路径
axios.defaults.baseURL = 'http://localhost:8081/'

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
