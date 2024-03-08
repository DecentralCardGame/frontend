<template>
  <div
    class="bg-cc-red flex flex-row justify-center uppercase text-white text-xl max-md:flex-col"
  >
    <router-link
      v-for="elem in elems"
      :to="elem.routeName"
      class="px-10 py-7 hover:underline"
      active-class="font-bold"
    >
      {{ elem.display }}
    </router-link>
  </div>
</template>
<script lang="ts" setup>
type NavigationElement = {
  routeName: string;
  display: string;
};

const elems: NavigationElement[] = [
  { routeName: "/team/community", display: "Community" },
  { routeName: "/team/roadmap", display: "Roadmap" },
  { routeName: "/team/team", display: "Team" },
  { routeName: "/team/tokens", display: "CC Tokens" },
  { routeName: "/team/whitepaper", display: "Card Creator" },
];
</script>
