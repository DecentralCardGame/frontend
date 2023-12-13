<template>
  <div class="relative inline-block" @click="toggleDropdown">
    <!-- Trigger button -->
    <button class="p-2 bg-[#8F6173] rounded-sm flex items-center shadow-xl"
      :class="{'ring ring-black ring-opacity-50': isOpen}"
    >
      {{ selectedOption }}
      <img class="w-4 pr-1 rotate-180" src="@/assets/figma/Navigation_Triangle.svg" alt="navigation triangle" />
    </button>

    <!-- Dropdown menu -->
    <div v-if="isOpen" class="absolute z-30 bg-[#8F6173] rounded-sm w-full text-center ring ring-black ring-opacity-50">
      <ul>
        <li v-for="option in dropdownOptions" :key="getOptionKey(option)" @click="selectOption(option)">
          {{ typeof option === 'object' ? option.label : option }}
        </li>
      </ul>
    </div>

    
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue';

interface Option {
  id: number;
  label: string;
}

const emit = defineEmits(['update:modelValue']);
const props = defineProps(['options', 'initial', 'displayFn']); // Define a prop named 'options' that will be passed from the parent component

const isOpen = ref(false);
const selectedOption = ref<string>(props.initial ? props.initial : '?');

const dropdownOptions: (Option | number)[] = props.options || []; // Use the prop or an empty array if not provided

console.log(dropdownOptions)
console.log(props.displayFn(dropdownOptions[0]))

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const getOptionKey = (option: Option | number) => {
  return typeof option === 'object' ? option.id : option;
};

const selectOption = (option: Option | number) => {
  if (typeof option === 'object') {
    selectedOption.value = option.label;
  } else {
    selectedOption.value = option.toString();
  }
  // Emit the selected option to the parent component
  emit('update:modelValue', option);
};
</script>
