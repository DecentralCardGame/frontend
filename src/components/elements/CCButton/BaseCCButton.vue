<template>
<div class="">
  <button
    :class="[
      'w-80',
      'h-12',
      'rounded-sm',
      'shadow-md',
      'shadow-black/25',
      'text-center',
      'font-bold',
      'font-[roboto]',
      getTextColor(),
      getButtonColor(),
      'active:bg-[#552026]',
      'active:text-white',
    ]"
  >
    <slot></slot>
  </button>
  </div>
</template>

<script setup lang="ts">
import { ButtonType } from "@/components/elements/CCButton/ButtonType";

const props = withDefaults(
  defineProps<{
    type: ButtonType;
  }>(),
  {
    type: ButtonType.YELLOW,
  }
);

const getTextColor = () => {
  switch (props.type) {
    case ButtonType.BLACK:
    case ButtonType.RED:
      return "text-white";
    default:
      return "text-black";
  }
};

const getButtonColor = () => {
  switch (props.type) {
    case ButtonType.BLACK:
      return "bg-black";
    case ButtonType.YELLOW:
      return "bg-[#FEC560]";
    case ButtonType.WHITE:
      return "bg-white";
    case ButtonType.RED:
      return "bg-[#D82027]";
  }
};
</script>
