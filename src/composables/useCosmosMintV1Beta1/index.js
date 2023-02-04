/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery } from "@tanstack/vue-query";
import { useClient } from '../useClient';
export default function useCosmosMintV1Beta1() {
    const client = useClient();
    const QueryParams = (options) => {
        const key = { type: 'QueryParams', };
        return useQuery([key], () => {
            return client.CosmosMintV1Beta1.query.queryParams().then(res => res.data);
        }, options);
    };
    const QueryInflation = (options) => {
        const key = { type: 'QueryInflation', };
        return useQuery([key], () => {
            return client.CosmosMintV1Beta1.query.queryInflation().then(res => res.data);
        }, options);
    };
    const QueryAnnualProvisions = (options) => {
        const key = { type: 'QueryAnnualProvisions', };
        return useQuery([key], () => {
            return client.CosmosMintV1Beta1.query.queryAnnualProvisions().then(res => res.data);
        }, options);
    };
    return { QueryParams, QueryInflation, QueryAnnualProvisions,
    };
}
