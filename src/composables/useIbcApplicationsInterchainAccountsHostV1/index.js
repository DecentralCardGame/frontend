/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery } from "@tanstack/vue-query";
import { useClient } from "../useClient";
export default function useIbcApplicationsInterchainAccountsHostV1() {
  const client = useClient();
  const QueryParams = (options) => {
    const key = { type: "QueryParams" };
    return useQuery(
      [key],
      () => {
        return client.IbcApplicationsInterchainAccountsHostV1.query
          .queryParams()
          .then((res) => res.data);
      },
      options
    );
  };
  return { QueryParams };
}
