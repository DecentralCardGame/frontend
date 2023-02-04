export const validAddress = (address: string) => {
  if (address) {
    return address.startsWith('cc') && address.length === 41
  } else {
    return false
  }
}