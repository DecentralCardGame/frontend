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
        getTextColor(),
        getButtonColor(),
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
import { ButtonType } from "@/components/elements/CCButton/ButtonType";

const emit = defineEmits(["click"]);

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
    case ButtonType.TEAL:
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
    case ButtonType.TEAL:
      return "bg-[#40C1C7]";
    case ButtonType.RED:
      return "bg-[#D82027]";
  }
};
</script>
