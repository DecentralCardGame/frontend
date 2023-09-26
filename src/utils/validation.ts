import { env } from "@/env"

export const validAddress = (address: string) => {
  if (address) {
    return address.startsWith(env.prefix) && address.length === 41
  } else {
    return false
  }
}