/* eslint-disable @typescript-eslint/no-unused-vars */
import { useInfiniteQuery } from "@tanstack/vue-query";
import { useClient } from "../useClient";
export default function useCosmosAuthzV1Beta1() {
  const client = useClient();
  const QueryGrants = (query, options, perPage) => {
    const key = { type: "QueryGrants", query };
    return useInfiniteQuery(
      [key],
      ({ pageParam = 1 }) => {
        const { query } = key;
        query["pagination.limit"] = perPage;
        query["pagination.offset"] = (pageParam - 1) * perPage;
        query["pagination.count_total"] = true;
        return client.CosmosAuthzV1Beta1.query
          .queryGrants(query ?? undefined)
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
  const QueryGranterGrants = (granter, query, options, perPage) => {
    const key = { type: "QueryGranterGrants", granter, query };
    return useInfiniteQuery(
      [key],
      ({ pageParam = 1 }) => {
        const { granter, query } = key;
        query["pagination.limit"] = perPage;
        query["pagination.offset"] = (pageParam - 1) * perPage;
        query["pagination.count_total"] = true;
        return client.CosmosAuthzV1Beta1.query
          .queryGranterGrants(granter, query ?? undefined)
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
  const QueryGranteeGrants = (grantee, query, options, perPage) => {
    const key = { type: "QueryGranteeGrants", grantee, query };
    return useInfiniteQuery(
      [key],
      ({ pageParam = 1 }) => {
        const { grantee, query } = key;
        query["pagination.limit"] = perPage;
        query["pagination.offset"] = (pageParam - 1) * perPage;
        query["pagination.count_total"] = true;
        return client.CosmosAuthzV1Beta1.query
          .queryGranteeGrants(grantee, query ?? undefined)
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
  return { QueryGrants, QueryGranterGrants, QueryGranteeGrants };
}
