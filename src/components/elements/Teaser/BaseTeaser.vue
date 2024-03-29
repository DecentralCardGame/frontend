<template>
  <div class="relative overflow-hidden bg-black">
    <img
      alt="boars bg"
      class="absolute w-full mt-[-35%] opacity-50"
      :class="picClass"
      :src="boars"
    >
    <div class="absolute h-full w-full z-30 flex justify-center">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import boars from "@/assets/figma/Boars.jpeg";

const props = defineProps<{
  picClass: string | string[];
}>();
</script>
