/* eslint-disable */
import { OutpCard, statusFromJSON, statusToJSON, } from "../cardchain/card";
import { outcomeFromJSON, outcomeToJSON } from "../cardchain/tx";
import { SellOffer, sellOfferStatusFromJSON, sellOfferStatusToJSON, } from "../cardchain/sell_offer";
import { Reader, util, configure, Writer } from "protobufjs/minimal";
import * as Long from "long";
import { Params } from "../cardchain/params";
import { VotingResults } from "../cardchain/voting_results";
import { VoteRight } from "../cardchain/vote_right";
import { Match } from "../cardchain/match";
import { User } from "../cardchain/user";
import { Collection } from "../cardchain/collection";
import { Council } from "../cardchain/council";
export const protobufPackage = "DecentralCardGame.cardchain.cardchain";
const baseQueryParamsRequest = {};
export const QueryParamsRequest = {
    encode(_, writer = Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
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
export const QueryParamsResponse = {
    encode(message, writer = Writer.create()) {
        if (message.params !== undefined) {
            Params.encode(message.params, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryParamsResponse };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.params = Params.decode(reader, reader.uint32());
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
            message.params = Params.fromJSON(object.params);
        }
        else {
            message.params = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.params !== undefined &&
            (obj.params = message.params ? Params.toJSON(message.params) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryParamsResponse };
        if (object.params !== undefined && object.params !== null) {
            message.params = Params.fromPartial(object.params);
        }
        else {
            message.params = undefined;
        }
        return message;
    },
};
const baseQueryQCardRequest = { cardId: "" };
export const QueryQCardRequest = {
    encode(message, writer = Writer.create()) {
        if (message.cardId !== "") {
            writer.uint32(10).string(message.cardId);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
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
export const QueryQCardContentRequest = {
    encode(message, writer = Writer.create()) {
        if (message.cardId !== "") {
            writer.uint32(10).string(message.cardId);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
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
export const QueryQCardContentResponse = {
    encode(message, writer = Writer.create()) {
        if (message.content !== "") {
            writer.uint32(10).string(message.content);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
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
export const QueryQUserRequest = {
    encode(message, writer = Writer.create()) {
        if (message.address !== "") {
            writer.uint32(10).string(message.address);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
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
export const QueryQCardchainInfoRequest = {
    encode(_, writer = Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
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
export const QueryQCardchainInfoResponse = {
    encode(message, writer = Writer.create()) {
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
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
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
export const QueryQVotingResultsRequest = {
    encode(_, writer = Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
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
export const QueryQVotingResultsResponse = {
    encode(message, writer = Writer.create()) {
        if (message.lastVotingResults !== undefined) {
            VotingResults.encode(message.lastVotingResults, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseQueryQVotingResultsResponse,
        };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.lastVotingResults = VotingResults.decode(reader, reader.uint32());
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
            message.lastVotingResults = VotingResults.fromJSON(object.lastVotingResults);
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
                ? VotingResults.toJSON(message.lastVotingResults)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseQueryQVotingResultsResponse,
        };
        if (object.lastVotingResults !== undefined &&
            object.lastVotingResults !== null) {
            message.lastVotingResults = VotingResults.fromPartial(object.lastVotingResults);
        }
        else {
            message.lastVotingResults = undefined;
        }
        return message;
    },
};
const baseQueryQVotableCardsRequest = { address: "" };
export const QueryQVotableCardsRequest = {
    encode(message, writer = Writer.create()) {
        if (message.address !== "") {
            writer.uint32(10).string(message.address);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
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
export const QueryQVotableCardsResponse = {
    encode(message, writer = Writer.create()) {
        if (message.unregistered === true) {
            writer.uint32(8).bool(message.unregistered);
        }
        if (message.noVoteRights === true) {
            writer.uint32(16).bool(message.noVoteRights);
        }
        for (const v of message.voteRights) {
            VoteRight.encode(v, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
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
                    message.voteRights.push(VoteRight.decode(reader, reader.uint32()));
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
                message.voteRights.push(VoteRight.fromJSON(e));
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
            obj.voteRights = message.voteRights.map((e) => e ? VoteRight.toJSON(e) : undefined);
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
                message.voteRights.push(VoteRight.fromPartial(e));
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
export const QueryQCardsRequest = {
    encode(message, writer = Writer.create()) {
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
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
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
            message.status = statusFromJSON(object.status);
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
        message.status !== undefined && (obj.status = statusToJSON(message.status));
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
export const QueryQCardsResponse = {
    encode(message, writer = Writer.create()) {
        writer.uint32(10).fork();
        for (const v of message.cardsList) {
            writer.uint64(v);
        }
        writer.ldelim();
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
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
export const QueryQMatchRequest = {
    encode(message, writer = Writer.create()) {
        if (message.matchId !== 0) {
            writer.uint32(8).uint64(message.matchId);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
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
export const QueryQCollectionRequest = {
    encode(message, writer = Writer.create()) {
        if (message.collectionId !== 0) {
            writer.uint32(8).uint64(message.collectionId);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
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
export const QueryQSellOfferRequest = {
    encode(message, writer = Writer.create()) {
        if (message.sellOfferId !== 0) {
            writer.uint32(8).uint64(message.sellOfferId);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
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
export const QueryQCouncilRequest = {
    encode(message, writer = Writer.create()) {
        if (message.councilId !== 0) {
            writer.uint32(8).uint64(message.councilId);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
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
export const QueryQMatchesRequest = {
    encode(message, writer = Writer.create()) {
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
            IgnoreMatches.encode(message.ignore, writer.uint32(58).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
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
                    message.ignore = IgnoreMatches.decode(reader, reader.uint32());
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
            message.outcome = outcomeFromJSON(object.outcome);
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
            message.ignore = IgnoreMatches.fromJSON(object.ignore);
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
            (obj.outcome = outcomeToJSON(message.outcome));
        if (message.cardsPlayed) {
            obj.cardsPlayed = message.cardsPlayed.map((e) => e);
        }
        else {
            obj.cardsPlayed = [];
        }
        message.ignore !== undefined &&
            (obj.ignore = message.ignore
                ? IgnoreMatches.toJSON(message.ignore)
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
            message.ignore = IgnoreMatches.fromPartial(object.ignore);
        }
        else {
            message.ignore = undefined;
        }
        return message;
    },
};
const baseIgnoreMatches = {
    outcome: false,
    timestamp: false,
    reporter: false,
};
export const IgnoreMatches = {
    encode(message, writer = Writer.create()) {
        if (message.outcome === true) {
            writer.uint32(8).bool(message.outcome);
        }
        if (message.timestamp === true) {
            writer.uint32(16).bool(message.timestamp);
        }
        if (message.reporter === true) {
            writer.uint32(24).bool(message.reporter);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseIgnoreMatches };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.outcome = reader.bool();
                    break;
                case 2:
                    message.timestamp = reader.bool();
                    break;
                case 3:
                    message.reporter = reader.bool();
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
        if (object.timestamp !== undefined && object.timestamp !== null) {
            message.timestamp = Boolean(object.timestamp);
        }
        else {
            message.timestamp = false;
        }
        if (object.reporter !== undefined && object.reporter !== null) {
            message.reporter = Boolean(object.reporter);
        }
        else {
            message.reporter = false;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.outcome !== undefined && (obj.outcome = message.outcome);
        message.timestamp !== undefined && (obj.timestamp = message.timestamp);
        message.reporter !== undefined && (obj.reporter = message.reporter);
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
        if (object.timestamp !== undefined && object.timestamp !== null) {
            message.timestamp = object.timestamp;
        }
        else {
            message.timestamp = false;
        }
        if (object.reporter !== undefined && object.reporter !== null) {
            message.reporter = object.reporter;
        }
        else {
            message.reporter = false;
        }
        return message;
    },
};
const baseQueryQMatchesResponse = { matchesList: 0 };
export const QueryQMatchesResponse = {
    encode(message, writer = Writer.create()) {
        writer.uint32(10).fork();
        for (const v of message.matchesList) {
            writer.uint64(v);
        }
        writer.ldelim();
        for (const v of message.matches) {
            Match.encode(v, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
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
                    message.matches.push(Match.decode(reader, reader.uint32()));
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
                message.matches.push(Match.fromJSON(e));
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
            obj.matches = message.matches.map((e) => e ? Match.toJSON(e) : undefined);
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
                message.matches.push(Match.fromPartial(e));
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
export const QueryQSellOffersRequest = {
    encode(message, writer = Writer.create()) {
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
            IgnoreSellOffers.encode(message.ignore, writer.uint32(58).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
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
                    message.ignore = IgnoreSellOffers.decode(reader, reader.uint32());
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
            message.status = sellOfferStatusFromJSON(object.status);
        }
        else {
            message.status = 0;
        }
        if (object.ignore !== undefined && object.ignore !== null) {
            message.ignore = IgnoreSellOffers.fromJSON(object.ignore);
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
            (obj.status = sellOfferStatusToJSON(message.status));
        message.ignore !== undefined &&
            (obj.ignore = message.ignore
                ? IgnoreSellOffers.toJSON(message.ignore)
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
            message.ignore = IgnoreSellOffers.fromPartial(object.ignore);
        }
        else {
            message.ignore = undefined;
        }
        return message;
    },
};
const baseIgnoreSellOffers = {
    status: false,
    price: false,
    seller: false,
    buyer: false,
    card: false,
};
export const IgnoreSellOffers = {
    encode(message, writer = Writer.create()) {
        if (message.status === true) {
            writer.uint32(8).bool(message.status);
        }
        if (message.price === true) {
            writer.uint32(16).bool(message.price);
        }
        if (message.seller === true) {
            writer.uint32(24).bool(message.seller);
        }
        if (message.buyer === true) {
            writer.uint32(32).bool(message.buyer);
        }
        if (message.card === true) {
            writer.uint32(40).bool(message.card);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseIgnoreSellOffers };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.status = reader.bool();
                    break;
                case 2:
                    message.price = reader.bool();
                    break;
                case 3:
                    message.seller = reader.bool();
                    break;
                case 4:
                    message.buyer = reader.bool();
                    break;
                case 5:
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
        if (object.price !== undefined && object.price !== null) {
            message.price = Boolean(object.price);
        }
        else {
            message.price = false;
        }
        if (object.seller !== undefined && object.seller !== null) {
            message.seller = Boolean(object.seller);
        }
        else {
            message.seller = false;
        }
        if (object.buyer !== undefined && object.buyer !== null) {
            message.buyer = Boolean(object.buyer);
        }
        else {
            message.buyer = false;
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
        message.price !== undefined && (obj.price = message.price);
        message.seller !== undefined && (obj.seller = message.seller);
        message.buyer !== undefined && (obj.buyer = message.buyer);
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
        if (object.price !== undefined && object.price !== null) {
            message.price = object.price;
        }
        else {
            message.price = false;
        }
        if (object.seller !== undefined && object.seller !== null) {
            message.seller = object.seller;
        }
        else {
            message.seller = false;
        }
        if (object.buyer !== undefined && object.buyer !== null) {
            message.buyer = object.buyer;
        }
        else {
            message.buyer = false;
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
export const QueryQSellOffersResponse = {
    encode(message, writer = Writer.create()) {
        writer.uint32(10).fork();
        for (const v of message.sellOffersIds) {
            writer.uint64(v);
        }
        writer.ldelim();
        for (const v of message.sellOffers) {
            SellOffer.encode(v, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
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
                    message.sellOffers.push(SellOffer.decode(reader, reader.uint32()));
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
                message.sellOffers.push(SellOffer.fromJSON(e));
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
            obj.sellOffers = message.sellOffers.map((e) => e ? SellOffer.toJSON(e) : undefined);
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
                message.sellOffers.push(SellOffer.fromPartial(e));
            }
        }
        return message;
    },
};
export class QueryClientImpl {
    constructor(rpc) {
        this.rpc = rpc;
    }
    Params(request) {
        const data = QueryParamsRequest.encode(request).finish();
        const promise = this.rpc.request("DecentralCardGame.cardchain.cardchain.Query", "Params", data);
        return promise.then((data) => QueryParamsResponse.decode(new Reader(data)));
    }
    QCard(request) {
        const data = QueryQCardRequest.encode(request).finish();
        const promise = this.rpc.request("DecentralCardGame.cardchain.cardchain.Query", "QCard", data);
        return promise.then((data) => OutpCard.decode(new Reader(data)));
    }
    QCardContent(request) {
        const data = QueryQCardContentRequest.encode(request).finish();
        const promise = this.rpc.request("DecentralCardGame.cardchain.cardchain.Query", "QCardContent", data);
        return promise.then((data) => QueryQCardContentResponse.decode(new Reader(data)));
    }
    QUser(request) {
        const data = QueryQUserRequest.encode(request).finish();
        const promise = this.rpc.request("DecentralCardGame.cardchain.cardchain.Query", "QUser", data);
        return promise.then((data) => User.decode(new Reader(data)));
    }
    QCardchainInfo(request) {
        const data = QueryQCardchainInfoRequest.encode(request).finish();
        const promise = this.rpc.request("DecentralCardGame.cardchain.cardchain.Query", "QCardchainInfo", data);
        return promise.then((data) => QueryQCardchainInfoResponse.decode(new Reader(data)));
    }
    QVotingResults(request) {
        const data = QueryQVotingResultsRequest.encode(request).finish();
        const promise = this.rpc.request("DecentralCardGame.cardchain.cardchain.Query", "QVotingResults", data);
        return promise.then((data) => QueryQVotingResultsResponse.decode(new Reader(data)));
    }
    QVotableCards(request) {
        const data = QueryQVotableCardsRequest.encode(request).finish();
        const promise = this.rpc.request("DecentralCardGame.cardchain.cardchain.Query", "QVotableCards", data);
        return promise.then((data) => QueryQVotableCardsResponse.decode(new Reader(data)));
    }
    QCards(request) {
        const data = QueryQCardsRequest.encode(request).finish();
        const promise = this.rpc.request("DecentralCardGame.cardchain.cardchain.Query", "QCards", data);
        return promise.then((data) => QueryQCardsResponse.decode(new Reader(data)));
    }
    QMatch(request) {
        const data = QueryQMatchRequest.encode(request).finish();
        const promise = this.rpc.request("DecentralCardGame.cardchain.cardchain.Query", "QMatch", data);
        return promise.then((data) => Match.decode(new Reader(data)));
    }
    QCollection(request) {
        const data = QueryQCollectionRequest.encode(request).finish();
        const promise = this.rpc.request("DecentralCardGame.cardchain.cardchain.Query", "QCollection", data);
        return promise.then((data) => Collection.decode(new Reader(data)));
    }
    QSellOffer(request) {
        const data = QueryQSellOfferRequest.encode(request).finish();
        const promise = this.rpc.request("DecentralCardGame.cardchain.cardchain.Query", "QSellOffer", data);
        return promise.then((data) => SellOffer.decode(new Reader(data)));
    }
    QCouncil(request) {
        const data = QueryQCouncilRequest.encode(request).finish();
        const promise = this.rpc.request("DecentralCardGame.cardchain.cardchain.Query", "QCouncil", data);
        return promise.then((data) => Council.decode(new Reader(data)));
    }
    QMatches(request) {
        const data = QueryQMatchesRequest.encode(request).finish();
        const promise = this.rpc.request("DecentralCardGame.cardchain.cardchain.Query", "QMatches", data);
        return promise.then((data) => QueryQMatchesResponse.decode(new Reader(data)));
    }
    QSellOffers(request) {
        const data = QueryQSellOffersRequest.encode(request).finish();
        const promise = this.rpc.request("DecentralCardGame.cardchain.cardchain.Query", "QSellOffers", data);
        return promise.then((data) => QueryQSellOffersResponse.decode(new Reader(data)));
    }
}
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
if (util.Long !== Long) {
    util.Long = Long;
    configure();
}
