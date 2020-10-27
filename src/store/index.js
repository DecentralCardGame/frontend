import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    jwt: '',
    credits: -1,
    mnemonic: '',
    loading: false,
    displayLogin: false
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
    setUserCredits (state, credits) {
      state.credits = credits
    },
    setLoading (state, loading) {
      state.loading = loading
    },
    toggleLoginBox (state) {
      state.displayLogin = !state.displayLogin
    }
  },
  getters: {
    getUserToken: state => {
      return state.jwt
    },
    getUserMnemonic: state => {
      return state.mnemonic
    },
    getUserCredits: state => {
      return state.credits
    },
    loggedIn: state => {
      return state.jwt !== ''
    },
    loginBoxVisible: state => {
      return state.displayLogin
    }
  },
  actions: {
  },
  modules: {
  }
})
