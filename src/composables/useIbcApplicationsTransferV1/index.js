/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery, useInfiniteQuery } from "@tanstack/vue-query";
import { useClient } from "../useClient";
export default function useIbcApplicationsTransferV1() {
  const client = useClient();
  const QueryDenomTrace = (hash, options) => {
    const key = { type: "QueryDenomTrace", hash };
    return useQuery(
      [key],
      () => {
        const { hash } = key;
        return client.IbcApplicationsTransferV1.query
          .queryDenomTrace(hash)
          .then((res) => res.data);
      },
      options
    );
  };
  const QueryDenomTraces = (query, options, perPage) => {
    const key = { type: "QueryDenomTraces", query };
    return useInfiniteQuery(
      [key],
      ({ pageParam = 1 }) => {
        const { query } = key;
        query["pagination.limit"] = perPage;
        query["pagination.offset"] = (pageParam - 1) * perPage;
        query["pagination.count_total"] = true;
        return client.IbcApplicationsTransferV1.query
          .queryDenomTraces(query ?? undefined)
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
  const QueryParams = (options) => {
    const key = { type: "QueryParams" };
    return useQuery(
      [key],
      () => {
        return client.IbcApplicationsTransferV1.query
          .queryParams()
          .then((res) => res.data);
      },
      options
    );
  };
  const QueryDenomHash = (trace, options) => {
    const key = { type: "QueryDenomHash", trace };
    return useQuery(
      [key],
      () => {
        const { trace } = key;
        return client.IbcApplicationsTransferV1.query
          .queryDenomHash(trace)
          .then((res) => res.data);
      },
      options
    );
  };
  const QueryEscrowAddress = (channel_id, port_id, options) => {
    const key = { type: "QueryEscrowAddress", channel_id, port_id };
    return useQuery(
      [key],
      () => {
        const { channel_id, port_id } = key;
        return client.IbcApplicationsTransferV1.query
          .queryEscrowAddress(channel_id, port_id)
          .then((res) => res.data);
      },
      options
    );
  };
  return {
    QueryDenomTrace,
    QueryDenomTraces,
    QueryParams,
    QueryDenomHash,
    QueryEscrowAddress,
  };
}
