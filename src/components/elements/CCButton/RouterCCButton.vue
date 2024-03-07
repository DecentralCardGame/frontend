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
import { ButtonType } from "@/components/elements/CCButton/ButtonType";
import BaseCCButton from "@/components/elements/CCButton/BaseCCButton.vue";

const props = withDefaults(
  defineProps<{
    to: any;
    type?: ButtonType;
  }>(),
  {
    to: {},
    type: ButtonType.YELLOW,
  }
);
</script>
