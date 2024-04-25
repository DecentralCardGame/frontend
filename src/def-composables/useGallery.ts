import router from "@/router";
import {
  QueryQCardsRequest,
  QueryQCardsResponse,
} from "decentralcardgame-cardchain-client-ts/DecentralCardGame.cardchain.cardchain/types/cardchain/cardchain/query";
import {
  CardClass,
  CardType,
  Status,
} from "decentralcardgame-cardchain-client-ts/DecentralCardGame.cardchain.cardchain/types/cardchain/cardchain/card";
import { useQuery } from "@/def-composables/useQuery";
import { ref, watch, type Ref } from "vue";
import { GalleryFilters } from "@/model/GalleryFilters";

export type PageQuery = QueryQCardsRequest;

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

const { queryQCards } = useQuery();

const cardList: Ref<Array<number>> = ref([]);
const galleryFilters: Ref<GalleryFilters> = ref(new GalleryFilters());

const galleryFiltersFromPageQuery = (query: PageQuery) => {
  galleryFilters.value.owner = query.owner;
  galleryFilters.value.nameContains = query.nameContains;
  galleryFilters.value.notesContains = query.notesContains;
  galleryFilters.value.sortBy = query.sortBy ? query.sortBy : "Name";
  galleryFilters.value.multiClass = query.multiClassOnly;
  galleryFilters.value.status =
    query.statuses.length != 1 ? "playable" : query.statuses[0];

  if (
    query.classes.length == 0 ||
    [0, 1, 2, 3]
      .map((v) => query.classes.includes(v as CardClass))
      .every((v) => v)
  ) {
    galleryFilters.value.nature = false;
    galleryFilters.value.culture = false;
    galleryFilters.value.mysticism = false;
    galleryFilters.value.technology = false;
  } else {
    galleryFilters.value.nature = query.classes.includes(CardClass.nature);
    galleryFilters.value.technology = query.classes.includes(
      CardClass.technology,
    );
    galleryFilters.value.culture = query.classes.includes(CardClass.culture);
    galleryFilters.value.mysticism = query.classes.includes(
      CardClass.mysticism,
    );
  }

  if (
    query.cardTypes.length == 0 ||
    [0, 1, 2, 3]
      .map((v) => query.cardTypes.includes(v as CardType))
      .every((v) => v)
  ) {
    galleryFilters.value.action = false;
    galleryFilters.value.place = false;
    galleryFilters.value.hq = false;
    galleryFilters.value.entity = false;
  } else {
    galleryFilters.value.action = query.cardTypes.includes(CardType.action);
    galleryFilters.value.place = query.cardTypes.includes(CardType.place);
    galleryFilters.value.hq = query.cardTypes.includes(CardType.headquarter);
    galleryFilters.value.entity = query.cardTypes.includes(CardType.entity);
  }
};

const pageQueryFromGalleryFilters = (): PageQuery => {
  return QueryQCardsRequest.fromPartial({
    owner: galleryFilters.value.owner,
    statuses:
      galleryFilters.value.status == "playable"
        ? [
            Status.bannedSoon,
            Status.bannedVerySoon,
            Status.permanent,
            Status.trial,
          ]
        : [galleryFilters.value.status],
    classes: [
      ...(galleryFilters.value.nature ? [CardClass.nature] : []),
      ...(galleryFilters.value.mysticism ? [CardClass.mysticism] : []),
      ...(galleryFilters.value.culture ? [CardClass.culture] : []),
      ...(galleryFilters.value.technology ? [CardClass.technology] : []),
    ],
    cardTypes: [
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
  } as Partial<QueryQCardsRequest>);
};

const loadQueryCardList = (query: PageQuery): void => {
  router.push({ path: "gallery", query: query });

  queryQCards(query, {
    paramsSerializer: constructAssRetardetQueryParams,
  }).then((res: QueryQCardsResponse) => {
    cardList.value = res.cardsList;
  });
};

watch(galleryFilters.value, () =>
  loadQueryCardList(pageQueryFromGalleryFilters()),
);

export const useGallery = () => {
  return {
    pageQueryFromGalleryFilters,
    galleryFiltersFromPageQuery,
    galleryFilters,
    cardList,
    loadQueryCardList,
  };
};
