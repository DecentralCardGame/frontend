import { readonly, ref, type Ref } from "vue";

interface Event {
  which: number
}

const useLastInputEventInstance = () => {
  const state: Ref<Event> = ref({which: 0});

  const set = (event: Event) => {
    state.value = event
  }

  return { lastInputEvent: readonly(state), setLastInputEvent: set };
}

let instance: ReturnType<typeof useLastInputEventInstance>;

export const useLastInputEvent = () => {
  if (!instance) {
    instance = useLastInputEventInstance();
  }
  return instance;
};