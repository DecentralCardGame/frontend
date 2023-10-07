import { Coin } from '@/model/Coin';

export const normalizeCoins = (coins: Coin[]) => {
  let newCoins: Coin[] = [];
  coins.forEach(coin => {
    newCoins.push(Coin.from(coin).normalize())
  })
  return newCoins
}

export function isASCII(str: string) {
  return /^[\x00-\x7F]*$/.test(str);
}