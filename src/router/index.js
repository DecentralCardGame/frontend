import Vue from 'vue'
import Router from 'vue-router'
import GalleryPage from '@/components/pages/GalleryPage'
import NewCardPage from '@/components/pages/NewCardPage'
import AboutPage from '@/components/pages/AboutPage'
import LoginPage from '@/components/pages/LoginPage'
import RegisterPage from '@/components/pages/RegisterPage'
import VotingPage from '../components/pages/VotingPage'
import AccountPage from '../components/pages/AccountPage'
import CardMinter from '../components/pages/CardMinterPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Gallery',
      component: GalleryPage
    },
    {
      path: '/newcard',
      name: 'New Card',
      component: NewCardPage
    },
    {
      path: '/about',
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
      name: 'Registrieren',
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
      component: CardMinter
    }
  ]
})
