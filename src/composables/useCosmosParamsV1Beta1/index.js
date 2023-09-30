/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery } from "@tanstack/vue-query";
import { useClient } from "../useClient";
export default function useCosmosParamsV1Beta1() {
  const client = useClient();
  const QueryParams = (query, options) => {
    const key = { type: "QueryParams", query };
    return useQuery(
      [key],
      () => {
        const { query } = key;
        return client.CosmosParamsV1Beta1.query
          .queryParams(query ?? undefined)
          .then((res) => res.data);
      },
      options
    );
  };
  const QuerySubspaces = (options) => {
    const key = { type: "QuerySubspaces" };
    return useQuery(
      [key],
      () => {
        return client.CosmosParamsV1Beta1.query
          .querySubspaces()
          .then((res) => res.data);
      },
      options
    );
  };
  return { QueryParams, QuerySubspaces };
}
