/* eslint-disable */
import { Outcome, outcomeFromJSON, outcomeToJSON } from "../cardchain/tx";
import {
  SellOfferStatus,
  SellOffer,
  sellOfferStatusFromJSON,
  sellOfferStatusToJSON,
} from "../cardchain/sell_offer";
import { Reader, util, configure, Writer } from "protobufjs/minimal";
import * as Long from "long";
import { Params } from "../cardchain/params";
import { VotingResults } from "../cardchain/voting_results";
import { VoteRight } from "../cardchain/vote_right";
import { Match } from "../cardchain/match";
import { OutpCard } from "../cardchain/card";
import { User } from "../cardchain/user";
import { Collection } from "../cardchain/collection";
import { Council } from "../cardchain/council";
import { Server } from "../cardchain/server";

export const protobufPackage = "DecentralCardGame.cardchain.cardchain";

/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequest {}

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

export interface QueryQCardchainInfoRequest {}

export interface QueryQCardchainInfoResponse {
  cardAuctionPrice: string;
  activeCollections: number[];
  cardsNumber: number;
  matchesNumber: number;
  sellOffersNumber: number;
  councilsNumber: number;
}

export interface QueryQVotingResultsRequest {}

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
  status: QueryQCardsRequest_Status;
  cardType: string;
  classes: string;
  sortBy: string;
  nameContains: string;
  keywordsContains: string;
  notesContains: string;
}

export enum QueryQCardsRequest_Status {
  scheme = 0,
  prototype = 1,
  trial = 2,
  permanent = 3,
  suspended = 4,
  banned = 5,
  bannedSoon = 6,
  bannedVerySoon = 7,
  none = 8,
  playable = 9,
  unplayable = 10,
  UNRECOGNIZED = -1,
}

export function queryQCardsRequest_StatusFromJSON(
  object: any
): QueryQCardsRequest_Status {
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

export function queryQCardsRequest_StatusToJSON(
  object: QueryQCardsRequest_Status
): string {
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
  card: boolean;
}

export interface QueryQSellOffersResponse {
  sellOffersIds: number[];
  sellOffers: SellOffer[];
}

export interface QueryQServerRequest {
  id: number;
}

export interface QueryQServerResponse {}

const baseQueryParamsRequest: object = {};

export const QueryParamsRequest = {
  encode(_: QueryParamsRequest, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryParamsRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryParamsRequest } as QueryParamsRequest;
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

  fromJSON(_: any): QueryParamsRequest {
    const message = { ...baseQueryParamsRequest } as QueryParamsRequest;
    return message;
  },

  toJSON(_: QueryParamsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<QueryParamsRequest>): QueryParamsRequest {
    const message = { ...baseQueryParamsRequest } as QueryParamsRequest;
    return message;
  },
};

const baseQueryParamsResponse: object = {};

export const QueryParamsResponse = {
  encode(
    message: QueryParamsResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryParamsResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryParamsResponse } as QueryParamsResponse;
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

  fromJSON(object: any): QueryParamsResponse {
    const message = { ...baseQueryParamsResponse } as QueryParamsResponse;
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromJSON(object.params);
    } else {
      message.params = undefined;
    }
    return message;
  },

  toJSON(message: QueryParamsResponse): unknown {
    const obj: any = {};
    message.params !== undefined &&
      (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryParamsResponse>): QueryParamsResponse {
    const message = { ...baseQueryParamsResponse } as QueryParamsResponse;
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromPartial(object.params);
    } else {
      message.params = undefined;
    }
    return message;
  },
};

const baseQueryQCardRequest: object = { cardId: "" };

export const QueryQCardRequest = {
  encode(message: QueryQCardRequest, writer: Writer = Writer.create()): Writer {
    if (message.cardId !== "") {
      writer.uint32(10).string(message.cardId);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryQCardRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryQCardRequest } as QueryQCardRequest;
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

  fromJSON(object: any): QueryQCardRequest {
    const message = { ...baseQueryQCardRequest } as QueryQCardRequest;
    if (object.cardId !== undefined && object.cardId !== null) {
      message.cardId = String(object.cardId);
    } else {
      message.cardId = "";
    }
    return message;
  },

  toJSON(message: QueryQCardRequest): unknown {
    const obj: any = {};
    message.cardId !== undefined && (obj.cardId = message.cardId);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryQCardRequest>): QueryQCardRequest {
    const message = { ...baseQueryQCardRequest } as QueryQCardRequest;
    if (object.cardId !== undefined && object.cardId !== null) {
      message.cardId = object.cardId;
    } else {
      message.cardId = "";
    }
    return message;
  },
};

const baseQueryQCardContentRequest: object = { cardId: "" };

export const QueryQCardContentRequest = {
  encode(
    message: QueryQCardContentRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.cardId !== "") {
      writer.uint32(10).string(message.cardId);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryQCardContentRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryQCardContentRequest,
    } as QueryQCardContentRequest;
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

  fromJSON(object: any): QueryQCardContentRequest {
    const message = {
      ...baseQueryQCardContentRequest,
    } as QueryQCardContentRequest;
    if (object.cardId !== undefined && object.cardId !== null) {
      message.cardId = String(object.cardId);
    } else {
      message.cardId = "";
    }
    return message;
  },

  toJSON(message: QueryQCardContentRequest): unknown {
    const obj: any = {};
    message.cardId !== undefined && (obj.cardId = message.cardId);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryQCardContentRequest>
  ): QueryQCardContentRequest {
    const message = {
      ...baseQueryQCardContentRequest,
    } as QueryQCardContentRequest;
    if (object.cardId !== undefined && object.cardId !== null) {
      message.cardId = object.cardId;
    } else {
      message.cardId = "";
    }
    return message;
  },
};

const baseQueryQCardContentResponse: object = { content: "" };

export const QueryQCardContentResponse = {
  encode(
    message: QueryQCardContentResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.content !== "") {
      writer.uint32(10).string(message.content);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryQCardContentResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryQCardContentResponse,
    } as QueryQCardContentResponse;
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

  fromJSON(object: any): QueryQCardContentResponse {
    const message = {
      ...baseQueryQCardContentResponse,
    } as QueryQCardContentResponse;
    if (object.content !== undefined && object.content !== null) {
      message.content = String(object.content);
    } else {
      message.content = "";
    }
    return message;
  },

  toJSON(message: QueryQCardContentResponse): unknown {
    const obj: any = {};
    message.content !== undefined && (obj.content = message.content);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryQCardContentResponse>
  ): QueryQCardContentResponse {
    const message = {
      ...baseQueryQCardContentResponse,
    } as QueryQCardContentResponse;
    if (object.content !== undefined && object.content !== null) {
      message.content = object.content;
    } else {
      message.content = "";
    }
    return message;
  },
};

const baseQueryQUserRequest: object = { address: "" };

export const QueryQUserRequest = {
  encode(message: QueryQUserRequest, writer: Writer = Writer.create()): Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryQUserRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryQUserRequest } as QueryQUserRequest;
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

  fromJSON(object: any): QueryQUserRequest {
    const message = { ...baseQueryQUserRequest } as QueryQUserRequest;
    if (object.address !== undefined && object.address !== null) {
      message.address = String(object.address);
    } else {
      message.address = "";
    }
    return message;
  },

  toJSON(message: QueryQUserRequest): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryQUserRequest>): QueryQUserRequest {
    const message = { ...baseQueryQUserRequest } as QueryQUserRequest;
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    } else {
      message.address = "";
    }
    return message;
  },
};

