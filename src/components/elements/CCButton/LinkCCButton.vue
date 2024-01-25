<template>
  <div>
    <a :href="props.to" class="mx-auto">
      <BaseCCButton :type="props.type">
        <slot></slot>
      </BaseCCButton>
    </a>
  </div>
</template>

<script setup lang="ts">
import { ButtonType } from "@/components/elements/CCButton/ButtonType";

const props = withDefaults(
  defineProps<{
    to: string;
    type: ButtonType;
  }>(),
  {
    to: "dummy",
    type: ButtonType.YELLOW,
  }
);

import BaseCCButton from "@/components/elements/CCButton/BaseCCButton.vue";
</script>
