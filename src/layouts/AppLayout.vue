<template>
  <div id="content">
    <PageHeader />
    <PageMenu />
    <main>
      <component :is="subLayout">
        <router-view />
      </component>
    </main>
    <PageFooter />
  </div>
</template>

<script setup lang="ts">
import PageHeader from "@/components/partials/PageHeader.vue";
import PageMenu from "@/components/partials/PageMenu.vue";
import PageFooter from "@/components/partials/PageFooter.vue";
import { useRoute } from "vue-router";
import { computed } from "vue";
import AboutSubLayout from "@/layouts/sub-layouts/AboutSubLayout.vue";
import VoteSubLayout from "@/layouts/sub-layouts/VoteSubLayout.vue";

const route = useRoute();

const subLayout = computed(() => {
  if (new RegExp("/about/*").test(route.path)) {
    return AboutSubLayout;
  }

  if (new RegExp("/vote/*").test(route.path)) {
    return VoteSubLayout;
  }

  return "div";
});
</script>
