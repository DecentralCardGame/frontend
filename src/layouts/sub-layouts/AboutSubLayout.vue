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
  <AboutProgressbar />
  <slot />
</template>
<script setup lang="ts">
import FadeTeaserSmall from "@/components/elements/Teaser/FadeTeaserSmall.vue";
import HeadingContentComponent from "@/components/elements/Teaser/TeaserHeader.vue";
import AboutProgressbar from "@/components/elements/AboutProgressbar.vue";
</script>
