<template>
  <div class="flex flex-row space-x-1">
    <button
      v-if="!start"
      class="active:invert"
      @click="emit('backward')"
    >
      <img
        src="@/assets/figma/Navigation_Triangle.svg"
        alt="navigation triangle"
        class="w-3 -rotate-90"
      >
    </button>
    <button
      v-if="!end"
      class="active:invert"
      @click="emit('forward')"
    >
      <img
        src="@/assets/figma/Navigation_Triangle.svg"
        alt="navigation triangle"
        class="w-3 rotate-90"
      >
    </button>
  </div>
</template>

<script setup lang="ts">

const emit = defineEmits(['forward', 'backward']);

const props = withDefaults(
  defineProps<{
    start: boolean;
    end: boolean;
  }>(),
  {
    start: false,
    end: false,
  }
);

</script>
