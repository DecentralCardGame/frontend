import {ref, type Ref} from "vue";

const openCounter: Ref<number> = ref(0)

const incCounter = () => {
  openCounter.value++
}

export const useDropdown = () => {
  return {
    openCounter, incCounter
  }
}
