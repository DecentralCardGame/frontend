import { createRouter, createWebHashHistory } from 'vue-router'
import Index from '@/views/generated/Index.vue'
import Types from '@/views/generated/Types.vue'
import Relayers from '@/views/generated/Relayers.vue'

const GalleryPage = () => import('@/views/GalleryPage')
const VotingResultsPage = () => import('@/views/VotingResultsPage')
const NewCardPage = () => import('@/views/NewCardPage')
const AboutPage = () => import('@/views/AboutPage')
const RoadmapPage = () => import('@/views/RoadmapPage')
const LandingPage = () => import('@/views/LandingPage')
const ImprintPage = () => import('@/views/ImprintPage')
const TeamPage = () => import('@/views/TeamPage')
const HowToPlayPage = () => import('@/views/HowToPlayPage')
const VotingPage = () => import('@/views/VotingPage')
const AccountPage = () => import('@/views/AccountPage')
const CardMinter = () => import('@/views/CardMinterPage')
const CardView = () => import('@/views/CardViewPage')
const SteakDrop = () => import('@/views/SteakDropPage')

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
    path: '/gallery/:params?',
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
  },
  {
    path: '/cardview',
    name: 'CardView',
    component: CardView
  },
  {
    path: '/cardview/:id',
    name: 'CardView',
    component: CardView
  }
]

const oldroutes = [
  {
    path: '/',
    component: Index,
  },
  { path: '/types', component: Types },
  { path: '/relayers', component: Relayers },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
