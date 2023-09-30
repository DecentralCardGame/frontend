/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery, useInfiniteQuery } from "@tanstack/vue-query";
import { useClient } from "../useClient";
export default function useCosmosEvidenceV1Beta1() {
  const client = useClient();
  const QueryEvidence = (evidence_hash, options) => {
    const key = { type: "QueryEvidence", evidence_hash };
    return useQuery(
      [key],
      () => {
        const { evidence_hash } = key;
        return client.CosmosEvidenceV1Beta1.query
          .queryEvidence(evidence_hash)
          .then((res) => res.data);
      },
      options
    );
  };
  const QueryAllEvidence = (query, options, perPage) => {
    const key = { type: "QueryAllEvidence", query };
    return useInfiniteQuery(
      [key],
      ({ pageParam = 1 }) => {
        const { query } = key;
        query["pagination.limit"] = perPage;
        query["pagination.offset"] = (pageParam - 1) * perPage;
        query["pagination.count_total"] = true;
        return client.CosmosEvidenceV1Beta1.query
          .queryAllEvidence(query ?? undefined)
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
  return { QueryEvidence, QueryAllEvidence };
}
