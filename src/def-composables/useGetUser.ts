import { watch, computed } from "vue";
import type { Ref } from "vue";
import useDecentralCardGameCardchainCardchain from "@/composables/useDecentralCardGameCardchainCardchain";

export const useGetUser = (address: Ref<string>) => {
  const { QueryQUser } = useDecentralCardGameCardchainCardchain();

  const query = QueryQUser(address.value, { enabled: false });

  const user = computed(() => {
    return {
      user: query.data?.value ?? [],
      isLoading: query.isLoading.value,
    };
  });
  const isLoading = computed(() => {
    return query.isLoading.value;
  });

  return {
    user,
    isLoading,
    refetch: query.refetch
  };
};
