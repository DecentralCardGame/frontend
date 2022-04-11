export declare enum CardchainCStatus {
    Design = "design",
    Finalized = "finalized",
    Active = "active",
    Archived = "archived"
}
export interface CardchainCollection {
    name?: string;
    cards?: string[];
    artist?: string;
    storyWriter?: string;
    contributors?: string[];
    story?: string;
    /** @format byte */
    artwork?: string;
    status?: CardchainCStatus;
    /** @format int64 */
    timeStamp?: string;
}
export declare enum CardchainCouncelingStatus {
    CouncilOpen = "councilOpen",
    CouncilCreated = "councilCreated",
    CouncilClosed = "councilClosed",
    Commited = "commited",
    Revealed = "revealed",
    SuggestionsMade = "suggestionsMade"
}
export interface CardchainCouncil {
    /** @format uint64 */
    cardId?: string;
    voters?: string[];
    hashResponses?: CardchainWrapHashResponse[];
    clearResponses?: CardchainWrapClearResponse[];
    treasury?: string;
    status?: CardchainCouncelingStatus;
    /** @format uint64 */
    trialStart?: string;
}
export declare enum CardchainCouncilStatus {
    Available = "available",
    Unavailable = "unavailable",
    OpenCouncil = "openCouncil",
    StartedCouncil = "startedCouncil"
}
export interface CardchainIgnoreMatches {
    outcome?: boolean;
    timestamp?: boolean;
    reporter?: boolean;
}
export interface CardchainIgnoreSellOffers {
    status?: boolean;
    price?: boolean;
    seller?: boolean;
    buyer?: boolean;
    card?: boolean;
}
export interface CardchainMatch {
    /** @format uint64 */
    timestamp?: string;
    reporter?: string;
    playerA?: string;
    playerB?: string;
    playerACards?: string[];
    playerBCards?: string[];
    outcome?: CardchainOutcome;
}
export declare type CardchainMsgAddArtworkResponse = object;
export declare type CardchainMsgAddArtworkToCollectionResponse = object;
export declare type CardchainMsgAddCardToCollectionResponse = object;
export declare type CardchainMsgAddContributorToCollectionResponse = object;
export declare type CardchainMsgAddStoryToCollectionResponse = object;
export declare type CardchainMsgApointMatchReporterResponse = object;
export declare type CardchainMsgBuyCardResponse = object;
export declare type CardchainMsgBuyCardSchemeResponse = object;
export declare type CardchainMsgBuyCollectionResponse = object;
export declare type CardchainMsgChangeArtistResponse = object;
export declare type CardchainMsgCommitCouncilResponseResponse = object;
export declare type CardchainMsgCreateCollectionResponse = object;
export declare type CardchainMsgCreateCouncilResponse = object;
export declare type CardchainMsgCreateSellOfferResponse = object;
export declare type CardchainMsgCreateuserResponse = object;
export declare type CardchainMsgDonateToCardResponse = object;
export declare type CardchainMsgFinalizeCollectionResponse = object;
export declare type CardchainMsgRegisterForCouncilResponse = object;
export declare type CardchainMsgRemoveCardFromCollectionResponse = object;
export declare type CardchainMsgRemoveContributorFromCollectionResponse = object;
export declare type CardchainMsgRemoveSellOfferResponse = object;
export interface CardchainMsgReportMatchResponse {
    /** @format uint64 */
    matchId?: string;
}
export declare type CardchainMsgRestartCouncilResponse = object;
export declare type CardchainMsgRevealCouncilResponseResponse = object;
export declare type CardchainMsgRewokeCouncilRegistrationResponse = object;
export declare type CardchainMsgSaveCardContentResponse = object;
export declare type CardchainMsgSetCardRarityResponse = object;
export declare type CardchainMsgSubmitCollectionProposalResponse = object;
export declare type CardchainMsgSubmitCopyrightProposalResponse = object;
export declare type CardchainMsgSubmitMatchReporterProposalResponse = object;
export declare type CardchainMsgTransferCardResponse = object;
export declare type CardchainMsgVoteCardResponse = object;
export declare enum CardchainOutcome {
    AWon = "AWon",
    BWon = "BWon",
    Draw = "Draw",
    Aborted = "Aborted"
}
export interface CardchainOutpCard {
    owner?: string;
    artist?: string;
    content?: string;
    image?: string;
    fullArt?: boolean;
    notes?: string;
    status?: CardchaincardchainStatus;
    votePool?: string;
    voters?: string[];
    /** @format uint64 */
    fairEnoughVotes?: string;
    /** @format uint64 */
    overpoweredVotes?: string;
    /** @format uint64 */
    underpoweredVotes?: string;
    /** @format uint64 */
    inappropriateVotes?: string;
    /** @format int64 */
    nerflevel?: string;
}
/**
 * Params defines the parameters for the module.
 */
