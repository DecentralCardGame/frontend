import { createRouter, createWebHashHistory } from "vue-router";

const GalleryPage = () => import("@/views/GalleryPage.vue");
const VotingResultsPage = () => import("@/views/VotingResultsPage.vue");
const CardCreatorPage = () => import("@/views/CardCreatorPage.vue");
const AboutPage = () => import("@/views/AboutPage.vue");
const NotFound = () => import("@/views/NotFound.vue");
const RoadmapPage = () => import("@/views/RoadmapPage.vue");
const LandingPage = () => import("@/views/LandingPage.vue");
const ImprintPage = () => import("@/views/ImprintPage.vue");
const TeamPage = () => import("@/views/TeamPage.vue");
const VotingPage = () => import("@/views/VotingPage.vue");
const UserView = () => import("@/views/UserView/UserView.vue");
const CardView = () => import("@/views/AdvancedCardViewPage.vue");
const GameclientAuthz = () => import("@/views/GameClientAuthzPage.vue");
const Demo = () => import("@/views/Demo.vue");
const Login = () => import("@/views/LoginPage.vue");

const routes = [
  {
    path: "/about",
    name: "About",
    meta: { layout: "Default" },
    component: AboutPage,
  },
  {
    path: "/login",
    name: "Login",
    meta: { layout: "Default" },
    component: Login,
  },
  {
    path: "/roadmap",
    name: "Roadmap",
    meta: { layout: "Default" },
    component: RoadmapPage,
  },
  {
    path: "/gallery",
    name: "Gallery",
    component: GalleryPage,
    meta: { layout: "Default" },
  },
  {
    path: "/votingresults",
    name: "VotingResults",
    component: VotingResultsPage,
    meta: { layout: "Default" },
  },
  {
    path: "/cardCreator",
    name: "New Card",
    component: CardCreatorPage,
    meta: { layout: "Default" },
  },
  {
    path: "/",
    name: "Landing",
    meta: { layout: "Landing" },
    component: LandingPage,
  },
  {
    path: "/team",
    name: "Team",
    component: TeamPage,
  },
  {
    path: "/imprint",
    name: "Imprint",
    component: ImprintPage,
  },
  {
    path: "/vote",
    name: "Vote",
    component: VotingPage,
  },
  {
    path: "/cardview/:id",
    name: "CardView",
    component: CardView,
  },
  {
    path: "/user/:id",
    name: "UserView",
    component: UserView,
  },
  {
    path: "/demo",
    name: "Demo",
    component: Demo,
  },
  {
    path: "/gameclientAuthz/:authzAddress",
    name: "GameclientAuthz",
    component: GameclientAuthz,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
  },
];

const delay = (t: number) => new Promise((r) => setTimeout(r, t));

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  async scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      await delay(0);
      return { top: 0, behavior: "smooth" };
    }
  },
});

export default router;
