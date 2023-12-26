<template>
  <router-link :to="props.to">
    <BaseCCButton :type="props.type">
      <slot></slot>
    </BaseCCButton>
  </router-link>
</template>

<script setup lang="ts">
import { ButtonType } from "@/components/elements/CCButton/ButtonType";

const props = withDefaults(
  defineProps<{
    to: any;
    type: ButtonType;
  }>(),
  {
    to: {},
    type: ButtonType.YELLOW,
  }
);

import BaseCCButton from "@/components/elements/CCButton/BaseCCButton.vue";
</script>
