/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery, useInfiniteQuery } from "@tanstack/vue-query";
import { useClient } from '../useClient';
export default function useCosmosFeegrantV1Beta1() {
    const client = useClient();
    const QueryAllowance = (granter, grantee, options) => {
        const key = { type: 'QueryAllowance', granter, grantee };
        return useQuery([key], () => {
            const { granter, grantee } = key;
            return client.CosmosFeegrantV1Beta1.query.queryAllowance(granter, grantee).then(res => res.data);
        }, options);
    };
    const QueryAllowances = (grantee, query, options, perPage) => {
        const key = { type: 'QueryAllowances', grantee, query };
        return useInfiniteQuery([key], ({ pageParam = 1 }) => {
            const { grantee, query } = key;
            query['pagination.limit'] = perPage;
            query['pagination.offset'] = (pageParam - 1) * perPage;
            query['pagination.count_total'] = true;
            return client.CosmosFeegrantV1Beta1.query.queryAllowances(grantee, query ?? undefined).then(res => ({ ...res.data, pageParam }));
        }, { ...options,
            getNextPageParam: (lastPage, allPages) => { if ((lastPage.pagination?.total ?? 0) > ((lastPage.pageParam ?? 0) * perPage)) {
                return lastPage.pageParam + 1;
            }
            else {
                return undefined;
            } },
            getPreviousPageParam: (firstPage, allPages) => { if (firstPage.pageParam == 1) {
                return undefined;
            }
            else {
                return firstPage.pageParam - 1;
            } }
        });
    };
    const QueryAllowancesByGranter = (granter, query, options, perPage) => {
        const key = { type: 'QueryAllowancesByGranter', granter, query };
        return useInfiniteQuery([key], ({ pageParam = 1 }) => {
            const { granter, query } = key;
            query['pagination.limit'] = perPage;
            query['pagination.offset'] = (pageParam - 1) * perPage;
            query['pagination.count_total'] = true;
            return client.CosmosFeegrantV1Beta1.query.queryAllowancesByGranter(granter, query ?? undefined).then(res => ({ ...res.data, pageParam }));
        }, { ...options,
            getNextPageParam: (lastPage, allPages) => { if ((lastPage.pagination?.total ?? 0) > ((lastPage.pageParam ?? 0) * perPage)) {
                return lastPage.pageParam + 1;
            }
            else {
                return undefined;
            } },
            getPreviousPageParam: (firstPage, allPages) => { if (firstPage.pageParam == 1) {
                return undefined;
            }
            else {
                return firstPage.pageParam - 1;
            } }
        });
    };
    return { QueryAllowance, QueryAllowances, QueryAllowancesByGranter,
    };
}
