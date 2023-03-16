import {createRouter, createWebHashHistory} from "vue-router";

const GalleryPage = () => import('@/views/GalleryPage.vue')
const VotingResultsPage = () => {} //import('@/views/VotingResultsPage')
const NewCardPage = () => import('@/views/CardCreatorPage.vue')
const AboutPage = () => import('@/views/AboutPage.vue')
const NotFound = () => import('@/views/NotFound.vue')
const RoadmapPage = () => import('@/views/RoadmapPage.vue')
const LandingPage = () => import('@/views/LandingPage.vue')
const ImprintPage = () => import('@/views/ImprintPage.vue')
const TeamPage = () => import('@/views/TeamPage.vue')
const HowToPlayPage = () => {} //import('@/views/HowToPlayPage')
const VotingPage = () => {} //import('@/views/VotingPage')
const UserView = () => import('@/views/UserView.vue')
const SteakDrop = () => {} //import('@/views/SteakDropPage')
const GameOfChains = () => {} //import('@/views/GameOfChainsPage')
const CardView = () => import('@/views/AdvancedCardViewPage.vue')

const routes = [
  {
    path: '/about',
    name: 'About',
    meta: {layout: "default"},
    component: AboutPage
  },
  {
    path: '/roadmap',
    name: 'Roadmap',
    meta: {layout: "default"},
    component: RoadmapPage
  },
  {
    path: '/steakdrop',
    name: 'Steakdrop',
    meta: {layout: "default"},
    component: SteakDrop
  },
  {
    path: '/goc',
    name: 'Game of Chains',
    meta: {layout: "default"},
    component: GameOfChains
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
    path: '/cardCreator',
    name: 'New Card',
    component: NewCardPage,
    meta: {layout: "default"},
  },
  {
    path: '/',
    name: 'Landing',
    meta: {layout: "Landing"},
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
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  },
]

const delay = (t: number) => new Promise((r) => setTimeout(r, t))

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
});

export default router;
