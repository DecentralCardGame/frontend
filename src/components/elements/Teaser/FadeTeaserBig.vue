<template>
  <FadeTeaser
    class="h-[55rem] xl:h-[80rem]"
    pic-class-left="left-[-15rem] md:left-[-10rem]"
    pic-class-right="right-[-15rem] md:right-[-10rem]"
  >
    <slot />
  </FadeTeaser>
</template>
<script setup lang="ts">
import FadeTeaser from "@/components/elements/Teaser/FadeTeaser.vue";
</script>
