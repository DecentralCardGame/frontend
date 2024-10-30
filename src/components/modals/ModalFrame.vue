<template>
  <div class="fixed top-0 flex h-[100vh] w-full bg-black/50 overflow-scroll">
    <ModalInner
      :class="['p-10', 'z-100', 'm-auto'].concat(props.class)"
      :heading="heading"
      @close="emit('close')"
    >
      <slot />
    </ModalInner>
  </div>
</template>
<script setup lang="ts">
import ModalInner from "@/components/elements/ModalInner.vue";

const props = withDefaults(
  defineProps<{
    heading: string;
    class: string[] | string;
  }>(),
  {
    heading: "Lorem impsum dolor",
    class: () => [],
  }
);

const emit = defineEmits(["close"]);
</script>
