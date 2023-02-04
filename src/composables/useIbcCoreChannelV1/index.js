/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery, useInfiniteQuery } from "@tanstack/vue-query";
import { useClient } from '../useClient';
export default function useIbcCoreChannelV1() {
    const client = useClient();
    const QueryChannel = (channel_id, port_id, options) => {
        const key = { type: 'QueryChannel', channel_id, port_id };
        return useQuery([key], () => {
            const { channel_id, port_id } = key;
            return client.IbcCoreChannelV1.query.queryChannel(channel_id, port_id).then(res => res.data);
        }, options);
    };
    const QueryChannels = (query, options, perPage) => {
        const key = { type: 'QueryChannels', query };
        return useInfiniteQuery([key], ({ pageParam = 1 }) => {
            const { query } = key;
            query['pagination.limit'] = perPage;
            query['pagination.offset'] = (pageParam - 1) * perPage;
            query['pagination.count_total'] = true;
            return client.IbcCoreChannelV1.query.queryChannels(query ?? undefined).then(res => ({ ...res.data, pageParam }));
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
    const QueryConnectionChannels = (connection, query, options, perPage) => {
        const key = { type: 'QueryConnectionChannels', connection, query };
        return useInfiniteQuery([key], ({ pageParam = 1 }) => {
            const { connection, query } = key;
            query['pagination.limit'] = perPage;
            query['pagination.offset'] = (pageParam - 1) * perPage;
            query['pagination.count_total'] = true;
            return client.IbcCoreChannelV1.query.queryConnectionChannels(connection, query ?? undefined).then(res => ({ ...res.data, pageParam }));
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
    const QueryChannelClientState = (channel_id, port_id, options) => {
        const key = { type: 'QueryChannelClientState', channel_id, port_id };
        return useQuery([key], () => {
            const { channel_id, port_id } = key;
            return client.IbcCoreChannelV1.query.queryChannelClientState(channel_id, port_id).then(res => res.data);
        }, options);
    };
    const QueryChannelConsensusState = (channel_id, port_id, revision_number, revision_height, options) => {
        const key = { type: 'QueryChannelConsensusState', channel_id, port_id, revision_number, revision_height };
        return useQuery([key], () => {
            const { channel_id, port_id, revision_number, revision_height } = key;
            return client.IbcCoreChannelV1.query.queryChannelConsensusState(channel_id, port_id, revision_number, revision_height).then(res => res.data);
        }, options);
    };
    const QueryPacketCommitment = (channel_id, port_id, sequence, options) => {
        const key = { type: 'QueryPacketCommitment', channel_id, port_id, sequence };
        return useQuery([key], () => {
            const { channel_id, port_id, sequence } = key;
            return client.IbcCoreChannelV1.query.queryPacketCommitment(channel_id, port_id, sequence).then(res => res.data);
        }, options);
    };
    const QueryPacketCommitments = (channel_id, port_id, query, options, perPage) => {
        const key = { type: 'QueryPacketCommitments', channel_id, port_id, query };
        return useInfiniteQuery([key], ({ pageParam = 1 }) => {
            const { channel_id, port_id, query } = key;
            query['pagination.limit'] = perPage;
            query['pagination.offset'] = (pageParam - 1) * perPage;
            query['pagination.count_total'] = true;
            return client.IbcCoreChannelV1.query.queryPacketCommitments(channel_id, port_id, query ?? undefined).then(res => ({ ...res.data, pageParam }));
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
    const QueryPacketReceipt = (channel_id, port_id, sequence, options) => {
        const key = { type: 'QueryPacketReceipt', channel_id, port_id, sequence };
        return useQuery([key], () => {
            const { channel_id, port_id, sequence } = key;
            return client.IbcCoreChannelV1.query.queryPacketReceipt(channel_id, port_id, sequence).then(res => res.data);
        }, options);
    };
    const QueryPacketAcknowledgement = (channel_id, port_id, sequence, options) => {
        const key = { type: 'QueryPacketAcknowledgement', channel_id, port_id, sequence };
        return useQuery([key], () => {
            const { channel_id, port_id, sequence } = key;
            return client.IbcCoreChannelV1.query.queryPacketAcknowledgement(channel_id, port_id, sequence).then(res => res.data);
        }, options);
    };
    const QueryPacketAcknowledgements = (channel_id, port_id, query, options, perPage) => {
        const key = { type: 'QueryPacketAcknowledgements', channel_id, port_id, query };
        return useInfiniteQuery([key], ({ pageParam = 1 }) => {
            const { channel_id, port_id, query } = key;
            query['pagination.limit'] = perPage;
            query['pagination.offset'] = (pageParam - 1) * perPage;
            query['pagination.count_total'] = true;
            return client.IbcCoreChannelV1.query.queryPacketAcknowledgements(channel_id, port_id, query ?? undefined).then(res => ({ ...res.data, pageParam }));
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
    const QueryUnreceivedPackets = (channel_id, port_id, packet_commitment_sequences, options) => {
        const key = { type: 'QueryUnreceivedPackets', channel_id, port_id, packet_commitment_sequences };
        return useQuery([key], () => {
            const { channel_id, port_id, packet_commitment_sequences } = key;
            return client.IbcCoreChannelV1.query.queryUnreceivedPackets(channel_id, port_id, packet_commitment_sequences).then(res => res.data);
        }, options);
    };
    const QueryUnreceivedAcks = (channel_id, port_id, packet_ack_sequences, options) => {
        const key = { type: 'QueryUnreceivedAcks', channel_id, port_id, packet_ack_sequences };
        return useQuery([key], () => {
            const { channel_id, port_id, packet_ack_sequences } = key;
            return client.IbcCoreChannelV1.query.queryUnreceivedAcks(channel_id, port_id, packet_ack_sequences).then(res => res.data);
        }, options);
    };
    const QueryNextSequenceReceive = (channel_id, port_id, options) => {
        const key = { type: 'QueryNextSequenceReceive', channel_id, port_id };
        return useQuery([key], () => {
            const { channel_id, port_id } = key;
            return client.IbcCoreChannelV1.query.queryNextSequenceReceive(channel_id, port_id).then(res => res.data);
        }, options);
    };
    return { QueryChannel, QueryChannels, QueryConnectionChannels, QueryChannelClientState, QueryChannelConsensusState, QueryPacketCommitment, QueryPacketCommitments, QueryPacketReceipt, QueryPacketAcknowledgement, QueryPacketAcknowledgements, QueryUnreceivedPackets, QueryUnreceivedAcks, QueryNextSequenceReceive,
    };
}
