import { ref, type Ref, watch } from "vue";
import { useQuery } from "./useQuery"
import { useAddress } from "./useAddress"
import { useLoggedIn } from "@/def-composables/useLoggedIn";
import type { Coin } from "@/model/Coin";
import { User } from "decentralcardgame-cardchain-client-ts/DecentralCardGame.cardchain.cardchain/types/cardchain/cardchain/user";

const useUserInstance = () => {
  const { queryQUser, queryAllBalances } = useQuery()
  const { address } = useAddress()
  const { loggedIn } = useLoggedIn()
  const user: Ref<User> = ref(User.fromPartial({}))
  const coins: Ref<Array<Coin>> = ref([])

  watch(loggedIn, (val) => {
    if (val) {
      queryUntilResponse().then(queryCoins)
    }
  })
  
  const queryUntilResponse = () => {
    return queryUser().catch(_ => {
      setTimeout(queryUntilResponse, 100)
    })
  }
  
  const queryUser = () => {
    return queryQUser(address.value)
    .then(u => {
      user.value = u
    })
  }
  
  const queryCoins = () => {
    return queryAllBalances(address.value)
    .then(c => {
      coins.value = c.balances
    })
  }

  return { queryUser, queryCoins, user, coins }
}

let instance: ReturnType<typeof useUserInstance>;

export const useUser = () => {
  if (!instance) {
    instance = useUserInstance();
  }
  return instance;
};