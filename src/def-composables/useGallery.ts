import router from "@/router";

import { useQuery } from "@/def-composables/useQuery";
import { ref, watch, type Ref } from "vue";
import { GalleryFilters } from "@/model/GalleryFilters";
import {
  QueryCardsRequest,
  QueryCardsResponse,
} from "decentralcardgame-cardchain-client-ts/types/cardchain/cardchain/query";
import {
  CardClass,
  CardStatus,
  CardType,
} from "decentralcardgame-cardchain-client-ts/types/cardchain/cardchain/card";

export type PageQuery = QueryCardsRequest;

// Sadly this is needed, since the shitty querier displays arrays and `&Name[]=...` and not `&Name=...` this makes me mad
const constructAssRetardetQueryParams = (query: any): string => {
  return Object.keys(query)
    .map((key): string => {
      let k = key as keyof PageQuery;
      if (typeof query[k] == "object") {
        return query[k].length != 0
          ? (query[k] as Array<any>)
              .map((v) => `&${k}=${v}`)
              .reduce((akku: string, curr: string) => akku + curr)
          : "";
      }
      return query[k] ? `&${k}=${query[k]}` : "";
    })
    .reduce((akku: string, curr: string) => akku + curr);
};

const { queryCards } = useQuery();

const cardList: Ref<Array<number>> = ref([]);
const galleryFilters: Ref<GalleryFilters> = ref(new GalleryFilters());

const galleryFiltersFromPageQuery = (query: PageQuery) => {
  galleryFilters.value.owner = query.owner;
  galleryFilters.value.nameContains = query.nameContains;
  galleryFilters.value.notesContains = query.notesContains;
  galleryFilters.value.sortBy = query.sortBy ? query.sortBy : "Name";
  galleryFilters.value.multiClass = query.multiClassOnly;
  galleryFilters.value.status =
    query.status.length != 1 ? "playable" : query.status[0];

  if (
    query.class.length == 0 ||
    [0, 1, 2, 3]
      .map((v) => query.class.includes(v as CardClass))
      .every((v) => v)
  ) {
    galleryFilters.value.nature = false;
    galleryFilters.value.culture = false;
    galleryFilters.value.mysticism = false;
    galleryFilters.value.technology = false;
  } else {
    galleryFilters.value.nature = query.class.includes(CardClass.nature);
    galleryFilters.value.technology = query.class.includes(
      CardClass.technology,
    );
    galleryFilters.value.culture = query.class.includes(CardClass.culture);
    galleryFilters.value.mysticism = query.class.includes(CardClass.mysticism);
  }

  if (
    query.cardType.length == 0 ||
    [0, 1, 2, 3]
      .map((v) => query.cardType.includes(v as CardType))
      .every((v) => v)
  ) {
    galleryFilters.value.action = false;
    galleryFilters.value.place = false;
    galleryFilters.value.hq = false;
    galleryFilters.value.entity = false;
  } else {
    galleryFilters.value.action = query.cardType.includes(CardType.action);
    galleryFilters.value.place = query.cardType.includes(CardType.place);
    galleryFilters.value.hq = query.cardType.includes(CardType.headquarter);
    galleryFilters.value.entity = query.cardType.includes(CardType.entity);
  }
};

const pageQueryFromGalleryFilters = (): PageQuery => {
  return QueryCardsRequest.fromPartial({
    owner: galleryFilters.value.owner,
    status:
      galleryFilters.value.status == "playable"
        ? [
            CardStatus.bannedSoon,
            CardStatus.bannedVerySoon,
            CardStatus.permanent,
            CardStatus.trial,
          ]
        : [galleryFilters.value.status],
    class: [
      ...(galleryFilters.value.nature ? [CardClass.nature] : []),
      ...(galleryFilters.value.mysticism ? [CardClass.mysticism] : []),
      ...(galleryFilters.value.culture ? [CardClass.culture] : []),
      ...(galleryFilters.value.technology ? [CardClass.technology] : []),
    ],
    cardType: [
      ...(galleryFilters.value.place ? [CardType.place] : []),
      ...(galleryFilters.value.action ? [CardType.action] : []),
      ...(galleryFilters.value.entity ? [CardType.entity] : []),
      ...(galleryFilters.value.hq ? [CardType.headquarter] : []),
    ],
    rarities:
      typeof galleryFilters.value.rarity !== "undefined"
        ? [galleryFilters.value.rarity]
        : [],
    keywordsContains: galleryFilters.value.keywordsContains,
    nameContains: galleryFilters.value.nameContains,
    notesContains: galleryFilters.value.notesContains,
    sortBy: galleryFilters.value.sortBy ? galleryFilters.value.sortBy : "",
    multiClassOnly: galleryFilters.value.multiClass,
  });
};

const loadQueryCardList = (query: PageQuery): void => {
  console.log(query);
  queryCards(query, {
    paramsSerializer: constructAssRetardetQueryParams,
  }).then((res: QueryCardsResponse) => {
    cardList.value = res.cardIds;
  });
};

watch(galleryFilters.value, () => {
  loadQueryCardList(pageQueryFromGalleryFilters());
});

export const useGallery = () => {
  return {
    pageQueryFromGalleryFilters,
    galleryFiltersFromPageQuery,
    galleryFilters,
    cardList,
    loadQueryCardList,
  };
};
