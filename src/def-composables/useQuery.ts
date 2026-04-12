import { useClient } from "@/composables/useClient";
import type { AxiosResponse } from "axios";
import { Card } from "@/model/Card";
import { Coin } from "@/model/Coin";
import type { User } from "decentralcardgame-cardchain-client-ts/lib/types/cardchain/cardchain/user";
import type { QueryCardResponse } from "decentralcardgame-cardchain-client-ts/lib/types/cardchain/cardchain/query";

const handlers: { [key: string]: (res: AxiosResponse) => any } = {
  defaultHandler: (res) => {
    return res.data;
  },
  queryCard: (res): Card => {
    return Card.fromCardWithImage((res.data as QueryCardResponse).card!);
  },
  queryUser: (res): User => {
    return res.data.user;
  },
  queryAllBalances: (res) => {
    const coins: Coin[] = [];
    res.data.balances.forEach((coin: any) => {
      coins.push(Coin.from(coin));
    });
    res.data.balances = coins;
    return res.data;
  },
  queryCardchainInfo: (res) => {
    res.data.cardAuctionPrice = Coin.from(res.data.cardAuctionPrice);
    return res.data;
  },
  queryVotingResults: (res) => {
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
  queryEncounter: (res) => {
    return res.data;
  },
  queryEncounterWithImage: (res) => {
    return res.data;
  },
  queryEncounters: (res) => {
    return res.data;
  },
  queryEncountersWithImage: (res) => {
    return res.data;
  },
};

// Do not touch
const useQueryInstance = () => {
  const client = useClient();
  const unified = Object.assign(
    client.CosmosBankV_1Beta_1.query,
    client.CardchainCardchain.query,
    client.CosmosAuthzV_1Beta_1.query
  );
  const keys = Object.keys(unified);

  client.CardchainCardchain.query.queryCardchainInfo;

  const queries: { [id: string]: (...args: any[]) => Promise<any> } = {};

  keys.forEach((key) => {
    queries[key] = (...args: any[]) => {
      return new Promise((myResolve, _) => {
        myResolve(
          (unified as any)
            [key](...args)
            .then(handlers.hasOwnProperty(key) ? handlers[key] : handlers.defaultHandler)
        );
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
