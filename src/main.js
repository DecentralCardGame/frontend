// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import $RefParser from 'json-schema-ref-parser'
import Vue from 'vue'
import vueNcform from '@ncform/ncform'
import Notifications from 'vue-notification'
import VueSwing from 'vue-swing'
import VueCryptojs from 'vue-cryptojs'
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
Vue.use(VueCryptojs)
Vue.component('vue-swing', VueSwing)

function loadVue () {
  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    data: {
    },
    components: { App },
    template: '<App/>'
  })
}

new Promise(
  function (resolve, reject) {
    $RefParser.dereference('/static/cardSchema/cardSchema.json', (err, api) => {
      if (err) {
        reject(err)
      } else {
        resolve(api)
        console.log('cardSchema: ', api)
      }
    })
  })
  .then(schema => {
    Vue.prototype.$cardSchema = schema
    loadVue()
  })
