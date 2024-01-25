<template>
  <div class="fixed top-0 flex h-[100vh] w-[100%] bg-black/50">
    <div :class="['p-10', 'z-100', 'm-auto'].concat(props.class)">
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
  </div>
</template>
<script setup lang="ts">
import closeImg from "@/assets/figma/close.svg";

const props = withDefaults(
  defineProps<{
    heading: string;
    class: string[];
  }>(),
  {
    heading: "Lorem impsum dolor",
    class: () => [],
  }
);

const emit = defineEmits(["close"]);
</script>
