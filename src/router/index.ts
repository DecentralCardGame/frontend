import { createRouter, createWebHashHistory } from "vue-router";

const GalleryPage = () => import("@/views/GalleryPage.vue");
const VotingResultsPage = () => import("@/views/VotingResultsPage.vue");
const CardCreator = () => import("@/views/CardCreatorPage.vue");
const NotFound = () => import("@/views/NotFound.vue");
const RoadmapPage = () => import("@/views/About/RoadmapPage.vue");
const LandingPage = () => import("@/views/LandingPage.vue");
const ImprintPage = () => import("@/views/ImprintPage.vue");
const TeamPage = () => import("@/views/About/TeamPage.vue");
const UserView = () => import("@/views/UserView/UserView.vue");
const CardView = () => import("@/views/AdvancedCardViewPage.vue");
const GameclientAuthz = () => import("@/views/GameClientAuthzPage.vue");
const Demo = () => import("@/views/Demo.vue");
const Login = () => import("@/views/LoginPage.vue");
const LearnPage = () => import("@/views/LearnPage.vue");
const DownloadPage = () => import("@/views/DownloadPage.vue");
const CommunityPage = () => import("@/views/About/CommunityPage.vue");
const EncounterVotingPage = () => import("@/views/Voting/EncounterVotingPage.vue")

const routes = [
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
    component: DownloadPage,
  },
  {
    path: "/about/team",
    name: "Team",
    component: TeamPage,
  },
  {
    path: "/about/community",
    name: "Community",
    component: CommunityPage,
  },
  {
    path: "/about/roadmap",
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
    path: "/vote/encounter",
    name: "EncounterVoting",
    component: EncounterVotingPage,
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
