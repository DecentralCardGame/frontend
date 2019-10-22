// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import vueNcform from '@ncform/ncform'
import Notifications from 'vue-notification'
import VueSwing from 'vue-swing'
import App from './App'
import router from './router'

Vue.config.productionTip = false

Vue.use(vueNcform)
Vue.use(Notifications)
Vue.component('vue-swing', VueSwing)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  data: {
    apiURL: 'http://v220190910354396996.luckysrv.de:1500',
    chainID: 'testCardchain'
  },
  components: { App },
  template: '<App/>'
})
