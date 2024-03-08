<template>
  <div class="relative overflow-hidden">
    <img
      alt="worm bg"
      class="absolute h-[100%]"
      :class="picClassLeft"
      :src="voidWormBg"
    />
    <img
      alt="priest bg"
      class="absolute h-[100%] overflow-hidden"
      :class="picClassRight"
      :src="healingPriestBg"
    />
    <div class="h-full w-full absolute z-30 flex justify-center">
      <div class="bg-gradient-to-l from-white w-[20%] h-[100%]" />
      <div class="bg-white w-[40%] h-[100%]"></div>
      <div class="bg-gradient-to-r from-white w-[20%] h-[100%]" />
    </div>
    <div class="absolute h-full w-full z-30 flex justify-center">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import voidWormBg from "@/assets/figma/VoidWormBG.jpeg";
import healingPriestBg from "@/assets/figma/HealingPriestBG.png";

const props = defineProps<{
  picClassLeft: string | string[];
  picClassRight: string | string[];
}>();
</script>
