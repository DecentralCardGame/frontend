import Vue from 'vue'
import Router from 'vue-router'
import $RefParser from 'json-schema-ref-parser'
const GalleryPage = () => import('@/components/pages/GalleryPage')
const NewCardPage = () => import('@/components/pages/NewCardPage')
const AboutPage = () => import('@/components/pages/AboutPage')
const LoginPage = () => import('@/components/pages/LoginPage')
const RegisterPage = () => import('@/components/pages/RegisterPage')
const VotingPage = () => import('../components/pages/VotingPage')
const AccountPage = () => import('../components/pages/AccountPage')
const CardMinter = () => import('../components/pages/CardMinterPage')

Vue.use(Router)

function fetchCardSchema(to, from, next) {
  if(!Vue.prototype.$cardSchema) {
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
      path: '/login',
      name: 'Log In',
      component: LoginPage
    },
    {
      path: '/register',
      name: 'Register',
      component: RegisterPage
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
