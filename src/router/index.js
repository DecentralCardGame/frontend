import { createRouter, createWebHashHistory } from 'vue-router'
import Index from '@/views/generated/Index.vue'
import Types from '@/views/generated/Types.vue'
import Relayers from '@/views/generated/Relayers.vue'

const GalleryPage = () => import('@/views/GalleryPage')
const VotingResultsPage = () => import('@/views/VotingResultsPage')
const NewCardPage = () => import('@/views/NewCardPage')
const AboutPage = () => import('@/views/AboutPage')
const NotFound = () => import('@/views/NotFound')
const RoadmapPage = () => import('@/views/RoadmapPage')
const LandingPage = () => import('@/views/LandingPage')
const ImprintPage = () => import('@/views/ImprintPage')
const TeamPage = () => import('@/views/TeamPage')
const HowToPlayPage = () => import('@/views/HowToPlayPage')
const VotingPage = () => import('@/views/VotingPage')
const CardView = () => import('@/views/CardViewPage')
const UserView = () => import('@/views/UserView')
const SteakDrop = () => import('@/views/SteakDropPage')
const BoosterPacks = () => import('@/views/BoosterPacks')
const Collections = () => import('@/views/Collections')

const routes = [
  {
    path: '/about',
    name: 'About',
    meta: { layout: "default" },
    component: AboutPage
  },
  {
    path: '/roadmap',
    name: 'Roadmap',
    meta: { layout: "default" },
    component: RoadmapPage
  },
  {
    path: '/steakdrop',
    name: 'Steakdrop',
    meta: { layout: "default" },
    component: SteakDrop
  },
  {
    path: '/gallery',
    name: 'Gallery',
    component: GalleryPage
  },
  {
    path: '/votingresults',
    name: 'VotingResults',
    component: VotingResultsPage
  },
  {
    path: '/newcard',
    name: 'New Card',
    component: NewCardPage,
    meta: { layout: "default" },
  },
  {
    path: '/',
    name: 'Landing',
    meta: { layout: "Landing" },
    component: LandingPage,
  },
  {
    path: '/howtoplay',
    name: 'How To Play',
    component: HowToPlayPage
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
    path: '/vote',
    name: 'Vote',
    component: VotingPage
  },
  {
    path: '/cardview/:id',
    name: 'CardView',
    component: CardView
  },
  {
    path: '/user/:id',
    name: 'UserView',
    component: UserView
  },
  {
    path: '/packs',
    name: 'BoosterPacks',
    component: BoosterPacks
  },
  {
    path: '/collections/:id',
    name: 'Collections',
    component: Collections
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  },
]

const delay = (t) => new Promise((r) => setTimeout(r, t))

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  async scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      await delay(0)
      return { top: 0, behavior: 'smooth'}
    }
  },
})

export default router
