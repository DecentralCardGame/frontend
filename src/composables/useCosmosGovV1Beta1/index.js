/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery, useInfiniteQuery } from "@tanstack/vue-query";
import { useClient } from '../useClient';
export default function useCosmosGovV1Beta1() {
    const client = useClient();
    const QueryProposal = (proposal_id, options) => {
        const key = { type: 'QueryProposal', proposal_id };
        return useQuery([key], () => {
            const { proposal_id } = key;
            return client.CosmosGovV1Beta1.query.queryProposal(proposal_id).then(res => res.data);
        }, options);
    };
    const QueryProposals = (query, options, perPage) => {
        const key = { type: 'QueryProposals', query };
        return useInfiniteQuery([key], ({ pageParam = 1 }) => {
            const { query } = key;
            query['pagination.limit'] = perPage;
            query['pagination.offset'] = (pageParam - 1) * perPage;
            query['pagination.count_total'] = true;
            return client.CosmosGovV1Beta1.query.queryProposals(query ?? undefined).then(res => ({ ...res.data, pageParam }));
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
    const QueryVote = (proposal_id, voter, options) => {
        const key = { type: 'QueryVote', proposal_id, voter };
        return useQuery([key], () => {
            const { proposal_id, voter } = key;
            return client.CosmosGovV1Beta1.query.queryVote(proposal_id, voter).then(res => res.data);
        }, options);
    };
    const QueryVotes = (proposal_id, query, options, perPage) => {
        const key = { type: 'QueryVotes', proposal_id, query };
        return useInfiniteQuery([key], ({ pageParam = 1 }) => {
            const { proposal_id, query } = key;
            query['pagination.limit'] = perPage;
            query['pagination.offset'] = (pageParam - 1) * perPage;
            query['pagination.count_total'] = true;
            return client.CosmosGovV1Beta1.query.queryVotes(proposal_id, query ?? undefined).then(res => ({ ...res.data, pageParam }));
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
    const QueryParams = (params_type, options) => {
        const key = { type: 'QueryParams', params_type };
        return useQuery([key], () => {
            const { params_type } = key;
            return client.CosmosGovV1Beta1.query.queryParams(params_type).then(res => res.data);
        }, options);
    };
    const QueryDeposit = (proposal_id, depositor, options) => {
        const key = { type: 'QueryDeposit', proposal_id, depositor };
        return useQuery([key], () => {
            const { proposal_id, depositor } = key;
            return client.CosmosGovV1Beta1.query.queryDeposit(proposal_id, depositor).then(res => res.data);
        }, options);
    };
    const QueryDeposits = (proposal_id, query, options, perPage) => {
        const key = { type: 'QueryDeposits', proposal_id, query };
        return useInfiniteQuery([key], ({ pageParam = 1 }) => {
            const { proposal_id, query } = key;
            query['pagination.limit'] = perPage;
            query['pagination.offset'] = (pageParam - 1) * perPage;
            query['pagination.count_total'] = true;
            return client.CosmosGovV1Beta1.query.queryDeposits(proposal_id, query ?? undefined).then(res => ({ ...res.data, pageParam }));
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
    const QueryTallyResult = (proposal_id, options) => {
        const key = { type: 'QueryTallyResult', proposal_id };
        return useQuery([key], () => {
            const { proposal_id } = key;
            return client.CosmosGovV1Beta1.query.queryTallyResult(proposal_id).then(res => res.data);
        }, options);
    };
    return { QueryProposal, QueryProposals, QueryVote, QueryVotes, QueryParams, QueryDeposit, QueryDeposits, QueryTallyResult,
    };
}
