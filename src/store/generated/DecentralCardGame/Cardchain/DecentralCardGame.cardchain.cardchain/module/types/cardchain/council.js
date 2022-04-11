/* eslint-disable */
import * as Long from "long";
import { util, configure, Writer, Reader } from "protobufjs/minimal";
export const protobufPackage = "DecentralCardGame.cardchain.cardchain";
export var Response;
(function (Response) {
    Response[Response["Yes"] = 0] = "Yes";
    Response[Response["No"] = 1] = "No";
    Response[Response["Suggestion"] = 2] = "Suggestion";
    Response[Response["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(Response || (Response = {}));
export function responseFromJSON(object) {
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
export function responseToJSON(object) {
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
export var CouncelingStatus;
(function (CouncelingStatus) {
    CouncelingStatus[CouncelingStatus["councilOpen"] = 0] = "councilOpen";
    CouncelingStatus[CouncelingStatus["councilCreated"] = 1] = "councilCreated";
    CouncelingStatus[CouncelingStatus["councilClosed"] = 2] = "councilClosed";
    CouncelingStatus[CouncelingStatus["commited"] = 3] = "commited";
    CouncelingStatus[CouncelingStatus["revealed"] = 4] = "revealed";
    CouncelingStatus[CouncelingStatus["suggestionsMade"] = 5] = "suggestionsMade";
    CouncelingStatus[CouncelingStatus["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(CouncelingStatus || (CouncelingStatus = {}));
export function councelingStatusFromJSON(object) {
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
export function councelingStatusToJSON(object) {
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
const baseCouncil = {
    cardId: 0,
    voters: "",
    treasury: "",
    status: 0,
    trialStart: 0,
};
export const Council = {
    encode(message, writer = Writer.create()) {
        if (message.cardId !== 0) {
            writer.uint32(8).uint64(message.cardId);
        }
        for (const v of message.voters) {
            writer.uint32(18).string(v);
        }
        for (const v of message.hashResponses) {
            WrapHashResponse.encode(v, writer.uint32(26).fork()).ldelim();
        }
        for (const v of message.clearResponses) {
            WrapClearResponse.encode(v, writer.uint32(34).fork()).ldelim();
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
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseCouncil };
        message.voters = [];
        message.hashResponses = [];
        message.clearResponses = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.cardId = longToNumber(reader.uint64());
                    break;
                case 2:
                    message.voters.push(reader.string());
                    break;
                case 3:
                    message.hashResponses.push(WrapHashResponse.decode(reader, reader.uint32()));
                    break;
                case 4:
                    message.clearResponses.push(WrapClearResponse.decode(reader, reader.uint32()));
                    break;
                case 5:
                    message.treasury = reader.string();
                    break;
                case 6:
                    message.status = reader.int32();
                    break;
                case 7:
                    message.trialStart = longToNumber(reader.uint64());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseCouncil };
        message.voters = [];
        message.hashResponses = [];
        message.clearResponses = [];
        if (object.cardId !== undefined && object.cardId !== null) {
            message.cardId = Number(object.cardId);
        }
        else {
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
        }
        else {
            message.treasury = "";
        }
        if (object.status !== undefined && object.status !== null) {
            message.status = councelingStatusFromJSON(object.status);
        }
        else {
            message.status = 0;
        }
        if (object.trialStart !== undefined && object.trialStart !== null) {
            message.trialStart = Number(object.trialStart);
        }
        else {
            message.trialStart = 0;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.cardId !== undefined && (obj.cardId = message.cardId);
        if (message.voters) {
            obj.voters = message.voters.map((e) => e);
        }
        else {
            obj.voters = [];
        }
        if (message.hashResponses) {
            obj.hashResponses = message.hashResponses.map((e) => e ? WrapHashResponse.toJSON(e) : undefined);
        }
        else {
            obj.hashResponses = [];
        }
        if (message.clearResponses) {
            obj.clearResponses = message.clearResponses.map((e) => e ? WrapClearResponse.toJSON(e) : undefined);
        }
        else {
            obj.clearResponses = [];
        }
        message.treasury !== undefined && (obj.treasury = message.treasury);
        message.status !== undefined &&
            (obj.status = councelingStatusToJSON(message.status));
        message.trialStart !== undefined && (obj.trialStart = message.trialStart);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseCouncil };
        message.voters = [];
        message.hashResponses = [];
        message.clearResponses = [];
        if (object.cardId !== undefined && object.cardId !== null) {
            message.cardId = object.cardId;
        }
        else {
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
        }
        else {
            message.treasury = "";
        }
        if (object.status !== undefined && object.status !== null) {
            message.status = object.status;
        }
        else {
            message.status = 0;
        }
        if (object.trialStart !== undefined && object.trialStart !== null) {
            message.trialStart = object.trialStart;
        }
        else {
            message.trialStart = 0;
        }
        return message;
    },
};
const baseWrapClearResponse = { user: "", response: 0, suggestion: "" };
export const WrapClearResponse = {
    encode(message, writer = Writer.create()) {
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
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseWrapClearResponse };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.user = reader.string();
                    break;
                case 2:
                    message.response = reader.int32();
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
    fromJSON(object) {
        const message = { ...baseWrapClearResponse };
        if (object.user !== undefined && object.user !== null) {
            message.user = String(object.user);
        }
        else {
            message.user = "";
        }
        if (object.response !== undefined && object.response !== null) {
            message.response = responseFromJSON(object.response);
        }
        else {
            message.response = 0;
        }
        if (object.suggestion !== undefined && object.suggestion !== null) {
            message.suggestion = String(object.suggestion);
        }
        else {
            message.suggestion = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.user !== undefined && (obj.user = message.user);
        message.response !== undefined &&
            (obj.response = responseToJSON(message.response));
        message.suggestion !== undefined && (obj.suggestion = message.suggestion);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseWrapClearResponse };
        if (object.user !== undefined && object.user !== null) {
            message.user = object.user;
        }
        else {
            message.user = "";
        }
        if (object.response !== undefined && object.response !== null) {
            message.response = object.response;
        }
        else {
            message.response = 0;
        }
        if (object.suggestion !== undefined && object.suggestion !== null) {
            message.suggestion = object.suggestion;
        }
        else {
            message.suggestion = "";
        }
        return message;
    },
};
const baseWrapHashResponse = { user: "", hash: "" };
export const WrapHashResponse = {
    encode(message, writer = Writer.create()) {
        if (message.user !== "") {
            writer.uint32(10).string(message.user);
        }
        if (message.hash !== "") {
            writer.uint32(18).string(message.hash);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseWrapHashResponse };
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
    fromJSON(object) {
        const message = { ...baseWrapHashResponse };
        if (object.user !== undefined && object.user !== null) {
            message.user = String(object.user);
        }
        else {
            message.user = "";
        }
        if (object.hash !== undefined && object.hash !== null) {
            message.hash = String(object.hash);
        }
        else {
            message.hash = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.user !== undefined && (obj.user = message.user);
        message.hash !== undefined && (obj.hash = message.hash);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseWrapHashResponse };
        if (object.user !== undefined && object.user !== null) {
            message.user = object.user;
        }
        else {
            message.user = "";
        }
        if (object.hash !== undefined && object.hash !== null) {
            message.hash = object.hash;
        }
        else {
            message.hash = "";
        }
        return message;
    },
};
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
