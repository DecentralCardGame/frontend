/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery, useInfiniteQuery } from "@tanstack/vue-query";
import { useClient } from '../useClient';
export default function useCosmosDistributionV1Beta1() {
    const client = useClient();
    const QueryParams = (options) => {
        const key = { type: 'QueryParams', };
        return useQuery([key], () => {
            return client.CosmosDistributionV1Beta1.query.queryParams().then(res => res.data);
        }, options);
    };
    const QueryValidatorOutstandingRewards = (validator_address, options) => {
        const key = { type: 'QueryValidatorOutstandingRewards', validator_address };
        return useQuery([key], () => {
            const { validator_address } = key;
            return client.CosmosDistributionV1Beta1.query.queryValidatorOutstandingRewards(validator_address).then(res => res.data);
        }, options);
    };
    const QueryValidatorCommission = (validator_address, options) => {
        const key = { type: 'QueryValidatorCommission', validator_address };
        return useQuery([key], () => {
            const { validator_address } = key;
            return client.CosmosDistributionV1Beta1.query.queryValidatorCommission(validator_address).then(res => res.data);
        }, options);
    };
    const QueryValidatorSlashes = (validator_address, query, options, perPage) => {
        const key = { type: 'QueryValidatorSlashes', validator_address, query };
        return useInfiniteQuery([key], ({ pageParam = 1 }) => {
            const { validator_address, query } = key;
            query['pagination.limit'] = perPage;
            query['pagination.offset'] = (pageParam - 1) * perPage;
            query['pagination.count_total'] = true;
            return client.CosmosDistributionV1Beta1.query.queryValidatorSlashes(validator_address, query ?? undefined).then(res => ({ ...res.data, pageParam }));
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
    const QueryDelegationRewards = (delegator_address, validator_address, options) => {
        const key = { type: 'QueryDelegationRewards', delegator_address, validator_address };
        return useQuery([key], () => {
            const { delegator_address, validator_address } = key;
            return client.CosmosDistributionV1Beta1.query.queryDelegationRewards(delegator_address, validator_address).then(res => res.data);
        }, options);
    };
    const QueryDelegationTotalRewards = (delegator_address, options) => {
        const key = { type: 'QueryDelegationTotalRewards', delegator_address };
        return useQuery([key], () => {
            const { delegator_address } = key;
            return client.CosmosDistributionV1Beta1.query.queryDelegationTotalRewards(delegator_address).then(res => res.data);
        }, options);
    };
    const QueryDelegatorValidators = (delegator_address, options) => {
        const key = { type: 'QueryDelegatorValidators', delegator_address };
        return useQuery([key], () => {
            const { delegator_address } = key;
            return client.CosmosDistributionV1Beta1.query.queryDelegatorValidators(delegator_address).then(res => res.data);
        }, options);
    };
    const QueryDelegatorWithdrawAddress = (delegator_address, options) => {
        const key = { type: 'QueryDelegatorWithdrawAddress', delegator_address };
        return useQuery([key], () => {
            const { delegator_address } = key;
            return client.CosmosDistributionV1Beta1.query.queryDelegatorWithdrawAddress(delegator_address).then(res => res.data);
        }, options);
    };
    const QueryCommunityPool = (options) => {
        const key = { type: 'QueryCommunityPool', };
        return useQuery([key], () => {
            return client.CosmosDistributionV1Beta1.query.queryCommunityPool().then(res => res.data);
        }, options);
    };
    return { QueryParams, QueryValidatorOutstandingRewards, QueryValidatorCommission, QueryValidatorSlashes, QueryDelegationRewards, QueryDelegationTotalRewards, QueryDelegatorValidators, QueryDelegatorWithdrawAddress, QueryCommunityPool,
    };
}
