<template>
  <div class="space-y-2">
    <img
      :src="model ? triangleRed : triangle"
      alt="arrow up"
      class="rotate-0 w-5 hover:scale-110"
      @click="model = true"
    >
    <img
      :src="model ? triangle : triangleRed"
      alt="arrow down"
      class="rotate-180 w-5 hover:scale-110"
      @click="model = false"
    >
  </div>
</template>
<script lang="ts" setup>
import triangle from "@/assets/figma/Navigation_Triangle.svg";
import triangleRed from "@/assets/figma/Navigation_Triangle_red.svg";

const model = defineModel<boolean>({ required: true });
</script>
