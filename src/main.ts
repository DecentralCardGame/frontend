import { createApp } from "vue";
import { createPinia } from "pinia";
import { VueQueryPlugin } from "@tanstack/vue-query";
import App from "./App.vue";
import router from "./router";
import { env, setFallback } from "./env";
import "./assets/index.css";
import "@ignt/vue-library/dist/style.css";
import Notifications from '@kyvg/vue3-notification'
import { useCardsRules } from "@/def-composables/useCardRules";
import AppLayout from "@/layouts/AppLayout.vue"
import { useQuery } from "./def-composables/useQuery";
import { useUser } from "./def-composables/useUser";

const app = createApp(App);

useCardsRules()
const { queryQCardchainInfo } = useQuery()
const { user } = useUser()

queryQCardchainInfo({})
  .then(() => {
    console.log("connetion works");
  }).catch(err => {
  console.error("main connection FAILED - using fallback connection", err);
  setFallback(true);
  console.log("fallback:", env.apiNode);

})
  .finally(() => {
    app.use(createPinia());
    app.use(router);
    app.use(VueQueryPlugin);
    app.component('AppLayout', AppLayout)
    app.use(Notifications)
    app.mount("#app");
  });

export { app }
