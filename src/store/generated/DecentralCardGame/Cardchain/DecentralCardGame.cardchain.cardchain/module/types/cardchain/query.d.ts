import { Status, OutpCard } from "../cardchain/card";
import { Outcome } from "../cardchain/tx";
import { SellOfferStatus, SellOffer } from "../cardchain/sell_offer";
import { Reader, Writer } from "protobufjs/minimal";
import { Params } from "../cardchain/params";
import { VotingResults } from "../cardchain/voting_results";
import { VoteRight } from "../cardchain/vote_right";
import { Match } from "../cardchain/match";
import { User } from "../cardchain/user";
import { Collection } from "../cardchain/collection";
import { Council } from "../cardchain/council";
export declare const protobufPackage = "DecentralCardGame.cardchain.cardchain";
/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequest {
}
/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
    /** params holds all the parameters of this module. */
    params: Params | undefined;
}
export interface QueryQCardRequest {
    cardId: string;
}
export interface QueryQCardContentRequest {
    cardId: string;
}
export interface QueryQCardContentResponse {
    content: string;
}
export interface QueryQUserRequest {
    address: string;
}
export interface QueryQCardchainInfoRequest {
}
export interface QueryQCardchainInfoResponse {
    cardAuctionPrice: string;
    activeCollections: number[];
    cardsNumber: number;
    matchesNumber: number;
    sellOffersNumber: number;
    councilsNumber: number;
}
export interface QueryQVotingResultsRequest {
}
export interface QueryQVotingResultsResponse {
    lastVotingResults: VotingResults | undefined;
}
export interface QueryQVotableCardsRequest {
    address: string;
}
export interface QueryQVotableCardsResponse {
    unregistered: boolean;
    noVoteRights: boolean;
    voteRights: VoteRight[];
}
export interface QueryQCardsRequest {
    owner: string;
    status: Status;
    cardType: string;
    classes: string;
    sortBy: string;
    nameContains: string;
    keywordsContains: string;
    notesContains: string;
}
export interface QueryQCardsResponse {
    cardsList: number[];
}
export interface QueryQMatchRequest {
    matchId: number;
}
export interface QueryQCollectionRequest {
    collectionId: number;
}
export interface QueryQSellOfferRequest {
    sellOfferId: number;
}
export interface QueryQCouncilRequest {
    councilId: number;
}
export interface QueryQMatchesRequest {
    timestampDown: number;
    timestampUp: number;
    containsUsers: string[];
    reporter: string;
    outcome: Outcome;
    cardsPlayed: number[];
    ignore: IgnoreMatches | undefined;
}
export interface IgnoreMatches {
    outcome: boolean;
    timestamp: boolean;
    reporter: boolean;
}
export interface QueryQMatchesResponse {
    matchesList: number[];
    matches: Match[];
}
export interface QueryQSellOffersRequest {
    priceDown: string;
    priceUp: string;
    seller: string;
    buyer: string;
    card: number;
    status: SellOfferStatus;
    ignore: IgnoreSellOffers | undefined;
}
export interface IgnoreSellOffers {
    status: boolean;
    price: boolean;
    seller: boolean;
    buyer: boolean;
    card: boolean;
}
export interface QueryQSellOffersResponse {
    sellOffersIds: number[];
    sellOffers: SellOffer[];
}
export declare const QueryParamsRequest: {
    encode(_: QueryParamsRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryParamsRequest;
    fromJSON(_: any): QueryParamsRequest;
    toJSON(_: QueryParamsRequest): unknown;
    fromPartial(_: DeepPartial<QueryParamsRequest>): QueryParamsRequest;
};
export declare const QueryParamsResponse: {
    encode(message: QueryParamsResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryParamsResponse;
    fromJSON(object: any): QueryParamsResponse;
    toJSON(message: QueryParamsResponse): unknown;
    fromPartial(object: DeepPartial<QueryParamsResponse>): QueryParamsResponse;
};
export declare const QueryQCardRequest: {
    encode(message: QueryQCardRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryQCardRequest;
    fromJSON(object: any): QueryQCardRequest;
    toJSON(message: QueryQCardRequest): unknown;
    fromPartial(object: DeepPartial<QueryQCardRequest>): QueryQCardRequest;
};
export declare const QueryQCardContentRequest: {
    encode(message: QueryQCardContentRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryQCardContentRequest;
    fromJSON(object: any): QueryQCardContentRequest;
    toJSON(message: QueryQCardContentRequest): unknown;
    fromPartial(object: DeepPartial<QueryQCardContentRequest>): QueryQCardContentRequest;
};
export declare const QueryQCardContentResponse: {
    encode(message: QueryQCardContentResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryQCardContentResponse;
    fromJSON(object: any): QueryQCardContentResponse;
    toJSON(message: QueryQCardContentResponse): unknown;
    fromPartial(object: DeepPartial<QueryQCardContentResponse>): QueryQCardContentResponse;
};
export declare const QueryQUserRequest: {
    encode(message: QueryQUserRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryQUserRequest;
    fromJSON(object: any): QueryQUserRequest;
    toJSON(message: QueryQUserRequest): unknown;
    fromPartial(object: DeepPartial<QueryQUserRequest>): QueryQUserRequest;
};
export declare const QueryQCardchainInfoRequest: {
    encode(_: QueryQCardchainInfoRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryQCardchainInfoRequest;
    fromJSON(_: any): QueryQCardchainInfoRequest;
    toJSON(_: QueryQCardchainInfoRequest): unknown;
    fromPartial(_: DeepPartial<QueryQCardchainInfoRequest>): QueryQCardchainInfoRequest;
};
export declare const QueryQCardchainInfoResponse: {
    encode(message: QueryQCardchainInfoResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryQCardchainInfoResponse;
    fromJSON(object: any): QueryQCardchainInfoResponse;
    toJSON(message: QueryQCardchainInfoResponse): unknown;
    fromPartial(object: DeepPartial<QueryQCardchainInfoResponse>): QueryQCardchainInfoResponse;
};
export declare const QueryQVotingResultsRequest: {
    encode(_: QueryQVotingResultsRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryQVotingResultsRequest;
    fromJSON(_: any): QueryQVotingResultsRequest;
    toJSON(_: QueryQVotingResultsRequest): unknown;
    fromPartial(_: DeepPartial<QueryQVotingResultsRequest>): QueryQVotingResultsRequest;
};
export declare const QueryQVotingResultsResponse: {
    encode(message: QueryQVotingResultsResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryQVotingResultsResponse;
    fromJSON(object: any): QueryQVotingResultsResponse;
    toJSON(message: QueryQVotingResultsResponse): unknown;
    fromPartial(object: DeepPartial<QueryQVotingResultsResponse>): QueryQVotingResultsResponse;
};
export declare const QueryQVotableCardsRequest: {
    encode(message: QueryQVotableCardsRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryQVotableCardsRequest;
    fromJSON(object: any): QueryQVotableCardsRequest;
    toJSON(message: QueryQVotableCardsRequest): unknown;
    fromPartial(object: DeepPartial<QueryQVotableCardsRequest>): QueryQVotableCardsRequest;
};
export declare const QueryQVotableCardsResponse: {
    encode(message: QueryQVotableCardsResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryQVotableCardsResponse;
    fromJSON(object: any): QueryQVotableCardsResponse;
    toJSON(message: QueryQVotableCardsResponse): unknown;
    fromPartial(object: DeepPartial<QueryQVotableCardsResponse>): QueryQVotableCardsResponse;
};
export declare const QueryQCardsRequest: {
    encode(message: QueryQCardsRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryQCardsRequest;
    fromJSON(object: any): QueryQCardsRequest;
    toJSON(message: QueryQCardsRequest): unknown;
    fromPartial(object: DeepPartial<QueryQCardsRequest>): QueryQCardsRequest;
};
export declare const QueryQCardsResponse: {
    encode(message: QueryQCardsResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryQCardsResponse;
    fromJSON(object: any): QueryQCardsResponse;
    toJSON(message: QueryQCardsResponse): unknown;
    fromPartial(object: DeepPartial<QueryQCardsResponse>): QueryQCardsResponse;
};
export declare const QueryQMatchRequest: {
    encode(message: QueryQMatchRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryQMatchRequest;
    fromJSON(object: any): QueryQMatchRequest;
    toJSON(message: QueryQMatchRequest): unknown;
    fromPartial(object: DeepPartial<QueryQMatchRequest>): QueryQMatchRequest;
};
export declare const QueryQCollectionRequest: {
    encode(message: QueryQCollectionRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryQCollectionRequest;
    fromJSON(object: any): QueryQCollectionRequest;
    toJSON(message: QueryQCollectionRequest): unknown;
    fromPartial(object: DeepPartial<QueryQCollectionRequest>): QueryQCollectionRequest;
};
export declare const QueryQSellOfferRequest: {
    encode(message: QueryQSellOfferRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryQSellOfferRequest;
    fromJSON(object: any): QueryQSellOfferRequest;
    toJSON(message: QueryQSellOfferRequest): unknown;
    fromPartial(object: DeepPartial<QueryQSellOfferRequest>): QueryQSellOfferRequest;
};
export declare const QueryQCouncilRequest: {
    encode(message: QueryQCouncilRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryQCouncilRequest;
    fromJSON(object: any): QueryQCouncilRequest;
    toJSON(message: QueryQCouncilRequest): unknown;
    fromPartial(object: DeepPartial<QueryQCouncilRequest>): QueryQCouncilRequest;
};
export declare const QueryQMatchesRequest: {
    encode(message: QueryQMatchesRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryQMatchesRequest;
    fromJSON(object: any): QueryQMatchesRequest;
    toJSON(message: QueryQMatchesRequest): unknown;
    fromPartial(object: DeepPartial<QueryQMatchesRequest>): QueryQMatchesRequest;
};
export declare const IgnoreMatches: {
    encode(message: IgnoreMatches, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): IgnoreMatches;
    fromJSON(object: any): IgnoreMatches;
    toJSON(message: IgnoreMatches): unknown;
    fromPartial(object: DeepPartial<IgnoreMatches>): IgnoreMatches;
};
export declare const QueryQMatchesResponse: {
    encode(message: QueryQMatchesResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryQMatchesResponse;
    fromJSON(object: any): QueryQMatchesResponse;
    toJSON(message: QueryQMatchesResponse): unknown;
    fromPartial(object: DeepPartial<QueryQMatchesResponse>): QueryQMatchesResponse;
};
export declare const QueryQSellOffersRequest: {
    encode(message: QueryQSellOffersRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryQSellOffersRequest;
    fromJSON(object: any): QueryQSellOffersRequest;
    toJSON(message: QueryQSellOffersRequest): unknown;
    fromPartial(object: DeepPartial<QueryQSellOffersRequest>): QueryQSellOffersRequest;
};
export declare const IgnoreSellOffers: {
    encode(message: IgnoreSellOffers, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): IgnoreSellOffers;
    fromJSON(object: any): IgnoreSellOffers;
    toJSON(message: IgnoreSellOffers): unknown;
    fromPartial(object: DeepPartial<IgnoreSellOffers>): IgnoreSellOffers;
};
export declare const QueryQSellOffersResponse: {
    encode(message: QueryQSellOffersResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryQSellOffersResponse;
    fromJSON(object: any): QueryQSellOffersResponse;
    toJSON(message: QueryQSellOffersResponse): unknown;
    fromPartial(object: DeepPartial<QueryQSellOffersResponse>): QueryQSellOffersResponse;
};
/** Query defines the gRPC querier service. */
export interface Query {
    /** Parameters queries the parameters of the module. */
    Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
    /** Queries a list of QCard items. */
    QCard(request: QueryQCardRequest): Promise<OutpCard>;
    /** Queries a list of QCardContent items. */
    QCardContent(request: QueryQCardContentRequest): Promise<QueryQCardContentResponse>;
    /** Queries a list of QUser items. */
    QUser(request: QueryQUserRequest): Promise<User>;
    /** Queries a list of QCardchainInfo items. */
    QCardchainInfo(request: QueryQCardchainInfoRequest): Promise<QueryQCardchainInfoResponse>;
    /** Queries a list of QVotingResults items. */
    QVotingResults(request: QueryQVotingResultsRequest): Promise<QueryQVotingResultsResponse>;
    /** Queries a list of QVotableCards items. */
    QVotableCards(request: QueryQVotableCardsRequest): Promise<QueryQVotableCardsResponse>;
    /** Queries a list of QCards items. */
    QCards(request: QueryQCardsRequest): Promise<QueryQCardsResponse>;
    /** Queries a list of QMatch items. */
    QMatch(request: QueryQMatchRequest): Promise<Match>;
    /** Queries a list of QCollection items. */
    QCollection(request: QueryQCollectionRequest): Promise<Collection>;
    /** Queries a list of QSellOffer items. */
    QSellOffer(request: QueryQSellOfferRequest): Promise<SellOffer>;
    /** Queries a list of QCouncil items. */
    QCouncil(request: QueryQCouncilRequest): Promise<Council>;
    /** Queries a list of QMatches items. */
    QMatches(request: QueryQMatchesRequest): Promise<QueryQMatchesResponse>;
    /** Queries a list of QSellOffers items. */
    QSellOffers(request: QueryQSellOffersRequest): Promise<QueryQSellOffersResponse>;
}
export declare class QueryClientImpl implements Query {
    private readonly rpc;
    constructor(rpc: Rpc);
    Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
    QCard(request: QueryQCardRequest): Promise<OutpCard>;
    QCardContent(request: QueryQCardContentRequest): Promise<QueryQCardContentResponse>;
    QUser(request: QueryQUserRequest): Promise<User>;
    QCardchainInfo(request: QueryQCardchainInfoRequest): Promise<QueryQCardchainInfoResponse>;
    QVotingResults(request: QueryQVotingResultsRequest): Promise<QueryQVotingResultsResponse>;
    QVotableCards(request: QueryQVotableCardsRequest): Promise<QueryQVotableCardsResponse>;
    QCards(request: QueryQCardsRequest): Promise<QueryQCardsResponse>;
    QMatch(request: QueryQMatchRequest): Promise<Match>;
    QCollection(request: QueryQCollectionRequest): Promise<Collection>;
    QSellOffer(request: QueryQSellOfferRequest): Promise<SellOffer>;
    QCouncil(request: QueryQCouncilRequest): Promise<Council>;
    QMatches(request: QueryQMatchesRequest): Promise<QueryQMatchesResponse>;
    QSellOffers(request: QueryQSellOffersRequest): Promise<QueryQSellOffersResponse>;
}
interface Rpc {
    request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
