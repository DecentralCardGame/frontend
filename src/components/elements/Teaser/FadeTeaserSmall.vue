<template>
  <FadeTeaser
    class="h-[30rem]"
    pic-class-left="left-[-15rem] md:left-[0rem] lg:left-[10rem] scale-[2.5]"
    pic-class-right="right-[-15rem] md:right-[0rem] lg:right-[10rem] scale-[2.5]"
  >
    <slot />
  </FadeTeaser>
</template>
<script setup lang="ts">
import FadeTeaser from "@/components/elements/Teaser/FadeTeaser.vue";
</script>
