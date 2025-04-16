<template>
  <div class="h-screen bg-black text-white flex lg:h-[80vh] p-16 lg:p-8"/>
  <CardviewModal
    :id="state.id"
    @close="onClose"
  />
</template>

<script setup lang="ts">
import CardviewModal from "@/components/modals/CardviewModal.vue";
import { onMounted, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";

const initialState: {
  id: number;
} = {
  id: -1,
};

const route = useRoute();
const router = useRouter();
const state = reactive(initialState);

onMounted(() => {
  let id = parseInt(route.params.id as string);
  if (!isNaN(id)) {
    state.id = id;
  }
});

const onClose = () => {
  if (router.options.history.state.back) {
    router.back();
  } else {
    router.push('/');
  }
}
</script>
