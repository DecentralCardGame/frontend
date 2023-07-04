import type { Coin } from '@/model/Coin';

export const normalizeCoins = (coins: Coin[]) => {
  let newCoins: Coin[] = [];
  coins.forEach(coin => {
    newCoins.push(coin.normalize())
  })
  return newCoins
}
