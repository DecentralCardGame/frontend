import type { User } from "@/model/User"
import { ref, type Ref } from "vue"
import { useQuery } from "./useQuery"
import type { Card } from "@/model/Card"
import { useAddress } from "./useAddress"

const useProfilePicInstance = () => {
  const { queryQCard, queryQUser } = useQuery()
  const { address } = useAddress()
  const loggedInProfilePic = ref("spinner.svg")

  const getDefaultImg = (addr: string) => {
    let myRandom = addr.charCodeAt(addr.length - 1) % 4
    return "Avatar" + myRandom + ".png"
  }

  const getCard = (id: number) => {
    return queryQCard(id)
      .then((card: Card) => {
        return card
      })
  }

  const getImg = (user: User, address: string, img: Ref<string> = ref("")) => {
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

  const setLoggedInProfilePic = () => {
    queryQUser(address.value)
    .then(user => {
      getImg(user, address.value, loggedInProfilePic)
    })
  }

  return { getImg, setLoggedInProfilePic, loggedInProfilePic }
}

let instance: ReturnType<typeof useProfilePicInstance>;

export const useProfilePic = () => {
  if (!instance) {
    instance = useProfilePicInstance();
  }
  return instance;
};