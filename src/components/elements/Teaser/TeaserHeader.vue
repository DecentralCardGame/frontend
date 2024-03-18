<template>
  <div class="flex flex-col text-center justify-center">
    <h2
      class="text-5xl font-bold"
      :class="headingClass"
    >
      <slot name="heading" />
    </h2>
    <div class="text-black text-2xl pt-4">
      <slot name="content" />
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{ headingClass: string[] | string }>();
</script>
