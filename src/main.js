// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import vueNcform from '@ncform/ncform'
import App from './App'
import router from './router'

Vue.config.productionTip = false

Vue.use(vueNcform)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  data: {
    apiURL: 'http://192.168.50.102:1317',
    chainID: 'testCardchain'
  },
  components: { App },
  template: '<App/>'
})
