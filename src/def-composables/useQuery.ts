import { useClient } from "@/composables/useClient";
import type { AxiosResponse } from "axios";
import { ChainCard, Card } from "@/model/Card";
import { User } from "@/model/User";
import { Coin } from "@/model/Coin";


const handlers: { [key: string]: (res: AxiosResponse) => any } = {
  defaultHandler: (res) => {
    return res.data;
  },
  queryQCard: (res): Card => {
    return ChainCard.from(res.data).toCard();
  },
  queryQUser: (res): User => {
    return User.from(res.data);
  },
  queryAllBalances: (res) => {
    let coins: Coin[] = [];
    res.data.balances.forEach((coin: any) => {
      coins.push(Coin.from(coin));
    });
    res.data.balances = coins;
    return res.data;
  },
  queryQCardchainInfo: (res) => {
    res.data.cardAuctionPrice = Coin.from(res.data.cardAuctionPrice);
    return res.data;
  }
};

// Do not touch
const useQueryInstance = () => {
  const client = useClient();
  const unified = Object.assign(client.CosmosBankV1Beta1.query, client.DecentralCardGameCardchainCardchain.query);
  const keys = Object.keys(unified);

  let queries: { [id: string]: (args: any) => Promise<any> } = {};

  keys.forEach(key => {
    queries[key] = (...args: any) => {
      return new Promise((myResolve, _) => {
        myResolve((unified as any)[key](...args).then(handlers.hasOwnProperty(key) ? handlers[key] : handlers.defaultHandler));
      });
    };
  });

  return queries;
};

let instance: ReturnType<typeof useQueryInstance>;

export const useQuery = () => {
  if (!instance) {
    instance = useQueryInstance();
  }
  return instance;
};