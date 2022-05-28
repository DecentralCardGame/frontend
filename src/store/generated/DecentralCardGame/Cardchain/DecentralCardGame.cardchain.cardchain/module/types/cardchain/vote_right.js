"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoteRight = exports.protobufPackage = void 0;
/* eslint-disable */
const Long = require("long");
const minimal_1 = require("protobufjs/minimal");
exports.protobufPackage = "DecentralCardGame.cardchain.cardchain";
const baseVoteRight = { cardId: 0, expireBlock: 0 };
exports.VoteRight = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.cardId !== 0) {
            writer.uint32(8).uint64(message.cardId);
        }
        if (message.expireBlock !== 0) {
            writer.uint32(16).int64(message.expireBlock);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseVoteRight };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.cardId = longToNumber(reader.uint64());
                    break;
                case 2:
                    message.expireBlock = longToNumber(reader.int64());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseVoteRight };
        if (object.cardId !== undefined && object.cardId !== null) {
            message.cardId = Number(object.cardId);
        }
        else {
            message.cardId = 0;
        }
        if (object.expireBlock !== undefined && object.expireBlock !== null) {
            message.expireBlock = Number(object.expireBlock);
        }
        else {
            message.expireBlock = 0;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.cardId !== undefined && (obj.cardId = message.cardId);
        message.expireBlock !== undefined &&
            (obj.expireBlock = message.expireBlock);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseVoteRight };
        if (object.cardId !== undefined && object.cardId !== null) {
            message.cardId = object.cardId;
        }
        else {
            message.cardId = 0;
        }
        if (object.expireBlock !== undefined && object.expireBlock !== null) {
            message.expireBlock = object.expireBlock;
        }
        else {
            message.expireBlock = 0;
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
if (minimal_1.util.Long !== Long) {
    minimal_1.util.Long = Long;
    (0, minimal_1.configure)();
}
