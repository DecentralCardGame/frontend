/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery, useInfiniteQuery } from "@tanstack/vue-query";
import { useClient } from "../useClient";
export default function useCosmosSlashingV1Beta1() {
  const client = useClient();
  const QueryParams = (options) => {
    const key = { type: "QueryParams" };
    return useQuery(
      [key],
      () => {
        return client.CosmosSlashingV1Beta1.query
          .queryParams()
          .then((res) => res.data);
      },
      options
    );
  };
  const QuerySigningInfo = (cons_address, options) => {
    const key = { type: "QuerySigningInfo", cons_address };
    return useQuery(
      [key],
      () => {
        const { cons_address } = key;
        return client.CosmosSlashingV1Beta1.query
          .querySigningInfo(cons_address)
          .then((res) => res.data);
      },
      options
    );
  };
  const QuerySigningInfos = (query, options, perPage) => {
    const key = { type: "QuerySigningInfos", query };
    return useInfiniteQuery(
      [key],
      ({ pageParam = 1 }) => {
        const { query } = key;
        query["pagination.limit"] = perPage;
        query["pagination.offset"] = (pageParam - 1) * perPage;
        query["pagination.count_total"] = true;
        return client.CosmosSlashingV1Beta1.query
          .querySigningInfos(query ?? undefined)
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
  return { QueryParams, QuerySigningInfo, QuerySigningInfos };
}
