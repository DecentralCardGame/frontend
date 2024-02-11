<template>
  <div class="relative inline-block" @click="toggleDropdown">
    <!-- Trigger button -->
    <button
      class="p-2 bg-[#8F6173] rounded-sm flex items-center shadow-xl"
      :class="{ 'ring ring-white ring-opacity-100': isOpen }"
    >
      {{ displayButton() }}
      <img
        class="w-4 pr-1 rotate-180"
        src="@/assets/figma/Navigation_Triangle.svg"
        alt="navigation triangle"
      />
    </button>

    <!-- Dropdown menu -->
    <div
      v-if="isOpen"
      class="absolute z-30 bg-[#8F6173] rounded-sm w-full text-center ring ring-white ring-opacity-100 hover:cursor-pointer"
    >
      <ul>
        <li
          v-for="(option, idx) in options"
          :key="idx"
          @click="selectOption(option)"
          class="hover:bg-white hover:bg-opacity-70 hover:text-[#D82027]"
        >
          {{ displayFn(option) }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts" generic="T">
import { ref, defineProps, defineEmits, type Ref } from "vue";

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
