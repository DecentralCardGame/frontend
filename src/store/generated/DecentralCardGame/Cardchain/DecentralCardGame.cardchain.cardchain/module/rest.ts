/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export enum CardchainCStatus {
  Design = "design",
  Finalized = "finalized",
  Active = "active",
  Archived = "archived",
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

export enum CardchainCouncelingStatus {
  CouncilOpen = "councilOpen",
  CouncilCreated = "councilCreated",
  CouncilClosed = "councilClosed",
  Commited = "commited",
  Revealed = "revealed",
  SuggestionsMade = "suggestionsMade",
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

export enum CardchainCouncilStatus {
  Available = "available",
  Unavailable = "unavailable",
  OpenCouncil = "openCouncil",
  StartedCouncil = "startedCouncil",
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

export type CardchainMsgAddArtworkResponse = object;

export type CardchainMsgAddArtworkToCollectionResponse = object;

export type CardchainMsgAddCardToCollectionResponse = object;

export type CardchainMsgAddContributorToCollectionResponse = object;

export type CardchainMsgAddStoryToCollectionResponse = object;

export type CardchainMsgApointMatchReporterResponse = object;

export type CardchainMsgBuyCardResponse = object;

export type CardchainMsgBuyCardSchemeResponse = object;

export type CardchainMsgBuyCollectionResponse = object;

export type CardchainMsgChangeArtistResponse = object;

export type CardchainMsgCommitCouncilResponseResponse = object;

export type CardchainMsgCreateCollectionResponse = object;

export type CardchainMsgCreateCouncilResponse = object;

export type CardchainMsgCreateSellOfferResponse = object;

export type CardchainMsgCreateuserResponse = object;

export type CardchainMsgDonateToCardResponse = object;

export type CardchainMsgFinalizeCollectionResponse = object;

export type CardchainMsgRegisterForCouncilResponse = object;

export type CardchainMsgRemoveCardFromCollectionResponse = object;

export type CardchainMsgRemoveContributorFromCollectionResponse = object;

export type CardchainMsgRemoveSellOfferResponse = object;

export interface CardchainMsgReportMatchResponse {
  /** @format uint64 */
  matchId?: string;
}

export type CardchainMsgRestartCouncilResponse = object;

export type CardchainMsgRevealCouncilResponseResponse = object;

export type CardchainMsgRewokeCouncilRegistrationResponse = object;

export type CardchainMsgSaveCardContentResponse = object;

export type CardchainMsgSetCardRarityResponse = object;

export type CardchainMsgSubmitCollectionProposalResponse = object;

export type CardchainMsgSubmitCopyrightProposalResponse = object;

export type CardchainMsgSubmitMatchReporterProposalResponse = object;

export type CardchainMsgTransferCardResponse = object;

export type CardchainMsgVoteCardResponse = object;

export enum CardchainOutcome {
  AWon = "AWon",
  BWon = "BWon",
  Draw = "Draw",
  Aborted = "Aborted",
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

export enum CardchainResponse {
  Yes = "Yes",
  No = "No",
  Suggestion = "Suggestion",
}

export interface CardchainSellOffer {
  seller?: string;
  buyer?: string;

  /** @format uint64 */
  card?: string;
  price?: string;
  status?: CardchainSellOfferStatus;
}

export enum CardchainSellOfferStatus {
  Open = "open",
  Sold = "sold",
  Removed = "removed",
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

export enum CardchaincardchainStatus {
  Scheme = "scheme",
  Prototype = "prototype",
  Trial = "trial",
  Permanent = "permanent",
  Suspended = "suspended",
  Banned = "banned",
  BannedSoon = "bannedSoon",
  BannedVerySoon = "bannedVerySoon",
  None = "none",
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

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

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

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType) => RequestParams | void;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "";
  private securityData: SecurityDataType = null as any;
  private securityWorker: null | ApiConfig<SecurityDataType>["securityWorker"] = null;
  private abortControllers = new Map<CancelToken, AbortController>();

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType) => {
    this.securityData = data;
  };

  private addQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];

    return (
      encodeURIComponent(key) +
      "=" +
      encodeURIComponent(Array.isArray(value) ? value.join(",") : typeof value === "number" ? value : `${value}`)
    );
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) =>
        typeof query[key] === "object" && !Array.isArray(query[key])
          ? this.toQueryString(query[key] as QueryParamsType)
          : this.addQueryParam(query, key),
      )
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((data, key) => {
        data.append(key, input[key]);
        return data;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  private mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  private createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format = "json",
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams = (secure && this.securityWorker && this.securityWorker(this.securityData)) || {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];

    return fetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
        ...(requestParams.headers || {}),
      },
      signal: cancelToken ? this.createAbortSignal(cancelToken) : void 0,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = (null as unknown) as T;
      r.error = (null as unknown) as E;

      const data = await response[format]()
        .then((data) => {
          if (r.ok) {
            r.data = data;
          } else {
            r.error = data;
          }
          return r;
        })
        .catch((e) => {
          r.error = e;
          return r;
        });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title cardchain/card.proto
 * @version version not set
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Query
   * @name QueryParams
   * @summary Parameters queries the parameters of the module.
   * @request GET:/DecentralCardGame/cardchain/cardchain/params
   */
  queryParams = (params: RequestParams = {}) =>
    this.request<CardchainQueryParamsResponse, GooglerpcStatus>({
      path: `/DecentralCardGame/cardchain/cardchain/params`,
      method: "GET",
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryQCard
   * @summary Queries a list of QCard items.
   * @request GET:/DecentralCardGame/cardchain/cardchain/q_card/{cardId}
   */
  queryQCard = (cardId: string, params: RequestParams = {}) =>
    this.request<CardchainOutpCard, GooglerpcStatus>({
      path: `/DecentralCardGame/cardchain/cardchain/q_card/${cardId}`,
      method: "GET",
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryQCardContent
   * @summary Queries a list of QCardContent items.
   * @request GET:/DecentralCardGame/cardchain/cardchain/q_card_content/{cardId}
   */
  queryQCardContent = (cardId: string, params: RequestParams = {}) =>
    this.request<CardchainQueryQCardContentResponse, GooglerpcStatus>({
      path: `/DecentralCardGame/cardchain/cardchain/q_card_content/${cardId}`,
      method: "GET",
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryQCardchainInfo
   * @summary Queries a list of QCardchainInfo items.
   * @request GET:/DecentralCardGame/cardchain/cardchain/q_cardchain_info
   */
  queryQCardchainInfo = (params: RequestParams = {}) =>
    this.request<CardchainQueryQCardchainInfoResponse, GooglerpcStatus>({
      path: `/DecentralCardGame/cardchain/cardchain/q_cardchain_info`,
      method: "GET",
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryQCards
   * @summary Queries a list of QCards items.
   * @request GET:/DecentralCardGame/cardchain/cardchain/q_cards/{owner}/{status}/{cardType}/{classes}/{sortBy}/{nameContains}/{keywordsContains}/{notesContains}
   */
  queryQCards = (
    owner: string,
    status:
      | "scheme"
      | "prototype"
      | "trial"
      | "permanent"
      | "suspended"
      | "banned"
      | "bannedSoon"
      | "bannedVerySoon"
      | "none",
    cardType: string,
    classes: string,
    sortBy: string,
    nameContains: string,
    keywordsContains: string,
    notesContains: string,
    params: RequestParams = {},
  ) =>
    this.request<CardchainQueryQCardsResponse, GooglerpcStatus>({
      path: `/DecentralCardGame/cardchain/cardchain/q_cards/${owner}/${status}/${cardType}/${classes}/${sortBy}/${nameContains}/${keywordsContains}/${notesContains}`,
      method: "GET",
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryQCollection
   * @summary Queries a list of QCollection items.
   * @request GET:/DecentralCardGame/cardchain/cardchain/q_collection/{collectionId}
   */
  queryQCollection = (collectionId: string, params: RequestParams = {}) =>
    this.request<CardchainCollection, GooglerpcStatus>({
      path: `/DecentralCardGame/cardchain/cardchain/q_collection/${collectionId}`,
      method: "GET",
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryQCouncil
   * @summary Queries a list of QCouncil items.
   * @request GET:/DecentralCardGame/cardchain/cardchain/q_council/{councilId}
   */
  queryQCouncil = (councilId: string, params: RequestParams = {}) =>
    this.request<CardchainCouncil, GooglerpcStatus>({
      path: `/DecentralCardGame/cardchain/cardchain/q_council/${councilId}`,
      method: "GET",
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryQMatch
   * @summary Queries a list of QMatch items.
   * @request GET:/DecentralCardGame/cardchain/cardchain/q_match/{matchId}
   */
  queryQMatch = (matchId: string, params: RequestParams = {}) =>
    this.request<CardchainMatch, GooglerpcStatus>({
      path: `/DecentralCardGame/cardchain/cardchain/q_match/${matchId}`,
      method: "GET",
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryQMatches
   * @summary Queries a list of QMatches items.
   * @request GET:/DecentralCardGame/cardchain/cardchain/q_matches/{timestampDown}/{timestampUp}/{containsUsers}/{outcome}
   */
  queryQMatches = (
    timestampDown: string,
    timestampUp: string,
    containsUsers: string[],
    outcome: "AWon" | "BWon" | "Draw" | "Aborted",
    query?: {
      reporter?: string;
      cardsPlayed?: string[];
      "ignore.outcome"?: boolean;
      "ignore.timestamp"?: boolean;
      "ignore.reporter"?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.request<CardchainQueryQMatchesResponse, GooglerpcStatus>({
      path: `/DecentralCardGame/cardchain/cardchain/q_matches/${timestampDown}/${timestampUp}/${containsUsers}/${outcome}`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryQSellOffer
   * @summary Queries a list of QSellOffer items.
   * @request GET:/DecentralCardGame/cardchain/cardchain/q_sell_offer/{sellOfferId}
   */
  queryQSellOffer = (sellOfferId: string, params: RequestParams = {}) =>
    this.request<CardchainSellOffer, GooglerpcStatus>({
      path: `/DecentralCardGame/cardchain/cardchain/q_sell_offer/${sellOfferId}`,
      method: "GET",
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryQSellOffers
   * @summary Queries a list of QSellOffers items.
   * @request GET:/DecentralCardGame/cardchain/cardchain/q_sell_offers/{priceDown}/{priceUp}/{seller}/{buyer}/{status}
   */
  queryQSellOffers = (
    priceDown: string,
    priceUp: string,
    seller: string,
    buyer: string,
    status: "open" | "sold" | "removed",
    query?: {
      card?: string;
      "ignore.status"?: boolean;
      "ignore.price"?: boolean;
      "ignore.seller"?: boolean;
      "ignore.buyer"?: boolean;
      "ignore.card"?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.request<CardchainQueryQSellOffersResponse, GooglerpcStatus>({
      path: `/DecentralCardGame/cardchain/cardchain/q_sell_offers/${priceDown}/${priceUp}/${seller}/${buyer}/${status}`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryQUser
   * @summary Queries a list of QUser items.
   * @request GET:/DecentralCardGame/cardchain/cardchain/q_user/{address}
   */
  queryQUser = (address: string, params: RequestParams = {}) =>
    this.request<CardchainUser, GooglerpcStatus>({
      path: `/DecentralCardGame/cardchain/cardchain/q_user/${address}`,
      method: "GET",
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryQVotableCards
   * @summary Queries a list of QVotableCards items.
   * @request GET:/DecentralCardGame/cardchain/cardchain/q_votable_cards/{address}
   */
  queryQVotableCards = (address: string, params: RequestParams = {}) =>
    this.request<CardchainQueryQVotableCardsResponse, GooglerpcStatus>({
      path: `/DecentralCardGame/cardchain/cardchain/q_votable_cards/${address}`,
      method: "GET",
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryQVotingResults
   * @summary Queries a list of QVotingResults items.
   * @request GET:/DecentralCardGame/cardchain/cardchain/q_voting_results
   */
  queryQVotingResults = (params: RequestParams = {}) =>
    this.request<CardchainQueryQVotingResultsResponse, GooglerpcStatus>({
      path: `/DecentralCardGame/cardchain/cardchain/q_voting_results`,
      method: "GET",
      format: "json",
      ...params,
    });
}