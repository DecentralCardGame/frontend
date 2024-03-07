<template>
  <div class="flex items-center">
    <input
      v-model="model"
      type="checkbox"
      class="bg-white border-white text-cc-red focus:ring-white-sm"
    >
    <p class="ml-2 inline-block text-white">
      <slot />
    </p>
  </div>
</template>
<script setup lang="ts">
const model = defineModel<boolean>();
</script>
