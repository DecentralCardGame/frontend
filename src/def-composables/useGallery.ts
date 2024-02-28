import router from "@/router";
import {
  QueryQCardsRequest,
  QueryQCardsResponse,
} from "decentralcardgame-cardchain-client-ts/DecentralCardGame.cardchain.cardchain/types/cardchain/cardchain/query";
import {
  CardClass,
  CardRarity,
  CardType,
  Status,
} from "decentralcardgame-cardchain-client-ts/DecentralCardGame.cardchain.cardchain/types/cardchain/cardchain/card";
import { useQuery } from "@/def-composables/useQuery";
import { ref, watch, type Ref } from "vue";
import { GalleryFilters } from "@/model/GalleryFilters";

export type PageQuery = QueryQCardsRequest;

const normalizeNumberList = (l: Array<any>) => l.map((v) => Number(v));
const normalizeBoolean = (b: any) => b == "true";

const normalizeQuery = (query: any): PageQuery => {
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
  console.log(query);
  galleryFilters.value.owner = query.owner;
  galleryFilters.value.nameContains = query.nameContains;
  galleryFilters.value.notesContains = query.notesContains;
  galleryFilters.value.sortBy = query.sortBy;
  galleryFilters.value.multiClass = query.multiClassOnly;

  if (query.classes.length == 0) {
    galleryFilters.value.nature = true;
    galleryFilters.value.culture = true;
    galleryFilters.value.mysticism = true;
    galleryFilters.value.technology = true;
  } else {
    galleryFilters.value.nature = query.classes.includes(CardClass.nature);
    galleryFilters.value.technology = query.classes.includes(
      CardClass.technology
    );
    galleryFilters.value.culture = query.classes.includes(CardClass.culture);
    galleryFilters.value.mysticism = query.classes.includes(
      CardClass.mysticism
    );
  }

  if (query.cardTypes.length == 0) {
    galleryFilters.value.action = true;
    galleryFilters.value.place = true;
    galleryFilters.value.hq = true;
    galleryFilters.value.entity = true;
  } else {
    galleryFilters.value.action = query.cardTypes.includes(CardType.action);
    galleryFilters.value.place = query.cardTypes.includes(CardType.place);
    galleryFilters.value.hq = query.cardTypes.includes(CardType.headquarter);
    galleryFilters.value.entity = query.cardTypes.includes(CardType.entity);
  }
  console.log(galleryFilters);
};

const pageQueryFromGalleryFilters = (): PageQuery => {
  return QueryQCardsRequest.fromPartial({
    owner: galleryFilters.value.owner,
    statuses:
      galleryFilters.value.statuses.length == 0
        ? [
            Status.bannedSoon,
            Status.bannedVerySoon,
            Status.permanent,
            Status.trial,
          ]
        : galleryFilters.value.statuses,
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
    rarities: [
      ...(galleryFilters.value.common ? [CardRarity.common] : []),
      ...(galleryFilters.value.uncommon ? [CardRarity.uncommon] : []),
      ...(galleryFilters.value.rare ? [CardRarity.rare] : []),
      ...(galleryFilters.value.exceptional ? [CardRarity.exceptional] : []),
      ...(galleryFilters.value.unique ? [CardRarity.unique] : []),
    ],
    keywordsContains: galleryFilters.value.keywordsContains,
    nameContains: galleryFilters.value.nameContains,
    notesContains: galleryFilters.value.notesContains,
    sortBy: galleryFilters.value.sortBy ? galleryFilters.value.sortBy : "",
    multiClassOnly: galleryFilters.value.multiClass,
  } as Partial<PageQuery>);
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
  loadQueryCardList(pageQueryFromGalleryFilters())
);

export const useGallery = () => {
  return {
    pageQueryFromGalleryFilters,
    galleryFiltersFromPageQuery,
    galleryFilters,
    cardList,
    loadQueryCardList,
    normalizeQuery,
  };
};
