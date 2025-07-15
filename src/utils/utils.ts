import { Coin } from "@/model/Coin";
import { QueryCardsRequest } from "decentralcardgame-cardchain-client-ts/types/cardchain/cardchain/query";
import type { PageQuery } from "@/def-composables/useGallery";

export const normalizeCoins = (coins: Coin[]) => {
  let newCoins: Coin[] = [];
  coins.forEach((coin) => {
    newCoins.push(Coin.from(coin).normalize());
  });
  return newCoins;
};

export const normalizeNumberList = (l: Array<any> | any) =>
  (Array.isArray(l) ? l.map((v) => Number(v)) : [Number(l)]).filter(
    (w) => !Number.isNaN(w),
  );
export const normalizeBoolean = (b: any) => b == "true";

export const normalizeQuery = (query: any): PageQuery => {
  query.class = normalizeNumberList(query.class);
  query.cardType = normalizeNumberList(query.cardType);
  query.rarities = normalizeNumberList(query.rarities);
  query.status = normalizeNumberList(query.status);
  query.onlyBalanceAnchors = normalizeBoolean(query.onlyBalanceAnchors);
  query.onlyStarterCard = normalizeBoolean(query.onlyStarterCard);
  query.multiClassOnly = normalizeBoolean(query.multiClassOnly);
  return QueryCardsRequest.fromPartial(query);
};

export function isASCII(str: string) {
  return /^[\x00-\x7F]*$/.test(str);
}
