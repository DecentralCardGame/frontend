export class Coin {
  denom: string;
  amount: number;

  constructor(denom: string = "ucredits", amount: number = 0) {
    this.denom = denom;
    this.amount = amount;
  }

  normalize(): Coin {
    if (this.denom[0] == "u") {
      this.denom = this.denom.slice(1);
      this.amount /= 10 ** 6;
    }
    return this;
  }

  denormalize(): Coin {
    if (this.denom[0] != "u") {
      this.denom = "u"+this.denom;
      this.amount *= 10 ** 6;
      this.amount = Math.ceil(this.amount)
    }
    return this;
  }

  pretty(): string {
    return this.amount + this.denom;
  }

  toCompatCoin(): CompatCoin {
    return {denom: this.denom, amount: ""+this.amount}
  }

  static from(json: any): Coin {
    return Object.assign(new Coin(), json);
  }
}

export type CompatCoin = {
  denom: string;
  amount: string;
}