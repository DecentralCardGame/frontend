<template>
  <div class="bg-black text-white flex lg:h-[80vh] p-16 lg:p-8" />
  <CardviewModal
    :id="state.id"
    @close="$router.back()"
  />
</template>

<script setup lang="ts">
import CardviewModal from "@/components/modals/CardviewModal.vue";
import { onMounted, reactive } from "vue";
import { useRoute } from "vue-router";

const initialState: {
  id: number;
} = {
  id: -1,
};

const route = useRoute();
const state = reactive(initialState);

onMounted(() => {
  let id = parseInt(route.params.id as string);
  if (!isNaN(id)) {
    state.id = id;
  }
});
</script>
