import Vue from 'vue'
import App from './App.vue'
import './assets/styles/reset.scss'
import './assets/styles/fonts.css'
import ElementUI from 'element-ui'
import store from './store'
import router from './router'
import axios from './common/axio'
window.$ajax = axios;

Vue.use(ElementUI)

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')