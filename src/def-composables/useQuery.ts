import { useClient } from "@/composables/useClient";
import type { AxiosResponse } from "axios";
import { ChainCard, Card } from "@/model/Card";
import { Coin } from "@/model/Coin";
import type { User } from "decentralcardgame-cardchain-client-ts/DecentralCardGame.cardchain.cardchain/types/cardchain/cardchain/user";


const handlers: { [key: string]: (res: AxiosResponse) => any } = {
  defaultHandler: (res) => {
    return res.data;
  },
  queryQCard: (res): Card => {
    return ChainCard.from(res.data).toCard();
  },
  queryQUser: (res): User => {
    return res.data;
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
  },
  queryQVotingResults: (res) => {
    return res.data;
  },
  queryGrants: (res) => {
    return res.data;
  },
  queryGranterGrants: (res) => {
    return res.data;
  },
  queryGranteeGrants: (res) => {
    return res.data;
  },
  queryQEncounter: (res) => {
    return res.data;
  },
  queryQEncounterWithImage: (res) => {
    return res.data;
  },
  queryQEncounters: (res) => {
    return res.data;
  },
  queryQEncountersWithImage: (res) => {
    return res.data;
  },
};

// Do not touch
const useQueryInstance = () => {
  const client = useClient();
  const unified = Object.assign(client.CosmosBankV1Beta1.query, client.DecentralCardGameCardchainCardchain.query, client.CosmosAuthzV1Beta1.query);
  const keys = Object.keys(unified);

  let queries: { [id: string]: (...args: any[]) => Promise<any> } = {};

  keys.forEach(key => {
    queries[key] = (...args: any[]) => {
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
