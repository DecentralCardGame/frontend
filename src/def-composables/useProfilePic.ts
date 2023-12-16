import { ref, watch } from "vue";
import { useAddress } from "./useAddress"
import { useUser } from "./useUser";
import type { User } from "decentralcardgame-cardchain-client-ts/DecentralCardGame.cardchain.cardchain/types/cardchain/cardchain/user";
import { useCards } from "@/def-composables/useCards";

const useProfilePicInstance = () => {
  const { address } = useAddress()
  const { user } = useUser()
  const { getCard } = useCards()
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

  const getImg = async (user: User, address: string) => {
    console.log(user);
    if (user.profileCard != 0) {
      let card = await getCard(user.profileCard);
      if (card === null) {
        return getDefaultImg(address);
      } else {
        return card.image;
      }
    } else {
      return Promise.resolve(getDefaultImg(address));
    }
  };

  return { getImg, loggedInProfilePic };
}

let instance: ReturnType<typeof useProfilePicInstance>;

export const useProfilePic = () => {
  if (!instance) {
    instance = useProfilePicInstance();
  }
  return instance;
};
