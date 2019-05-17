import Vue from 'vue'
import Router from 'vue-router'
import GalleryPage from '@/components/pages/GalleryPage'
import NewCardPage from '@/components/pages/NewCardPage'
import AboutPage from '@/components/pages/AboutPage'
import LoginPage from '@/components/pages/LoginPage'
import RegisterPage from '@/components/pages/RegisterPage'

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
    }
  ]
})
