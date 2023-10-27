import { ref, watch, type Ref } from "vue";
import { useQuery } from "./useQuery"
import type { Card } from "@/model/Card"
import { useAddress } from "./useAddress"
import { useUser } from "./useUser";
import type { User } from "decentralcardgame-cardchain-client-ts/DecentralCardGame.cardchain.cardchain/types/cardchain/cardchain/user";

const useProfilePicInstance = () => {
  const { queryQCard } = useQuery()
  const { address } = useAddress()
  const { user } = useUser()
  const loggedInProfilePic = ref("spinner.svg")

  watch(user, (u) => {
    getImg(u, address.value).then(img => {
      loggedInProfilePic.value = img
    })
  }, {deep: true})

  const getDefaultImg = (addr: string) => {
    let myRandom = addr.charCodeAt(addr.length - 1) % 4
    return "Avatar" + myRandom + ".png"
  }

  const getImg = (user: User, address: string) => {
    console.log(user)
    if (user.profileCard != 0) {
      return queryQCard(user.profileCard).then((card: Card) => {
        if (card === null) {
          return getDefaultImg(address)
        } else {
          return card.image
        }
      })
    } else {
      return Promise.resolve(getDefaultImg(address))
    }
  }

  return { getImg, loggedInProfilePic }
}

let instance: ReturnType<typeof useProfilePicInstance>;

export const useProfilePic = () => {
  if (!instance) {
    instance = useProfilePicInstance();
  }
  return instance;
};
