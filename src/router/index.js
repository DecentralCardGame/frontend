import Vue from 'vue'
import Router from 'vue-router'
import $RefParser from 'json-schema-ref-parser'
const GalleryPage = () => import('@/components/pages/GalleryPage')
const NewCardPage = () => import('@/components/pages/NewCardPage')
const AboutPage = () => import('@/components/pages/AboutPage')
const VotingPage = () => import('../components/pages/VotingPage')
const AccountPage = () => import('../components/pages/AccountPage')
const CardMinter = () => import('../components/pages/CardMinterPage')
import store from "@/store/index"

Vue.use(Router)

function fetchCardSchema(to, from, next) {
  if(!Vue.prototype.$cardSchema) {
    store.commit('setLoading', true)
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
        store.commit('setLoading', false)
        next()
      })
  } else {
    next()
  }
}

export default new Router({
  routes: [
    {
      path: '/gallery',
      name: 'Gallery',
      component: GalleryPage
    },
    {
      path: '/newcard',
      name: 'New Card',
      component: NewCardPage,
      beforeEnter: (to, from, next) => fetchCardSchema(to,from,next)
    },
    {
      path: '/',
      name: 'About',
      component: AboutPage
    },
    {
      path: '/me',
      name: 'Account',
      component: AccountPage
    },
    {
      path: '/vote',
      name: 'Vote',
      component: VotingPage
    },
    {
      path: '/cardminter',
      name: 'CardMinter',
      component: CardMinter,
      beforeEnter: (to, from, next) => fetchCardSchema(to,from,next)
    }
  ]
})
