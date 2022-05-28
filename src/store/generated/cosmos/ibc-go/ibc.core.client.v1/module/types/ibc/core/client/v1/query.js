"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryClientImpl = exports.QueryUpgradedConsensusStateResponse = exports.QueryUpgradedConsensusStateRequest = exports.QueryUpgradedClientStateResponse = exports.QueryUpgradedClientStateRequest = exports.QueryClientParamsResponse = exports.QueryClientParamsRequest = exports.QueryClientStatusResponse = exports.QueryClientStatusRequest = exports.QueryConsensusStatesResponse = exports.QueryConsensusStatesRequest = exports.QueryConsensusStateResponse = exports.QueryConsensusStateRequest = exports.QueryClientStatesResponse = exports.QueryClientStatesRequest = exports.QueryClientStateResponse = exports.QueryClientStateRequest = exports.protobufPackage = void 0;
/* eslint-disable */
const minimal_1 = require("protobufjs/minimal");
const Long = require("long");
const any_1 = require("../../../../google/protobuf/any");
const client_1 = require("../../../../ibc/core/client/v1/client");
const pagination_1 = require("../../../../cosmos/base/query/v1beta1/pagination");
exports.protobufPackage = "ibc.core.client.v1";
const baseQueryClientStateRequest = { client_id: "" };
exports.QueryClientStateRequest = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.client_id !== "") {
            writer.uint32(10).string(message.client_id);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseQueryClientStateRequest,
        };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.client_id = reader.string();
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
            ...baseQueryClientStateRequest,
        };
        if (object.client_id !== undefined && object.client_id !== null) {
            message.client_id = String(object.client_id);
        }
        else {
            message.client_id = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.client_id !== undefined && (obj.client_id = message.client_id);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseQueryClientStateRequest,
        };
        if (object.client_id !== undefined && object.client_id !== null) {
            message.client_id = object.client_id;
        }
        else {
            message.client_id = "";
        }
        return message;
    },
};
const baseQueryClientStateResponse = {};
exports.QueryClientStateResponse = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.client_state !== undefined) {
            any_1.Any.encode(message.client_state, writer.uint32(10).fork()).ldelim();
        }
        if (message.proof.length !== 0) {
            writer.uint32(18).bytes(message.proof);
        }
        if (message.proof_height !== undefined) {
            client_1.Height.encode(message.proof_height, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseQueryClientStateResponse,
        };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.client_state = any_1.Any.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.proof = reader.bytes();
                    break;
                case 3:
                    message.proof_height = client_1.Height.decode(reader, reader.uint32());
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
            ...baseQueryClientStateResponse,
        };
        if (object.client_state !== undefined && object.client_state !== null) {
            message.client_state = any_1.Any.fromJSON(object.client_state);
        }
        else {
            message.client_state = undefined;
        }
        if (object.proof !== undefined && object.proof !== null) {
            message.proof = bytesFromBase64(object.proof);
        }
        if (object.proof_height !== undefined && object.proof_height !== null) {
            message.proof_height = client_1.Height.fromJSON(object.proof_height);
        }
        else {
            message.proof_height = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.client_state !== undefined &&
            (obj.client_state = message.client_state
                ? any_1.Any.toJSON(message.client_state)
                : undefined);
        message.proof !== undefined &&
            (obj.proof = base64FromBytes(message.proof !== undefined ? message.proof : new Uint8Array()));
        message.proof_height !== undefined &&
            (obj.proof_height = message.proof_height
                ? client_1.Height.toJSON(message.proof_height)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseQueryClientStateResponse,
        };
        if (object.client_state !== undefined && object.client_state !== null) {
            message.client_state = any_1.Any.fromPartial(object.client_state);
        }
        else {
            message.client_state = undefined;
        }
        if (object.proof !== undefined && object.proof !== null) {
            message.proof = object.proof;
        }
        else {
            message.proof = new Uint8Array();
        }
        if (object.proof_height !== undefined && object.proof_height !== null) {
            message.proof_height = client_1.Height.fromPartial(object.proof_height);
        }
        else {
            message.proof_height = undefined;
        }
        return message;
    },
};
const baseQueryClientStatesRequest = {};
exports.QueryClientStatesRequest = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.pagination !== undefined) {
            pagination_1.PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseQueryClientStatesRequest,
        };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.pagination = pagination_1.PageRequest.decode(reader, reader.uint32());
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
            ...baseQueryClientStatesRequest,
        };
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = pagination_1.PageRequest.fromJSON(object.pagination);
        }
        else {
            message.pagination = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.pagination !== undefined &&
            (obj.pagination = message.pagination
                ? pagination_1.PageRequest.toJSON(message.pagination)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseQueryClientStatesRequest,
        };
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = pagination_1.PageRequest.fromPartial(object.pagination);
        }
        else {
            message.pagination = undefined;
        }
        return message;
    },
};
const baseQueryClientStatesResponse = {};
exports.QueryClientStatesResponse = {
    encode(message, writer = minimal_1.Writer.create()) {
        for (const v of message.client_states) {
            client_1.IdentifiedClientState.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            pagination_1.PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseQueryClientStatesResponse,
        };
        message.client_states = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.client_states.push(client_1.IdentifiedClientState.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.pagination = pagination_1.PageResponse.decode(reader, reader.uint32());
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
            ...baseQueryClientStatesResponse,
        };
        message.client_states = [];
        if (object.client_states !== undefined && object.client_states !== null) {
            for (const e of object.client_states) {
                message.client_states.push(client_1.IdentifiedClientState.fromJSON(e));
            }
        }
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = pagination_1.PageResponse.fromJSON(object.pagination);
        }
        else {
            message.pagination = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        if (message.client_states) {
            obj.client_states = message.client_states.map((e) => e ? client_1.IdentifiedClientState.toJSON(e) : undefined);
        }
        else {
            obj.client_states = [];
        }
        message.pagination !== undefined &&
            (obj.pagination = message.pagination
                ? pagination_1.PageResponse.toJSON(message.pagination)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseQueryClientStatesResponse,
        };
        message.client_states = [];
        if (object.client_states !== undefined && object.client_states !== null) {
            for (const e of object.client_states) {
                message.client_states.push(client_1.IdentifiedClientState.fromPartial(e));
            }
        }
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = pagination_1.PageResponse.fromPartial(object.pagination);
        }
        else {
            message.pagination = undefined;
        }
        return message;
    },
};
const baseQueryConsensusStateRequest = {
    client_id: "",
    revision_number: 0,
    revision_height: 0,
    latest_height: false,
};
exports.QueryConsensusStateRequest = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.client_id !== "") {
            writer.uint32(10).string(message.client_id);
        }
        if (message.revision_number !== 0) {
            writer.uint32(16).uint64(message.revision_number);
        }
        if (message.revision_height !== 0) {
            writer.uint32(24).uint64(message.revision_height);
        }
        if (message.latest_height === true) {
            writer.uint32(32).bool(message.latest_height);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseQueryConsensusStateRequest,
        };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.client_id = reader.string();
                    break;
                case 2:
                    message.revision_number = longToNumber(reader.uint64());
                    break;
                case 3:
                    message.revision_height = longToNumber(reader.uint64());
                    break;
                case 4:
                    message.latest_height = reader.bool();
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
            ...baseQueryConsensusStateRequest,
        };
        if (object.client_id !== undefined && object.client_id !== null) {
            message.client_id = String(object.client_id);
        }
        else {
            message.client_id = "";
        }
        if (object.revision_number !== undefined &&
            object.revision_number !== null) {
            message.revision_number = Number(object.revision_number);
        }
        else {
            message.revision_number = 0;
        }
        if (object.revision_height !== undefined &&
            object.revision_height !== null) {
            message.revision_height = Number(object.revision_height);
        }
        else {
            message.revision_height = 0;
        }
        if (object.latest_height !== undefined && object.latest_height !== null) {
            message.latest_height = Boolean(object.latest_height);
        }
        else {
            message.latest_height = false;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.client_id !== undefined && (obj.client_id = message.client_id);
        message.revision_number !== undefined &&
            (obj.revision_number = message.revision_number);
        message.revision_height !== undefined &&
            (obj.revision_height = message.revision_height);
        message.latest_height !== undefined &&
            (obj.latest_height = message.latest_height);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseQueryConsensusStateRequest,
        };
        if (object.client_id !== undefined && object.client_id !== null) {
            message.client_id = object.client_id;
        }
        else {
            message.client_id = "";
        }
        if (object.revision_number !== undefined &&
            object.revision_number !== null) {
            message.revision_number = object.revision_number;
        }
        else {
            message.revision_number = 0;
        }
        if (object.revision_height !== undefined &&
            object.revision_height !== null) {
            message.revision_height = object.revision_height;
        }
        else {
            message.revision_height = 0;
        }
        if (object.latest_height !== undefined && object.latest_height !== null) {
            message.latest_height = object.latest_height;
        }
        else {
            message.latest_height = false;
        }
        return message;
    },
};
const baseQueryConsensusStateResponse = {};
exports.QueryConsensusStateResponse = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.consensus_state !== undefined) {
            any_1.Any.encode(message.consensus_state, writer.uint32(10).fork()).ldelim();
        }
        if (message.proof.length !== 0) {
            writer.uint32(18).bytes(message.proof);
        }
        if (message.proof_height !== undefined) {
            client_1.Height.encode(message.proof_height, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseQueryConsensusStateResponse,
        };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.consensus_state = any_1.Any.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.proof = reader.bytes();
                    break;
                case 3:
                    message.proof_height = client_1.Height.decode(reader, reader.uint32());
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
            ...baseQueryConsensusStateResponse,
        };
        if (object.consensus_state !== undefined &&
            object.consensus_state !== null) {
            message.consensus_state = any_1.Any.fromJSON(object.consensus_state);
        }
        else {
            message.consensus_state = undefined;
        }
        if (object.proof !== undefined && object.proof !== null) {
            message.proof = bytesFromBase64(object.proof);
        }
        if (object.proof_height !== undefined && object.proof_height !== null) {
            message.proof_height = client_1.Height.fromJSON(object.proof_height);
        }
        else {
            message.proof_height = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.consensus_state !== undefined &&
            (obj.consensus_state = message.consensus_state
                ? any_1.Any.toJSON(message.consensus_state)
                : undefined);
        message.proof !== undefined &&
            (obj.proof = base64FromBytes(message.proof !== undefined ? message.proof : new Uint8Array()));
        message.proof_height !== undefined &&
            (obj.proof_height = message.proof_height
                ? client_1.Height.toJSON(message.proof_height)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseQueryConsensusStateResponse,
        };
        if (object.consensus_state !== undefined &&
            object.consensus_state !== null) {
            message.consensus_state = any_1.Any.fromPartial(object.consensus_state);
        }
        else {
            message.consensus_state = undefined;
        }
        if (object.proof !== undefined && object.proof !== null) {
            message.proof = object.proof;
        }
        else {
            message.proof = new Uint8Array();
        }
        if (object.proof_height !== undefined && object.proof_height !== null) {
            message.proof_height = client_1.Height.fromPartial(object.proof_height);
        }
        else {
            message.proof_height = undefined;
        }
        return message;
    },
};
const baseQueryConsensusStatesRequest = { client_id: "" };
exports.QueryConsensusStatesRequest = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.client_id !== "") {
            writer.uint32(10).string(message.client_id);
        }
        if (message.pagination !== undefined) {
            pagination_1.PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseQueryConsensusStatesRequest,
        };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.client_id = reader.string();
                    break;
                case 2:
                    message.pagination = pagination_1.PageRequest.decode(reader, reader.uint32());
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
            ...baseQueryConsensusStatesRequest,
        };
        if (object.client_id !== undefined && object.client_id !== null) {
            message.client_id = String(object.client_id);
        }
        else {
            message.client_id = "";
        }
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = pagination_1.PageRequest.fromJSON(object.pagination);
        }
        else {
            message.pagination = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.client_id !== undefined && (obj.client_id = message.client_id);
        message.pagination !== undefined &&
            (obj.pagination = message.pagination
                ? pagination_1.PageRequest.toJSON(message.pagination)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseQueryConsensusStatesRequest,
        };
        if (object.client_id !== undefined && object.client_id !== null) {
            message.client_id = object.client_id;
        }
        else {
            message.client_id = "";
        }
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = pagination_1.PageRequest.fromPartial(object.pagination);
        }
        else {
            message.pagination = undefined;
        }
        return message;
    },
};
const baseQueryConsensusStatesResponse = {};
exports.QueryConsensusStatesResponse = {
    encode(message, writer = minimal_1.Writer.create()) {
        for (const v of message.consensus_states) {
            client_1.ConsensusStateWithHeight.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            pagination_1.PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseQueryConsensusStatesResponse,
        };
        message.consensus_states = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.consensus_states.push(client_1.ConsensusStateWithHeight.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.pagination = pagination_1.PageResponse.decode(reader, reader.uint32());
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
            ...baseQueryConsensusStatesResponse,
        };
        message.consensus_states = [];
        if (object.consensus_states !== undefined &&
            object.consensus_states !== null) {
            for (const e of object.consensus_states) {
                message.consensus_states.push(client_1.ConsensusStateWithHeight.fromJSON(e));
            }
        }
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = pagination_1.PageResponse.fromJSON(object.pagination);
        }
        else {
            message.pagination = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        if (message.consensus_states) {
            obj.consensus_states = message.consensus_states.map((e) => e ? client_1.ConsensusStateWithHeight.toJSON(e) : undefined);
        }
        else {
            obj.consensus_states = [];
        }
        message.pagination !== undefined &&
            (obj.pagination = message.pagination
                ? pagination_1.PageResponse.toJSON(message.pagination)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseQueryConsensusStatesResponse,
        };
        message.consensus_states = [];
        if (object.consensus_states !== undefined &&
            object.consensus_states !== null) {
            for (const e of object.consensus_states) {
                message.consensus_states.push(client_1.ConsensusStateWithHeight.fromPartial(e));
            }
        }
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = pagination_1.PageResponse.fromPartial(object.pagination);
        }
        else {
            message.pagination = undefined;
        }
        return message;
    },
};
const baseQueryClientStatusRequest = { client_id: "" };
exports.QueryClientStatusRequest = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.client_id !== "") {
            writer.uint32(10).string(message.client_id);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseQueryClientStatusRequest,
        };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.client_id = reader.string();
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
            ...baseQueryClientStatusRequest,
        };
        if (object.client_id !== undefined && object.client_id !== null) {
            message.client_id = String(object.client_id);
        }
        else {
            message.client_id = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.client_id !== undefined && (obj.client_id = message.client_id);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseQueryClientStatusRequest,
        };
        if (object.client_id !== undefined && object.client_id !== null) {
            message.client_id = object.client_id;
        }
        else {
            message.client_id = "";
        }
        return message;
    },
};
const baseQueryClientStatusResponse = { status: "" };
exports.QueryClientStatusResponse = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.status !== "") {
            writer.uint32(10).string(message.status);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseQueryClientStatusResponse,
        };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.status = reader.string();
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
            ...baseQueryClientStatusResponse,
        };
        if (object.status !== undefined && object.status !== null) {
            message.status = String(object.status);
        }
        else {
            message.status = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.status !== undefined && (obj.status = message.status);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseQueryClientStatusResponse,
        };
        if (object.status !== undefined && object.status !== null) {
            message.status = object.status;
        }
        else {
            message.status = "";
        }
        return message;
    },
};
const baseQueryClientParamsRequest = {};
exports.QueryClientParamsRequest = {
    encode(_, writer = minimal_1.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseQueryClientParamsRequest,
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
            ...baseQueryClientParamsRequest,
        };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = {
            ...baseQueryClientParamsRequest,
        };
        return message;
    },
};
const baseQueryClientParamsResponse = {};
exports.QueryClientParamsResponse = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.params !== undefined) {
            client_1.Params.encode(message.params, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseQueryClientParamsResponse,
        };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.params = client_1.Params.decode(reader, reader.uint32());
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
            ...baseQueryClientParamsResponse,
        };
        if (object.params !== undefined && object.params !== null) {
            message.params = client_1.Params.fromJSON(object.params);
        }
        else {
            message.params = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.params !== undefined &&
            (obj.params = message.params ? client_1.Params.toJSON(message.params) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseQueryClientParamsResponse,
        };
        if (object.params !== undefined && object.params !== null) {
            message.params = client_1.Params.fromPartial(object.params);
        }
        else {
            message.params = undefined;
        }
        return message;
    },
};
const baseQueryUpgradedClientStateRequest = {};
exports.QueryUpgradedClientStateRequest = {
    encode(_, writer = minimal_1.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseQueryUpgradedClientStateRequest,
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
            ...baseQueryUpgradedClientStateRequest,
        };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = {
            ...baseQueryUpgradedClientStateRequest,
        };
        return message;
    },
};
const baseQueryUpgradedClientStateResponse = {};
exports.QueryUpgradedClientStateResponse = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.upgraded_client_state !== undefined) {
            any_1.Any.encode(message.upgraded_client_state, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseQueryUpgradedClientStateResponse,
        };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.upgraded_client_state = any_1.Any.decode(reader, reader.uint32());
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
            ...baseQueryUpgradedClientStateResponse,
        };
        if (object.upgraded_client_state !== undefined &&
            object.upgraded_client_state !== null) {
            message.upgraded_client_state = any_1.Any.fromJSON(object.upgraded_client_state);
        }
        else {
            message.upgraded_client_state = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.upgraded_client_state !== undefined &&
            (obj.upgraded_client_state = message.upgraded_client_state
                ? any_1.Any.toJSON(message.upgraded_client_state)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseQueryUpgradedClientStateResponse,
        };
        if (object.upgraded_client_state !== undefined &&
            object.upgraded_client_state !== null) {
            message.upgraded_client_state = any_1.Any.fromPartial(object.upgraded_client_state);
        }
        else {
            message.upgraded_client_state = undefined;
        }
        return message;
    },
};
const baseQueryUpgradedConsensusStateRequest = {};
exports.QueryUpgradedConsensusStateRequest = {
    encode(_, writer = minimal_1.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseQueryUpgradedConsensusStateRequest,
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
            ...baseQueryUpgradedConsensusStateRequest,
        };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = {
            ...baseQueryUpgradedConsensusStateRequest,
        };
        return message;
    },
};
const baseQueryUpgradedConsensusStateResponse = {};
exports.QueryUpgradedConsensusStateResponse = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.upgraded_consensus_state !== undefined) {
            any_1.Any.encode(message.upgraded_consensus_state, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseQueryUpgradedConsensusStateResponse,
        };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.upgraded_consensus_state = any_1.Any.decode(reader, reader.uint32());
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
            ...baseQueryUpgradedConsensusStateResponse,
        };
        if (object.upgraded_consensus_state !== undefined &&
            object.upgraded_consensus_state !== null) {
            message.upgraded_consensus_state = any_1.Any.fromJSON(object.upgraded_consensus_state);
        }
        else {
            message.upgraded_consensus_state = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.upgraded_consensus_state !== undefined &&
            (obj.upgraded_consensus_state = message.upgraded_consensus_state
                ? any_1.Any.toJSON(message.upgraded_consensus_state)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseQueryUpgradedConsensusStateResponse,
        };
        if (object.upgraded_consensus_state !== undefined &&
            object.upgraded_consensus_state !== null) {
            message.upgraded_consensus_state = any_1.Any.fromPartial(object.upgraded_consensus_state);
        }
        else {
            message.upgraded_consensus_state = undefined;
        }
        return message;
    },
};
class QueryClientImpl {
    constructor(rpc) {
        this.rpc = rpc;
    }
    ClientState(request) {
        const data = exports.QueryClientStateRequest.encode(request).finish();
        const promise = this.rpc.request("ibc.core.client.v1.Query", "ClientState", data);
        return promise.then((data) => exports.QueryClientStateResponse.decode(new minimal_1.Reader(data)));
    }
    ClientStates(request) {
        const data = exports.QueryClientStatesRequest.encode(request).finish();
        const promise = this.rpc.request("ibc.core.client.v1.Query", "ClientStates", data);
        return promise.then((data) => exports.QueryClientStatesResponse.decode(new minimal_1.Reader(data)));
    }
    ConsensusState(request) {
        const data = exports.QueryConsensusStateRequest.encode(request).finish();
        const promise = this.rpc.request("ibc.core.client.v1.Query", "ConsensusState", data);
        return promise.then((data) => exports.QueryConsensusStateResponse.decode(new minimal_1.Reader(data)));
    }
    ConsensusStates(request) {
        const data = exports.QueryConsensusStatesRequest.encode(request).finish();
        const promise = this.rpc.request("ibc.core.client.v1.Query", "ConsensusStates", data);
        return promise.then((data) => exports.QueryConsensusStatesResponse.decode(new minimal_1.Reader(data)));
    }
    ClientStatus(request) {
        const data = exports.QueryClientStatusRequest.encode(request).finish();
        const promise = this.rpc.request("ibc.core.client.v1.Query", "ClientStatus", data);
        return promise.then((data) => exports.QueryClientStatusResponse.decode(new minimal_1.Reader(data)));
    }
    ClientParams(request) {
        const data = exports.QueryClientParamsRequest.encode(request).finish();
        const promise = this.rpc.request("ibc.core.client.v1.Query", "ClientParams", data);
        return promise.then((data) => exports.QueryClientParamsResponse.decode(new minimal_1.Reader(data)));
    }
    UpgradedClientState(request) {
        const data = exports.QueryUpgradedClientStateRequest.encode(request).finish();
        const promise = this.rpc.request("ibc.core.client.v1.Query", "UpgradedClientState", data);
        return promise.then((data) => exports.QueryUpgradedClientStateResponse.decode(new minimal_1.Reader(data)));
    }
    UpgradedConsensusState(request) {
        const data = exports.QueryUpgradedConsensusStateRequest.encode(request).finish();
        const promise = this.rpc.request("ibc.core.client.v1.Query", "UpgradedConsensusState", data);
        return promise.then((data) => exports.QueryUpgradedConsensusStateResponse.decode(new minimal_1.Reader(data)));
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
