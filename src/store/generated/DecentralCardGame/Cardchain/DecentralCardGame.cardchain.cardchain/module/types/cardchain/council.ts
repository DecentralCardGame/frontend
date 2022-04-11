/* eslint-disable */
import * as Long from "long";
import { util, configure, Writer, Reader } from "protobufjs/minimal";

export const protobufPackage = "DecentralCardGame.cardchain.cardchain";

export enum Response {
  Yes = 0,
  No = 1,
  Suggestion = 2,
  UNRECOGNIZED = -1,
}

export function responseFromJSON(object: any): Response {
  switch (object) {
    case 0:
    case "Yes":
      return Response.Yes;
    case 1:
    case "No":
      return Response.No;
    case 2:
    case "Suggestion":
      return Response.Suggestion;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Response.UNRECOGNIZED;
  }
}

export function responseToJSON(object: Response): string {
  switch (object) {
    case Response.Yes:
      return "Yes";
    case Response.No:
      return "No";
    case Response.Suggestion:
      return "Suggestion";
    default:
      return "UNKNOWN";
  }
}

export enum CouncelingStatus {
  councilOpen = 0,
  councilCreated = 1,
  councilClosed = 2,
  commited = 3,
  revealed = 4,
  suggestionsMade = 5,
  UNRECOGNIZED = -1,
}

export function councelingStatusFromJSON(object: any): CouncelingStatus {
  switch (object) {
    case 0:
    case "councilOpen":
      return CouncelingStatus.councilOpen;
    case 1:
    case "councilCreated":
      return CouncelingStatus.councilCreated;
    case 2:
    case "councilClosed":
      return CouncelingStatus.councilClosed;
    case 3:
    case "commited":
      return CouncelingStatus.commited;
    case 4:
    case "revealed":
      return CouncelingStatus.revealed;
    case 5:
    case "suggestionsMade":
      return CouncelingStatus.suggestionsMade;
    case -1:
    case "UNRECOGNIZED":
    default:
      return CouncelingStatus.UNRECOGNIZED;
  }
}

export function councelingStatusToJSON(object: CouncelingStatus): string {
  switch (object) {
    case CouncelingStatus.councilOpen:
      return "councilOpen";
    case CouncelingStatus.councilCreated:
      return "councilCreated";
    case CouncelingStatus.councilClosed:
      return "councilClosed";
    case CouncelingStatus.commited:
      return "commited";
    case CouncelingStatus.revealed:
      return "revealed";
    case CouncelingStatus.suggestionsMade:
      return "suggestionsMade";
    default:
      return "UNKNOWN";
  }
}

export interface Council {
  cardId: number;
  voters: string[];
  hashResponses: WrapHashResponse[];
  clearResponses: WrapClearResponse[];
  treasury: string;
  status: CouncelingStatus;
  trialStart: number;
}

export interface WrapClearResponse {
  user: string;
  response: Response;
  suggestion: string;
}

export interface WrapHashResponse {
  user: string;
  hash: string;
}

const baseCouncil: object = {
  cardId: 0,
  voters: "",
  treasury: "",
  status: 0,
  trialStart: 0,
};

