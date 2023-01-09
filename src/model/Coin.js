"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Coin = void 0;
class Coin {
    constructor(denom = "ucredits", amount = 0) {
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
    static from(json) {
        return Object.assign(new Coin(), json);
    }
}
exports.Coin = Coin;
