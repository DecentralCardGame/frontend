<template>
  <router-link
    :to="{ name: 'UserView', params: { id: safeAddr } }"
    class="hover:underline relative group"
    >{{ shortenedAddr }}
    <div
      class="absolute z-10 invisible group-hover:visible bg-black rounded p-2"
    >
      {{ safeAddr }}
    </div>
  </router-link>
</template>
<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    addr: string;
  }>(),
  {
    addr: "none",
  }
);

const safeAddr = computed(() => {
  return props.addr ? props.addr : "none";
});

const shortenedAddr = computed(() => {
  const len = safeAddr.value.length;
  return len > 11
    ? safeAddr.value.slice(0, 5) + "..." + safeAddr.value.slice(len - 5, len)
    : safeAddr;
});
</script>