const baseQueryQCardchainInfoRequest: object = {};

export const QueryQCardchainInfoRequest = {
  encode(
    _: QueryQCardchainInfoRequest,
    writer: Writer = Writer.create()
  ): Writer {
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryQCardchainInfoRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryQCardchainInfoRequest,
    } as QueryQCardchainInfoRequest;
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

  fromJSON(_: any): QueryQCardchainInfoRequest {
    const message = {
      ...baseQueryQCardchainInfoRequest,
    } as QueryQCardchainInfoRequest;
    return message;
  },

  toJSON(_: QueryQCardchainInfoRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<QueryQCardchainInfoRequest>
  ): QueryQCardchainInfoRequest {
    const message = {
      ...baseQueryQCardchainInfoRequest,
    } as QueryQCardchainInfoRequest;
    return message;
  },
};

const baseQueryQCardchainInfoResponse: object = {
  cardAuctionPrice: "",
  activeCollections: 0,
  cardsNumber: 0,
  matchesNumber: 0,
  sellOffersNumber: 0,
  councilsNumber: 0,
};

export const QueryQCardchainInfoResponse = {
  encode(
    message: QueryQCardchainInfoResponse,
    writer: Writer = Writer.create()
  ): Writer {
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

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryQCardchainInfoResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryQCardchainInfoResponse,
    } as QueryQCardchainInfoResponse;
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
              message.activeCollections.push(
                longToNumber(reader.uint64() as Long)
              );
            }
          } else {
            message.activeCollections.push(
              longToNumber(reader.uint64() as Long)
            );
          }
          break;
        case 3:
          message.cardsNumber = longToNumber(reader.uint64() as Long);
          break;
        case 4:
          message.matchesNumber = longToNumber(reader.uint64() as Long);
          break;
        case 5:
          message.sellOffersNumber = longToNumber(reader.uint64() as Long);
          break;
        case 6:
          message.councilsNumber = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryQCardchainInfoResponse {
    const message = {
      ...baseQueryQCardchainInfoResponse,
    } as QueryQCardchainInfoResponse;
    message.activeCollections = [];
    if (
      object.cardAuctionPrice !== undefined &&
      object.cardAuctionPrice !== null
    ) {
      message.cardAuctionPrice = String(object.cardAuctionPrice);
    } else {
      message.cardAuctionPrice = "";
    }
    if (
      object.activeCollections !== undefined &&
      object.activeCollections !== null
    ) {
      for (const e of object.activeCollections) {
        message.activeCollections.push(Number(e));
      }
    }
    if (object.cardsNumber !== undefined && object.cardsNumber !== null) {
      message.cardsNumber = Number(object.cardsNumber);
    } else {
      message.cardsNumber = 0;
    }
    if (object.matchesNumber !== undefined && object.matchesNumber !== null) {
      message.matchesNumber = Number(object.matchesNumber);
    } else {
      message.matchesNumber = 0;
    }
    if (
      object.sellOffersNumber !== undefined &&
      object.sellOffersNumber !== null
    ) {
      message.sellOffersNumber = Number(object.sellOffersNumber);
    } else {
      message.sellOffersNumber = 0;
    }
    if (object.councilsNumber !== undefined && object.councilsNumber !== null) {
      message.councilsNumber = Number(object.councilsNumber);
    } else {
      message.councilsNumber = 0;
    }
    return message;
  },

  toJSON(message: QueryQCardchainInfoResponse): unknown {
    const obj: any = {};
    message.cardAuctionPrice !== undefined &&
      (obj.cardAuctionPrice = message.cardAuctionPrice);
    if (message.activeCollections) {
      obj.activeCollections = message.activeCollections.map((e) => e);
    } else {
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

  fromPartial(
    object: DeepPartial<QueryQCardchainInfoResponse>
  ): QueryQCardchainInfoResponse {
    const message = {
      ...baseQueryQCardchainInfoResponse,
    } as QueryQCardchainInfoResponse;
    message.activeCollections = [];
    if (
      object.cardAuctionPrice !== undefined &&
      object.cardAuctionPrice !== null
    ) {
      message.cardAuctionPrice = object.cardAuctionPrice;
    } else {
      message.cardAuctionPrice = "";
    }
    if (
      object.activeCollections !== undefined &&
      object.activeCollections !== null
    ) {
      for (const e of object.activeCollections) {
        message.activeCollections.push(e);
      }
    }
    if (object.cardsNumber !== undefined && object.cardsNumber !== null) {
      message.cardsNumber = object.cardsNumber;
    } else {
      message.cardsNumber = 0;
    }
    if (object.matchesNumber !== undefined && object.matchesNumber !== null) {
      message.matchesNumber = object.matchesNumber;
    } else {
      message.matchesNumber = 0;
    }
    if (
      object.sellOffersNumber !== undefined &&
      object.sellOffersNumber !== null
    ) {
      message.sellOffersNumber = object.sellOffersNumber;
    } else {
      message.sellOffersNumber = 0;
    }
    if (object.councilsNumber !== undefined && object.councilsNumber !== null) {
      message.councilsNumber = object.councilsNumber;
    } else {
      message.councilsNumber = 0;
    }
    return message;
  },
};

const baseQueryQVotingResultsRequest: object = {};

export const QueryQVotingResultsRequest = {
  encode(
    _: QueryQVotingResultsRequest,
    writer: Writer = Writer.create()
  ): Writer {
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryQVotingResultsRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryQVotingResultsRequest,
    } as QueryQVotingResultsRequest;
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

  fromJSON(_: any): QueryQVotingResultsRequest {
    const message = {
      ...baseQueryQVotingResultsRequest,
    } as QueryQVotingResultsRequest;
    return message;
  },

  toJSON(_: QueryQVotingResultsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<QueryQVotingResultsRequest>
  ): QueryQVotingResultsRequest {
    const message = {
      ...baseQueryQVotingResultsRequest,
    } as QueryQVotingResultsRequest;
    return message;
  },
};

const baseQueryQVotingResultsResponse: object = {};

export const QueryQVotingResultsResponse = {
  encode(
    message: QueryQVotingResultsResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.lastVotingResults !== undefined) {
      VotingResults.encode(
        message.lastVotingResults,
        writer.uint32(10).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryQVotingResultsResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryQVotingResultsResponse,
    } as QueryQVotingResultsResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.lastVotingResults = VotingResults.decode(
            reader,
            reader.uint32()
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryQVotingResultsResponse {
    const message = {
      ...baseQueryQVotingResultsResponse,
    } as QueryQVotingResultsResponse;
    if (
      object.lastVotingResults !== undefined &&
      object.lastVotingResults !== null
    ) {
      message.lastVotingResults = VotingResults.fromJSON(
        object.lastVotingResults
      );
    } else {
      message.lastVotingResults = undefined;
    }
    return message;
  },

  toJSON(message: QueryQVotingResultsResponse): unknown {
    const obj: any = {};
    message.lastVotingResults !== undefined &&
      (obj.lastVotingResults = message.lastVotingResults
        ? VotingResults.toJSON(message.lastVotingResults)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryQVotingResultsResponse>
  ): QueryQVotingResultsResponse {
    const message = {
      ...baseQueryQVotingResultsResponse,
    } as QueryQVotingResultsResponse;
    if (
      object.lastVotingResults !== undefined &&
      object.lastVotingResults !== null
    ) {
      message.lastVotingResults = VotingResults.fromPartial(
        object.lastVotingResults
      );
    } else {
      message.lastVotingResults = undefined;
    }
    return message;
  },
};

const baseQueryQVotableCardsRequest: object = { address: "" };

export const QueryQVotableCardsRequest = {
  encode(
    message: QueryQVotableCardsRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryQVotableCardsRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryQVotableCardsRequest,
    } as QueryQVotableCardsRequest;
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

  fromJSON(object: any): QueryQVotableCardsRequest {
    const message = {
      ...baseQueryQVotableCardsRequest,
    } as QueryQVotableCardsRequest;
    if (object.address !== undefined && object.address !== null) {
      message.address = String(object.address);
    } else {
      message.address = "";
    }
    return message;
  },

  toJSON(message: QueryQVotableCardsRequest): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryQVotableCardsRequest>
  ): QueryQVotableCardsRequest {
    const message = {
      ...baseQueryQVotableCardsRequest,
    } as QueryQVotableCardsRequest;
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    } else {
      message.address = "";
    }
    return message;
  },
};

const baseQueryQVotableCardsResponse: object = {
  unregistered: false,
  noVoteRights: false,
};

export const QueryQVotableCardsResponse = {
  encode(
    message: QueryQVotableCardsResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.unregistered === true) {
      writer.uint32(8).bool(message.unregistered);
    }
    if (message.noVoteRights === true) {
      writer.uint32(16).bool(message.noVoteRights);
    }
    for (const v of message.voteRights) {
      VoteRight.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryQVotableCardsResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryQVotableCardsResponse,
    } as QueryQVotableCardsResponse;
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

  fromJSON(object: any): QueryQVotableCardsResponse {
    const message = {
      ...baseQueryQVotableCardsResponse,
    } as QueryQVotableCardsResponse;
    message.voteRights = [];
    if (object.unregistered !== undefined && object.unregistered !== null) {
      message.unregistered = Boolean(object.unregistered);
    } else {
      message.unregistered = false;
    }
    if (object.noVoteRights !== undefined && object.noVoteRights !== null) {
      message.noVoteRights = Boolean(object.noVoteRights);
    } else {
      message.noVoteRights = false;
    }
    if (object.voteRights !== undefined && object.voteRights !== null) {
      for (const e of object.voteRights) {
        message.voteRights.push(VoteRight.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: QueryQVotableCardsResponse): unknown {
    const obj: any = {};
    message.unregistered !== undefined &&
      (obj.unregistered = message.unregistered);
    message.noVoteRights !== undefined &&
      (obj.noVoteRights = message.noVoteRights);
    if (message.voteRights) {
      obj.voteRights = message.voteRights.map((e) =>
        e ? VoteRight.toJSON(e) : undefined
      );
    } else {
      obj.voteRights = [];
    }
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryQVotableCardsResponse>
  ): QueryQVotableCardsResponse {
    const message = {
      ...baseQueryQVotableCardsResponse,
    } as QueryQVotableCardsResponse;
    message.voteRights = [];
    if (object.unregistered !== undefined && object.unregistered !== null) {
      message.unregistered = object.unregistered;
    } else {
      message.unregistered = false;
    }
    if (object.noVoteRights !== undefined && object.noVoteRights !== null) {
      message.noVoteRights = object.noVoteRights;
    } else {
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

const baseQueryQCardsRequest: object = {
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
  encode(
    message: QueryQCardsRequest,
    writer: Writer = Writer.create()
  ): Writer {
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

  decode(input: Reader | Uint8Array, length?: number): QueryQCardsRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryQCardsRequest } as QueryQCardsRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.owner = reader.string();
          break;
        case 2:
          message.status = reader.int32() as any;
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

  fromJSON(object: any): QueryQCardsRequest {
    const message = { ...baseQueryQCardsRequest } as QueryQCardsRequest;
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = String(object.owner);
    } else {
      message.owner = "";
    }
    if (object.status !== undefined && object.status !== null) {
      message.status = queryQCardsRequest_StatusFromJSON(object.status);
    } else {
      message.status = 0;
    }
    if (object.cardType !== undefined && object.cardType !== null) {
      message.cardType = String(object.cardType);
    } else {
      message.cardType = "";
    }
    if (object.classes !== undefined && object.classes !== null) {
      message.classes = String(object.classes);
    } else {
      message.classes = "";
    }
    if (object.sortBy !== undefined && object.sortBy !== null) {
      message.sortBy = String(object.sortBy);
    } else {
      message.sortBy = "";
    }
    if (object.nameContains !== undefined && object.nameContains !== null) {
      message.nameContains = String(object.nameContains);
    } else {
      message.nameContains = "";
    }
    if (
      object.keywordsContains !== undefined &&
      object.keywordsContains !== null
    ) {
      message.keywordsContains = String(object.keywordsContains);
    } else {
      message.keywordsContains = "";
    }
    if (object.notesContains !== undefined && object.notesContains !== null) {
      message.notesContains = String(object.notesContains);
    } else {
      message.notesContains = "";
    }
    return message;
  },

  toJSON(message: QueryQCardsRequest): unknown {
    const obj: any = {};
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

  fromPartial(object: DeepPartial<QueryQCardsRequest>): QueryQCardsRequest {
    const message = { ...baseQueryQCardsRequest } as QueryQCardsRequest;
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = object.owner;
    } else {
      message.owner = "";
    }
    if (object.status !== undefined && object.status !== null) {
      message.status = object.status;
    } else {
      message.status = 0;
    }
    if (object.cardType !== undefined && object.cardType !== null) {
      message.cardType = object.cardType;
    } else {
      message.cardType = "";
    }
    if (object.classes !== undefined && object.classes !== null) {
      message.classes = object.classes;
    } else {
      message.classes = "";
    }
    if (object.sortBy !== undefined && object.sortBy !== null) {
      message.sortBy = object.sortBy;
    } else {
      message.sortBy = "";
    }
    if (object.nameContains !== undefined && object.nameContains !== null) {
      message.nameContains = object.nameContains;
    } else {
      message.nameContains = "";
    }
    if (
      object.keywordsContains !== undefined &&
      object.keywordsContains !== null
    ) {
      message.keywordsContains = object.keywordsContains;
    } else {
      message.keywordsContains = "";
    }
    if (object.notesContains !== undefined && object.notesContains !== null) {
      message.notesContains = object.notesContains;
    } else {
      message.notesContains = "";
    }
    return message;
  },
};

const baseQueryQCardsResponse: object = { cardsList: 0 };

export const QueryQCardsResponse = {
  encode(
    message: QueryQCardsResponse,
    writer: Writer = Writer.create()
  ): Writer {
    writer.uint32(10).fork();
    for (const v of message.cardsList) {
      writer.uint64(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryQCardsResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryQCardsResponse } as QueryQCardsResponse;
    message.cardsList = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.cardsList.push(longToNumber(reader.uint64() as Long));
            }
          } else {
            message.cardsList.push(longToNumber(reader.uint64() as Long));
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryQCardsResponse {
    const message = { ...baseQueryQCardsResponse } as QueryQCardsResponse;
    message.cardsList = [];
    if (object.cardsList !== undefined && object.cardsList !== null) {
      for (const e of object.cardsList) {
        message.cardsList.push(Number(e));
      }
    }
    return message;
  },

  toJSON(message: QueryQCardsResponse): unknown {
    const obj: any = {};
    if (message.cardsList) {
      obj.cardsList = message.cardsList.map((e) => e);
    } else {
      obj.cardsList = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<QueryQCardsResponse>): QueryQCardsResponse {
    const message = { ...baseQueryQCardsResponse } as QueryQCardsResponse;
    message.cardsList = [];
    if (object.cardsList !== undefined && object.cardsList !== null) {
      for (const e of object.cardsList) {
        message.cardsList.push(e);
      }
    }
    return message;
  },
};

const baseQueryQMatchRequest: object = { matchId: 0 };

export const QueryQMatchRequest = {
  encode(
    message: QueryQMatchRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.matchId !== 0) {
      writer.uint32(8).uint64(message.matchId);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryQMatchRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryQMatchRequest } as QueryQMatchRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.matchId = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryQMatchRequest {
    const message = { ...baseQueryQMatchRequest } as QueryQMatchRequest;
    if (object.matchId !== undefined && object.matchId !== null) {
      message.matchId = Number(object.matchId);
    } else {
      message.matchId = 0;
    }
    return message;
  },

  toJSON(message: QueryQMatchRequest): unknown {
    const obj: any = {};
    message.matchId !== undefined && (obj.matchId = message.matchId);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryQMatchRequest>): QueryQMatchRequest {
    const message = { ...baseQueryQMatchRequest } as QueryQMatchRequest;
    if (object.matchId !== undefined && object.matchId !== null) {
      message.matchId = object.matchId;
    } else {
      message.matchId = 0;
    }
    return message;
  },
};

const baseQueryQCollectionRequest: object = { collectionId: 0 };

export const QueryQCollectionRequest = {
  encode(
    message: QueryQCollectionRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.collectionId !== 0) {
      writer.uint32(8).uint64(message.collectionId);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryQCollectionRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryQCollectionRequest,
    } as QueryQCollectionRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.collectionId = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryQCollectionRequest {
    const message = {
      ...baseQueryQCollectionRequest,
    } as QueryQCollectionRequest;
    if (object.collectionId !== undefined && object.collectionId !== null) {
      message.collectionId = Number(object.collectionId);
    } else {
      message.collectionId = 0;
    }
    return message;
  },

  toJSON(message: QueryQCollectionRequest): unknown {
    const obj: any = {};
    message.collectionId !== undefined &&
      (obj.collectionId = message.collectionId);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryQCollectionRequest>
  ): QueryQCollectionRequest {
    const message = {
      ...baseQueryQCollectionRequest,
    } as QueryQCollectionRequest;
    if (object.collectionId !== undefined && object.collectionId !== null) {
      message.collectionId = object.collectionId;
    } else {
      message.collectionId = 0;
    }
    return message;
  },
};

const baseQueryQSellOfferRequest: object = { sellOfferId: 0 };

export const QueryQSellOfferRequest = {
  encode(
    message: QueryQSellOfferRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.sellOfferId !== 0) {
      writer.uint32(8).uint64(message.sellOfferId);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryQSellOfferRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryQSellOfferRequest } as QueryQSellOfferRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sellOfferId = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryQSellOfferRequest {
    const message = { ...baseQueryQSellOfferRequest } as QueryQSellOfferRequest;
    if (object.sellOfferId !== undefined && object.sellOfferId !== null) {
      message.sellOfferId = Number(object.sellOfferId);
    } else {
      message.sellOfferId = 0;
    }
    return message;
  },

  toJSON(message: QueryQSellOfferRequest): unknown {
    const obj: any = {};
    message.sellOfferId !== undefined &&
      (obj.sellOfferId = message.sellOfferId);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryQSellOfferRequest>
  ): QueryQSellOfferRequest {
    const message = { ...baseQueryQSellOfferRequest } as QueryQSellOfferRequest;
    if (object.sellOfferId !== undefined && object.sellOfferId !== null) {
      message.sellOfferId = object.sellOfferId;
    } else {
      message.sellOfferId = 0;
    }
    return message;
  },
};

const baseQueryQCouncilRequest: object = { councilId: 0 };

export const QueryQCouncilRequest = {
  encode(
    message: QueryQCouncilRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.councilId !== 0) {
      writer.uint32(8).uint64(message.councilId);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryQCouncilRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryQCouncilRequest } as QueryQCouncilRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.councilId = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryQCouncilRequest {
    const message = { ...baseQueryQCouncilRequest } as QueryQCouncilRequest;
    if (object.councilId !== undefined && object.councilId !== null) {
      message.councilId = Number(object.councilId);
    } else {
      message.councilId = 0;
    }
    return message;
  },

  toJSON(message: QueryQCouncilRequest): unknown {
    const obj: any = {};
    message.councilId !== undefined && (obj.councilId = message.councilId);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryQCouncilRequest>): QueryQCouncilRequest {
    const message = { ...baseQueryQCouncilRequest } as QueryQCouncilRequest;
    if (object.councilId !== undefined && object.councilId !== null) {
      message.councilId = object.councilId;
    } else {
      message.councilId = 0;
    }
    return message;
  },
};

const baseQueryQMatchesRequest: object = {
  timestampDown: 0,
  timestampUp: 0,
  containsUsers: "",
  reporter: "",
  outcome: 0,
  cardsPlayed: 0,
};

export const QueryQMatchesRequest = {
  encode(
    message: QueryQMatchesRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.timestampDown !== 0) {
      writer.uint32(8).uint64(message.timestampDown);
    }
    if (message.timestampUp !== 0) {
      writer.uint32(16).uint64(message.timestampUp);
    }
    for (const v of message.containsUsers) {
      writer.uint32(26).string(v!);
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

  decode(input: Reader | Uint8Array, length?: number): QueryQMatchesRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryQMatchesRequest } as QueryQMatchesRequest;
    message.containsUsers = [];
    message.cardsPlayed = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.timestampDown = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.timestampUp = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.containsUsers.push(reader.string());
          break;
        case 4:
          message.reporter = reader.string();
          break;
        case 5:
          message.outcome = reader.int32() as any;
          break;
        case 6:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.cardsPlayed.push(longToNumber(reader.uint64() as Long));
            }
          } else {
            message.cardsPlayed.push(longToNumber(reader.uint64() as Long));
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

  fromJSON(object: any): QueryQMatchesRequest {
    const message = { ...baseQueryQMatchesRequest } as QueryQMatchesRequest;
    message.containsUsers = [];
    message.cardsPlayed = [];
    if (object.timestampDown !== undefined && object.timestampDown !== null) {
      message.timestampDown = Number(object.timestampDown);
    } else {
      message.timestampDown = 0;
    }
    if (object.timestampUp !== undefined && object.timestampUp !== null) {
      message.timestampUp = Number(object.timestampUp);
    } else {
      message.timestampUp = 0;
    }
    if (object.containsUsers !== undefined && object.containsUsers !== null) {
      for (const e of object.containsUsers) {
        message.containsUsers.push(String(e));
      }
    }
    if (object.reporter !== undefined && object.reporter !== null) {
      message.reporter = String(object.reporter);
    } else {
      message.reporter = "";
    }
    if (object.outcome !== undefined && object.outcome !== null) {
      message.outcome = outcomeFromJSON(object.outcome);
    } else {
      message.outcome = 0;
    }
    if (object.cardsPlayed !== undefined && object.cardsPlayed !== null) {
      for (const e of object.cardsPlayed) {
        message.cardsPlayed.push(Number(e));
      }
    }
    if (object.ignore !== undefined && object.ignore !== null) {
      message.ignore = IgnoreMatches.fromJSON(object.ignore);
    } else {
      message.ignore = undefined;
    }
    return message;
  },

  toJSON(message: QueryQMatchesRequest): unknown {
    const obj: any = {};
    message.timestampDown !== undefined &&
      (obj.timestampDown = message.timestampDown);
    message.timestampUp !== undefined &&
      (obj.timestampUp = message.timestampUp);
    if (message.containsUsers) {
      obj.containsUsers = message.containsUsers.map((e) => e);
    } else {
      obj.containsUsers = [];
    }
    message.reporter !== undefined && (obj.reporter = message.reporter);
    message.outcome !== undefined &&
      (obj.outcome = outcomeToJSON(message.outcome));
    if (message.cardsPlayed) {
      obj.cardsPlayed = message.cardsPlayed.map((e) => e);
    } else {
      obj.cardsPlayed = [];
    }
    message.ignore !== undefined &&
      (obj.ignore = message.ignore
        ? IgnoreMatches.toJSON(message.ignore)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryQMatchesRequest>): QueryQMatchesRequest {
    const message = { ...baseQueryQMatchesRequest } as QueryQMatchesRequest;
    message.containsUsers = [];
    message.cardsPlayed = [];
    if (object.timestampDown !== undefined && object.timestampDown !== null) {
      message.timestampDown = object.timestampDown;
    } else {
      message.timestampDown = 0;
    }
    if (object.timestampUp !== undefined && object.timestampUp !== null) {
      message.timestampUp = object.timestampUp;
    } else {
      message.timestampUp = 0;
    }
    if (object.containsUsers !== undefined && object.containsUsers !== null) {
      for (const e of object.containsUsers) {
        message.containsUsers.push(e);
      }
    }
    if (object.reporter !== undefined && object.reporter !== null) {
      message.reporter = object.reporter;
    } else {
      message.reporter = "";
    }
    if (object.outcome !== undefined && object.outcome !== null) {
      message.outcome = object.outcome;
    } else {
      message.outcome = 0;
    }
    if (object.cardsPlayed !== undefined && object.cardsPlayed !== null) {
      for (const e of object.cardsPlayed) {
        message.cardsPlayed.push(e);
      }
    }
    if (object.ignore !== undefined && object.ignore !== null) {
      message.ignore = IgnoreMatches.fromPartial(object.ignore);
    } else {
      message.ignore = undefined;
    }
    return message;
  },
};

const baseIgnoreMatches: object = { outcome: false };

export const IgnoreMatches = {
  encode(message: IgnoreMatches, writer: Writer = Writer.create()): Writer {
    if (message.outcome === true) {
      writer.uint32(8).bool(message.outcome);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): IgnoreMatches {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseIgnoreMatches } as IgnoreMatches;
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

  fromJSON(object: any): IgnoreMatches {
    const message = { ...baseIgnoreMatches } as IgnoreMatches;
    if (object.outcome !== undefined && object.outcome !== null) {
      message.outcome = Boolean(object.outcome);
    } else {
      message.outcome = false;
    }
    return message;
  },

  toJSON(message: IgnoreMatches): unknown {
    const obj: any = {};
    message.outcome !== undefined && (obj.outcome = message.outcome);
    return obj;
  },

  fromPartial(object: DeepPartial<IgnoreMatches>): IgnoreMatches {
    const message = { ...baseIgnoreMatches } as IgnoreMatches;
    if (object.outcome !== undefined && object.outcome !== null) {
      message.outcome = object.outcome;
    } else {
      message.outcome = false;
    }
    return message;
  },
};

const baseQueryQMatchesResponse: object = { matchesList: 0 };

export const QueryQMatchesResponse = {
  encode(
    message: QueryQMatchesResponse,
    writer: Writer = Writer.create()
  ): Writer {
    writer.uint32(10).fork();
    for (const v of message.matchesList) {
      writer.uint64(v);
    }
    writer.ldelim();
    for (const v of message.matches) {
      Match.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryQMatchesResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryQMatchesResponse } as QueryQMatchesResponse;
    message.matchesList = [];
    message.matches = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.matchesList.push(longToNumber(reader.uint64() as Long));
            }
          } else {
            message.matchesList.push(longToNumber(reader.uint64() as Long));
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

  fromJSON(object: any): QueryQMatchesResponse {
    const message = { ...baseQueryQMatchesResponse } as QueryQMatchesResponse;
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

  toJSON(message: QueryQMatchesResponse): unknown {
    const obj: any = {};
    if (message.matchesList) {
      obj.matchesList = message.matchesList.map((e) => e);
    } else {
      obj.matchesList = [];
    }
    if (message.matches) {
      obj.matches = message.matches.map((e) =>
        e ? Match.toJSON(e) : undefined
      );
    } else {
      obj.matches = [];
    }
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryQMatchesResponse>
  ): QueryQMatchesResponse {
    const message = { ...baseQueryQMatchesResponse } as QueryQMatchesResponse;
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

const baseQueryQSellOffersRequest: object = {
  priceDown: "",
  priceUp: "",
  seller: "",
  buyer: "",
  card: 0,
  status: 0,
};

export const QueryQSellOffersRequest = {
  encode(
    message: QueryQSellOffersRequest,
    writer: Writer = Writer.create()
  ): Writer {
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
      IgnoreSellOffers.encode(
        message.ignore,
        writer.uint32(58).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryQSellOffersRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryQSellOffersRequest,
    } as QueryQSellOffersRequest;
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
          message.card = longToNumber(reader.uint64() as Long);
          break;
        case 6:
          message.status = reader.int32() as any;
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

  fromJSON(object: any): QueryQSellOffersRequest {
    const message = {
      ...baseQueryQSellOffersRequest,
    } as QueryQSellOffersRequest;
    if (object.priceDown !== undefined && object.priceDown !== null) {
      message.priceDown = String(object.priceDown);
    } else {
      message.priceDown = "";
    }
    if (object.priceUp !== undefined && object.priceUp !== null) {
      message.priceUp = String(object.priceUp);
    } else {
      message.priceUp = "";
    }
    if (object.seller !== undefined && object.seller !== null) {
      message.seller = String(object.seller);
    } else {
      message.seller = "";
    }
    if (object.buyer !== undefined && object.buyer !== null) {
      message.buyer = String(object.buyer);
    } else {
      message.buyer = "";
    }
    if (object.card !== undefined && object.card !== null) {
      message.card = Number(object.card);
    } else {
      message.card = 0;
    }
    if (object.status !== undefined && object.status !== null) {
      message.status = sellOfferStatusFromJSON(object.status);
    } else {
      message.status = 0;
    }
    if (object.ignore !== undefined && object.ignore !== null) {
      message.ignore = IgnoreSellOffers.fromJSON(object.ignore);
    } else {
      message.ignore = undefined;
    }
    return message;
  },

  toJSON(message: QueryQSellOffersRequest): unknown {
    const obj: any = {};
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

  fromPartial(
    object: DeepPartial<QueryQSellOffersRequest>
  ): QueryQSellOffersRequest {
    const message = {
      ...baseQueryQSellOffersRequest,
    } as QueryQSellOffersRequest;
    if (object.priceDown !== undefined && object.priceDown !== null) {
      message.priceDown = object.priceDown;
    } else {
      message.priceDown = "";
    }
    if (object.priceUp !== undefined && object.priceUp !== null) {
      message.priceUp = object.priceUp;
    } else {
      message.priceUp = "";
    }
    if (object.seller !== undefined && object.seller !== null) {
      message.seller = object.seller;
    } else {
      message.seller = "";
    }
    if (object.buyer !== undefined && object.buyer !== null) {
      message.buyer = object.buyer;
    } else {
      message.buyer = "";
    }
    if (object.card !== undefined && object.card !== null) {
      message.card = object.card;
    } else {
      message.card = 0;
    }
    if (object.status !== undefined && object.status !== null) {
      message.status = object.status;
    } else {
      message.status = 0;
    }
    if (object.ignore !== undefined && object.ignore !== null) {
      message.ignore = IgnoreSellOffers.fromPartial(object.ignore);
    } else {
      message.ignore = undefined;
    }
    return message;
  },
};

const baseIgnoreSellOffers: object = { status: false, card: false };

export const IgnoreSellOffers = {
  encode(message: IgnoreSellOffers, writer: Writer = Writer.create()): Writer {
    if (message.status === true) {
      writer.uint32(8).bool(message.status);
    }
    if (message.card === true) {
      writer.uint32(16).bool(message.card);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): IgnoreSellOffers {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseIgnoreSellOffers } as IgnoreSellOffers;
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

  fromJSON(object: any): IgnoreSellOffers {
    const message = { ...baseIgnoreSellOffers } as IgnoreSellOffers;
    if (object.status !== undefined && object.status !== null) {
      message.status = Boolean(object.status);
    } else {
      message.status = false;
    }
    if (object.card !== undefined && object.card !== null) {
      message.card = Boolean(object.card);
    } else {
      message.card = false;
    }
    return message;
  },

  toJSON(message: IgnoreSellOffers): unknown {
    const obj: any = {};
    message.status !== undefined && (obj.status = message.status);
    message.card !== undefined && (obj.card = message.card);
    return obj;
  },

  fromPartial(object: DeepPartial<IgnoreSellOffers>): IgnoreSellOffers {
    const message = { ...baseIgnoreSellOffers } as IgnoreSellOffers;
    if (object.status !== undefined && object.status !== null) {
      message.status = object.status;
    } else {
      message.status = false;
    }
    if (object.card !== undefined && object.card !== null) {
      message.card = object.card;
    } else {
      message.card = false;
    }
    return message;
  },
};

const baseQueryQSellOffersResponse: object = { sellOffersIds: 0 };

export const QueryQSellOffersResponse = {
  encode(
    message: QueryQSellOffersResponse,
    writer: Writer = Writer.create()
  ): Writer {
    writer.uint32(10).fork();
    for (const v of message.sellOffersIds) {
      writer.uint64(v);
    }
    writer.ldelim();
    for (const v of message.sellOffers) {
      SellOffer.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryQSellOffersResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryQSellOffersResponse,
    } as QueryQSellOffersResponse;
    message.sellOffersIds = [];
    message.sellOffers = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.sellOffersIds.push(longToNumber(reader.uint64() as Long));
            }
          } else {
            message.sellOffersIds.push(longToNumber(reader.uint64() as Long));
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

  fromJSON(object: any): QueryQSellOffersResponse {
    const message = {
      ...baseQueryQSellOffersResponse,
    } as QueryQSellOffersResponse;
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

  toJSON(message: QueryQSellOffersResponse): unknown {
    const obj: any = {};
    if (message.sellOffersIds) {
      obj.sellOffersIds = message.sellOffersIds.map((e) => e);
    } else {
      obj.sellOffersIds = [];
    }
    if (message.sellOffers) {
      obj.sellOffers = message.sellOffers.map((e) =>
        e ? SellOffer.toJSON(e) : undefined
      );
    } else {
      obj.sellOffers = [];
    }
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryQSellOffersResponse>
  ): QueryQSellOffersResponse {
    const message = {
      ...baseQueryQSellOffersResponse,
    } as QueryQSellOffersResponse;
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

const baseQueryQServerRequest: object = { id: 0 };

export const QueryQServerRequest = {
  encode(
    message: QueryQServerRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryQServerRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryQServerRequest } as QueryQServerRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryQServerRequest {
    const message = { ...baseQueryQServerRequest } as QueryQServerRequest;
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    return message;
  },

  toJSON(message: QueryQServerRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryQServerRequest>): QueryQServerRequest {
    const message = { ...baseQueryQServerRequest } as QueryQServerRequest;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    return message;
  },
};

const baseQueryQServerResponse: object = {};

export const QueryQServerResponse = {
  encode(_: QueryQServerResponse, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryQServerResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryQServerResponse } as QueryQServerResponse;
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

  fromJSON(_: any): QueryQServerResponse {
    const message = { ...baseQueryQServerResponse } as QueryQServerResponse;
    return message;
  },

  toJSON(_: QueryQServerResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<QueryQServerResponse>): QueryQServerResponse {
    const message = { ...baseQueryQServerResponse } as QueryQServerResponse;
    return message;
  },
};

/** Query defines the gRPC querier service. */
export interface Query {
  /** Parameters queries the parameters of the module. */
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
  /** Queries a list of QCard items. */
  QCard(request: QueryQCardRequest): Promise<OutpCard>;
  /** Queries a list of QCardContent items. */
  QCardContent(
    request: QueryQCardContentRequest
  ): Promise<QueryQCardContentResponse>;
  /** Queries a list of QUser items. */
  QUser(request: QueryQUserRequest): Promise<User>;
  /** Queries a list of QCardchainInfo items. */
  QCardchainInfo(
    request: QueryQCardchainInfoRequest
  ): Promise<QueryQCardchainInfoResponse>;
  /** Queries a list of QVotingResults items. */
  QVotingResults(
    request: QueryQVotingResultsRequest
  ): Promise<QueryQVotingResultsResponse>;
  /** Queries a list of QVotableCards items. */
  QVotableCards(
    request: QueryQVotableCardsRequest
  ): Promise<QueryQVotableCardsResponse>;
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
  QSellOffers(
    request: QueryQSellOffersRequest
  ): Promise<QueryQSellOffersResponse>;
  /** Queries a list of QServer items. */
  QServer(request: QueryQServerRequest): Promise<Server>;
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
  }
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request(
      "DecentralCardGame.cardchain.cardchain.Query",
      "Params",
      data
    );
    return promise.then((data) => QueryParamsResponse.decode(new Reader(data)));
  }

  QCard(request: QueryQCardRequest): Promise<OutpCard> {
    const data = QueryQCardRequest.encode(request).finish();
    const promise = this.rpc.request(
      "DecentralCardGame.cardchain.cardchain.Query",
      "QCard",
      data
    );
    return promise.then((data) => OutpCard.decode(new Reader(data)));
  }

  QCardContent(
    request: QueryQCardContentRequest
  ): Promise<QueryQCardContentResponse> {
    const data = QueryQCardContentRequest.encode(request).finish();
    const promise = this.rpc.request(
      "DecentralCardGame.cardchain.cardchain.Query",
      "QCardContent",
      data
    );
    return promise.then((data) =>
      QueryQCardContentResponse.decode(new Reader(data))
    );
  }

  QUser(request: QueryQUserRequest): Promise<User> {
    const data = QueryQUserRequest.encode(request).finish();
    const promise = this.rpc.request(
      "DecentralCardGame.cardchain.cardchain.Query",
      "QUser",
      data
    );
    return promise.then((data) => User.decode(new Reader(data)));
  }

  QCardchainInfo(
    request: QueryQCardchainInfoRequest
  ): Promise<QueryQCardchainInfoResponse> {
    const data = QueryQCardchainInfoRequest.encode(request).finish();
    const promise = this.rpc.request(
      "DecentralCardGame.cardchain.cardchain.Query",
      "QCardchainInfo",
      data
    );
    return promise.then((data) =>
      QueryQCardchainInfoResponse.decode(new Reader(data))
    );
  }

  QVotingResults(
    request: QueryQVotingResultsRequest
  ): Promise<QueryQVotingResultsResponse> {
    const data = QueryQVotingResultsRequest.encode(request).finish();
    const promise = this.rpc.request(
      "DecentralCardGame.cardchain.cardchain.Query",
      "QVotingResults",
      data
    );
    return promise.then((data) =>
      QueryQVotingResultsResponse.decode(new Reader(data))
    );
  }

  QVotableCards(
    request: QueryQVotableCardsRequest
  ): Promise<QueryQVotableCardsResponse> {
    const data = QueryQVotableCardsRequest.encode(request).finish();
    const promise = this.rpc.request(
      "DecentralCardGame.cardchain.cardchain.Query",
      "QVotableCards",
      data
    );
    return promise.then((data) =>
      QueryQVotableCardsResponse.decode(new Reader(data))
    );
  }

  QCards(request: QueryQCardsRequest): Promise<QueryQCardsResponse> {
    const data = QueryQCardsRequest.encode(request).finish();
    const promise = this.rpc.request(
      "DecentralCardGame.cardchain.cardchain.Query",
      "QCards",
      data
    );
    return promise.then((data) => QueryQCardsResponse.decode(new Reader(data)));
  }

  QMatch(request: QueryQMatchRequest): Promise<Match> {
    const data = QueryQMatchRequest.encode(request).finish();
    const promise = this.rpc.request(
      "DecentralCardGame.cardchain.cardchain.Query",
      "QMatch",
      data
    );
    return promise.then((data) => Match.decode(new Reader(data)));
  }

  QCollection(request: QueryQCollectionRequest): Promise<Collection> {
    const data = QueryQCollectionRequest.encode(request).finish();
    const promise = this.rpc.request(
      "DecentralCardGame.cardchain.cardchain.Query",
      "QCollection",
      data
    );
    return promise.then((data) => Collection.decode(new Reader(data)));
  }

  QSellOffer(request: QueryQSellOfferRequest): Promise<SellOffer> {
    const data = QueryQSellOfferRequest.encode(request).finish();
    const promise = this.rpc.request(
      "DecentralCardGame.cardchain.cardchain.Query",
      "QSellOffer",
      data
    );
    return promise.then((data) => SellOffer.decode(new Reader(data)));
  }

  QCouncil(request: QueryQCouncilRequest): Promise<Council> {
    const data = QueryQCouncilRequest.encode(request).finish();
    const promise = this.rpc.request(
      "DecentralCardGame.cardchain.cardchain.Query",
      "QCouncil",
      data
    );
    return promise.then((data) => Council.decode(new Reader(data)));
  }

  QMatches(request: QueryQMatchesRequest): Promise<QueryQMatchesResponse> {
    const data = QueryQMatchesRequest.encode(request).finish();
    const promise = this.rpc.request(
      "DecentralCardGame.cardchain.cardchain.Query",
      "QMatches",
      data
    );
    return promise.then((data) =>
      QueryQMatchesResponse.decode(new Reader(data))
    );
  }

  QSellOffers(
    request: QueryQSellOffersRequest
  ): Promise<QueryQSellOffersResponse> {
    const data = QueryQSellOffersRequest.encode(request).finish();
    const promise = this.rpc.request(
      "DecentralCardGame.cardchain.cardchain.Query",
      "QSellOffers",
      data
    );
    return promise.then((data) =>
      QueryQSellOffersResponse.decode(new Reader(data))
    );
  }

  QServer(request: QueryQServerRequest): Promise<Server> {
    const data = QueryQServerRequest.encode(request).finish();
    const promise = this.rpc.request(
      "DecentralCardGame.cardchain.cardchain.Query",
      "QServer",
      data
    );
    return promise.then((data) => Server.decode(new Reader(data)));
  }
}

interface Rpc {
  request(
    service: string,
    method: string,
    data: Uint8Array
  ): Promise<Uint8Array>;
}

declare var self: any | undefined;
declare var window: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") return globalThis;
  if (typeof self !== "undefined") return self;
  if (typeof window !== "undefined") return window;
  if (typeof global !== "undefined") return global;
  throw "Unable to locate global object";
})();

type Builtin = Date | Function | Uint8Array | string | number | undefined;
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}
