<template>
  <div
    class="relative inline-block text-left rounded hover:cursor-pointer"
    :class="[
      ...(isOpen ? ['ring', 'ring-white', 'ring-opacity-100'] : []),
      getButtonColor(type),
      getTextColor(type),
    ]"
    @click="toggleDropdown"
  >
    <div class="p-1 px-3 flex">
      {{ displayButton() }}
      <img
        class="w-4 pr-1 rotate-180 my-auto"
        src="@/assets/figma/Navigation_Triangle.svg"
        alt="navigation triangle"
      >
    </div>
    <ul
      v-if="isOpen"
      class="absolute z-30 ring ring-white rounded ring-opacity-100 whitespace-nowrap"
      :class="[getButtonColor(type)]"
    >
      <li
        v-for="(option, idx) in options"
        :key="idx"
        class="px-2 py-1 hover:bg-white hover:bg-opacity-70 hover:text-cc-red"
        @click="selectOption(option)"
      >
        {{ displayFn(option) }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts" generic="T">
import { ref } from "vue";
import {
  ButtonType,
  getButtonColor,
  getTextColor,
} from "@/components/elements/CCButton/ButtonType";

const model = defineModel<T>();
const isOpen = ref(false);

const props = withDefaults(
  defineProps<{
    options: Array<T>;
    initial?: string;
    displayFn?: (v: T) => string;
    type?: ButtonType;
  }>(),
  {
    options: () => [],
    initial: "?",
    displayFn: (v: T): string => "" + v,
    type: ButtonType.PUSSYRED,
  }
);

const displayButton = () => {
  return typeof model.value !== "undefined"
    ? props.displayFn(model.value)
    : props.initial;
};

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const selectOption = (option: T) => {
  model.value = option;
};
</script>
