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

export const normalizeNumberList = (l: Array<any> | any) =>
  Array.isArray(l) ? l.map((v) => Number(v)) : [Number(l)];
export const normalizeBoolean = (b: any) => b == "true";

export const normalizeQuery = (query: any): PageQuery => {
  query.classes = normalizeNumberList(query.classes);
  query.cardTypes = normalizeNumberList(query.cardTypes);
  query.rarities = normalizeNumberList(query.rarities);
  query.statuses = normalizeNumberList(query.statuses);
  query.onlyBalanceAnchors = normalizeBoolean(query.onlyBalanceAnchors);
  query.onlyStarterCard = normalizeBoolean(query.onlyStarterCard);
  query.multiClassOnly = normalizeBoolean(query.multiClassOnly);
  return QueryQCardsRequest.fromPartial(query);
};

export function isASCII(str: string) {
  return /^[\x00-\x7F]*$/.test(str);
}
