<template>
  <div>
    <button
      v-for="option in options"
      class="text-white font-bold uppercase px-2"
      :key="option.label"
      @click="galleryFilters[option.name] = !galleryFilters[option.name]"
    >
      <img
        :src="galleryFilters[option.name] ? option.active : option.inactive"
        class="w-12"
        :alt="option.name + ' classbutton'"
      />
      {{ option.label }}
    </button>
  </div>
</template>
<script setup lang="ts">
import type { GalleryFilterImageChooserOptions } from "@/components/elements/Gallery/types";
import { useGalleryFilters } from "@/def-composables/useGalleryFilters";
import type { GalleryFilters } from "@/model/GalleryFilters";

const { galleryFilters } = useGalleryFilters;

const props = withDefaults(
  defineProps<{ options: GalleryFilterImageChooserOptions<GalleryFilters> }>(),
  {}
);
</script>
