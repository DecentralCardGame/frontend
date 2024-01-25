<template>
  <div
    :class="[
      'overflow-hidden',
      'rounded-full',
      'w-' + props.size,
      'h-' + props.size,
    ]"
  >
    <img :src="src" class="-pt-[10%] w-[100%] object-contain" :alt="alt" />
  </div>
</template>
<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    src: any;
    size: number | string;
    alt: string;
  }>(),
  {
    src: {},
    size: 64,
    alt: "Profile Pic",
  }
);
</script>
