<template>
  <input
    class="bg-zinc-300 bg-opacity-20 shadow-inner p-2 bg-transparent text-white text-opacity-100 border-0 focus:outline-none focus:ring-0 placeholder-white placeholder-opacity-50"
    :placeholder="placeholder"
    v-model="model"
    :maxlength="maxLength"
  />
</template>
<script lang="ts" setup>
const model = defineModel<string>();

const props = withDefaults(
  defineProps<{ placeholder: string; maxLength?: number }>(),
  {
    placeholder: "lorem",
    maxLength: 25,
  }
);
</script>
