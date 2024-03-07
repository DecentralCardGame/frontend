<template>
  <div>
    <button
      @click="emit('click')"
      :class="[
        'w-80',
        'h-14',
        'rounded',
        'shadow-xl',
        'shadow-black/25',
        'text-center',
        'font-bold',
        'font-[roboto]',
        'uppercase',
        getTextColor(type),
        getButtonColor(type),
        'active:bg-[#552026]',
        'active:text-white',
        'active:border-0',
        'hover:text-black',
        'hover:bg-white',
        'hover:border-black',
        'hover:border-4',
      ]"
    >
      <slot></slot>
    </button>
  </div>
</template>

<script setup lang="ts">
import {
  ButtonType,
  getButtonColor,
  getTextColor,
} from "@/components/elements/CCButton/ButtonType";

const emit = defineEmits(["click"]);

const props = withDefaults(
  defineProps<{
    type?: ButtonType;
  }>(),
  {
    type: ButtonType.YELLOW,
  }
);
</script>
