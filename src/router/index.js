/* eslint-disable no-unused-vars */

import Vue from 'vue'
import Router from 'vue-router'

const GalleryPage = () => import('@/components/pages/GalleryPage')
const NewCardPage = () => import('@/components/pages/NewCardPage')
const AboutPage = () => import('@/components/pages/AboutPage')
const ImprintPage = () => import('@/components/pages/ImprintPage')
const TeamPage = () => import('@/components/pages/TeamPage')
const VotingPage = () => import('../components/pages/VotingPage')
const AccountPage = () => import('../components/pages/AccountPage')
const CardMinter = () => import('../components/pages/CardMinterPage')

Vue.use(Router)

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
      component: NewCardPage
    },
    {
      path: '/',
      name: 'About',
      component: AboutPage
    },
    {
      path: '/team',
      name: 'Team',
      component: TeamPage
    },
    {
      path: '/imprint',
      name: 'Imprint',
      component: ImprintPage
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
    },
    {
      path: '/cardminter/:id',
      name: 'CardMint',
      component: CardMinter
    }
  ],

  scrollBehavior (to, from, savedPosition) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ x: 0, y: 0 })
      }, 100)
    })
  }
})
