import { GalleryFilters } from "@/model/GalleryFilters";
import { reactive } from "vue";

let state: GalleryFilters = reactive(new GalleryFilters());

const toggle = () => {
  state.visible = !state.visible
}

const reset = () => {
  Object.assign(state, new GalleryFilters())
}

export const useGalleryFilters = { galleryFilters: state, toggleGalleryFilters: toggle, resetGalleryFilters: reset };
