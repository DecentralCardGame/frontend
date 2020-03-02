// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import $RefParser from 'json-schema-ref-parser'
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
  localURL: 'localhost:1317'
})

Vue.prototype.$http = base

Vue.use(vueNcform)
Vue.use(Notifications)
Vue.component('vue-swing', VueSwing)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  data: {
  },
  components: { App },
  template: '<App/>'
})

$RefParser.dereference('/static/cardSchema/cardSchema.json', (err, api) => {
  if (err) {
    console.log(err)
  } else {
    Vue.prototype.$cardSchema = api
    console.log('cardSchema: ', api)
  }
})
