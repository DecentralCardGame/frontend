/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery, useInfiniteQuery } from "@tanstack/vue-query";
import { useClient } from '../useClient';
export default function useCosmosGroupV1() {
    const client = useClient();
    const QueryGroupInfo = (group_id, options) => {
        const key = { type: 'QueryGroupInfo', group_id };
        return useQuery([key], () => {
            const { group_id } = key;
            return client.CosmosGroupV1.query.queryGroupInfo(group_id).then(res => res.data);
        }, options);
    };
    const QueryGroupPolicyInfo = (address, options) => {
        const key = { type: 'QueryGroupPolicyInfo', address };
        return useQuery([key], () => {
            const { address } = key;
            return client.CosmosGroupV1.query.queryGroupPolicyInfo(address).then(res => res.data);
        }, options);
    };
    const QueryGroupMembers = (group_id, query, options, perPage) => {
        const key = { type: 'QueryGroupMembers', group_id, query };
        return useInfiniteQuery([key], ({ pageParam = 1 }) => {
            const { group_id, query } = key;
            query['pagination.limit'] = perPage;
            query['pagination.offset'] = (pageParam - 1) * perPage;
            query['pagination.count_total'] = true;
            return client.CosmosGroupV1.query.queryGroupMembers(group_id, query ?? undefined).then(res => ({ ...res.data, pageParam }));
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
    const QueryGroupsByAdmin = (admin, query, options, perPage) => {
        const key = { type: 'QueryGroupsByAdmin', admin, query };
        return useInfiniteQuery([key], ({ pageParam = 1 }) => {
            const { admin, query } = key;
            query['pagination.limit'] = perPage;
            query['pagination.offset'] = (pageParam - 1) * perPage;
            query['pagination.count_total'] = true;
            return client.CosmosGroupV1.query.queryGroupsByAdmin(admin, query ?? undefined).then(res => ({ ...res.data, pageParam }));
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
    const QueryGroupPoliciesByGroup = (group_id, query, options, perPage) => {
        const key = { type: 'QueryGroupPoliciesByGroup', group_id, query };
        return useInfiniteQuery([key], ({ pageParam = 1 }) => {
            const { group_id, query } = key;
            query['pagination.limit'] = perPage;
            query['pagination.offset'] = (pageParam - 1) * perPage;
            query['pagination.count_total'] = true;
            return client.CosmosGroupV1.query.queryGroupPoliciesByGroup(group_id, query ?? undefined).then(res => ({ ...res.data, pageParam }));
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
    const QueryGroupPoliciesByAdmin = (admin, query, options, perPage) => {
        const key = { type: 'QueryGroupPoliciesByAdmin', admin, query };
        return useInfiniteQuery([key], ({ pageParam = 1 }) => {
            const { admin, query } = key;
            query['pagination.limit'] = perPage;
            query['pagination.offset'] = (pageParam - 1) * perPage;
            query['pagination.count_total'] = true;
            return client.CosmosGroupV1.query.queryGroupPoliciesByAdmin(admin, query ?? undefined).then(res => ({ ...res.data, pageParam }));
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
    const QueryProposal = (proposal_id, options) => {
        const key = { type: 'QueryProposal', proposal_id };
        return useQuery([key], () => {
            const { proposal_id } = key;
            return client.CosmosGroupV1.query.queryProposal(proposal_id).then(res => res.data);
        }, options);
    };
    const QueryProposalsByGroupPolicy = (address, query, options, perPage) => {
        const key = { type: 'QueryProposalsByGroupPolicy', address, query };
        return useInfiniteQuery([key], ({ pageParam = 1 }) => {
            const { address, query } = key;
            query['pagination.limit'] = perPage;
            query['pagination.offset'] = (pageParam - 1) * perPage;
            query['pagination.count_total'] = true;
            return client.CosmosGroupV1.query.queryProposalsByGroupPolicy(address, query ?? undefined).then(res => ({ ...res.data, pageParam }));
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
    const QueryVoteByProposalVoter = (proposal_id, voter, options) => {
        const key = { type: 'QueryVoteByProposalVoter', proposal_id, voter };
        return useQuery([key], () => {
            const { proposal_id, voter } = key;
            return client.CosmosGroupV1.query.queryVoteByProposalVoter(proposal_id, voter).then(res => res.data);
        }, options);
    };
    const QueryVotesByProposal = (proposal_id, query, options, perPage) => {
        const key = { type: 'QueryVotesByProposal', proposal_id, query };
        return useInfiniteQuery([key], ({ pageParam = 1 }) => {
            const { proposal_id, query } = key;
            query['pagination.limit'] = perPage;
            query['pagination.offset'] = (pageParam - 1) * perPage;
            query['pagination.count_total'] = true;
            return client.CosmosGroupV1.query.queryVotesByProposal(proposal_id, query ?? undefined).then(res => ({ ...res.data, pageParam }));
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
    const QueryVotesByVoter = (voter, query, options, perPage) => {
        const key = { type: 'QueryVotesByVoter', voter, query };
        return useInfiniteQuery([key], ({ pageParam = 1 }) => {
            const { voter, query } = key;
            query['pagination.limit'] = perPage;
            query['pagination.offset'] = (pageParam - 1) * perPage;
            query['pagination.count_total'] = true;
            return client.CosmosGroupV1.query.queryVotesByVoter(voter, query ?? undefined).then(res => ({ ...res.data, pageParam }));
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
    const QueryGroupsByMember = (address, query, options, perPage) => {
        const key = { type: 'QueryGroupsByMember', address, query };
        return useInfiniteQuery([key], ({ pageParam = 1 }) => {
            const { address, query } = key;
            query['pagination.limit'] = perPage;
            query['pagination.offset'] = (pageParam - 1) * perPage;
            query['pagination.count_total'] = true;
            return client.CosmosGroupV1.query.queryGroupsByMember(address, query ?? undefined).then(res => ({ ...res.data, pageParam }));
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
            return client.CosmosGroupV1.query.queryTallyResult(proposal_id).then(res => res.data);
        }, options);
    };
    return { QueryGroupInfo, QueryGroupPolicyInfo, QueryGroupMembers, QueryGroupsByAdmin, QueryGroupPoliciesByGroup, QueryGroupPoliciesByAdmin, QueryProposal, QueryProposalsByGroupPolicy, QueryVoteByProposalVoter, QueryVotesByProposal, QueryVotesByVoter, QueryGroupsByMember, QueryTallyResult,
    };
}
