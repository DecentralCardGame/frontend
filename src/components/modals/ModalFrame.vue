<template>
  <div class="fixed top-0 flex h-[100vh] w-[100%] bg-black/50">
    <ModalInner
      :class="['p-10', 'z-100', 'm-auto'].concat(props.class)"
      @close="emit('close')"
      :heading="heading"
    >
      <slot></slot>
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