export const Council = {
  encode(message: Council, writer: Writer = Writer.create()): Writer {
    if (message.cardId !== 0) {
      writer.uint32(8).uint64(message.cardId);
    }
    for (const v of message.voters) {
      writer.uint32(18).string(v!);
    }
    for (const v of message.hashResponses) {
      WrapHashResponse.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.clearResponses) {
      WrapClearResponse.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    if (message.treasury !== "") {
      writer.uint32(42).string(message.treasury);
    }
    if (message.status !== 0) {
      writer.uint32(48).int32(message.status);
    }
    if (message.trialStart !== 0) {
      writer.uint32(56).uint64(message.trialStart);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Council {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCouncil } as Council;
    message.voters = [];
    message.hashResponses = [];
    message.clearResponses = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.cardId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.voters.push(reader.string());
          break;
        case 3:
          message.hashResponses.push(
            WrapHashResponse.decode(reader, reader.uint32())
          );
          break;
        case 4:
          message.clearResponses.push(
            WrapClearResponse.decode(reader, reader.uint32())
          );
          break;
        case 5:
          message.treasury = reader.string();
          break;
        case 6:
          message.status = reader.int32() as any;
          break;
        case 7:
          message.trialStart = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Council {
    const message = { ...baseCouncil } as Council;
    message.voters = [];
    message.hashResponses = [];
    message.clearResponses = [];
    if (object.cardId !== undefined && object.cardId !== null) {
      message.cardId = Number(object.cardId);
    } else {
      message.cardId = 0;
    }
    if (object.voters !== undefined && object.voters !== null) {
      for (const e of object.voters) {
        message.voters.push(String(e));
      }
    }
    if (object.hashResponses !== undefined && object.hashResponses !== null) {
      for (const e of object.hashResponses) {
        message.hashResponses.push(WrapHashResponse.fromJSON(e));
      }
    }
    if (object.clearResponses !== undefined && object.clearResponses !== null) {
      for (const e of object.clearResponses) {
        message.clearResponses.push(WrapClearResponse.fromJSON(e));
      }
    }
    if (object.treasury !== undefined && object.treasury !== null) {
      message.treasury = String(object.treasury);
    } else {
      message.treasury = "";
    }
    if (object.status !== undefined && object.status !== null) {
      message.status = councelingStatusFromJSON(object.status);
    } else {
      message.status = 0;
    }
    if (object.trialStart !== undefined && object.trialStart !== null) {
      message.trialStart = Number(object.trialStart);
    } else {
      message.trialStart = 0;
    }
    return message;
  },

  toJSON(message: Council): unknown {
    const obj: any = {};
    message.cardId !== undefined && (obj.cardId = message.cardId);
    if (message.voters) {
      obj.voters = message.voters.map((e) => e);
    } else {
      obj.voters = [];
    }
    if (message.hashResponses) {
      obj.hashResponses = message.hashResponses.map((e) =>
        e ? WrapHashResponse.toJSON(e) : undefined
      );
    } else {
      obj.hashResponses = [];
    }
    if (message.clearResponses) {
      obj.clearResponses = message.clearResponses.map((e) =>
        e ? WrapClearResponse.toJSON(e) : undefined
      );
    } else {
      obj.clearResponses = [];
    }
    message.treasury !== undefined && (obj.treasury = message.treasury);
    message.status !== undefined &&
      (obj.status = councelingStatusToJSON(message.status));
    message.trialStart !== undefined && (obj.trialStart = message.trialStart);
    return obj;
  },

  fromPartial(object: DeepPartial<Council>): Council {
    const message = { ...baseCouncil } as Council;
    message.voters = [];
    message.hashResponses = [];
    message.clearResponses = [];
    if (object.cardId !== undefined && object.cardId !== null) {
      message.cardId = object.cardId;
    } else {
      message.cardId = 0;
    }
    if (object.voters !== undefined && object.voters !== null) {
      for (const e of object.voters) {
        message.voters.push(e);
      }
    }
    if (object.hashResponses !== undefined && object.hashResponses !== null) {
      for (const e of object.hashResponses) {
        message.hashResponses.push(WrapHashResponse.fromPartial(e));
      }
    }
    if (object.clearResponses !== undefined && object.clearResponses !== null) {
      for (const e of object.clearResponses) {
        message.clearResponses.push(WrapClearResponse.fromPartial(e));
      }
    }
    if (object.treasury !== undefined && object.treasury !== null) {
      message.treasury = object.treasury;
    } else {
      message.treasury = "";
    }
    if (object.status !== undefined && object.status !== null) {
      message.status = object.status;
    } else {
      message.status = 0;
    }
    if (object.trialStart !== undefined && object.trialStart !== null) {
      message.trialStart = object.trialStart;
    } else {
      message.trialStart = 0;
    }
    return message;
  },
};

const baseWrapClearResponse: object = { user: "", response: 0, suggestion: "" };

export const WrapClearResponse = {
  encode(message: WrapClearResponse, writer: Writer = Writer.create()): Writer {
    if (message.user !== "") {
      writer.uint32(10).string(message.user);
    }
    if (message.response !== 0) {
      writer.uint32(16).int32(message.response);
    }
    if (message.suggestion !== "") {
      writer.uint32(26).string(message.suggestion);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): WrapClearResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseWrapClearResponse } as WrapClearResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.user = reader.string();
          break;
        case 2:
          message.response = reader.int32() as any;
          break;
        case 3:
          message.suggestion = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): WrapClearResponse {
    const message = { ...baseWrapClearResponse } as WrapClearResponse;
    if (object.user !== undefined && object.user !== null) {
      message.user = String(object.user);
    } else {
      message.user = "";
    }
    if (object.response !== undefined && object.response !== null) {
      message.response = responseFromJSON(object.response);
    } else {
      message.response = 0;
    }
    if (object.suggestion !== undefined && object.suggestion !== null) {
      message.suggestion = String(object.suggestion);
    } else {
      message.suggestion = "";
    }
    return message;
  },

  toJSON(message: WrapClearResponse): unknown {
    const obj: any = {};
    message.user !== undefined && (obj.user = message.user);
    message.response !== undefined &&
      (obj.response = responseToJSON(message.response));
    message.suggestion !== undefined && (obj.suggestion = message.suggestion);
    return obj;
  },

  fromPartial(object: DeepPartial<WrapClearResponse>): WrapClearResponse {
    const message = { ...baseWrapClearResponse } as WrapClearResponse;
    if (object.user !== undefined && object.user !== null) {
      message.user = object.user;
    } else {
      message.user = "";
    }
    if (object.response !== undefined && object.response !== null) {
      message.response = object.response;
    } else {
      message.response = 0;
    }
    if (object.suggestion !== undefined && object.suggestion !== null) {
      message.suggestion = object.suggestion;
    } else {
      message.suggestion = "";
    }
    return message;
  },
};

const baseWrapHashResponse: object = { user: "", hash: "" };

export const WrapHashResponse = {
  encode(message: WrapHashResponse, writer: Writer = Writer.create()): Writer {
    if (message.user !== "") {
      writer.uint32(10).string(message.user);
    }
    if (message.hash !== "") {
      writer.uint32(18).string(message.hash);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): WrapHashResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseWrapHashResponse } as WrapHashResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.user = reader.string();
          break;
        case 2:
          message.hash = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): WrapHashResponse {
    const message = { ...baseWrapHashResponse } as WrapHashResponse;
    if (object.user !== undefined && object.user !== null) {
      message.user = String(object.user);
    } else {
      message.user = "";
    }
    if (object.hash !== undefined && object.hash !== null) {
      message.hash = String(object.hash);
    } else {
      message.hash = "";
    }
    return message;
  },

  toJSON(message: WrapHashResponse): unknown {
    const obj: any = {};
    message.user !== undefined && (obj.user = message.user);
    message.hash !== undefined && (obj.hash = message.hash);
    return obj;
  },

  fromPartial(object: DeepPartial<WrapHashResponse>): WrapHashResponse {
    const message = { ...baseWrapHashResponse } as WrapHashResponse;
    if (object.user !== undefined && object.user !== null) {
      message.user = object.user;
    } else {
      message.user = "";
    }
    if (object.hash !== undefined && object.hash !== null) {
      message.hash = object.hash;
    } else {
      message.hash = "";
    }
    return message;
  },
};

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
