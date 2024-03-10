import { createRouter, createWebHashHistory } from "vue-router";

const GalleryPage = () => import("@/views/GalleryPage.vue");
const VotingResultsPage = () => import("@/views/VotingResultsPage.vue");
const CardCreator = () => import("@/views/CardCreatorPage.vue");
const AboutPage = () => import("@/views/AboutPage.vue");
const NotFound = () => import("@/views/NotFound.vue");
const RoadmapPage = () => import("@/views/Team/RoadmapPage.vue");
const LandingPage = () => import("@/views/LandingPage.vue");
const ImprintPage = () => import("@/views/ImprintPage.vue");
const TeamPage = () => import("@/views/Team/TeamPage.vue");
const VotingPage = () => import("@/views/VotingPage.vue");
const UserView = () => import("@/views/UserView/UserView.vue");
const CardView = () => import("@/views/AdvancedCardViewPage.vue");
const GameclientAuthz = () => import("@/views/GameClientAuthzPage.vue");
const Demo = () => import("@/views/Demo.vue");
const Login = () => import("@/views/LoginPage.vue");
const LearnPage = () => import("@/views/LearnPage.vue");
const Download = () => import("@/views/DownloadPage.vue");

const Community = () => import("@/views/Team/Community.vue");

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
    name: "CardCreator",
    component: CardCreator,
    meta: { layout: "Default" },
  },
  {
    path: "/",
    name: "Landing",
    meta: { layout: "Landing" },
    component: LandingPage,
  },
  {
    path: "/learn",
    name: "Learn",
    component: LearnPage,
  },
  {
    path: "/download",
    name: "Download",
    component: Download,
  },
  {
    path: "/team/team",
    name: "Team",
    component: TeamPage,
  },
  {
    path: "/team/community",
    name: "Community",
    component: Community,
  },
  {
    path: "/team/roadmap",
    name: "Roadmap",
    meta: { layout: "Default" },
    component: RoadmapPage,
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
