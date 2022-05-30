"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryClientImpl = exports.QueryAnnualProvisionsResponse = exports.QueryAnnualProvisionsRequest = exports.QueryInflationResponse = exports.QueryInflationRequest = exports.QueryParamsResponse = exports.QueryParamsRequest = exports.protobufPackage = void 0;
/* eslint-disable */
const minimal_1 = require("protobufjs/minimal");
const mint_1 = require("../../../cosmos/mint/v1beta1/mint");
exports.protobufPackage = "cosmos.mint.v1beta1";
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
            mint_1.Params.encode(message.params, writer.uint32(10).fork()).ldelim();
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
                    message.params = mint_1.Params.decode(reader, reader.uint32());
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
            message.params = mint_1.Params.fromJSON(object.params);
        }
        else {
            message.params = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.params !== undefined &&
            (obj.params = message.params ? mint_1.Params.toJSON(message.params) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryParamsResponse };
        if (object.params !== undefined && object.params !== null) {
            message.params = mint_1.Params.fromPartial(object.params);
        }
        else {
            message.params = undefined;
        }
        return message;
    },
};
const baseQueryInflationRequest = {};
exports.QueryInflationRequest = {
    encode(_, writer = minimal_1.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryInflationRequest };
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
        const message = { ...baseQueryInflationRequest };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = { ...baseQueryInflationRequest };
        return message;
    },
};
const baseQueryInflationResponse = {};
exports.QueryInflationResponse = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.inflation.length !== 0) {
            writer.uint32(10).bytes(message.inflation);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryInflationResponse };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.inflation = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseQueryInflationResponse };
        if (object.inflation !== undefined && object.inflation !== null) {
            message.inflation = bytesFromBase64(object.inflation);
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.inflation !== undefined &&
            (obj.inflation = base64FromBytes(message.inflation !== undefined ? message.inflation : new Uint8Array()));
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryInflationResponse };
        if (object.inflation !== undefined && object.inflation !== null) {
            message.inflation = object.inflation;
        }
        else {
            message.inflation = new Uint8Array();
        }
        return message;
    },
};
const baseQueryAnnualProvisionsRequest = {};
exports.QueryAnnualProvisionsRequest = {
    encode(_, writer = minimal_1.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseQueryAnnualProvisionsRequest,
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
            ...baseQueryAnnualProvisionsRequest,
        };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = {
            ...baseQueryAnnualProvisionsRequest,
        };
        return message;
    },
};
const baseQueryAnnualProvisionsResponse = {};
exports.QueryAnnualProvisionsResponse = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.annual_provisions.length !== 0) {
            writer.uint32(10).bytes(message.annual_provisions);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseQueryAnnualProvisionsResponse,
        };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.annual_provisions = reader.bytes();
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
            ...baseQueryAnnualProvisionsResponse,
        };
        if (object.annual_provisions !== undefined &&
            object.annual_provisions !== null) {
            message.annual_provisions = bytesFromBase64(object.annual_provisions);
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.annual_provisions !== undefined &&
            (obj.annual_provisions = base64FromBytes(message.annual_provisions !== undefined
                ? message.annual_provisions
                : new Uint8Array()));
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseQueryAnnualProvisionsResponse,
        };
        if (object.annual_provisions !== undefined &&
            object.annual_provisions !== null) {
            message.annual_provisions = object.annual_provisions;
        }
        else {
            message.annual_provisions = new Uint8Array();
        }
        return message;
    },
};
class QueryClientImpl {
    constructor(rpc) {
        this.rpc = rpc;
    }
    Params(request) {
        const data = exports.QueryParamsRequest.encode(request).finish();
        const promise = this.rpc.request("cosmos.mint.v1beta1.Query", "Params", data);
        return promise.then((data) => exports.QueryParamsResponse.decode(new minimal_1.Reader(data)));
    }
    Inflation(request) {
        const data = exports.QueryInflationRequest.encode(request).finish();
        const promise = this.rpc.request("cosmos.mint.v1beta1.Query", "Inflation", data);
        return promise.then((data) => exports.QueryInflationResponse.decode(new minimal_1.Reader(data)));
    }
    AnnualProvisions(request) {
        const data = exports.QueryAnnualProvisionsRequest.encode(request).finish();
        const promise = this.rpc.request("cosmos.mint.v1beta1.Query", "AnnualProvisions", data);
        return promise.then((data) => exports.QueryAnnualProvisionsResponse.decode(new minimal_1.Reader(data)));
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
const atob = globalThis.atob ||
    ((b64) => globalThis.Buffer.from(b64, "base64").toString("binary"));
function bytesFromBase64(b64) {
    const bin = atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; ++i) {
        arr[i] = bin.charCodeAt(i);
    }
    return arr;
}
const btoa = globalThis.btoa ||
    ((bin) => globalThis.Buffer.from(bin, "binary").toString("base64"));
function base64FromBytes(arr) {
    const bin = [];
    for (let i = 0; i < arr.byteLength; ++i) {
        bin.push(String.fromCharCode(arr[i]));
    }
    return btoa(bin.join(""));
}
