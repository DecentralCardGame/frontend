/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery } from "@tanstack/vue-query";
import { useClient } from '../useClient';
export default function useCosmosUpgradeV1Beta1() {
    const client = useClient();
    const QueryCurrentPlan = (options) => {
        const key = { type: 'QueryCurrentPlan', };
        return useQuery([key], () => {
            return client.CosmosUpgradeV1Beta1.query.queryCurrentPlan().then(res => res.data);
        }, options);
    };
    const QueryAppliedPlan = (name, options) => {
        const key = { type: 'QueryAppliedPlan', name };
        return useQuery([key], () => {
            const { name } = key;
            return client.CosmosUpgradeV1Beta1.query.queryAppliedPlan(name).then(res => res.data);
        }, options);
    };
    const QueryUpgradedConsensusState = (last_height, options) => {
        const key = { type: 'QueryUpgradedConsensusState', last_height };
        return useQuery([key], () => {
            const { last_height } = key;
            return client.CosmosUpgradeV1Beta1.query.queryUpgradedConsensusState(last_height).then(res => res.data);
        }, options);
    };
    const QueryModuleVersions = (query, options) => {
        const key = { type: 'QueryModuleVersions', query };
        return useQuery([key], () => {
            const { query } = key;
            return client.CosmosUpgradeV1Beta1.query.queryModuleVersions(query ?? undefined).then(res => res.data);
        }, options);
    };
    const QueryAuthority = (options) => {
        const key = { type: 'QueryAuthority', };
        return useQuery([key], () => {
            return client.CosmosUpgradeV1Beta1.query.queryAuthority().then(res => res.data);
        }, options);
    };
    return { QueryCurrentPlan, QueryAppliedPlan, QueryUpgradedConsensusState, QueryModuleVersions, QueryAuthority,
    };
}
