import { useClient } from "@/composables/useClient";

const useQueryInstance = () => {
  const client = useClient()

  return Object.assign(client.CosmosBankV1Beta1.query, client.DecentralCardGameCardchainCardchain.query)
}

let instance: ReturnType<typeof useQueryInstance>;

export const useQuery = () => {
  if (!instance) {
    instance = useQueryInstance();
  }
  return instance;
};