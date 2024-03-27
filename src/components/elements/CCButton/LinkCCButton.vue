<template>
  <div>
    <a
      :href="to"
      class="mx-auto"
    >
      <BaseCCButton :type="type">
        <slot />
      </BaseCCButton>
    </a>
  </div>
</template>

<script setup lang="ts">
import BaseCCButton from "@/components/elements/CCButton/BaseCCButton.vue";
import { Color } from "@/components/utils/color";

const props = withDefaults(
  defineProps<{
    to: string;
    type?: Color;
  }>(),
  {
    to: "dummy",
    type: Color.YELLOW,
  },
);
</script>
