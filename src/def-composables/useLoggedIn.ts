import {ref} from "vue";
import {useAddress} from "@/def-composables/useAddress";

const useLoggedInInstance = () => {
  const loggedIn = ref(false)

  useAddress((address: string) => {
    loggedIn.value = address != ""
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