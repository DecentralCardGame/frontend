<template>
  <div>
    <FadeTeaser>
      <div class="px-0 py-24 flex text-center justify-center">
        <div>
          <p class="text-5xl font-black text-red-600 font-lg">
            How To Play
          </p>
          <p class="py-10 text-2xl font-lg">
            Here are the basics to get start playing. <br>
            Visit our GitBook for advanced information!
          </p>
          <a href="https://crowdcontrol-network.gitbook.io/">
            <BaseCCButton :type="Color.RED"> Open GitBook</BaseCCButton>
          </a>
        </div>
      </div>
    </FadeTeaser>
  </div>
</template>

<script setup lang="ts">
import FadeTeaser from "@/components/elements/FadeTeaser.vue";
import BaseCCButton from "@/components/elements/CCButton/BaseCCButton.vue";
import { Color } from "@/components/utils/color";
</script>