export interface CardchainParams {
    /** @format int64 */
    votingRightsExpirationTime?: string;
    /** @format uint64 */
    collectionSize?: string;
    collectionPrice?: string;
    /** @format uint64 */
    activeCollectionsAmount?: string;
    collectionCreationFee?: string;
    collateralDeposit?: string;
    /** @format int64 */
    winnerReward?: string;
    /** @format int64 */
    voterReward?: string;
    hourlyFaucet?: string;
    inflationRate?: string;
    /** @format uint64 */
    raresPerPack?: string;
    /** @format uint64 */
    commonsPerPack?: string;
    /** @format uint64 */
    unCommonsPerPack?: string;
    /** @format uint64 */
    trialPeriod?: string;
    /** @format int64 */
    gameVoteRatio?: string;
    /** @format int64 */
    cardAuctionPriceReductionPeriod?: string;
}
/**
 * QueryParamsResponse is response type for the Query/Params RPC method.
 */
export interface CardchainQueryParamsResponse {
    /** params holds all the parameters of this module. */
    params?: CardchainParams;
}
export interface CardchainQueryQCardContentResponse {
    content?: string;
}
export interface CardchainQueryQCardchainInfoResponse {
    cardAuctionPrice?: string;
    activeCollections?: string[];
    /** @format uint64 */
    cardsNumber?: string;
    /** @format uint64 */
    matchesNumber?: string;
    /** @format uint64 */
    sellOffersNumber?: string;
    /** @format uint64 */
    councilsNumber?: string;
}
export interface CardchainQueryQCardsResponse {
    cardsList?: string[];
}
export interface CardchainQueryQMatchesResponse {
    matchesList?: string[];
    matches?: CardchainMatch[];
}
export interface CardchainQueryQSellOffersResponse {
    sellOffersIds?: string[];
    sellOffers?: CardchainSellOffer[];
}
export interface CardchainQueryQVotableCardsResponse {
    unregistered?: boolean;
    noVoteRights?: boolean;
    voteRights?: CardchainVoteRight[];
}
export interface CardchainQueryQVotingResultsResponse {
    lastVotingResults?: CardchainVotingResults;
}
export declare enum CardchainResponse {
    Yes = "Yes",
    No = "No",
    Suggestion = "Suggestion"
}
export interface CardchainSellOffer {
    seller?: string;
    buyer?: string;
    /** @format uint64 */
    card?: string;
    price?: string;
    status?: CardchainSellOfferStatus;
}
export declare enum CardchainSellOfferStatus {
    Open = "open",
    Sold = "sold",
    Removed = "removed"
}
export interface CardchainUser {
    alias?: string;
    ownedCardSchemes?: string[];
    ownedPrototypes?: string[];
    cards?: string[];
    voteRights?: CardchainVoteRight[];
    CouncilStatus?: CardchainCouncilStatus;
    ReportMatches?: boolean;
}
export interface CardchainVoteRight {
    /** @format uint64 */
    cardId?: string;
    /** @format int64 */
    expireBlock?: string;
}
export interface CardchainVotingResult {
    /** @format uint64 */
    cardId?: string;
    /** @format uint64 */
    fairEnoughVotes?: string;
    /** @format uint64 */
    overpoweredVotes?: string;
    /** @format uint64 */
    underpoweredVotes?: string;
    /** @format uint64 */
    inappropriateVotes?: string;
    result?: string;
}
export interface CardchainVotingResults {
    /** @format uint64 */
    totalVotes?: string;
    /** @format uint64 */
    totalFairEnoughVotes?: string;
    /** @format uint64 */
    totalOverpoweredVotes?: string;
    /** @format uint64 */
    totalUnderpoweredVotes?: string;
    /** @format uint64 */
    totalInappropriateVotes?: string;
    cardResults?: CardchainVotingResult[];
    notes?: string;
}
export interface CardchainWrapClearResponse {
    user?: string;
    response?: CardchainResponse;
    suggestion?: string;
}
export interface CardchainWrapHashResponse {
    user?: string;
    hash?: string;
}
export declare enum CardchaincardchainStatus {
    Scheme = "scheme",
    Prototype = "prototype",
    Trial = "trial",
    Permanent = "permanent",
    Suspended = "suspended",
    Banned = "banned",
    BannedSoon = "bannedSoon",
    BannedVerySoon = "bannedVerySoon",
    None = "none"
}
export interface GooglerpcStatus {
    /** @format int32 */
    code?: number;
    message?: string;
    details?: ProtobufAny[];
}
export interface ProtobufAny {
    "@type"?: string;
}
export declare type QueryParamsType = Record<string | number, any>;
export declare type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;
export interface FullRequestParams extends Omit<RequestInit, "body"> {
    /** set parameter to `true` for call `securityWorker` for this request */
    secure?: boolean;
    /** request path */
    path: string;
    /** content type of request body */
    type?: ContentType;
    /** query params */
    query?: QueryParamsType;
    /** format of response (i.e. response.json() -> format: "json") */
    format?: keyof Omit<Body, "body" | "bodyUsed">;
    /** request body */
    body?: unknown;
    /** base url */
    baseUrl?: string;
    /** request cancellation token */
    cancelToken?: CancelToken;
}
export declare type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;
export interface ApiConfig<SecurityDataType = unknown> {
    baseUrl?: string;
    baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
    securityWorker?: (securityData: SecurityDataType) => RequestParams | void;
}
export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
    data: D;
    error: E;
}
declare type CancelToken = Symbol | string | number;
export declare enum ContentType {
    Json = "application/json",
    FormData = "multipart/form-data",
    UrlEncoded = "application/x-www-form-urlencoded"
}
export declare class HttpClient<SecurityDataType = unknown> {
    baseUrl: string;
    private securityData;
    private securityWorker;
    private abortControllers;
    private baseApiParams;
    constructor(apiConfig?: ApiConfig<SecurityDataType>);
    setSecurityData: (data: SecurityDataType) => void;
    private addQueryParam;
    protected toQueryString(rawQuery?: QueryParamsType): string;
    protected addQueryParams(rawQuery?: QueryParamsType): string;
    private contentFormatters;
    private mergeRequestParams;
    private createAbortSignal;
    abortRequest: (cancelToken: CancelToken) => void;
    request: <T = any, E = any>({ body, secure, path, type, query, format, baseUrl, cancelToken, ...params }: FullRequestParams) => Promise<HttpResponse<T, E>>;
}
/**
 * @title cardchain/card.proto
 * @version version not set
 */
