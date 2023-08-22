import { GalleryFilters } from "@/model/GalleryFilters";
import { reactive } from "vue";
import * as R from "ramda";

let state: GalleryFilters = reactive(new GalleryFilters())

const toggle = () => {
  state.visible = !state.visible
}

const reset = () => {
  state = reactive(new GalleryFilters())
}

const set = (data: any) => {
  state = reactive(R.mergeAll([new GalleryFilters(), data]))
}

const get = () => {
  return state
}

export const useGalleryFilters = { toggleGalleryFilters: toggle, getGalleryFilters: get, setGalleryFilters: set, resetGalleryFilters: reset };
