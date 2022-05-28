/* eslint-disable */
import { Outcome, outcomeFromJSON, outcomeToJSON } from "../cardchain/tx";
import * as Long from "long";
import { util, configure, Writer, Reader } from "protobufjs/minimal";

export const protobufPackage = "DecentralCardGame.cardchain.cardchain";

export interface Match {
  timestamp: number;
  reporter: string;
  playerA: MatchPlayer | undefined;
  playerB: MatchPlayer | undefined;
  outcome: Outcome;
  coinsDistributed: boolean;
}

export interface MatchPlayer {
  addr: string;
  playedCards: number[];
  confirmed: boolean;
  outcome: Outcome;
}

const baseMatch: object = {
  timestamp: 0,
  reporter: "",
  outcome: 0,
  coinsDistributed: false,
};

export const Match = {
  encode(message: Match, writer: Writer = Writer.create()): Writer {
    if (message.timestamp !== 0) {
      writer.uint32(8).uint64(message.timestamp);
    }
    if (message.reporter !== "") {
      writer.uint32(18).string(message.reporter);
    }
    if (message.playerA !== undefined) {
      MatchPlayer.encode(message.playerA, writer.uint32(26).fork()).ldelim();
    }
    if (message.playerB !== undefined) {
      MatchPlayer.encode(message.playerB, writer.uint32(34).fork()).ldelim();
    }
    if (message.outcome !== 0) {
      writer.uint32(56).int32(message.outcome);
    }
    if (message.coinsDistributed === true) {
      writer.uint32(80).bool(message.coinsDistributed);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Match {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMatch } as Match;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.timestamp = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.reporter = reader.string();
          break;
        case 3:
          message.playerA = MatchPlayer.decode(reader, reader.uint32());
          break;
        case 4:
          message.playerB = MatchPlayer.decode(reader, reader.uint32());
          break;
        case 7:
          message.outcome = reader.int32() as any;
          break;
        case 10:
          message.coinsDistributed = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Match {
    const message = { ...baseMatch } as Match;
    if (object.timestamp !== undefined && object.timestamp !== null) {
      message.timestamp = Number(object.timestamp);
    } else {
      message.timestamp = 0;
    }
    if (object.reporter !== undefined && object.reporter !== null) {
      message.reporter = String(object.reporter);
    } else {
      message.reporter = "";
    }
    if (object.playerA !== undefined && object.playerA !== null) {
      message.playerA = MatchPlayer.fromJSON(object.playerA);
    } else {
      message.playerA = undefined;
    }
    if (object.playerB !== undefined && object.playerB !== null) {
      message.playerB = MatchPlayer.fromJSON(object.playerB);
    } else {
      message.playerB = undefined;
    }
    if (object.outcome !== undefined && object.outcome !== null) {
      message.outcome = outcomeFromJSON(object.outcome);
    } else {
      message.outcome = 0;
    }
    if (
      object.coinsDistributed !== undefined &&
      object.coinsDistributed !== null
    ) {
      message.coinsDistributed = Boolean(object.coinsDistributed);
    } else {
      message.coinsDistributed = false;
    }
    return message;
  },

  toJSON(message: Match): unknown {
    const obj: any = {};
    message.timestamp !== undefined && (obj.timestamp = message.timestamp);
    message.reporter !== undefined && (obj.reporter = message.reporter);
    message.playerA !== undefined &&
      (obj.playerA = message.playerA
        ? MatchPlayer.toJSON(message.playerA)
        : undefined);
    message.playerB !== undefined &&
      (obj.playerB = message.playerB
        ? MatchPlayer.toJSON(message.playerB)
        : undefined);
    message.outcome !== undefined &&
      (obj.outcome = outcomeToJSON(message.outcome));
    message.coinsDistributed !== undefined &&
      (obj.coinsDistributed = message.coinsDistributed);
    return obj;
  },

  fromPartial(object: DeepPartial<Match>): Match {
    const message = { ...baseMatch } as Match;
    if (object.timestamp !== undefined && object.timestamp !== null) {
      message.timestamp = object.timestamp;
    } else {
      message.timestamp = 0;
    }
    if (object.reporter !== undefined && object.reporter !== null) {
      message.reporter = object.reporter;
    } else {
      message.reporter = "";
    }
    if (object.playerA !== undefined && object.playerA !== null) {
      message.playerA = MatchPlayer.fromPartial(object.playerA);
    } else {
      message.playerA = undefined;
    }
    if (object.playerB !== undefined && object.playerB !== null) {
      message.playerB = MatchPlayer.fromPartial(object.playerB);
    } else {
      message.playerB = undefined;
    }
    if (object.outcome !== undefined && object.outcome !== null) {
      message.outcome = object.outcome;
    } else {
      message.outcome = 0;
    }
    if (
      object.coinsDistributed !== undefined &&
      object.coinsDistributed !== null
    ) {
      message.coinsDistributed = object.coinsDistributed;
    } else {
      message.coinsDistributed = false;
    }
    return message;
  },
};

const baseMatchPlayer: object = {
  addr: "",
  playedCards: 0,
  confirmed: false,
  outcome: 0,
};

export const MatchPlayer = {
  encode(message: MatchPlayer, writer: Writer = Writer.create()): Writer {
    if (message.addr !== "") {
      writer.uint32(10).string(message.addr);
    }
    writer.uint32(18).fork();
    for (const v of message.playedCards) {
      writer.uint64(v);
    }
    writer.ldelim();
    if (message.confirmed === true) {
      writer.uint32(24).bool(message.confirmed);
    }
    if (message.outcome !== 0) {
      writer.uint32(32).int32(message.outcome);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MatchPlayer {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMatchPlayer } as MatchPlayer;
    message.playedCards = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.addr = reader.string();
          break;
        case 2:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.playedCards.push(longToNumber(reader.uint64() as Long));
            }
          } else {
            message.playedCards.push(longToNumber(reader.uint64() as Long));
          }
          break;
        case 3:
          message.confirmed = reader.bool();
          break;
        case 4:
          message.outcome = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MatchPlayer {
    const message = { ...baseMatchPlayer } as MatchPlayer;
    message.playedCards = [];
    if (object.addr !== undefined && object.addr !== null) {
      message.addr = String(object.addr);
    } else {
      message.addr = "";
    }
    if (object.playedCards !== undefined && object.playedCards !== null) {
      for (const e of object.playedCards) {
        message.playedCards.push(Number(e));
      }
    }
    if (object.confirmed !== undefined && object.confirmed !== null) {
      message.confirmed = Boolean(object.confirmed);
    } else {
      message.confirmed = false;
    }
    if (object.outcome !== undefined && object.outcome !== null) {
      message.outcome = outcomeFromJSON(object.outcome);
    } else {
      message.outcome = 0;
    }
    return message;
  },

  toJSON(message: MatchPlayer): unknown {
    const obj: any = {};
    message.addr !== undefined && (obj.addr = message.addr);
    if (message.playedCards) {
      obj.playedCards = message.playedCards.map((e) => e);
    } else {
      obj.playedCards = [];
    }
    message.confirmed !== undefined && (obj.confirmed = message.confirmed);
    message.outcome !== undefined &&
      (obj.outcome = outcomeToJSON(message.outcome));
    return obj;
  },

  fromPartial(object: DeepPartial<MatchPlayer>): MatchPlayer {
    const message = { ...baseMatchPlayer } as MatchPlayer;
    message.playedCards = [];
    if (object.addr !== undefined && object.addr !== null) {
      message.addr = object.addr;
    } else {
      message.addr = "";
    }
    if (object.playedCards !== undefined && object.playedCards !== null) {
      for (const e of object.playedCards) {
        message.playedCards.push(e);
      }
    }
    if (object.confirmed !== undefined && object.confirmed !== null) {
      message.confirmed = object.confirmed;
    } else {
      message.confirmed = false;
    }
    if (object.outcome !== undefined && object.outcome !== null) {
      message.outcome = object.outcome;
    } else {
      message.outcome = 0;
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
