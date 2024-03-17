<template>
  <FadeTeaserSmall>
    <TeaserHeader heading-class="text-cc-red">
      <template #heading>
        How To Play
      </template>
      <template #content>
        <p>
          Here are the basics to get start playing. <br>
          Visit our GitBook for advanced information!
        </p>
        <br>
        <a href="https://crowdcontrol-network.gitbook.io/">
          <BaseCCButton :type="ButtonType.RED"> Open GitBook</BaseCCButton>
        </a>
      </template>
    </TeaserHeader>
  </FadeTeaserSmall>
</template>

<script setup lang="ts">
import BaseCCButton from "@/components/elements/CCButton/BaseCCButton.vue";
import { ButtonType } from "@/components/elements/CCButton/ButtonType";
import FadeTeaserSmall from "@/components/elements/Teaser/FadeTeaserSmall.vue";
import TeaserHeader from "@/components/elements/Teaser/TeaserHeader.vue";
</script>
