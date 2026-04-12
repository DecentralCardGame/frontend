import { useClient } from "@/composables/useClient";
import { computed, ref } from "vue";

const useAddressInstance = (callback: (address: string) => void) => {
  const client = useClient();
  const address = ref("");
  const setAddress = async () => {
    if (client.signer) {
      const [{ address: rawAddress }] = await client.signer.getAccounts();
      address.value = rawAddress;
    } else {
      address.value = "";
    }
    callback(address.value);
  };
  client.on("signer-changed", () => {
    setAddress();
  });
  window.addEventListener("keplr_keystorechange", () => {
    setAddress();
  });

  setAddress();

  const shortAddress = computed<string>(
    () => address.value.substring(0, 10) + "..." + address.value.slice(-4)
  );

  return {
    address,
    shortAddress,
  };
};

let addressInstance: ReturnType<typeof useAddressInstance>;

export const useAddress = (callback: (address: string) => void = () => {}) => {
  if (!addressInstance) {
    addressInstance = useAddressInstance(callback);
  }
  return addressInstance;
};
