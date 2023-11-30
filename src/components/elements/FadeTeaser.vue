<template>
  <div class="relative h-[50rem] xl:h-[80rem] overflow-hidden">
    <img
      alt="worm bg"
      class="absolute left-[-30rem] md:left-[-10rem] h-[100%]"
      :src="voidWormBg"
    />
    <img
      alt="priest bg"
      class="absolute right-[-30rem] md:right-[-10rem] h-[100%] overflow-hidden"
      :src="healingPriestBg"
    />
    <div
      class="h-[100%] w-[100%] absolute top-0 left-0 right-0 z-30 flex justify-center"
    >
      <div class="bg-gradient-to-l from-white w-[20%] h-[100%]"></div>
      <div class="bg-white w-[40%] h-[100%]">
        <slot></slot>
      </div>
      <div class="bg-gradient-to-r from-white w-[20%] h-[100%]"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import voidWormBg from "@/assets/figma/VoidWormBG.jpeg";
import healingPriestBg from "@/assets/figma/HealingPriestBG.png";
</script>
