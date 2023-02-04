import { computed } from "vue";
import useDecentralCardGameCardchainCardchain from "@/composables/useDecentralCardGameCardchainCardchain";

export const useCardchainInfo = () => {
  const { QueryQCardchainInfo } = useDecentralCardGameCardchainCardchain();
  const query = QueryQCardchainInfo({});

  const info = computed(() => {
    return {
      info: query.data?.value ?? [],
      isLoading: query.isLoading.value,
    };
  });
  const isLoading = computed(() => {
    return query.isLoading.value;
  });

  return {
    info,
    isLoading,
  };
};
