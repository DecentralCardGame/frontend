/* eslint-disable */
import * as Long from "long";
import { util, configure, Writer, Reader } from "protobufjs/minimal";

export const protobufPackage = "DecentralCardGame.cardchain.cardchain";

export interface RunningAverage {
  arr: number[];
}

const baseRunningAverage: object = { arr: 0 };

export const RunningAverage = {
  encode(message: RunningAverage, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).fork();
    for (const v of message.arr) {
      writer.int64(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): RunningAverage {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseRunningAverage } as RunningAverage;
    message.arr = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.arr.push(longToNumber(reader.int64() as Long));
            }
          } else {
            message.arr.push(longToNumber(reader.int64() as Long));
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RunningAverage {
    const message = { ...baseRunningAverage } as RunningAverage;
    message.arr = [];
    if (object.arr !== undefined && object.arr !== null) {
      for (const e of object.arr) {
        message.arr.push(Number(e));
      }
    }
    return message;
  },

  toJSON(message: RunningAverage): unknown {
    const obj: any = {};
    if (message.arr) {
      obj.arr = message.arr.map((e) => e);
    } else {
      obj.arr = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<RunningAverage>): RunningAverage {
    const message = { ...baseRunningAverage } as RunningAverage;
    message.arr = [];
    if (object.arr !== undefined && object.arr !== null) {
      for (const e of object.arr) {
        message.arr.push(e);
      }
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
