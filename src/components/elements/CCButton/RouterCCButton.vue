<template>
  <div>
    <router-link
      :to="to"
      class="mx-auto"
    >
      <BaseCCButton :type="type">
        <slot />
      </BaseCCButton>
    </router-link>
  </div>
</template>

<script setup lang="ts">
import BaseCCButton from "@/components/elements/CCButton/BaseCCButton.vue";
import { Color } from "@/components/utils/color";

const props = withDefaults(
  defineProps<{
    to: any;
    type?: Color;
  }>(),
  {
    to: {},
    type: Color.YELLOW,
  },
);
</script>
