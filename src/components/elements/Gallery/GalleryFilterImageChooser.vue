<template>
  <div>
    <button
      v-for="option in options"
      :key="option.label"
      class="text-white font-bold uppercase px-2"
      @click="change(option.name)"
    >
      <img
        :src="galleryFilters[option.name] ? option.active : option.inactive"
        class="w-12"
        :alt="option.name + ' classbutton'"
      >
      {{ option.label }}
    </button>
  </div>
</template>
<script setup lang="ts">
import type { GalleryFilterImageChooserOptions } from "@/components/elements/Gallery/types";
import type { GalleryFilters } from "@/model/GalleryFilters";
import { useGallery } from "@/def-composables/useGallery";

const { galleryFilters } = useGallery();

const change = (name: keyof GalleryFilters) => {
  galleryFilters.value[name] = !galleryFilters.value[name];
};

const props = withDefaults(
  defineProps<{ options: GalleryFilterImageChooserOptions<GalleryFilters> }>(),
  {}
);
</script>
