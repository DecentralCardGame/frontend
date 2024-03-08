import type {
  CardRarity,
  Status,
} from "decentralcardgame-cardchain-client-ts/DecentralCardGame.cardchain.cardchain/types/cardchain/cardchain/card";

export type GalleryStatus = Status | "playable"

export class GalleryFilters {
  visible = false;
  owner = "";
  place: boolean = false;
  action: boolean = false;
  hq: boolean = false;
  entity: boolean = false;
  keywordsContains = "";
  sortBy = "Name";
  nameContains = "";
  notesContains = "";
  cardsPerPage = 30;
  mysticism = false;
  nature = false;
  technology = false;
  culture = false;
  multiClass = false;
  rarity?: CardRarity = undefined;
  status: GalleryStatus = "playable"
}
