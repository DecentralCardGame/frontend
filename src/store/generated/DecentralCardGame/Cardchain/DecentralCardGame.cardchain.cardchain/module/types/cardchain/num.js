"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Num = exports.protobufPackage = void 0;
/* eslint-disable */
const Long = require("long");
const minimal_1 = require("protobufjs/minimal");
exports.protobufPackage = "DecentralCardGame.cardchain.cardchain";
const baseNum = { num: 0 };
exports.Num = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.num !== 0) {
            writer.uint32(8).uint64(message.num);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseNum };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.num = longToNumber(reader.uint64());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseNum };
        if (object.num !== undefined && object.num !== null) {
            message.num = Number(object.num);
        }
        else {
            message.num = 0;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.num !== undefined && (obj.num = message.num);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseNum };
        if (object.num !== undefined && object.num !== null) {
            message.num = object.num;
        }
        else {
            message.num = 0;
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
