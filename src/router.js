/* eslint-disable no-unused-vars */

import Vue from 'vue'
import Router from 'vue-router'

const GalleryPage = () => import('@/pages/GalleryPage')
const NewCardPage = () => import('@/pages/NewCardPage')
const AboutPage = () => import('@/pages/AboutPage')
const LandingPage = () => import('@/pages/LandingPage')
const ImprintPage = () => import('@/pages/ImprintPage')
const TeamPage = () => import('@/pages/TeamPage')
const HowToPlayPage = () => import('@/pages/HowToPlayPage')
const VotingPage = () => import('@/pages/VotingPage')
const AccountPage = () => import('@/pages/AccountPage')
const CardMinter = () => import('@/pages/CardMinterPage')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'About',
      meta: { layout: "default2" },
      component: AboutPage
    },
    {
      path: '/gallery',
      name: 'Gallery',
      component: GalleryPage
    },
    {
      path: '/newcard',
      name: 'New Card',
      component: NewCardPage,
      meta: { layout: "default" },
    },
    {
      path: '/landing',
      name: 'Landing',
      meta: { layout: "landing" },
      component: LandingPage,
    },
    {
      path: '/howtoplay',
      name: 'How To Play',
      component: HowToPlayPage,
      meta: { layout: "default3" },
    },
    {
      path: '/team',
      name: 'Team',
      component: TeamPage,
      meta: { layout: "default2" },
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
