import { GalleryFilters } from "@/model/GalleryFilters";
import { reactive } from "vue";

const state: GalleryFilters = reactive(new GalleryFilters());

const toggle = () => {
  state.visible = !state.visible
}

export const useGalleryFilters = { galleryFilters: state, toggleGalleryFilters: toggle };
