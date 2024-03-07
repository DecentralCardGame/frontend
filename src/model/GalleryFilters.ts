import type {
  CardRarity,
  Status,
} from "decentralcardgame-cardchain-client-ts/DecentralCardGame.cardchain.cardchain/types/cardchain/cardchain/card";

export class GalleryFilters {
  visible = false;
  owner = "";
  statuses: Status[] = new Array<Status>();
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
}
