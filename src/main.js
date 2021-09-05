/*
 * @Author: your name
 * @Date: 2021-08-25 18:24:39
 * @LastEditTime: 2021-08-25 19:46:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \h5_online_editor\src\main.js
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'normalize.css/normalize.css'
import '@/styles/index.less'

import './plugins/element.js'

import PortalVue from 'portal-vue'

Vue.config.productionTip = false

Vue.use(PortalVue)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
