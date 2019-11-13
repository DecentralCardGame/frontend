// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import vueNcform from '@ncform/ncform'
import Notifications from 'vue-notification'
import VueSwing from 'vue-swing'
import App from './App'
import router from './router'
import * as axios from 'axios'

Vue.config.productionTip = false

const base = axios.create({
  baseURL: process.env.VUE_APP_BLOCKCHAIN_API,
  localURL: 'localhost:1317',
  altURL: 'http://78.46.200.30'
})

Vue.prototype.$http = base

Vue.use(vueNcform)
Vue.use(Notifications)
Vue.component('vue-swing', VueSwing)

Vue.component('modal', {
  template: '#modal-template'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  data: {
  },
  components: { App },
  template: '<App/>'
})
