<template>
  <FadeTeaserSmall>
    <HeadingContentComponent heading-class="text-teal-500">
      <template #heading>
        Voting
      </template>
      <template #content>
        <p>Vote to develop the game and earn Tokens with it!</p>
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
  { routeName: "/vote/encounter", display: "Encounter" },
  { routeName: "/vote/council", display: "Council" },
];
</script>
