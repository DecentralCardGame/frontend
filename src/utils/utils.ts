import { Coin } from "@/model/Coin";
import { QueryQCardsRequest } from "decentralcardgame-cardchain-client-ts/DecentralCardGame.cardchain.cardchain/types/cardchain/cardchain/query";
import type { PageQuery } from "@/def-composables/useGallery";

export const normalizeCoins = (coins: Coin[]) => {
  let newCoins: Coin[] = [];
  coins.forEach((coin) => {
    newCoins.push(Coin.from(coin).normalize());
  });
  return newCoins;
};

export const normalizeNumberList = (l: Array<any>) => l.map((v) => Number(v));
export const normalizeBoolean = (b: any) => b == "true";

export const normalizeQuery = (query: any): PageQuery => {
  let q = QueryQCardsRequest.fromPartial(query);
  q.classes = normalizeNumberList(q.classes);
  q.cardTypes = normalizeNumberList(q.cardTypes);
  q.rarities = normalizeNumberList(q.rarities);
  q.statuses = normalizeNumberList(q.statuses);
  q.onlyBalanceAnchors = normalizeBoolean(q.onlyBalanceAnchors);
  q.onlyStarterCard = normalizeBoolean(q.onlyStarterCard);
  q.multiClassOnly = normalizeBoolean(q.multiClassOnly);

  return q;
};

export function isASCII(str: string) {
  return /^[\x00-\x7F]*$/.test(str);
}
