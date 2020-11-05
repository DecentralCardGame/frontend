import Vue from 'vue'
import $RefParser from 'json-schema-ref-parser'
import Notifications from 'vue-notification'
import VueSwing from 'vue-swing'
import VueCryptojs from 'vue-cryptojs'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import * as R from 'ramda'
Object.defineProperty(Vue.prototype, 'R', { value: R });
import cardChain from './plugins/cardChain'

Vue.config.productionTip = false

Vue.prototype.$http = axios.create({
  baseURL: process.env.VUE_APP_BLOCKCHAIN_API,
  localURL: 'localhost:1317'
})

Vue.prototype.$hottub = axios.create({
  baseURL: process.env.VUE_APP_AUTH_API
})

Vue.use(Notifications)
Vue.use(VueCryptojs)
Vue.use(cardChain)

Vue.component('vue-swing', VueSwing)

function loadVue () {
  return new Vue({
      router,
      store,
      render: h => h(App)
  }).$mount('#app')
}

new Promise(
  function (resolve, reject) {
      $RefParser.dereference( '/cardRules/cardRules.json', (err, api) => {
        if (err) {
          reject(err)
        } else {
          resolve(api)
          console.log('cardRules: ', api)
        }
      })
    })
  .then(rules => {
    Vue.prototype.$cardRules = rules
    
    let vm = loadVue()
    
    Vue.prototype.$cardChain = vm.cardChain()
    //vm.prototype.cardChain = vm.cardChain()
    console.log('vm', vm)
  })

Vue.mixin({
  methods: {
    notifyFail: R.curry(function (title, text) {
      Vue.notify({
        group: 'fail',
        title: title,
        text: text,
        duration: 5000
      })
    }),
    notifySuccess: R.curry(function (title, text) {
      Vue.notify({
        group: 'success',
        title: title,
        text: text,
        duration: 5000
      })
    }),
    notifyInfo: R.curry(function (title, text) {
      Vue.notify({
        group: 'info',
        title: title,
        text: text,
        duration: 5000
      })
    })
  }
})