<template>
  <BaseCCButton
    :size-class="['w-48', 'h-12']"
    :type="type"
    @click="emit('click')"
  >
    <slot />
  </BaseCCButton>
</template>
<script setup lang="ts">
import BaseCCButton from "@/components/elements/CCButton/BaseCCButton.vue";
import { Color } from "@/components/utils/color";

const emit = defineEmits(["click"]);

const props = withDefaults(
  defineProps<{
    type?: Color;
  }>(),
  {
    type: Color.YELLOW,
  },
);
</script>
