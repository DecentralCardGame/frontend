import Vue from 'vue'
import $RefParser from 'json-schema-ref-parser'
import Notifications from 'vue-notification'
import VueSwing from 'vue-swing'
import VueCryptojs from 'vue-cryptojs'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

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

Vue.component('vue-swing', VueSwing)

function loadVue () {
  new Vue({
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
    loadVue()
  })

