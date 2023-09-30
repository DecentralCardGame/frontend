/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery, useInfiniteQuery } from "@tanstack/vue-query";
import { useClient } from "../useClient";
export default function useCosmosTxV1Beta1() {
  const client = useClient();
  const ServiceSimulate = (options) => {
    const key = { type: "ServiceSimulate" };
    return useQuery(
      [key],
      () => {
        return client.CosmosTxV1Beta1.query
          .serviceSimulate({ ...key })
          .then((res) => res.data);
      },
      options
    );
  };
  const ServiceGetTx = (hash, options) => {
    const key = { type: "ServiceGetTx", hash };
    return useQuery(
      [key],
      () => {
        const { hash } = key;
        return client.CosmosTxV1Beta1.query
          .serviceGetTx(hash)
          .then((res) => res.data);
      },
      options
    );
  };
  const ServiceBroadcastTx = (options) => {
    const key = { type: "ServiceBroadcastTx" };
    return useQuery(
      [key],
      () => {
        return client.CosmosTxV1Beta1.query
          .serviceBroadcastTx({ ...key })
          .then((res) => res.data);
      },
      options
    );
  };
  const ServiceGetTxsEvent = (query, options, perPage) => {
    const key = { type: "ServiceGetTxsEvent", query };
    return useInfiniteQuery(
      [key],
      ({ pageParam = 1 }) => {
        const { query } = key;
        query["pagination.limit"] = perPage;
        query["pagination.offset"] = (pageParam - 1) * perPage;
        query["pagination.count_total"] = true;
        return client.CosmosTxV1Beta1.query
          .serviceGetTxsEvent(query ?? undefined)
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
  const ServiceGetBlockWithTxs = (height, query, options, perPage) => {
    const key = { type: "ServiceGetBlockWithTxs", height, query };
    return useInfiniteQuery(
      [key],
      ({ pageParam = 1 }) => {
        const { height, query } = key;
        query["pagination.limit"] = perPage;
        query["pagination.offset"] = (pageParam - 1) * perPage;
        query["pagination.count_total"] = true;
        return client.CosmosTxV1Beta1.query
          .serviceGetBlockWithTxs(height, query ?? undefined)
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
  return {
    ServiceSimulate,
    ServiceGetTx,
    ServiceBroadcastTx,
    ServiceGetTxsEvent,
    ServiceGetBlockWithTxs,
  };
}
