import type { Status } from "decentralcardgame-cardchain-client-ts/DecentralCardGame.cardchain.cardchain/types/cardchain/cardchain/card";

export class GalleryFilters {
  visible = false;
  owner = "";
  statuses: Status[] = new Array<Status>();
  place: boolean = true;
  action: boolean = true;
  hq: boolean = true;
  entity: boolean = true;
  keywordsContains = "";
  sortBy = "Name";
  nameContains = "";
  notesContains = "";
  cardsPerPage = 30;
  mysticism = true;
  nature = true;
  technology = true;
  culture = true;
  common = true;
  uncommon = true;
  rare = true;
  exceptional = true;
  unique = true;
  multiClass = false;
}
