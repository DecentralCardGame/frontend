import { ref, watch } from "vue";
import {useAddress} from "@/def-composables/useAddress";

const useLoggedInInstance = () => {
  const { address } = useAddress()
  const loggedIn = ref(false)

  watch(address, () => {
    loggedIn.value = address.value != ""
  })

  return { loggedIn }
}

let loggedInInstance: ReturnType<typeof useLoggedInInstance>;

export const useLoggedIn = () => {
  if (!loggedInInstance) {
    loggedInInstance = useLoggedInInstance();
  }
  return loggedInInstance;
};
