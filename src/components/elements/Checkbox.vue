<template>
  <div class="flex items-center">
    <input
      v-model="model"
      type="checkbox"
      class="bg-white text-cc-red focus:ring-white-sm border-none focus:ring-0"
    >
    <p class="ml-2 inline-block text-white">
      <slot />
    </p>
  </div>
</template>
<script setup lang="ts">
const model = defineModel<boolean>();
</script>
