/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery, useInfiniteQuery } from "@tanstack/vue-query";
import { useClient } from "../useClient";
export default function useCosmosBaseTendermintV1Beta1() {
  const client = useClient();
  const ServiceGetNodeInfo = (options) => {
    const key = { type: "ServiceGetNodeInfo" };
    return useQuery(
      [key],
      () => {
        return client.CosmosBaseTendermintV1Beta1.query
          .serviceGetNodeInfo()
          .then((res) => res.data);
      },
      options
    );
  };
  const ServiceGetSyncing = (options) => {
    const key = { type: "ServiceGetSyncing" };
    return useQuery(
      [key],
      () => {
        return client.CosmosBaseTendermintV1Beta1.query
          .serviceGetSyncing()
          .then((res) => res.data);
      },
      options
    );
  };
  const ServiceGetLatestBlock = (options) => {
    const key = { type: "ServiceGetLatestBlock" };
    return useQuery(
      [key],
      () => {
        return client.CosmosBaseTendermintV1Beta1.query
          .serviceGetLatestBlock()
          .then((res) => res.data);
      },
      options
    );
  };
  const ServiceGetBlockByHeight = (height, options) => {
    const key = { type: "ServiceGetBlockByHeight", height };
    return useQuery(
      [key],
      () => {
        const { height } = key;
        return client.CosmosBaseTendermintV1Beta1.query
          .serviceGetBlockByHeight(height)
          .then((res) => res.data);
      },
      options
    );
  };
  const ServiceGetLatestValidatorSet = (query, options, perPage) => {
    const key = { type: "ServiceGetLatestValidatorSet", query };
    return useInfiniteQuery(
      [key],
      ({ pageParam = 1 }) => {
        const { query } = key;
        query["pagination.limit"] = perPage;
        query["pagination.offset"] = (pageParam - 1) * perPage;
        query["pagination.count_total"] = true;
        return client.CosmosBaseTendermintV1Beta1.query
          .serviceGetLatestValidatorSet(query ?? undefined)
          .then((res) => ({ ...res.data, pageParam }));
      },
      {
        ...options,
        getNextPageParam: (lastPage, allPages) => {
          if (
            (lastPage.pagination?.total ?? 0) >
            (lastPage.pageParam ?? 0) * perPage
          ) {
            return lastPage.pageParam + 1;
          } else {
            return undefined;
          }
        },
        getPreviousPageParam: (firstPage, allPages) => {
          if (firstPage.pageParam == 1) {
            return undefined;
          } else {
            return firstPage.pageParam - 1;
          }
        },
      }
    );
  };
  const ServiceGetValidatorSetByHeight = (height, query, options, perPage) => {
    const key = { type: "ServiceGetValidatorSetByHeight", height, query };
    return useInfiniteQuery(
      [key],
      ({ pageParam = 1 }) => {
        const { height, query } = key;
        query["pagination.limit"] = perPage;
        query["pagination.offset"] = (pageParam - 1) * perPage;
        query["pagination.count_total"] = true;
        return client.CosmosBaseTendermintV1Beta1.query
          .serviceGetValidatorSetByHeight(height, query ?? undefined)
          .then((res) => ({ ...res.data, pageParam }));
      },
      {
        ...options,
        getNextPageParam: (lastPage, allPages) => {
          if (
            (lastPage.pagination?.total ?? 0) >
            (lastPage.pageParam ?? 0) * perPage
          ) {
            return lastPage.pageParam + 1;
          } else {
            return undefined;
          }
        },
        getPreviousPageParam: (firstPage, allPages) => {
          if (firstPage.pageParam == 1) {
            return undefined;
          } else {
            return firstPage.pageParam - 1;
          }
        },
      }
    );
  };
  const ServiceABCIQuery = (query, options) => {
    const key = { type: "ServiceABCIQuery", query };
    return useQuery(
      [key],
      () => {
        const { query } = key;
        return client.CosmosBaseTendermintV1Beta1.query
          .serviceABCIQuery(query ?? undefined)
          .then((res) => res.data);
      },
      options
    );
  };
  return {
    ServiceGetNodeInfo,
    ServiceGetSyncing,
    ServiceGetLatestBlock,
    ServiceGetBlockByHeight,
    ServiceGetLatestValidatorSet,
    ServiceGetValidatorSetByHeight,
    ServiceABCIQuery,
  };
}
