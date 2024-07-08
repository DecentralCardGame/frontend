<template>
  <div
    class="flex flex-col text-left"
    :class="props.class"
  >
    <input
      v-model="model"
      class="bg-zinc-300 bg-opacity-20 shadow-inner p-2 bg-transparent text-opacity-100 border-0 focus:outline-none focus:ring-0 placeholder-opacity-50"
      :placeholder="placeholder"
      :maxlength="maxLength"
    >
    <div class="text-sm pl-2">
      <p class="text-gray-400">
        {{ infoText }}
      </p>
      <p class="text-cc-red font-bold">
        {{ errorText }}
      </p>
    </div>
  </div>
</template>
<script lang="ts" setup>
const model = defineModel<string>();

const props = withDefaults(
  defineProps<{ class?: string | string[], placeholder: string; maxLength?: number, infoText?: string, errorText?: string}>(),
  {
    class: "text-white placeholder-white",
    placeholder: "lorem",
    maxLength: 25,
    infoText: undefined,
    errorText: undefined,
  }
);
</script>
