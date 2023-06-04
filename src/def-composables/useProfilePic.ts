import type { User } from "@/model/User"
import { ref } from "vue"
import { useQuery } from "./useQuery"
import { useAddress } from "./useAddress"
import type { Card } from "@/model/Card"

const useProfilePicInstance = () => {
  const { queryQCard } = useQuery()

  const getDefaultImg = (address: string) => {
    let myRandom = address.charCodeAt(address.length - 1) % 4
    return "Avatar" + myRandom + ".png"
  }

  const getCard = (id: number) => {
    return queryQCard(id)
      .then((card: Card) => {
        return card
      })
  }

  const getImg = (user: User, address: string) => {
    const img = ref("")
    if (user.profileCard != 0) {
      getCard(user.profileCard).then(a => {
        if (a === null) {
          img.value = getDefaultImg(address)
        } else {
          img.value = a.image
        }
      }
      )
    } else {
      img.value = getDefaultImg(address)
    }
    return img
  }

  return { getImg }
}

let instance: ReturnType<typeof useProfilePicInstance>;

export const useProfilePic = () => {
  if (!instance) {
    instance = useProfilePicInstance();
  }
  return instance;
};
