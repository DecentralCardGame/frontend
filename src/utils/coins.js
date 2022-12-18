export class Coin {
  constructor(coin) {
    this.denom = coin.denom
    this.amount = coin.amount
  }

  nornalize() {
    if (this.denom[0] === "u") {
      this.denom = this.denom.slice(1)
      this.amount /= 10**6
    }
    return this
  }

  pretty() {
    return this.amount + this.denom
  }
}