export declare class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
    /**
     * No description
     *
     * @tags Query
     * @name QueryParams
     * @summary Parameters queries the parameters of the module.
     * @request GET:/DecentralCardGame/cardchain/cardchain/params
     */
    queryParams: (params?: RequestParams) => Promise<HttpResponse<CardchainQueryParamsResponse, GooglerpcStatus>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryQCard
     * @summary Queries a list of QCard items.
     * @request GET:/DecentralCardGame/cardchain/cardchain/q_card/{cardId}
     */
    queryQCard: (cardId: string, params?: RequestParams) => Promise<HttpResponse<CardchainOutpCard, GooglerpcStatus>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryQCardContent
     * @summary Queries a list of QCardContent items.
     * @request GET:/DecentralCardGame/cardchain/cardchain/q_card_content/{cardId}
     */
    queryQCardContent: (cardId: string, params?: RequestParams) => Promise<HttpResponse<CardchainQueryQCardContentResponse, GooglerpcStatus>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryQCardchainInfo
     * @summary Queries a list of QCardchainInfo items.
     * @request GET:/DecentralCardGame/cardchain/cardchain/q_cardchain_info
     */
    queryQCardchainInfo: (params?: RequestParams) => Promise<HttpResponse<CardchainQueryQCardchainInfoResponse, GooglerpcStatus>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryQCards
     * @summary Queries a list of QCards items.
     * @request GET:/DecentralCardGame/cardchain/cardchain/q_cards/{owner}/{status}/{cardType}/{classes}/{sortBy}/{nameContains}/{keywordsContains}/{notesContains}
     */
    queryQCards: (owner: string, status: "scheme" | "prototype" | "trial" | "permanent" | "suspended" | "banned" | "bannedSoon" | "bannedVerySoon" | "none", cardType: string, classes: string, sortBy: string, nameContains: string, keywordsContains: string, notesContains: string, params?: RequestParams) => Promise<HttpResponse<CardchainQueryQCardsResponse, GooglerpcStatus>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryQCollection
     * @summary Queries a list of QCollection items.
     * @request GET:/DecentralCardGame/cardchain/cardchain/q_collection/{collectionId}
     */
    queryQCollection: (collectionId: string, params?: RequestParams) => Promise<HttpResponse<CardchainCollection, GooglerpcStatus>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryQCouncil
     * @summary Queries a list of QCouncil items.
     * @request GET:/DecentralCardGame/cardchain/cardchain/q_council/{councilId}
     */
    queryQCouncil: (councilId: string, params?: RequestParams) => Promise<HttpResponse<CardchainCouncil, GooglerpcStatus>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryQMatch
     * @summary Queries a list of QMatch items.
     * @request GET:/DecentralCardGame/cardchain/cardchain/q_match/{matchId}
     */
    queryQMatch: (matchId: string, params?: RequestParams) => Promise<HttpResponse<CardchainMatch, GooglerpcStatus>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryQMatches
     * @summary Queries a list of QMatches items.
     * @request GET:/DecentralCardGame/cardchain/cardchain/q_matches/{timestampDown}/{timestampUp}/{containsUsers}/{outcome}
     */
    queryQMatches: (timestampDown: string, timestampUp: string, containsUsers: string[], outcome: "AWon" | "BWon" | "Draw" | "Aborted", query?: {
        reporter?: string;
        cardsPlayed?: string[];
        "ignore.outcome"?: boolean;
        "ignore.timestamp"?: boolean;
        "ignore.reporter"?: boolean;
    }, params?: RequestParams) => Promise<HttpResponse<CardchainQueryQMatchesResponse, GooglerpcStatus>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryQSellOffer
     * @summary Queries a list of QSellOffer items.
     * @request GET:/DecentralCardGame/cardchain/cardchain/q_sell_offer/{sellOfferId}
     */
    queryQSellOffer: (sellOfferId: string, params?: RequestParams) => Promise<HttpResponse<CardchainSellOffer, GooglerpcStatus>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryQSellOffers
     * @summary Queries a list of QSellOffers items.
     * @request GET:/DecentralCardGame/cardchain/cardchain/q_sell_offers/{priceDown}/{priceUp}/{seller}/{buyer}/{status}
     */
    queryQSellOffers: (priceDown: string, priceUp: string, seller: string, buyer: string, status: "open" | "sold" | "removed", query?: {
        card?: string;
        "ignore.status"?: boolean;
        "ignore.price"?: boolean;
        "ignore.seller"?: boolean;
        "ignore.buyer"?: boolean;
        "ignore.card"?: boolean;
    }, params?: RequestParams) => Promise<HttpResponse<CardchainQueryQSellOffersResponse, GooglerpcStatus>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryQUser
     * @summary Queries a list of QUser items.
     * @request GET:/DecentralCardGame/cardchain/cardchain/q_user/{address}
     */
    queryQUser: (address: string, params?: RequestParams) => Promise<HttpResponse<CardchainUser, GooglerpcStatus>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryQVotableCards
     * @summary Queries a list of QVotableCards items.
     * @request GET:/DecentralCardGame/cardchain/cardchain/q_votable_cards/{address}
     */
    queryQVotableCards: (address: string, params?: RequestParams) => Promise<HttpResponse<CardchainQueryQVotableCardsResponse, GooglerpcStatus>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryQVotingResults
     * @summary Queries a list of QVotingResults items.
     * @request GET:/DecentralCardGame/cardchain/cardchain/q_voting_results
     */
    queryQVotingResults: (params?: RequestParams) => Promise<HttpResponse<CardchainQueryQVotingResultsResponse, GooglerpcStatus>>;
}
export {};
