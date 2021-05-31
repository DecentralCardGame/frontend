import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

export default new Vuex.Store({
  plugins: [vuexLocal.plugin],
  state: {
    jwt: '',
    credits: -1,
    mnemonic: '',
    address: '',
    cardCreatorDraft: {},
    cardCreatorEditCard: {},
    galleryFilter: {
      visible: false,
      owner: "",
      status: "",
      cardType: "",
      classes: "",
      sortBy: "",
      nameContains: "",
      notesContains: "",
      cardsPerPage: 30,
    },
    loading: false,
    displayLogin: false,
    lastInputEvent: {},
    showTopLogo: false,
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
    setCardCreatorEditCard (state, draft) {
      state.cardCreatorEditCard = draft
    },
    setCardCreatorEditCardModel (state, model) {
      state.cardCreatorEditCard.model = model
    },
    setCardCreatorEditCardImg (state, img) {
      state.cardCreatorEditCard.img = img
    },
    setGalleryFilter (state, filter) {
      state.galleryFilter = filter
    },
    toggleGalleryFilter (state) {
      state.galleryFilter.visible = !state.galleryFilter.visible
    },
    setLoading (state, loading) {
      state.loading = loading
    },
    toggleLoginBox (state) {
      state.displayLogin = !state.displayLogin
    },
    setLastInputEvent (state, event) {
      state.lastInputEvent = event
    },
    setShowTopLogo (state, show) {
      state.showTopLogo = show
    },
  },
  getters: {
    getUserToken: state => {
      return state.jwt
    },
    getUserInfo: state => {
      var base64Url = state.jwt.split('.')[1];
      var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      return JSON.parse(jsonPayload);
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
    getCardCreatorEditCard: state => {
      return state.cardCreatorEditCard
    },
    getGalleryFilter: state => {
      return state.galleryFilter
    },
    loggedIn: state => {
      return state.jwt !== ''
    },
    loginBoxVisible: state => {
      return state.displayLogin
    },
    getLastInputEvent: state => {
      return state.getLastInputEvent
    },
    showTopLogo: state => {
      return state.showTopLogo
    }
  },
  actions: {
  },
  modules: {
  }
})
