import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    jwt: '',
    credits: -1,
    mnemonic: '',
    address: '',
    cardCreatorDraft: {},
    loading: false,
    displayLogin: false
  },
  mutations: {
    logout (state) {
      state.jwt = ''
      state.mnemonic = ''
      state.address = ''
      state.credits = -1
    },
    setUserToken (state, token) {
      state.jwt = token
    },
    setUserMnemonic (state, mnemonic) {
      state.mnemonic = mnemonic
    },
    setUserAddress (state, address) {
      state.address = address
    },
    setUserCredits (state, credits) {
      state.credits = credits
    },
    setCardCreatorDraft (state, draft) {
      state.cardCreatorDraft = draft
    },
    setCardCreatorDraftModel (state, model) {
      state.cardCreatorDraft.model = model
    },
    setCardCreatorDraftImg (state, img) {
      state.cardCreatorDraft.img = img
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
    getUserAddress: state => {
      return state.address
    },
    getUserCredits: state => {
      return state.credits
    },
    getCardCreatorDraft: state => {
      return state.cardCreatorDraft
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
