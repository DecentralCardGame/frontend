<template>
  <FadeTeaserSmall>
    <HeadingContentComponent heading-class="text-teal-500">
      <template #heading>
        Welcome to the team
      </template>
      <template #content>
        <p>Crowd Control is not a company, but a Decentralized</p>
        <p>Autonomous Organization (DAO). This is realized with a</p>
        <p>blockchain built on Cosmos technology. Read our Whitepaper</p>
        <p>to find out more.</p>
      </template>
    </HeadingContentComponent>
  </FadeTeaserSmall>
  <Navbar :elems="elems" />
  <slot />
</template>
<script setup lang="ts">
import FadeTeaserSmall from "@/components/elements/Teaser/FadeTeaserSmall.vue";
import HeadingContentComponent from "@/components/elements/Teaser/TeaserHeader.vue";
import Navbar from "@/components/elements/Navbar/Navbar.vue";
import type { NavigationElement } from "@/components/elements/Navbar/types";

const elems: NavigationElement[] = [
  { routeName: "/about/community", display: "Community" },
  { routeName: "/about/roadmap", display: "Roadmap" },
  { routeName: "/about/team", display: "Team" },
  { routeName: "/about/tokens", display: "CC Tokens" },
  { routeName: "/about/whitepaper", display: "Whitepaper" },
];
</script>
