import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    jwt: '',
    mnemonic: '',
    loading: false
  },
  mutations: {
    logout (state) {
      state.jwt = ''
      state.mnemonic = ''
    },
    setUserToken (state, token) {
      state.jwt = token
    },
    setUserMnemonic (state, mnemonic) {
      state.mnemonic = mnemonic
    },
    setLoading (state, loading) {
      state.loading = loading
    }
  },
  getters: {
    getUserToken: state => {
      return state.jwt
    },
    getUserMnemonic: state => {
      return state.mnemonic
    },
    loggedIn: state => {
      return state.jwt !== ''
    }
  },
  actions: {
  },
  modules: {
  }
})
