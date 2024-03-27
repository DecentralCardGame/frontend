<template>
  <BaseTeaserSmall>
    <HeadingContentComponent heading-class="text-cc-yellow">
      <template #heading>
        Voting
      </template>
      <template #content>
        <p class="text-white">
          Vote to develop the game and earn Tokens with it!
        </p>
      </template>
    </HeadingContentComponent>
  </BaseTeaserSmall>
  <Navbar
    :elems="elems"
    :type="Color.BLACK"
  />
  <slot />
</template>
<script setup lang="ts">
import HeadingContentComponent from "@/components/elements/Teaser/TeaserHeader.vue";
import Navbar from "@/components/elements/Navbar/Navbar.vue";
import type { NavigationElement } from "@/components/elements/Navbar/types";
import BaseTeaserSmall from "@/components/elements/Teaser/BaseTeaserSmall.vue";
import { Color } from "@/components/utils/color";

const elems: NavigationElement[] = [
  { routeName: "/vote/encounter", display: "Encounter" },
  { routeName: "/vote/council", display: "Council" },
];
</script>
