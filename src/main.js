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

const base = axios.create({
  baseURL: process.env.VUE_APP_BLOCKCHAIN_API,
  localURL: 'localhost:1317'
})
const authAPI = axios.create({
  baseURL: process.env.VUE_APP_AUTH_API
})

Vue.prototype.$http = base
Vue.prototype.$hottub = authAPI


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
      $RefParser.dereference( '/cardSchema/cardSchema.json', (err, api) => {
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

