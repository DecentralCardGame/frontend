export class Coin {
  denom: string;
  amount: number;

  constructor(denom: string = "ucredits", amount: number = 0) {
    this.denom = denom;
    this.amount = amount;
  }

  normalize() {
    if (this.denom[0] == "u") {
      this.denom = this.denom.slice(1);
      this.amount /= 10 ** 6;
    }
    return this;
  }

  pretty() {
    return this.amount + this.denom;
  }

  static from(json: any) {
    return Object.assign(new Coin(), json);
  }
}