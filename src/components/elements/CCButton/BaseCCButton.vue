<template>
  <div>
    <button
      :disabled="diabled"
      class="rounded shadow-xl shadow-black/25 text-center text-base font-bold font-[roboto] uppercase active:bg-[#552026] active:text-white active:border-0 hover:text-black hover:bg-white hover:border-black hover:border-4 disabled:bg-gray-500"
      :class="[getTextColor(type), getBgColor(type), ...sizeClass]"
      @click="emit('click')"
    >
      <slot />
    </button>
  </div>
</template>

<script setup lang="ts">
import { Color, getBgColor, getTextColor } from "@/components/utils/color";

const emit = defineEmits(["click"]);

const props = withDefaults(
  defineProps<{
    diabled?: boolean
    sizeClass?: string[];
    type?: Color;
  }>(),
  {
    diabled: false,
    sizeClass: () => ["w-72", "h-12"],
    type: Color.YELLOW,
  },
);
</script>
