"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = exports.protobufPackage = void 0;
/* eslint-disable */
const Long = require("long");
const minimal_1 = require("protobufjs/minimal");
exports.protobufPackage = "DecentralCardGame.cardchain.cardchain";
const baseServer = { reporter: "", invalidReports: 0, validReports: 0 };
exports.Server = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.reporter !== "") {
            writer.uint32(10).string(message.reporter);
        }
        if (message.invalidReports !== 0) {
            writer.uint32(16).uint64(message.invalidReports);
        }
        if (message.validReports !== 0) {
            writer.uint32(24).uint64(message.validReports);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseServer };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.reporter = reader.string();
                    break;
                case 2:
                    message.invalidReports = longToNumber(reader.uint64());
                    break;
                case 3:
                    message.validReports = longToNumber(reader.uint64());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseServer };
        if (object.reporter !== undefined && object.reporter !== null) {
            message.reporter = String(object.reporter);
        }
        else {
            message.reporter = "";
        }
        if (object.invalidReports !== undefined && object.invalidReports !== null) {
            message.invalidReports = Number(object.invalidReports);
        }
        else {
            message.invalidReports = 0;
        }
        if (object.validReports !== undefined && object.validReports !== null) {
            message.validReports = Number(object.validReports);
        }
        else {
            message.validReports = 0;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.reporter !== undefined && (obj.reporter = message.reporter);
        message.invalidReports !== undefined &&
            (obj.invalidReports = message.invalidReports);
        message.validReports !== undefined &&
            (obj.validReports = message.validReports);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseServer };
        if (object.reporter !== undefined && object.reporter !== null) {
            message.reporter = object.reporter;
        }
        else {
            message.reporter = "";
        }
        if (object.invalidReports !== undefined && object.invalidReports !== null) {
            message.invalidReports = object.invalidReports;
        }
        else {
            message.invalidReports = 0;
        }
        if (object.validReports !== undefined && object.validReports !== null) {
            message.validReports = object.validReports;
        }
        else {
            message.validReports = 0;
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
