<template>
  <div>
    <header class="flex text-white text-4xl my-2 font-bold">
      <p class="grow my-auto">{{ heading }}</p>
      <button @click="emit('close')" class="group">
        <img
          :src="closeImg"
          alt="close"
          class="h-12 group-hover:drop-shadow-md"
        />
      </button>
    </header>
    <div class="bg-neutral-800 p-8">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import closeImg from "@/assets/figma/close.svg";

const props = withDefaults(
  defineProps<{
    heading: string;
  }>(),
  {
    heading: "Lorem impsum dolor",
  }
);

const emit = defineEmits(["close"]);
</script>
