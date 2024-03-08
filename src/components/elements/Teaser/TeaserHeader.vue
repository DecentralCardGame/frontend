<template>
  <div class="flex flex-col text-center justify-center">
    <h2 class="text-6xl font-bold" :class="headingClass">
      <slot name="heading"></slot>
    </h2>
    <div class="text-black text-3xl pt-4">
      <slot name="content"></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{ headingClass: string[] | string }>();
</script>
