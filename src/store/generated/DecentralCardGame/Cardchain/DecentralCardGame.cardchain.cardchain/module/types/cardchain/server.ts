/* eslint-disable */
import * as Long from "long";
import { util, configure, Writer, Reader } from "protobufjs/minimal";

export const protobufPackage = "DecentralCardGame.cardchain.cardchain";

export interface Server {
  reporter: string;
  invalidReports: number;
  validReports: number;
}

const baseServer: object = { reporter: "", invalidReports: 0, validReports: 0 };

export const Server = {
  encode(message: Server, writer: Writer = Writer.create()): Writer {
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

  decode(input: Reader | Uint8Array, length?: number): Server {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseServer } as Server;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.reporter = reader.string();
          break;
        case 2:
          message.invalidReports = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.validReports = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Server {
    const message = { ...baseServer } as Server;
    if (object.reporter !== undefined && object.reporter !== null) {
      message.reporter = String(object.reporter);
    } else {
      message.reporter = "";
    }
    if (object.invalidReports !== undefined && object.invalidReports !== null) {
      message.invalidReports = Number(object.invalidReports);
    } else {
      message.invalidReports = 0;
    }
    if (object.validReports !== undefined && object.validReports !== null) {
      message.validReports = Number(object.validReports);
    } else {
      message.validReports = 0;
    }
    return message;
  },

  toJSON(message: Server): unknown {
    const obj: any = {};
    message.reporter !== undefined && (obj.reporter = message.reporter);
    message.invalidReports !== undefined &&
      (obj.invalidReports = message.invalidReports);
    message.validReports !== undefined &&
      (obj.validReports = message.validReports);
    return obj;
  },

  fromPartial(object: DeepPartial<Server>): Server {
    const message = { ...baseServer } as Server;
    if (object.reporter !== undefined && object.reporter !== null) {
      message.reporter = object.reporter;
    } else {
      message.reporter = "";
    }
    if (object.invalidReports !== undefined && object.invalidReports !== null) {
      message.invalidReports = object.invalidReports;
    } else {
      message.invalidReports = 0;
    }
    if (object.validReports !== undefined && object.validReports !== null) {
      message.validReports = object.validReports;
    } else {
      message.validReports = 0;
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
