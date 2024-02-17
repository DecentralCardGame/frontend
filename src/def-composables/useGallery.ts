import useDecentralCardGameCardchainCardchain from "@/composables/useDecentralCardGameCardchainCardchain";
import { useGalleryFilters } from "@/def-composables/useGalleryFilters";
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

export type PageQuery = QueryQCardsRequest;

export const normalizeQuery = (query: any): PageQuery => {
  console.log(query);
  return QueryQCardsRequest.fromPartial(query);
};

// Sadly this is needed, since the shitty querier displays arrays and `&Name[]=...` and not `&Name=...` this makes me mad
const constructAssRetardetQueryParams = (query: any): string => {
  return Object.keys(query)
    .map((key): string => {
      let k = key as keyof PageQuery;
      if (typeof query[k] == "object") {
        return (query[k] as Array<any>)
          .map((v) => `&${k}=${v}`)
          .reduce((akku: string, curr: string) => akku + curr);
      }
      return query[k] ? `&${k}=${query[k]}` : "";
    })
    .reduce((akku: string, curr: string) => akku + curr);
};

const useGalleryInstance = () => {
  const { galleryFilters } = useGalleryFilters;
  const { queryQCards } = useQuery();

  const cardList: Ref<Array<number>> = ref([]);

  const galleryFiltersFromPageQuery = (query: PageQuery) => {
    galleryFilters.owner = query.owner;
    galleryFilters.nameContains = query.nameContains;
    galleryFilters.notesContains = query.notesContains;
    galleryFilters.sortBy = query.sortBy;

    if (query.classes.length == 0) {
      galleryFilters.nature = true;
      galleryFilters.culture = true;
      galleryFilters.mysticism = true;
      galleryFilters.technology = true;
    } else {
      galleryFilters.nature = query.classes.includes(CardClass.nature);
      galleryFilters.technology = query.classes.includes(CardClass.technology);
      galleryFilters.culture = query.classes.includes(CardClass.culture);
      galleryFilters.mysticism = query.classes.includes(CardClass.mysticism);
    }

    if (query.cardTypes.length == 0) {
      galleryFilters.action = true;
      galleryFilters.place = true;
      galleryFilters.hq = true;
      galleryFilters.entity = true;
    } else {
      galleryFilters.action = query.cardTypes.includes(CardType.action);
      galleryFilters.place = query.cardTypes.includes(CardType.place);
      galleryFilters.hq = query.cardTypes.includes(CardType.headquarter);
      galleryFilters.entity = query.cardTypes.includes(CardType.entity);
    }
  };

  const pageQueryFromGalleryFilters = (): PageQuery => {
    return QueryQCardsRequest.fromPartial({
      owner: galleryFilters.owner,
      statuses:
        galleryFilters.statuses.length == 0
          ? [
              Status.bannedSoon,
              Status.bannedVerySoon,
              Status.permanent,
              Status.trial,
            ]
          : galleryFilters.statuses,
      classes: [
        ...(galleryFilters.nature ? [CardClass.nature] : []),
        ...(galleryFilters.mysticism ? [CardClass.mysticism] : []),
        ...(galleryFilters.culture ? [CardClass.culture] : []),
        ...(galleryFilters.technology ? [CardClass.technology] : []),
      ],
      cardTypes: [
        ...(galleryFilters.place ? [CardType.place] : []),
        ...(galleryFilters.action ? [CardType.action] : []),
        ...(galleryFilters.entity ? [CardType.entity] : []),
        ...(galleryFilters.hq ? [CardType.headquarter] : []),
      ],
      rarities: [
        ...(galleryFilters.common ? [CardRarity.common] : []),
        ...(galleryFilters.uncommon ? [CardRarity.uncommon] : []),
        ...(galleryFilters.rare ? [CardRarity.rare] : []),
        ...(galleryFilters.exceptional ? [CardRarity.exceptional] : []),
        ...(galleryFilters.unique ? [CardRarity.unique] : []),
      ],
      keywordsContains: galleryFilters.keywordsContains,
      nameContains: galleryFilters.nameContains,
      notesContains: galleryFilters.notesContains,
      sortBy: galleryFilters.sortBy ? galleryFilters.sortBy : "",
    } as Partial<PageQuery>);
  };

  const loadQueryCardList = (query: PageQuery) => {
    router.push({ path: "gallery", query: query });

    queryQCards(query, {
      paramsSerializer: constructAssRetardetQueryParams,
    }).then((res: QueryQCardsResponse) => {
      console.log(res);
      cardList.value = res.cardsList;
    });
  };

  watch(galleryFilters, () => loadQueryCardList(pageQueryFromGalleryFilters()));

  return {
    cardList,
    loadQueryCardList,
    pageQueryFromGalleryFilters,
  };
};
let clientInstance: ReturnType<typeof useGalleryInstance>;

export const useGallery: () => any = () => {
  if (!clientInstance) {
    clientInstance = useGalleryInstance();
  }
  return clientInstance;
};
