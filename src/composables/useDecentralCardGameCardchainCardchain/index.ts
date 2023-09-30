/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  useQuery,
  type UseQueryOptions,
  useInfiniteQuery,
  type UseInfiniteQueryOptions,
} from "@tanstack/vue-query";
import { useClient } from "../useClient";
import type { Ref } from "vue";

export default function useDecentralCardGameCardchainCardchain() {
  const client = useClient();
  const QueryParams = (options: any) => {
    const key = { type: "QueryParams" };
    return useQuery(
      [key],
      () => {
        return client.DecentralCardGameCardchainCardchain.query
          .queryParams()
          .then((res) => res.data);
      },
      options
    );
  };

  const QueryQCard = (cardId: string, options: any) => {
    const key = { type: "QueryQCard", cardId };
    return useQuery(
      [key],
      () => {
        const { cardId } = key;
        return client.DecentralCardGameCardchainCardchain.query
          .queryQCard(cardId)
          .then((res) => res.data);
      },
      options
    );
  };

  const QueryQCardContent = (cardId: string, options: any) => {
    const key = { type: "QueryQCardContent", cardId };
    return useQuery(
      [key],
      () => {
        const { cardId } = key;
        return client.DecentralCardGameCardchainCardchain.query
          .queryQCardContent(cardId)
          .then((res) => res.data);
      },
      options
    );
  };

  const QueryQUser = (address: string, options: any) => {
    const key = { type: "QueryQUser", address };
    return useQuery(
      [key],
      () => {
        const { address } = key;
        return client.DecentralCardGameCardchainCardchain.query
          .queryQUser(address)
          .then((res) => res.data);
      },
      options
    );
  };

  const QueryQCardchainInfo = (options: any) => {
    const key = { type: "QueryQCardchainInfo" };
    return useQuery(
      [key],
      () => {
        return client.DecentralCardGameCardchainCardchain.query
          .queryQCardchainInfo()
          .then((res) => res.data);
      },
      options
    );
  };

  const QueryQVotingResults = (options: any) => {
    const key = { type: "QueryQVotingResults" };
    return useQuery(
      [key],
      () => {
        return client.DecentralCardGameCardchainCardchain.query
          .queryQVotingResults()
          .then((res) => res.data);
      },
      options
    );
  };

  const QueryQVotableCards = (address: string, options: any) => {
    const key = { type: "QueryQVotableCards", address };
    return useQuery(
      [key],
      () => {
        const { address } = key;
        return client.DecentralCardGameCardchainCardchain.query
          .queryQVotableCards(address)
          .then((res) => res.data);
      },
      options
    );
  };

  const QueryQCards = (status: string, query: any, options: any) => {
    const key = { type: "QueryQCards", status, query };
    return useQuery(
      [key],
      () => {
        const { status, query } = key;
        return client.DecentralCardGameCardchainCardchain.query
          .queryQCards(status, query ?? undefined)
          .then((res) => res.data);
      },
      options
    );
  };

  const QueryQMatch = (matchId: string, options: any) => {
    const key = { type: "QueryQMatch", matchId };
    return useQuery(
      [key],
      () => {
        const { matchId } = key;
        return client.DecentralCardGameCardchainCardchain.query
          .queryQMatch(matchId)
          .then((res) => res.data);
      },
      options
    );
  };

  const QueryQCollection = (collectionId: string, options: any) => {
    const key = { type: "QueryQCollection", collectionId };
    return useQuery(
      [key],
      () => {
        const { collectionId } = key;
        return client.DecentralCardGameCardchainCardchain.query
          .queryQCollection(collectionId)
          .then((res) => res.data);
      },
      options
    );
  };

  const QueryQSellOffer = (sellOfferId: string, options: any) => {
    const key = { type: "QueryQSellOffer", sellOfferId };
    return useQuery(
      [key],
      () => {
        const { sellOfferId } = key;
        return client.DecentralCardGameCardchainCardchain.query
          .queryQSellOffer(sellOfferId)
          .then((res) => res.data);
      },
      options
    );
  };

  const QueryQCouncil = (councilId: string, options: any) => {
    const key = { type: "QueryQCouncil", councilId };
    return useQuery(
      [key],
      () => {
        const { councilId } = key;
        return client.DecentralCardGameCardchainCardchain.query
          .queryQCouncil(councilId)
          .then((res) => res.data);
      },
      options
    );
  };

  const QueryQMatches = (query: any, options: any) => {
    const key = { type: "QueryQMatches", query };
    return useQuery(
      [key],
      () => {
        const { query } = key;
        return client.DecentralCardGameCardchainCardchain.query
          .queryQMatches(query ?? undefined)
          .then((res) => res.data);
      },
      options
    );
  };

  const QueryQSellOffers = (status: string, query: any, options: any) => {
    const key = { type: "QueryQSellOffers", status, query };
    return useQuery(
      [key],
      () => {
        const { status, query } = key;
        return client.DecentralCardGameCardchainCardchain.query
          .queryQSellOffers(status, query ?? undefined)
          .then((res) => res.data);
      },
      options
    );
  };

  const QueryQServer = (id: string, options: any) => {
    const key = { type: "QueryQServer", id };
    return useQuery(
      [key],
      () => {
        const { id } = key;
        return client.DecentralCardGameCardchainCardchain.query
          .queryQServer(id)
          .then((res) => res.data);
      },
      options
    );
  };

  const QueryQCollections = (
    status: string,
    ignoreStatus: string,
    query: any,
    options: any
  ) => {
    const key = { type: "QueryQCollections", status, ignoreStatus, query };
    return useQuery(
      [key],
      () => {
        const { status, ignoreStatus, query } = key;
        return client.DecentralCardGameCardchainCardchain.query
          .queryQCollections(status, ignoreStatus, query ?? undefined)
          .then((res) => res.data);
      },
      options
    );
  };

  const QueryRarityDistribution = (collectionId: string, options: any) => {
    const key = { type: "QueryRarityDistribution", collectionId };
    return useQuery(
      [key],
      () => {
        const { collectionId } = key;
        return client.DecentralCardGameCardchainCardchain.query
          .queryRarityDistribution(collectionId)
          .then((res) => res.data);
      },
      options
    );
  };

  return {
    QueryParams,
    QueryQCard,
    QueryQCardContent,
    QueryQUser,
    QueryQCardchainInfo,
    QueryQVotingResults,
    QueryQVotableCards,
    QueryQCards,
    QueryQMatch,
    QueryQCollection,
    QueryQSellOffer,
    QueryQCouncil,
    QueryQMatches,
    QueryQSellOffers,
    QueryQServer,
    QueryQCollections,
    QueryRarityDistribution,
  };
}
