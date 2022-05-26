"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryClientImpl = exports.QueryQServerResponse = exports.QueryQServerRequest = exports.QueryQSellOffersResponse = exports.IgnoreSellOffers = exports.QueryQSellOffersRequest = exports.QueryQMatchesResponse = exports.IgnoreMatches = exports.QueryQMatchesRequest = exports.QueryQCouncilRequest = exports.QueryQSellOfferRequest = exports.QueryQCollectionRequest = exports.QueryQMatchRequest = exports.QueryQCardsResponse = exports.QueryQCardsRequest = exports.QueryQVotableCardsResponse = exports.QueryQVotableCardsRequest = exports.QueryQVotingResultsResponse = exports.QueryQVotingResultsRequest = exports.QueryQCardchainInfoResponse = exports.QueryQCardchainInfoRequest = exports.QueryQUserRequest = exports.QueryQCardContentResponse = exports.QueryQCardContentRequest = exports.QueryQCardRequest = exports.QueryParamsResponse = exports.QueryParamsRequest = exports.queryQCardsRequest_StatusToJSON = exports.queryQCardsRequest_StatusFromJSON = exports.QueryQCardsRequest_Status = exports.protobufPackage = void 0;
/* eslint-disable */
const tx_1 = require("../cardchain/tx");
const sell_offer_1 = require("../cardchain/sell_offer");
const minimal_1 = require("protobufjs/minimal");
const Long = require("long");
const params_1 = require("../cardchain/params");
const voting_results_1 = require("../cardchain/voting_results");
const vote_right_1 = require("../cardchain/vote_right");
const match_1 = require("../cardchain/match");
const card_1 = require("../cardchain/card");
const user_1 = require("../cardchain/user");
const collection_1 = require("../cardchain/collection");
const council_1 = require("../cardchain/council");
const server_1 = require("../cardchain/server");
exports.protobufPackage = "DecentralCardGame.cardchain.cardchain";
var QueryQCardsRequest_Status;
(function (QueryQCardsRequest_Status) {
    QueryQCardsRequest_Status[QueryQCardsRequest_Status["scheme"] = 0] = "scheme";
    QueryQCardsRequest_Status[QueryQCardsRequest_Status["prototype"] = 1] = "prototype";
    QueryQCardsRequest_Status[QueryQCardsRequest_Status["trial"] = 2] = "trial";
    QueryQCardsRequest_Status[QueryQCardsRequest_Status["permanent"] = 3] = "permanent";
    QueryQCardsRequest_Status[QueryQCardsRequest_Status["suspended"] = 4] = "suspended";
    QueryQCardsRequest_Status[QueryQCardsRequest_Status["banned"] = 5] = "banned";
    QueryQCardsRequest_Status[QueryQCardsRequest_Status["bannedSoon"] = 6] = "bannedSoon";
    QueryQCardsRequest_Status[QueryQCardsRequest_Status["bannedVerySoon"] = 7] = "bannedVerySoon";
    QueryQCardsRequest_Status[QueryQCardsRequest_Status["none"] = 8] = "none";
    QueryQCardsRequest_Status[QueryQCardsRequest_Status["playable"] = 9] = "playable";
    QueryQCardsRequest_Status[QueryQCardsRequest_Status["unplayable"] = 10] = "unplayable";
    QueryQCardsRequest_Status[QueryQCardsRequest_Status["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(QueryQCardsRequest_Status = exports.QueryQCardsRequest_Status || (exports.QueryQCardsRequest_Status = {}));
function queryQCardsRequest_StatusFromJSON(object) {
    switch (object) {
        case 0:
        case "scheme":
            return QueryQCardsRequest_Status.scheme;
        case 1:
        case "prototype":
            return QueryQCardsRequest_Status.prototype;
        case 2:
        case "trial":
            return QueryQCardsRequest_Status.trial;
        case 3:
        case "permanent":
            return QueryQCardsRequest_Status.permanent;
        case 4:
        case "suspended":
            return QueryQCardsRequest_Status.suspended;
        case 5:
        case "banned":
            return QueryQCardsRequest_Status.banned;
        case 6:
        case "bannedSoon":
            return QueryQCardsRequest_Status.bannedSoon;
        case 7:
        case "bannedVerySoon":
            return QueryQCardsRequest_Status.bannedVerySoon;
        case 8:
        case "none":
            return QueryQCardsRequest_Status.none;
        case 9:
        case "playable":
            return QueryQCardsRequest_Status.playable;
        case 10:
        case "unplayable":
            return QueryQCardsRequest_Status.unplayable;
        case -1:
        case "UNRECOGNIZED":
        default:
            return QueryQCardsRequest_Status.UNRECOGNIZED;
    }
}
exports.queryQCardsRequest_StatusFromJSON = queryQCardsRequest_StatusFromJSON;
function queryQCardsRequest_StatusToJSON(object) {
    switch (object) {
        case QueryQCardsRequest_Status.scheme:
            return "scheme";
        case QueryQCardsRequest_Status.prototype:
            return "prototype";
        case QueryQCardsRequest_Status.trial:
            return "trial";
        case QueryQCardsRequest_Status.permanent:
            return "permanent";
        case QueryQCardsRequest_Status.suspended:
            return "suspended";
        case QueryQCardsRequest_Status.banned:
            return "banned";
        case QueryQCardsRequest_Status.bannedSoon:
            return "bannedSoon";
        case QueryQCardsRequest_Status.bannedVerySoon:
            return "bannedVerySoon";
        case QueryQCardsRequest_Status.none:
            return "none";
        case QueryQCardsRequest_Status.playable:
            return "playable";
        case QueryQCardsRequest_Status.unplayable:
            return "unplayable";
        default:
            return "UNKNOWN";
    }
}
exports.queryQCardsRequest_StatusToJSON = queryQCardsRequest_StatusToJSON;
const baseQueryParamsRequest = {};
exports.QueryParamsRequest = {
    encode(_, writer = minimal_1.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryParamsRequest };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(_) {
        const message = { ...baseQueryParamsRequest };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = { ...baseQueryParamsRequest };
        return message;
    },
};
const baseQueryParamsResponse = {};
exports.QueryParamsResponse = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.params !== undefined) {
            params_1.Params.encode(message.params, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryParamsResponse };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.params = params_1.Params.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseQueryParamsResponse };
        if (object.params !== undefined && object.params !== null) {
            message.params = params_1.Params.fromJSON(object.params);
        }
        else {
            message.params = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.params !== undefined &&
            (obj.params = message.params ? params_1.Params.toJSON(message.params) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryParamsResponse };
        if (object.params !== undefined && object.params !== null) {
            message.params = params_1.Params.fromPartial(object.params);
        }
        else {
            message.params = undefined;
        }
        return message;
    },
};
const baseQueryQCardRequest = { cardId: "" };
exports.QueryQCardRequest = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.cardId !== "") {
            writer.uint32(10).string(message.cardId);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryQCardRequest };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.cardId = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseQueryQCardRequest };
        if (object.cardId !== undefined && object.cardId !== null) {
            message.cardId = String(object.cardId);
        }
        else {
            message.cardId = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.cardId !== undefined && (obj.cardId = message.cardId);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryQCardRequest };
        if (object.cardId !== undefined && object.cardId !== null) {
            message.cardId = object.cardId;
        }
        else {
            message.cardId = "";
        }
        return message;
    },
};
const baseQueryQCardContentRequest = { cardId: "" };
exports.QueryQCardContentRequest = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.cardId !== "") {
            writer.uint32(10).string(message.cardId);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseQueryQCardContentRequest,
        };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.cardId = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = {
            ...baseQueryQCardContentRequest,
        };
        if (object.cardId !== undefined && object.cardId !== null) {
            message.cardId = String(object.cardId);
        }
        else {
            message.cardId = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.cardId !== undefined && (obj.cardId = message.cardId);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseQueryQCardContentRequest,
        };
        if (object.cardId !== undefined && object.cardId !== null) {
            message.cardId = object.cardId;
        }
        else {
            message.cardId = "";
        }
        return message;
    },
};
const baseQueryQCardContentResponse = { content: "" };
exports.QueryQCardContentResponse = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.content !== "") {
            writer.uint32(10).string(message.content);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseQueryQCardContentResponse,
        };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.content = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = {
            ...baseQueryQCardContentResponse,
        };
        if (object.content !== undefined && object.content !== null) {
            message.content = String(object.content);
        }
        else {
            message.content = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.content !== undefined && (obj.content = message.content);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseQueryQCardContentResponse,
        };
        if (object.content !== undefined && object.content !== null) {
            message.content = object.content;
        }
        else {
            message.content = "";
        }
        return message;
    },
};
const baseQueryQUserRequest = { address: "" };
exports.QueryQUserRequest = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.address !== "") {
            writer.uint32(10).string(message.address);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryQUserRequest };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.address = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseQueryQUserRequest };
        if (object.address !== undefined && object.address !== null) {
            message.address = String(object.address);
        }
        else {
            message.address = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.address !== undefined && (obj.address = message.address);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryQUserRequest };
        if (object.address !== undefined && object.address !== null) {
            message.address = object.address;
        }
        else {
            message.address = "";
        }
        return message;
    },
};
const baseQueryQCardchainInfoRequest = {};
exports.QueryQCardchainInfoRequest = {
    encode(_, writer = minimal_1.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseQueryQCardchainInfoRequest,
        };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(_) {
        const message = {
            ...baseQueryQCardchainInfoRequest,
        };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = {
            ...baseQueryQCardchainInfoRequest,
        };
        return message;
    },
};
const baseQueryQCardchainInfoResponse = {
    cardAuctionPrice: "",
    activeCollections: 0,
    cardsNumber: 0,
    matchesNumber: 0,
    sellOffersNumber: 0,
    councilsNumber: 0,
};
exports.QueryQCardchainInfoResponse = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.cardAuctionPrice !== "") {
            writer.uint32(10).string(message.cardAuctionPrice);
        }
        writer.uint32(18).fork();
        for (const v of message.activeCollections) {
            writer.uint64(v);
        }
        writer.ldelim();
        if (message.cardsNumber !== 0) {
            writer.uint32(24).uint64(message.cardsNumber);
        }
        if (message.matchesNumber !== 0) {
            writer.uint32(32).uint64(message.matchesNumber);
        }
        if (message.sellOffersNumber !== 0) {
            writer.uint32(40).uint64(message.sellOffersNumber);
        }
        if (message.councilsNumber !== 0) {
            writer.uint32(48).uint64(message.councilsNumber);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseQueryQCardchainInfoResponse,
        };
        message.activeCollections = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.cardAuctionPrice = reader.string();
                    break;
                case 2:
                    if ((tag & 7) === 2) {
                        const end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2) {
                            message.activeCollections.push(longToNumber(reader.uint64()));
                        }
                    }
                    else {
                        message.activeCollections.push(longToNumber(reader.uint64()));
                    }
                    break;
                case 3:
                    message.cardsNumber = longToNumber(reader.uint64());
                    break;
                case 4:
                    message.matchesNumber = longToNumber(reader.uint64());
                    break;
                case 5:
                    message.sellOffersNumber = longToNumber(reader.uint64());
                    break;
                case 6:
                    message.councilsNumber = longToNumber(reader.uint64());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = {
            ...baseQueryQCardchainInfoResponse,
        };
        message.activeCollections = [];
        if (object.cardAuctionPrice !== undefined &&
            object.cardAuctionPrice !== null) {
            message.cardAuctionPrice = String(object.cardAuctionPrice);
        }
        else {
            message.cardAuctionPrice = "";
        }
        if (object.activeCollections !== undefined &&
            object.activeCollections !== null) {
            for (const e of object.activeCollections) {
                message.activeCollections.push(Number(e));
            }
        }
        if (object.cardsNumber !== undefined && object.cardsNumber !== null) {
            message.cardsNumber = Number(object.cardsNumber);
        }
        else {
            message.cardsNumber = 0;
        }
        if (object.matchesNumber !== undefined && object.matchesNumber !== null) {
            message.matchesNumber = Number(object.matchesNumber);
        }
        else {
            message.matchesNumber = 0;
        }
        if (object.sellOffersNumber !== undefined &&
            object.sellOffersNumber !== null) {
            message.sellOffersNumber = Number(object.sellOffersNumber);
        }
        else {
            message.sellOffersNumber = 0;
        }
        if (object.councilsNumber !== undefined && object.councilsNumber !== null) {
            message.councilsNumber = Number(object.councilsNumber);
        }
        else {
            message.councilsNumber = 0;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.cardAuctionPrice !== undefined &&
            (obj.cardAuctionPrice = message.cardAuctionPrice);
        if (message.activeCollections) {
            obj.activeCollections = message.activeCollections.map((e) => e);
        }
        else {
            obj.activeCollections = [];
        }
        message.cardsNumber !== undefined &&
            (obj.cardsNumber = message.cardsNumber);
        message.matchesNumber !== undefined &&
            (obj.matchesNumber = message.matchesNumber);
        message.sellOffersNumber !== undefined &&
            (obj.sellOffersNumber = message.sellOffersNumber);
        message.councilsNumber !== undefined &&
            (obj.councilsNumber = message.councilsNumber);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseQueryQCardchainInfoResponse,
        };
        message.activeCollections = [];
        if (object.cardAuctionPrice !== undefined &&
            object.cardAuctionPrice !== null) {
            message.cardAuctionPrice = object.cardAuctionPrice;
        }
        else {
            message.cardAuctionPrice = "";
        }
        if (object.activeCollections !== undefined &&
            object.activeCollections !== null) {
            for (const e of object.activeCollections) {
                message.activeCollections.push(e);
            }
        }
        if (object.cardsNumber !== undefined && object.cardsNumber !== null) {
            message.cardsNumber = object.cardsNumber;
        }
        else {
            message.cardsNumber = 0;
        }
        if (object.matchesNumber !== undefined && object.matchesNumber !== null) {
            message.matchesNumber = object.matchesNumber;
        }
        else {
            message.matchesNumber = 0;
        }
        if (object.sellOffersNumber !== undefined &&
            object.sellOffersNumber !== null) {
            message.sellOffersNumber = object.sellOffersNumber;
        }
        else {
            message.sellOffersNumber = 0;
        }
        if (object.councilsNumber !== undefined && object.councilsNumber !== null) {
            message.councilsNumber = object.councilsNumber;
        }
        else {
            message.councilsNumber = 0;
        }
        return message;
    },
};
const baseQueryQVotingResultsRequest = {};
exports.QueryQVotingResultsRequest = {
    encode(_, writer = minimal_1.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseQueryQVotingResultsRequest,
        };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(_) {
        const message = {
            ...baseQueryQVotingResultsRequest,
        };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = {
            ...baseQueryQVotingResultsRequest,
        };
        return message;
    },
};
const baseQueryQVotingResultsResponse = {};
exports.QueryQVotingResultsResponse = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.lastVotingResults !== undefined) {
            voting_results_1.VotingResults.encode(message.lastVotingResults, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseQueryQVotingResultsResponse,
        };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.lastVotingResults = voting_results_1.VotingResults.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = {
            ...baseQueryQVotingResultsResponse,
        };
        if (object.lastVotingResults !== undefined &&
            object.lastVotingResults !== null) {
            message.lastVotingResults = voting_results_1.VotingResults.fromJSON(object.lastVotingResults);
        }
        else {
            message.lastVotingResults = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.lastVotingResults !== undefined &&
            (obj.lastVotingResults = message.lastVotingResults
                ? voting_results_1.VotingResults.toJSON(message.lastVotingResults)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseQueryQVotingResultsResponse,
        };
        if (object.lastVotingResults !== undefined &&
            object.lastVotingResults !== null) {
            message.lastVotingResults = voting_results_1.VotingResults.fromPartial(object.lastVotingResults);
        }
        else {
            message.lastVotingResults = undefined;
        }
        return message;
    },
};
const baseQueryQVotableCardsRequest = { address: "" };
exports.QueryQVotableCardsRequest = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.address !== "") {
            writer.uint32(10).string(message.address);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseQueryQVotableCardsRequest,
        };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.address = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = {
            ...baseQueryQVotableCardsRequest,
        };
        if (object.address !== undefined && object.address !== null) {
            message.address = String(object.address);
        }
        else {
            message.address = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.address !== undefined && (obj.address = message.address);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseQueryQVotableCardsRequest,
        };
        if (object.address !== undefined && object.address !== null) {
            message.address = object.address;
        }
        else {
            message.address = "";
        }
        return message;
    },
};
const baseQueryQVotableCardsResponse = {
    unregistered: false,
    noVoteRights: false,
};
exports.QueryQVotableCardsResponse = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.unregistered === true) {
            writer.uint32(8).bool(message.unregistered);
        }
        if (message.noVoteRights === true) {
            writer.uint32(16).bool(message.noVoteRights);
        }
        for (const v of message.voteRights) {
            vote_right_1.VoteRight.encode(v, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseQueryQVotableCardsResponse,
        };
        message.voteRights = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.unregistered = reader.bool();
                    break;
                case 2:
                    message.noVoteRights = reader.bool();
                    break;
                case 3:
                    message.voteRights.push(vote_right_1.VoteRight.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = {
            ...baseQueryQVotableCardsResponse,
        };
        message.voteRights = [];
        if (object.unregistered !== undefined && object.unregistered !== null) {
            message.unregistered = Boolean(object.unregistered);
        }
        else {
            message.unregistered = false;
        }
        if (object.noVoteRights !== undefined && object.noVoteRights !== null) {
            message.noVoteRights = Boolean(object.noVoteRights);
        }
        else {
            message.noVoteRights = false;
        }
        if (object.voteRights !== undefined && object.voteRights !== null) {
            for (const e of object.voteRights) {
                message.voteRights.push(vote_right_1.VoteRight.fromJSON(e));
            }
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.unregistered !== undefined &&
            (obj.unregistered = message.unregistered);
        message.noVoteRights !== undefined &&
            (obj.noVoteRights = message.noVoteRights);
        if (message.voteRights) {
            obj.voteRights = message.voteRights.map((e) => e ? vote_right_1.VoteRight.toJSON(e) : undefined);
        }
        else {
            obj.voteRights = [];
        }
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseQueryQVotableCardsResponse,
        };
        message.voteRights = [];
        if (object.unregistered !== undefined && object.unregistered !== null) {
            message.unregistered = object.unregistered;
        }
        else {
            message.unregistered = false;
        }
        if (object.noVoteRights !== undefined && object.noVoteRights !== null) {
            message.noVoteRights = object.noVoteRights;
        }
        else {
            message.noVoteRights = false;
        }
        if (object.voteRights !== undefined && object.voteRights !== null) {
            for (const e of object.voteRights) {
                message.voteRights.push(vote_right_1.VoteRight.fromPartial(e));
            }
        }
        return message;
    },
};
const baseQueryQCardsRequest = {
    owner: "",
    status: 0,
    cardType: "",
    classes: "",
    sortBy: "",
    nameContains: "",
    keywordsContains: "",
    notesContains: "",
};
exports.QueryQCardsRequest = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.owner !== "") {
            writer.uint32(10).string(message.owner);
        }
        if (message.status !== 0) {
            writer.uint32(16).int32(message.status);
        }
        if (message.cardType !== "") {
            writer.uint32(26).string(message.cardType);
        }
        if (message.classes !== "") {
            writer.uint32(34).string(message.classes);
        }
        if (message.sortBy !== "") {
            writer.uint32(42).string(message.sortBy);
        }
        if (message.nameContains !== "") {
            writer.uint32(50).string(message.nameContains);
        }
        if (message.keywordsContains !== "") {
            writer.uint32(58).string(message.keywordsContains);
        }
        if (message.notesContains !== "") {
            writer.uint32(66).string(message.notesContains);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryQCardsRequest };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.owner = reader.string();
                    break;
                case 2:
                    message.status = reader.int32();
                    break;
                case 3:
                    message.cardType = reader.string();
                    break;
                case 4:
                    message.classes = reader.string();
                    break;
                case 5:
                    message.sortBy = reader.string();
                    break;
                case 6:
                    message.nameContains = reader.string();
                    break;
                case 7:
                    message.keywordsContains = reader.string();
                    break;
                case 8:
                    message.notesContains = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseQueryQCardsRequest };
        if (object.owner !== undefined && object.owner !== null) {
            message.owner = String(object.owner);
        }
        else {
            message.owner = "";
        }
        if (object.status !== undefined && object.status !== null) {
            message.status = queryQCardsRequest_StatusFromJSON(object.status);
        }
        else {
            message.status = 0;
        }
        if (object.cardType !== undefined && object.cardType !== null) {
            message.cardType = String(object.cardType);
        }
        else {
            message.cardType = "";
        }
        if (object.classes !== undefined && object.classes !== null) {
            message.classes = String(object.classes);
        }
        else {
            message.classes = "";
        }
        if (object.sortBy !== undefined && object.sortBy !== null) {
            message.sortBy = String(object.sortBy);
        }
        else {
            message.sortBy = "";
        }
        if (object.nameContains !== undefined && object.nameContains !== null) {
            message.nameContains = String(object.nameContains);
        }
        else {
            message.nameContains = "";
        }
        if (object.keywordsContains !== undefined &&
            object.keywordsContains !== null) {
            message.keywordsContains = String(object.keywordsContains);
        }
        else {
            message.keywordsContains = "";
        }
        if (object.notesContains !== undefined && object.notesContains !== null) {
            message.notesContains = String(object.notesContains);
        }
        else {
            message.notesContains = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.owner !== undefined && (obj.owner = message.owner);
        message.status !== undefined &&
            (obj.status = queryQCardsRequest_StatusToJSON(message.status));
        message.cardType !== undefined && (obj.cardType = message.cardType);
        message.classes !== undefined && (obj.classes = message.classes);
        message.sortBy !== undefined && (obj.sortBy = message.sortBy);
        message.nameContains !== undefined &&
            (obj.nameContains = message.nameContains);
        message.keywordsContains !== undefined &&
            (obj.keywordsContains = message.keywordsContains);
        message.notesContains !== undefined &&
            (obj.notesContains = message.notesContains);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryQCardsRequest };
        if (object.owner !== undefined && object.owner !== null) {
            message.owner = object.owner;
        }
        else {
            message.owner = "";
        }
        if (object.status !== undefined && object.status !== null) {
            message.status = object.status;
        }
        else {
            message.status = 0;
        }
        if (object.cardType !== undefined && object.cardType !== null) {
            message.cardType = object.cardType;
        }
        else {
            message.cardType = "";
        }
        if (object.classes !== undefined && object.classes !== null) {
            message.classes = object.classes;
        }
        else {
            message.classes = "";
        }
        if (object.sortBy !== undefined && object.sortBy !== null) {
            message.sortBy = object.sortBy;
        }
        else {
            message.sortBy = "";
        }
        if (object.nameContains !== undefined && object.nameContains !== null) {
            message.nameContains = object.nameContains;
        }
        else {
            message.nameContains = "";
        }
        if (object.keywordsContains !== undefined &&
            object.keywordsContains !== null) {
            message.keywordsContains = object.keywordsContains;
        }
        else {
            message.keywordsContains = "";
        }
        if (object.notesContains !== undefined && object.notesContains !== null) {
            message.notesContains = object.notesContains;
        }
        else {
            message.notesContains = "";
        }
        return message;
    },
};
const baseQueryQCardsResponse = { cardsList: 0 };
exports.QueryQCardsResponse = {
    encode(message, writer = minimal_1.Writer.create()) {
        writer.uint32(10).fork();
        for (const v of message.cardsList) {
            writer.uint64(v);
        }
        writer.ldelim();
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryQCardsResponse };
        message.cardsList = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if ((tag & 7) === 2) {
                        const end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2) {
                            message.cardsList.push(longToNumber(reader.uint64()));
                        }
                    }
                    else {
                        message.cardsList.push(longToNumber(reader.uint64()));
                    }
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseQueryQCardsResponse };
        message.cardsList = [];
        if (object.cardsList !== undefined && object.cardsList !== null) {
            for (const e of object.cardsList) {
                message.cardsList.push(Number(e));
            }
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        if (message.cardsList) {
            obj.cardsList = message.cardsList.map((e) => e);
        }
        else {
            obj.cardsList = [];
        }
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryQCardsResponse };
        message.cardsList = [];
        if (object.cardsList !== undefined && object.cardsList !== null) {
            for (const e of object.cardsList) {
                message.cardsList.push(e);
            }
        }
        return message;
    },
};
const baseQueryQMatchRequest = { matchId: 0 };
exports.QueryQMatchRequest = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.matchId !== 0) {
            writer.uint32(8).uint64(message.matchId);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryQMatchRequest };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.matchId = longToNumber(reader.uint64());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseQueryQMatchRequest };
        if (object.matchId !== undefined && object.matchId !== null) {
            message.matchId = Number(object.matchId);
        }
        else {
            message.matchId = 0;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.matchId !== undefined && (obj.matchId = message.matchId);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryQMatchRequest };
        if (object.matchId !== undefined && object.matchId !== null) {
            message.matchId = object.matchId;
        }
        else {
            message.matchId = 0;
        }
        return message;
    },
};
const baseQueryQCollectionRequest = { collectionId: 0 };
exports.QueryQCollectionRequest = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.collectionId !== 0) {
            writer.uint32(8).uint64(message.collectionId);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseQueryQCollectionRequest,
        };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.collectionId = longToNumber(reader.uint64());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = {
            ...baseQueryQCollectionRequest,
        };
        if (object.collectionId !== undefined && object.collectionId !== null) {
            message.collectionId = Number(object.collectionId);
        }
        else {
            message.collectionId = 0;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.collectionId !== undefined &&
            (obj.collectionId = message.collectionId);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseQueryQCollectionRequest,
        };
        if (object.collectionId !== undefined && object.collectionId !== null) {
            message.collectionId = object.collectionId;
        }
        else {
            message.collectionId = 0;
        }
        return message;
    },
};
const baseQueryQSellOfferRequest = { sellOfferId: 0 };
exports.QueryQSellOfferRequest = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.sellOfferId !== 0) {
            writer.uint32(8).uint64(message.sellOfferId);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryQSellOfferRequest };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.sellOfferId = longToNumber(reader.uint64());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseQueryQSellOfferRequest };
        if (object.sellOfferId !== undefined && object.sellOfferId !== null) {
            message.sellOfferId = Number(object.sellOfferId);
        }
        else {
            message.sellOfferId = 0;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.sellOfferId !== undefined &&
            (obj.sellOfferId = message.sellOfferId);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryQSellOfferRequest };
        if (object.sellOfferId !== undefined && object.sellOfferId !== null) {
            message.sellOfferId = object.sellOfferId;
        }
        else {
            message.sellOfferId = 0;
        }
        return message;
    },
};
const baseQueryQCouncilRequest = { councilId: 0 };
exports.QueryQCouncilRequest = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.councilId !== 0) {
            writer.uint32(8).uint64(message.councilId);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryQCouncilRequest };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.councilId = longToNumber(reader.uint64());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseQueryQCouncilRequest };
        if (object.councilId !== undefined && object.councilId !== null) {
            message.councilId = Number(object.councilId);
        }
        else {
            message.councilId = 0;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.councilId !== undefined && (obj.councilId = message.councilId);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryQCouncilRequest };
        if (object.councilId !== undefined && object.councilId !== null) {
            message.councilId = object.councilId;
        }
        else {
            message.councilId = 0;
        }
        return message;
    },
};
const baseQueryQMatchesRequest = {
    timestampDown: 0,
    timestampUp: 0,
    containsUsers: "",
    reporter: "",
    outcome: 0,
    cardsPlayed: 0,
};
exports.QueryQMatchesRequest = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.timestampDown !== 0) {
            writer.uint32(8).uint64(message.timestampDown);
        }
        if (message.timestampUp !== 0) {
            writer.uint32(16).uint64(message.timestampUp);
        }
        for (const v of message.containsUsers) {
            writer.uint32(26).string(v);
        }
        if (message.reporter !== "") {
            writer.uint32(34).string(message.reporter);
        }
        if (message.outcome !== 0) {
            writer.uint32(40).int32(message.outcome);
        }
        writer.uint32(50).fork();
        for (const v of message.cardsPlayed) {
            writer.uint64(v);
        }
        writer.ldelim();
        if (message.ignore !== undefined) {
            exports.IgnoreMatches.encode(message.ignore, writer.uint32(58).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryQMatchesRequest };
        message.containsUsers = [];
        message.cardsPlayed = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.timestampDown = longToNumber(reader.uint64());
                    break;
                case 2:
                    message.timestampUp = longToNumber(reader.uint64());
                    break;
                case 3:
                    message.containsUsers.push(reader.string());
                    break;
                case 4:
                    message.reporter = reader.string();
                    break;
                case 5:
                    message.outcome = reader.int32();
                    break;
                case 6:
                    if ((tag & 7) === 2) {
                        const end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2) {
                            message.cardsPlayed.push(longToNumber(reader.uint64()));
                        }
                    }
                    else {
                        message.cardsPlayed.push(longToNumber(reader.uint64()));
                    }
                    break;
                case 7:
                    message.ignore = exports.IgnoreMatches.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseQueryQMatchesRequest };
        message.containsUsers = [];
        message.cardsPlayed = [];
        if (object.timestampDown !== undefined && object.timestampDown !== null) {
            message.timestampDown = Number(object.timestampDown);
        }
        else {
            message.timestampDown = 0;
        }
        if (object.timestampUp !== undefined && object.timestampUp !== null) {
            message.timestampUp = Number(object.timestampUp);
        }
        else {
            message.timestampUp = 0;
        }
        if (object.containsUsers !== undefined && object.containsUsers !== null) {
            for (const e of object.containsUsers) {
                message.containsUsers.push(String(e));
            }
        }
        if (object.reporter !== undefined && object.reporter !== null) {
            message.reporter = String(object.reporter);
        }
        else {
            message.reporter = "";
        }
        if (object.outcome !== undefined && object.outcome !== null) {
            message.outcome = (0, tx_1.outcomeFromJSON)(object.outcome);
        }
        else {
            message.outcome = 0;
        }
        if (object.cardsPlayed !== undefined && object.cardsPlayed !== null) {
            for (const e of object.cardsPlayed) {
                message.cardsPlayed.push(Number(e));
            }
        }
        if (object.ignore !== undefined && object.ignore !== null) {
            message.ignore = exports.IgnoreMatches.fromJSON(object.ignore);
        }
        else {
            message.ignore = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.timestampDown !== undefined &&
            (obj.timestampDown = message.timestampDown);
        message.timestampUp !== undefined &&
            (obj.timestampUp = message.timestampUp);
        if (message.containsUsers) {
            obj.containsUsers = message.containsUsers.map((e) => e);
        }
        else {
            obj.containsUsers = [];
        }
        message.reporter !== undefined && (obj.reporter = message.reporter);
        message.outcome !== undefined &&
            (obj.outcome = (0, tx_1.outcomeToJSON)(message.outcome));
        if (message.cardsPlayed) {
            obj.cardsPlayed = message.cardsPlayed.map((e) => e);
        }
        else {
            obj.cardsPlayed = [];
        }
        message.ignore !== undefined &&
            (obj.ignore = message.ignore
                ? exports.IgnoreMatches.toJSON(message.ignore)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryQMatchesRequest };
        message.containsUsers = [];
        message.cardsPlayed = [];
        if (object.timestampDown !== undefined && object.timestampDown !== null) {
            message.timestampDown = object.timestampDown;
        }
        else {
            message.timestampDown = 0;
        }
        if (object.timestampUp !== undefined && object.timestampUp !== null) {
            message.timestampUp = object.timestampUp;
        }
        else {
            message.timestampUp = 0;
        }
        if (object.containsUsers !== undefined && object.containsUsers !== null) {
            for (const e of object.containsUsers) {
                message.containsUsers.push(e);
            }
        }
        if (object.reporter !== undefined && object.reporter !== null) {
            message.reporter = object.reporter;
        }
        else {
            message.reporter = "";
        }
        if (object.outcome !== undefined && object.outcome !== null) {
            message.outcome = object.outcome;
        }
        else {
            message.outcome = 0;
        }
        if (object.cardsPlayed !== undefined && object.cardsPlayed !== null) {
            for (const e of object.cardsPlayed) {
                message.cardsPlayed.push(e);
            }
        }
        if (object.ignore !== undefined && object.ignore !== null) {
            message.ignore = exports.IgnoreMatches.fromPartial(object.ignore);
        }
        else {
            message.ignore = undefined;
        }
        return message;
    },
};
const baseIgnoreMatches = { outcome: false };
exports.IgnoreMatches = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.outcome === true) {
            writer.uint32(8).bool(message.outcome);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseIgnoreMatches };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.outcome = reader.bool();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseIgnoreMatches };
        if (object.outcome !== undefined && object.outcome !== null) {
            message.outcome = Boolean(object.outcome);
        }
        else {
            message.outcome = false;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.outcome !== undefined && (obj.outcome = message.outcome);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseIgnoreMatches };
        if (object.outcome !== undefined && object.outcome !== null) {
            message.outcome = object.outcome;
        }
        else {
            message.outcome = false;
        }
        return message;
    },
};
const baseQueryQMatchesResponse = { matchesList: 0 };
exports.QueryQMatchesResponse = {
    encode(message, writer = minimal_1.Writer.create()) {
        writer.uint32(10).fork();
        for (const v of message.matchesList) {
            writer.uint64(v);
        }
        writer.ldelim();
        for (const v of message.matches) {
            match_1.Match.encode(v, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryQMatchesResponse };
        message.matchesList = [];
        message.matches = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if ((tag & 7) === 2) {
                        const end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2) {
                            message.matchesList.push(longToNumber(reader.uint64()));
                        }
                    }
                    else {
                        message.matchesList.push(longToNumber(reader.uint64()));
                    }
                    break;
                case 2:
                    message.matches.push(match_1.Match.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseQueryQMatchesResponse };
        message.matchesList = [];
        message.matches = [];
        if (object.matchesList !== undefined && object.matchesList !== null) {
            for (const e of object.matchesList) {
                message.matchesList.push(Number(e));
            }
        }
        if (object.matches !== undefined && object.matches !== null) {
            for (const e of object.matches) {
                message.matches.push(match_1.Match.fromJSON(e));
            }
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        if (message.matchesList) {
            obj.matchesList = message.matchesList.map((e) => e);
        }
        else {
            obj.matchesList = [];
        }
        if (message.matches) {
            obj.matches = message.matches.map((e) => e ? match_1.Match.toJSON(e) : undefined);
        }
        else {
            obj.matches = [];
        }
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryQMatchesResponse };
        message.matchesList = [];
        message.matches = [];
        if (object.matchesList !== undefined && object.matchesList !== null) {
            for (const e of object.matchesList) {
                message.matchesList.push(e);
            }
        }
        if (object.matches !== undefined && object.matches !== null) {
            for (const e of object.matches) {
                message.matches.push(match_1.Match.fromPartial(e));
            }
        }
        return message;
    },
};
const baseQueryQSellOffersRequest = {
    priceDown: "",
    priceUp: "",
    seller: "",
    buyer: "",
    card: 0,
    status: 0,
};
exports.QueryQSellOffersRequest = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.priceDown !== "") {
            writer.uint32(10).string(message.priceDown);
        }
        if (message.priceUp !== "") {
            writer.uint32(18).string(message.priceUp);
        }
        if (message.seller !== "") {
            writer.uint32(26).string(message.seller);
        }
        if (message.buyer !== "") {
            writer.uint32(34).string(message.buyer);
        }
        if (message.card !== 0) {
            writer.uint32(40).uint64(message.card);
        }
        if (message.status !== 0) {
            writer.uint32(48).int32(message.status);
        }
        if (message.ignore !== undefined) {
            exports.IgnoreSellOffers.encode(message.ignore, writer.uint32(58).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseQueryQSellOffersRequest,
        };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.priceDown = reader.string();
                    break;
                case 2:
                    message.priceUp = reader.string();
                    break;
                case 3:
                    message.seller = reader.string();
                    break;
                case 4:
                    message.buyer = reader.string();
                    break;
                case 5:
                    message.card = longToNumber(reader.uint64());
                    break;
                case 6:
                    message.status = reader.int32();
                    break;
                case 7:
                    message.ignore = exports.IgnoreSellOffers.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = {
            ...baseQueryQSellOffersRequest,
        };
        if (object.priceDown !== undefined && object.priceDown !== null) {
            message.priceDown = String(object.priceDown);
        }
        else {
            message.priceDown = "";
        }
        if (object.priceUp !== undefined && object.priceUp !== null) {
            message.priceUp = String(object.priceUp);
        }
        else {
            message.priceUp = "";
        }
        if (object.seller !== undefined && object.seller !== null) {
            message.seller = String(object.seller);
        }
        else {
            message.seller = "";
        }
        if (object.buyer !== undefined && object.buyer !== null) {
            message.buyer = String(object.buyer);
        }
        else {
            message.buyer = "";
        }
        if (object.card !== undefined && object.card !== null) {
            message.card = Number(object.card);
        }
        else {
            message.card = 0;
        }
        if (object.status !== undefined && object.status !== null) {
            message.status = (0, sell_offer_1.sellOfferStatusFromJSON)(object.status);
        }
        else {
            message.status = 0;
        }
        if (object.ignore !== undefined && object.ignore !== null) {
            message.ignore = exports.IgnoreSellOffers.fromJSON(object.ignore);
        }
        else {
            message.ignore = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.priceDown !== undefined && (obj.priceDown = message.priceDown);
        message.priceUp !== undefined && (obj.priceUp = message.priceUp);
        message.seller !== undefined && (obj.seller = message.seller);
        message.buyer !== undefined && (obj.buyer = message.buyer);
        message.card !== undefined && (obj.card = message.card);
        message.status !== undefined &&
            (obj.status = (0, sell_offer_1.sellOfferStatusToJSON)(message.status));
        message.ignore !== undefined &&
            (obj.ignore = message.ignore
                ? exports.IgnoreSellOffers.toJSON(message.ignore)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseQueryQSellOffersRequest,
        };
        if (object.priceDown !== undefined && object.priceDown !== null) {
            message.priceDown = object.priceDown;
        }
        else {
            message.priceDown = "";
        }
        if (object.priceUp !== undefined && object.priceUp !== null) {
            message.priceUp = object.priceUp;
        }
        else {
            message.priceUp = "";
        }
        if (object.seller !== undefined && object.seller !== null) {
            message.seller = object.seller;
        }
        else {
            message.seller = "";
        }
        if (object.buyer !== undefined && object.buyer !== null) {
            message.buyer = object.buyer;
        }
        else {
            message.buyer = "";
        }
        if (object.card !== undefined && object.card !== null) {
            message.card = object.card;
        }
        else {
            message.card = 0;
        }
        if (object.status !== undefined && object.status !== null) {
            message.status = object.status;
        }
        else {
            message.status = 0;
        }
        if (object.ignore !== undefined && object.ignore !== null) {
            message.ignore = exports.IgnoreSellOffers.fromPartial(object.ignore);
        }
        else {
            message.ignore = undefined;
        }
        return message;
    },
};
const baseIgnoreSellOffers = { status: false, card: false };
exports.IgnoreSellOffers = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.status === true) {
            writer.uint32(8).bool(message.status);
        }
        if (message.card === true) {
            writer.uint32(16).bool(message.card);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseIgnoreSellOffers };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.status = reader.bool();
                    break;
                case 2:
                    message.card = reader.bool();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseIgnoreSellOffers };
        if (object.status !== undefined && object.status !== null) {
            message.status = Boolean(object.status);
        }
        else {
            message.status = false;
        }
        if (object.card !== undefined && object.card !== null) {
            message.card = Boolean(object.card);
        }
        else {
            message.card = false;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.status !== undefined && (obj.status = message.status);
        message.card !== undefined && (obj.card = message.card);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseIgnoreSellOffers };
        if (object.status !== undefined && object.status !== null) {
            message.status = object.status;
        }
        else {
            message.status = false;
        }
        if (object.card !== undefined && object.card !== null) {
            message.card = object.card;
        }
        else {
            message.card = false;
        }
        return message;
    },
};
const baseQueryQSellOffersResponse = { sellOffersIds: 0 };
exports.QueryQSellOffersResponse = {
    encode(message, writer = minimal_1.Writer.create()) {
        writer.uint32(10).fork();
        for (const v of message.sellOffersIds) {
            writer.uint64(v);
        }
        writer.ldelim();
        for (const v of message.sellOffers) {
            sell_offer_1.SellOffer.encode(v, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseQueryQSellOffersResponse,
        };
        message.sellOffersIds = [];
        message.sellOffers = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if ((tag & 7) === 2) {
                        const end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2) {
                            message.sellOffersIds.push(longToNumber(reader.uint64()));
                        }
                    }
                    else {
                        message.sellOffersIds.push(longToNumber(reader.uint64()));
                    }
                    break;
                case 2:
                    message.sellOffers.push(sell_offer_1.SellOffer.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = {
            ...baseQueryQSellOffersResponse,
        };
        message.sellOffersIds = [];
        message.sellOffers = [];
        if (object.sellOffersIds !== undefined && object.sellOffersIds !== null) {
            for (const e of object.sellOffersIds) {
                message.sellOffersIds.push(Number(e));
            }
        }
        if (object.sellOffers !== undefined && object.sellOffers !== null) {
            for (const e of object.sellOffers) {
                message.sellOffers.push(sell_offer_1.SellOffer.fromJSON(e));
            }
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        if (message.sellOffersIds) {
            obj.sellOffersIds = message.sellOffersIds.map((e) => e);
        }
        else {
            obj.sellOffersIds = [];
        }
        if (message.sellOffers) {
            obj.sellOffers = message.sellOffers.map((e) => e ? sell_offer_1.SellOffer.toJSON(e) : undefined);
        }
        else {
            obj.sellOffers = [];
        }
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseQueryQSellOffersResponse,
        };
        message.sellOffersIds = [];
        message.sellOffers = [];
        if (object.sellOffersIds !== undefined && object.sellOffersIds !== null) {
            for (const e of object.sellOffersIds) {
                message.sellOffersIds.push(e);
            }
        }
        if (object.sellOffers !== undefined && object.sellOffers !== null) {
            for (const e of object.sellOffers) {
                message.sellOffers.push(sell_offer_1.SellOffer.fromPartial(e));
            }
        }
        return message;
    },
};
const baseQueryQServerRequest = { id: 0 };
exports.QueryQServerRequest = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.id !== 0) {
            writer.uint32(8).uint64(message.id);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryQServerRequest };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = longToNumber(reader.uint64());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseQueryQServerRequest };
        if (object.id !== undefined && object.id !== null) {
            message.id = Number(object.id);
        }
        else {
            message.id = 0;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.id !== undefined && (obj.id = message.id);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryQServerRequest };
        if (object.id !== undefined && object.id !== null) {
            message.id = object.id;
        }
        else {
            message.id = 0;
        }
        return message;
    },
};
const baseQueryQServerResponse = {};
exports.QueryQServerResponse = {
    encode(_, writer = minimal_1.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryQServerResponse };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(_) {
        const message = { ...baseQueryQServerResponse };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = { ...baseQueryQServerResponse };
        return message;
    },
};
class QueryClientImpl {
    constructor(rpc) {
        this.rpc = rpc;
    }
    Params(request) {
        const data = exports.QueryParamsRequest.encode(request).finish();
        const promise = this.rpc.request("DecentralCardGame.cardchain.cardchain.Query", "Params", data);
        return promise.then((data) => exports.QueryParamsResponse.decode(new minimal_1.Reader(data)));
    }
    QCard(request) {
        const data = exports.QueryQCardRequest.encode(request).finish();
        const promise = this.rpc.request("DecentralCardGame.cardchain.cardchain.Query", "QCard", data);
        return promise.then((data) => card_1.OutpCard.decode(new minimal_1.Reader(data)));
    }
    QCardContent(request) {
        const data = exports.QueryQCardContentRequest.encode(request).finish();
        const promise = this.rpc.request("DecentralCardGame.cardchain.cardchain.Query", "QCardContent", data);
        return promise.then((data) => exports.QueryQCardContentResponse.decode(new minimal_1.Reader(data)));
    }
    QUser(request) {
        const data = exports.QueryQUserRequest.encode(request).finish();
        const promise = this.rpc.request("DecentralCardGame.cardchain.cardchain.Query", "QUser", data);
        return promise.then((data) => user_1.User.decode(new minimal_1.Reader(data)));
    }
    QCardchainInfo(request) {
        const data = exports.QueryQCardchainInfoRequest.encode(request).finish();
        const promise = this.rpc.request("DecentralCardGame.cardchain.cardchain.Query", "QCardchainInfo", data);
        return promise.then((data) => exports.QueryQCardchainInfoResponse.decode(new minimal_1.Reader(data)));
    }
    QVotingResults(request) {
        const data = exports.QueryQVotingResultsRequest.encode(request).finish();
        const promise = this.rpc.request("DecentralCardGame.cardchain.cardchain.Query", "QVotingResults", data);
        return promise.then((data) => exports.QueryQVotingResultsResponse.decode(new minimal_1.Reader(data)));
    }
    QVotableCards(request) {
        const data = exports.QueryQVotableCardsRequest.encode(request).finish();
        const promise = this.rpc.request("DecentralCardGame.cardchain.cardchain.Query", "QVotableCards", data);
        return promise.then((data) => exports.QueryQVotableCardsResponse.decode(new minimal_1.Reader(data)));
    }
    QCards(request) {
        const data = exports.QueryQCardsRequest.encode(request).finish();
        const promise = this.rpc.request("DecentralCardGame.cardchain.cardchain.Query", "QCards", data);
        return promise.then((data) => exports.QueryQCardsResponse.decode(new minimal_1.Reader(data)));
    }
    QMatch(request) {
        const data = exports.QueryQMatchRequest.encode(request).finish();
        const promise = this.rpc.request("DecentralCardGame.cardchain.cardchain.Query", "QMatch", data);
        return promise.then((data) => match_1.Match.decode(new minimal_1.Reader(data)));
    }
    QCollection(request) {
        const data = exports.QueryQCollectionRequest.encode(request).finish();
        const promise = this.rpc.request("DecentralCardGame.cardchain.cardchain.Query", "QCollection", data);
        return promise.then((data) => collection_1.Collection.decode(new minimal_1.Reader(data)));
    }
    QSellOffer(request) {
        const data = exports.QueryQSellOfferRequest.encode(request).finish();
        const promise = this.rpc.request("DecentralCardGame.cardchain.cardchain.Query", "QSellOffer", data);
        return promise.then((data) => sell_offer_1.SellOffer.decode(new minimal_1.Reader(data)));
    }
    QCouncil(request) {
        const data = exports.QueryQCouncilRequest.encode(request).finish();
        const promise = this.rpc.request("DecentralCardGame.cardchain.cardchain.Query", "QCouncil", data);
        return promise.then((data) => council_1.Council.decode(new minimal_1.Reader(data)));
    }
    QMatches(request) {
        const data = exports.QueryQMatchesRequest.encode(request).finish();
        const promise = this.rpc.request("DecentralCardGame.cardchain.cardchain.Query", "QMatches", data);
        return promise.then((data) => exports.QueryQMatchesResponse.decode(new minimal_1.Reader(data)));
    }
    QSellOffers(request) {
        const data = exports.QueryQSellOffersRequest.encode(request).finish();
        const promise = this.rpc.request("DecentralCardGame.cardchain.cardchain.Query", "QSellOffers", data);
        return promise.then((data) => exports.QueryQSellOffersResponse.decode(new minimal_1.Reader(data)));
    }
    QServer(request) {
        const data = exports.QueryQServerRequest.encode(request).finish();
        const promise = this.rpc.request("DecentralCardGame.cardchain.cardchain.Query", "QServer", data);
        return promise.then((data) => server_1.Server.decode(new minimal_1.Reader(data)));
    }
}
exports.QueryClientImpl = QueryClientImpl;
var globalThis = (() => {
    if (typeof globalThis !== "undefined")
        return globalThis;
    if (typeof self !== "undefined")
        return self;
    if (typeof window !== "undefined")
        return window;
    if (typeof global !== "undefined")
        return global;
    throw "Unable to locate global object";
})();
function longToNumber(long) {
    if (long.gt(Number.MAX_SAFE_INTEGER)) {
        throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
    }
    return long.toNumber();
}
if (minimal_1.util.Long !== Long) {
    minimal_1.util.Long = Long;
    (0, minimal_1.configure)();
}
