<template>
  <div
    class="relative inline-block bg-[#8F6173] text-left rounded-sm hover:cursor-pointer"
    :class="{ 'ring ring-white ring-opacity-100': isOpen }"
    @click="toggleDropdown"
  >
    <div class="p-2 flex">
      {{ displayButton() }}
      <img
        class="w-4 pr-1 rotate-180 my-auto"
        src="@/assets/figma/Navigation_Triangle.svg"
        alt="navigation triangle"
      />
    </div>

    <ul
      v-if="isOpen"
      class="absolute z-30 bg-[#8F6173] ring ring-white rounded-sm ring-opacity-100 whitespace-nowrap"
    >
      <li
        v-for="(option, idx) in options"
        :key="idx"
        @click="selectOption(option)"
        class="px-2 py-1 hover:bg-white hover:bg-opacity-70 hover:text-cc-red"
      >
        {{ displayFn(option) }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts" generic="T">
import { ref, defineProps } from "vue";

const model = defineModel<T>();
const isOpen = ref(false);

const props = withDefaults(
  defineProps<{
    options: Array<T>;
    initial?: string;
    displayFn?: (v: T) => string;
  }>(),
  {
    options: () => [],
    initial: "?",
    displayFn: (v: T): string => "" + v,
  }
);

const displayButton = () => {
  return model.value ? props.displayFn(model.value) : props.initial;
};

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const selectOption = (option: T) => {
  model.value = option;
};
</script>
