"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Api = exports.HttpClient = exports.ContentType = exports.CardchaincardchainStatus = exports.CardchainSellOfferStatus = exports.CardchainResponse = exports.CardchainQueryQCardsRequestStatus = exports.CardchainOutcome = exports.CardchainCouncilStatus = exports.CardchainCouncelingStatus = exports.CardchainCStatus = void 0;
var CardchainCStatus;
(function (CardchainCStatus) {
    CardchainCStatus["Design"] = "design";
    CardchainCStatus["Finalized"] = "finalized";
    CardchainCStatus["Active"] = "active";
    CardchainCStatus["Archived"] = "archived";
})(CardchainCStatus = exports.CardchainCStatus || (exports.CardchainCStatus = {}));
var CardchainCouncelingStatus;
(function (CardchainCouncelingStatus) {
    CardchainCouncelingStatus["CouncilOpen"] = "councilOpen";
    CardchainCouncelingStatus["CouncilCreated"] = "councilCreated";
    CardchainCouncelingStatus["CouncilClosed"] = "councilClosed";
    CardchainCouncelingStatus["Commited"] = "commited";
    CardchainCouncelingStatus["Revealed"] = "revealed";
    CardchainCouncelingStatus["SuggestionsMade"] = "suggestionsMade";
})(CardchainCouncelingStatus = exports.CardchainCouncelingStatus || (exports.CardchainCouncelingStatus = {}));
var CardchainCouncilStatus;
(function (CardchainCouncilStatus) {
    CardchainCouncilStatus["Available"] = "available";
    CardchainCouncilStatus["Unavailable"] = "unavailable";
    CardchainCouncilStatus["OpenCouncil"] = "openCouncil";
    CardchainCouncilStatus["StartedCouncil"] = "startedCouncil";
})(CardchainCouncilStatus = exports.CardchainCouncilStatus || (exports.CardchainCouncilStatus = {}));
var CardchainOutcome;
(function (CardchainOutcome) {
    CardchainOutcome["AWon"] = "AWon";
    CardchainOutcome["BWon"] = "BWon";
    CardchainOutcome["Draw"] = "Draw";
    CardchainOutcome["Aborted"] = "Aborted";
})(CardchainOutcome = exports.CardchainOutcome || (exports.CardchainOutcome = {}));
var CardchainQueryQCardsRequestStatus;
(function (CardchainQueryQCardsRequestStatus) {
    CardchainQueryQCardsRequestStatus["Scheme"] = "scheme";
    CardchainQueryQCardsRequestStatus["Prototype"] = "prototype";
    CardchainQueryQCardsRequestStatus["Trial"] = "trial";
    CardchainQueryQCardsRequestStatus["Permanent"] = "permanent";
    CardchainQueryQCardsRequestStatus["Suspended"] = "suspended";
    CardchainQueryQCardsRequestStatus["Banned"] = "banned";
    CardchainQueryQCardsRequestStatus["BannedSoon"] = "bannedSoon";
    CardchainQueryQCardsRequestStatus["BannedVerySoon"] = "bannedVerySoon";
    CardchainQueryQCardsRequestStatus["None"] = "none";
    CardchainQueryQCardsRequestStatus["Playable"] = "playable";
    CardchainQueryQCardsRequestStatus["Unplayable"] = "unplayable";
})(CardchainQueryQCardsRequestStatus = exports.CardchainQueryQCardsRequestStatus || (exports.CardchainQueryQCardsRequestStatus = {}));
var CardchainResponse;
(function (CardchainResponse) {
    CardchainResponse["Yes"] = "Yes";
    CardchainResponse["No"] = "No";
    CardchainResponse["Suggestion"] = "Suggestion";
})(CardchainResponse = exports.CardchainResponse || (exports.CardchainResponse = {}));
var CardchainSellOfferStatus;
(function (CardchainSellOfferStatus) {
    CardchainSellOfferStatus["Open"] = "open";
    CardchainSellOfferStatus["Sold"] = "sold";
    CardchainSellOfferStatus["Removed"] = "removed";
})(CardchainSellOfferStatus = exports.CardchainSellOfferStatus || (exports.CardchainSellOfferStatus = {}));
var CardchaincardchainStatus;
(function (CardchaincardchainStatus) {
    CardchaincardchainStatus["Scheme"] = "scheme";
    CardchaincardchainStatus["Prototype"] = "prototype";
    CardchaincardchainStatus["Trial"] = "trial";
    CardchaincardchainStatus["Permanent"] = "permanent";
    CardchaincardchainStatus["Suspended"] = "suspended";
    CardchaincardchainStatus["Banned"] = "banned";
    CardchaincardchainStatus["BannedSoon"] = "bannedSoon";
    CardchaincardchainStatus["BannedVerySoon"] = "bannedVerySoon";
    CardchaincardchainStatus["None"] = "none";
})(CardchaincardchainStatus = exports.CardchaincardchainStatus || (exports.CardchaincardchainStatus = {}));
var ContentType;
(function (ContentType) {
    ContentType["Json"] = "application/json";
    ContentType["FormData"] = "multipart/form-data";
    ContentType["UrlEncoded"] = "application/x-www-form-urlencoded";
})(ContentType = exports.ContentType || (exports.ContentType = {}));
class HttpClient {
    constructor(apiConfig = {}) {
        this.baseUrl = "";
        this.securityData = null;
        this.securityWorker = null;
        this.abortControllers = new Map();
        this.baseApiParams = {
            credentials: "same-origin",
            headers: {},
            redirect: "follow",
            referrerPolicy: "no-referrer",
        };
        this.setSecurityData = (data) => {
            this.securityData = data;
        };
        this.contentFormatters = {
            [ContentType.Json]: (input) => input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
            [ContentType.FormData]: (input) => Object.keys(input || {}).reduce((data, key) => {
                data.append(key, input[key]);
                return data;
            }, new FormData()),
            [ContentType.UrlEncoded]: (input) => this.toQueryString(input),
        };
        this.createAbortSignal = (cancelToken) => {
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
        this.abortRequest = (cancelToken) => {
            const abortController = this.abortControllers.get(cancelToken);
            if (abortController) {
                abortController.abort();
                this.abortControllers.delete(cancelToken);
            }
        };
        this.request = ({ body, secure, path, type, query, format = "json", baseUrl, cancelToken, ...params }) => {
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
                const r = response;
                r.data = null;
                r.error = null;
                const data = await response[format]()
                    .then((data) => {
                    if (r.ok) {
                        r.data = data;
                    }
                    else {
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
                if (!response.ok)
                    throw data;
                return data;
            });
        };
        Object.assign(this, apiConfig);
    }
    addQueryParam(query, key) {
        const value = query[key];
        return (encodeURIComponent(key) +
            "=" +
            encodeURIComponent(Array.isArray(value) ? value.join(",") : typeof value === "number" ? value : `${value}`));
    }
    toQueryString(rawQuery) {
        const query = rawQuery || {};
        const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
        return keys
            .map((key) => typeof query[key] === "object" && !Array.isArray(query[key])
            ? this.toQueryString(query[key])
            : this.addQueryParam(query, key))
            .join("&");
    }
    addQueryParams(rawQuery) {
        const queryString = this.toQueryString(rawQuery);
        return queryString ? `?${queryString}` : "";
    }
    mergeRequestParams(params1, params2) {
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
}
exports.HttpClient = HttpClient;
/**
 * @title cardchain/card.proto
 * @version version not set
 */
class Api extends HttpClient {
    constructor() {
        super(...arguments);
        /**
         * No description
         *
         * @tags Query
         * @name QueryParams
         * @summary Parameters queries the parameters of the module.
         * @request GET:/DecentralCardGame/cardchain/cardchain/params
         */
        this.queryParams = (params = {}) => this.request({
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
        this.queryQCard = (cardId, params = {}) => this.request({
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
        this.queryQCardContent = (cardId, params = {}) => this.request({
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
        this.queryQCardchainInfo = (params = {}) => this.request({
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
         * @request GET:/DecentralCardGame/cardchain/cardchain/q_cards/{status}
         */
        this.queryQCards = (status, query, params = {}) => this.request({
            path: `/DecentralCardGame/cardchain/cardchain/q_cards/${status}`,
            method: "GET",
            query: query,
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
        this.queryQCollection = (collectionId, params = {}) => this.request({
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
        this.queryQCouncil = (councilId, params = {}) => this.request({
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
        this.queryQMatch = (matchId, params = {}) => this.request({
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
         * @request GET:/DecentralCardGame/cardchain/cardchain/q_matches
         */
        this.queryQMatches = (query, params = {}) => this.request({
            path: `/DecentralCardGame/cardchain/cardchain/q_matches`,
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
        this.queryQSellOffer = (sellOfferId, params = {}) => this.request({
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
         * @request GET:/DecentralCardGame/cardchain/cardchain/q_sell_offers/{status}
         */
        this.queryQSellOffers = (status, query, params = {}) => this.request({
            path: `/DecentralCardGame/cardchain/cardchain/q_sell_offers/${status}`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryQServer
         * @summary Queries a list of QServer items.
         * @request GET:/DecentralCardGame/cardchain/cardchain/q_server/{id}
         */
        this.queryQServer = (id, params = {}) => this.request({
            path: `/DecentralCardGame/cardchain/cardchain/q_server/${id}`,
            method: "GET",
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
        this.queryQUser = (address, params = {}) => this.request({
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
        this.queryQVotableCards = (address, params = {}) => this.request({
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
        this.queryQVotingResults = (params = {}) => this.request({
            path: `/DecentralCardGame/cardchain/cardchain/q_voting_results`,
            method: "GET",
            format: "json",
            ...params,
        });
    }
}
exports.Api = Api;
