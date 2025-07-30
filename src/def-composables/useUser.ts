import { ref, type Ref, watch } from "vue";
import { useQuery } from "./useQuery";
import { useAddress } from "./useAddress";
import { useLoggedIn } from "@/def-composables/useLoggedIn";
import type { Coin } from "@/model/Coin";
import { User } from "decentralcardgame-cardchain-client-ts/types/cardchain/cardchain/user";

const useUserInstance = () => {
  const { queryUser, queryAllBalances } = useQuery();
  const { address } = useAddress();
  const { loggedIn } = useLoggedIn();
  const user: Ref<User> = ref(User.fromPartial({}));
  const coins: Ref<Array<Coin>> = ref([]);

  watch(loggedIn, (val) => {
    if (val) {
      queryUntilResponse().then(queryCoins);
    }
  });

  const queryUntilResponse = () => {
    return getUser().catch((_) => {
      setTimeout(queryUntilResponse, 100);
    });
  };

  const getUser = () => {
    return queryUser(address.value).then((u) => {
      user.value = u;
    });
  };

  const queryCoins = () => {
    return queryAllBalances(address.value).then((c) => {
      coins.value = c.balances;
    });
  };

  return { getUser, queryCoins, user, coins };
};

let instance: ReturnType<typeof useUserInstance>;

export const useUser = () => {
  if (!instance) {
    instance = useUserInstance();
  }
  return instance;
};
