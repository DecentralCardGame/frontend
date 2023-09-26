import { createApp } from "vue";
import { createPinia } from "pinia";
import { VueQueryPlugin } from "@tanstack/vue-query";
import App from "./App.vue";
import router from "./router";
import "./assets/index.css";
import "@ignt/vue-library/dist/style.css";
import Notifications from '@kyvg/vue3-notification'
import { useCardsRules } from "@/def-composables/useCardRules";
import AppLayout from "@/layouts/AppLayout.vue"
import { useClient } from "./composables/useClient";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(VueQueryPlugin);
app.component('AppLayout', AppLayout)
app.use(Notifications)
app.mount("#app")

useCardsRules()
useClient().then(() => console.log("Client initiated"))

export { app }
