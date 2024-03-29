/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery, useInfiniteQuery } from "@tanstack/vue-query";
import { useClient } from '../useClient';
export default function useIbcCoreClientV1() {
    const client = useClient();
    const QueryClientState = (client_id, options) => {
        const key = { type: 'QueryClientState', client_id };
        return useQuery([key], () => {
            const { client_id } = key;
            return client.IbcCoreClientV1.query.queryClientState(client_id).then(res => res.data);
        }, options);
    };
    const QueryClientStates = (query, options, perPage) => {
        const key = { type: 'QueryClientStates', query };
        return useInfiniteQuery([key], ({ pageParam = 1 }) => {
            const { query } = key;
            query['pagination.limit'] = perPage;
            query['pagination.offset'] = (pageParam - 1) * perPage;
            query['pagination.count_total'] = true;
            return client.IbcCoreClientV1.query.queryClientStates(query ?? undefined).then(res => ({ ...res.data, pageParam }));
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
    const QueryConsensusState = (client_id, revision_number, revision_height, query, options) => {
        const key = { type: 'QueryConsensusState', client_id, revision_number, revision_height, query };
        return useQuery([key], () => {
            const { client_id, revision_number, revision_height, query } = key;
            return client.IbcCoreClientV1.query.queryConsensusState(client_id, revision_number, revision_height, query ?? undefined).then(res => res.data);
        }, options);
    };
    const QueryConsensusStates = (client_id, query, options, perPage) => {
        const key = { type: 'QueryConsensusStates', client_id, query };
        return useInfiniteQuery([key], ({ pageParam = 1 }) => {
            const { client_id, query } = key;
            query['pagination.limit'] = perPage;
            query['pagination.offset'] = (pageParam - 1) * perPage;
            query['pagination.count_total'] = true;
            return client.IbcCoreClientV1.query.queryConsensusStates(client_id, query ?? undefined).then(res => ({ ...res.data, pageParam }));
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
    const QueryConsensusStateHeights = (client_id, query, options, perPage) => {
        const key = { type: 'QueryConsensusStateHeights', client_id, query };
        return useInfiniteQuery([key], ({ pageParam = 1 }) => {
            const { client_id, query } = key;
            query['pagination.limit'] = perPage;
            query['pagination.offset'] = (pageParam - 1) * perPage;
            query['pagination.count_total'] = true;
            return client.IbcCoreClientV1.query.queryConsensusStateHeights(client_id, query ?? undefined).then(res => ({ ...res.data, pageParam }));
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
    const QueryClientStatus = (client_id, options) => {
        const key = { type: 'QueryClientStatus', client_id };
        return useQuery([key], () => {
            const { client_id } = key;
            return client.IbcCoreClientV1.query.queryClientStatus(client_id).then(res => res.data);
        }, options);
    };
    const QueryClientParams = (options) => {
        const key = { type: 'QueryClientParams', };
        return useQuery([key], () => {
            return client.IbcCoreClientV1.query.queryClientParams().then(res => res.data);
        }, options);
    };
    const QueryUpgradedClientState = (options) => {
        const key = { type: 'QueryUpgradedClientState', };
        return useQuery([key], () => {
            return client.IbcCoreClientV1.query.queryUpgradedClientState().then(res => res.data);
        }, options);
    };
    const QueryUpgradedConsensusState = (options) => {
        const key = { type: 'QueryUpgradedConsensusState', };
        return useQuery([key], () => {
            return client.IbcCoreClientV1.query.queryUpgradedConsensusState().then(res => res.data);
        }, options);
    };
    return { QueryClientState, QueryClientStates, QueryConsensusState, QueryConsensusStates, QueryConsensusStateHeights, QueryClientStatus, QueryClientParams, QueryUpgradedClientState, QueryUpgradedConsensusState,
    };
}
