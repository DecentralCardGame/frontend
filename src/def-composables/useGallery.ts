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
import { ref, type Ref } from "vue";

export type PageQuery = QueryQCardsRequest;

export const normalizeQuery = (query: any): PageQuery => {
  console.log(query);
  return QueryQCardsRequest.fromPartial(query);
};

// Sadly this is needed, since the shitty querier displays arrays and `&Name[]=...` and not `&Name=...` this makes me mad
const constructAssRetardetQueryParams = (query: PageQuery): string => {
  return Object.keys(query)
    .map((key): string => {
      let k = key as keyof PageQuery;
      if (typeof query[k] == "object") {
        return (query[k] as Array<any>)
          .map((v) => `&${k}=${v}`)
          .reduce((akku: string, curr: string) => akku + curr);
      }
      return `&${k}=${query[k]}`;
    })
    .reduce((akku: string, curr: string) => akku + curr);
};

const useGalleryInstance = () => {
  const { QueryQCards } = useDecentralCardGameCardchainCardchain();
  const { galleryFilters } = useGalleryFilters;
  const { queryQCards } = useQuery();

  const cardList: Ref<Array<number>> = ref([]);

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
      sortBy: galleryFilters.sortBy
        ? galleryFilters.sortBy.replace(/\s+/g, "").replace(/\(.*?\)/g, "")
        : "",
    } as Partial<PageQuery>);
  };

  const loadQueryCardList = (query: PageQuery) => {
    router.push({ path: "gallery", query: query });

    queryQCards(constructAssRetardetQueryParams(query), {}).then(
      (res: QueryQCardsResponse) => {
        cardList.value = res.cardsList;
      }
    );
    /*Promise.all(requestedCards).then((res) => {
      let cardList: number[] = R.reduce<unknown, number[]>(
        R.concat,
        [],
        R.pluck("cardsList", res)
      );

      if (R.any((x) => R.includes(x, galleryFilters.sortBy), ["A-Z", "↑"])) {
        state.cardList = R.reverse(cardList).map((v) => Number(v));
      } else {
        state.cardList = R.reverse(cardList);
      }
    });*/
  };

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

/*
const normalizeQuery = (query: PageQuery): PageQuery => {
  return {
    status: query.status ? query.status.toLowerCase() : "playable", // default playable
    owner: query.owner ? query.owner : "",
    cardType: query.cardType ? query.cardType : "",
    classes: query.classes ? query.classes : "",
    sortBy: query.sortBy
      ? query.sortBy.replace(/\s+/g, "").replace(/\(.*?\)/g, "")
      : "",
    rarity: query.rarity,
    nameContains: query.nameContains ? query.nameContains : "",
    keywordsContains: query.keywordsContains ? query.keywordsContains : "",
    notesContains: query.notesContains
      ? query.notesContains
      : query.status ||
        query.owner ||
        query.cardType ||
        query.classes ||
        query.sortBy ||
        query.nameContains ||
        query.keywordsContains ||
        query.notesContains
      ? ""
      : loggedIn.value
      ? ""
      : "Finished", // non-logged in users (noobs), without any filters, will only see the alpha set, this is a HACK to cheat in notesContains
  };
};

const loadQueryCardList = (query: PageQuery) => {
  router.push({ path: "gallery", query: query });

  let requestedCards = [
    queryQCards(query.status, {
      owner: query.owner,
      cardType: query.cardType,
      classes: query.classes,
      sortBy: query.sortBy,
      nameContains: query.nameContains,
      keywordsContains: query.keywordsContains,
      notesContains: query.notesContains,
    }),
  ];
  Promise.all(requestedCards).then((res) => {
    let cardList: number[] = R.reduce<unknown, number[]>(
      R.concat,
      [],
      R.pluck("cardsList", res)
    );

    if (R.any((x) => R.includes(x, galleryFilters.sortBy), ["A-Z", "↑"])) {
      state.cardList = R.reverse(cardList).map((v) => Number(v));
    } else {
      state.cardList = R.reverse(cardList);
    }
  });
};
*/
