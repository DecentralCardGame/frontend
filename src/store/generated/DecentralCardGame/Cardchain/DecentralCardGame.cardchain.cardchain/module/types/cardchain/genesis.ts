/* eslint-disable */
import { Params } from "../cardchain/params";
import { Card } from "../cardchain/card";
import { User } from "../cardchain/user";
import { Match } from "../cardchain/match";
import { Collection } from "../cardchain/collection";
import { SellOffer } from "../cardchain/sell_offer";
import { Coin } from "../cosmos/base/v1beta1/coin";
import { Council } from "../cardchain/council";
import { RunningAverage } from "../cardchain/running_average";
import { Writer, Reader } from "protobufjs/minimal";

export const protobufPackage = "DecentralCardGame.cardchain.cardchain";

/** GenesisState defines the cardchain module's genesis state. */
export interface GenesisState {
  params: Params | undefined;
  cardRecords: Card[];
  users: User[];
  addresses: string[];
  matches: Match[];
  collections: Collection[];
  sellOffers: SellOffer[];
  pools: Coin[];
  cardAuctionPrice: string;
  councils: Council[];
  /** this line is used by starport scaffolding # genesis/proto/state */
  RunningAverages: RunningAverage[];
}

const baseGenesisState: object = { addresses: "", cardAuctionPrice: "" };

export const GenesisState = {
  encode(message: GenesisState, writer: Writer = Writer.create()): Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.cardRecords) {
      Card.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.users) {
      User.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.addresses) {
      writer.uint32(34).string(v!);
    }
    for (const v of message.matches) {
      Match.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    for (const v of message.collections) {
      Collection.encode(v!, writer.uint32(58).fork()).ldelim();
    }
    for (const v of message.sellOffers) {
      SellOffer.encode(v!, writer.uint32(66).fork()).ldelim();
    }
    for (const v of message.pools) {
      Coin.encode(v!, writer.uint32(74).fork()).ldelim();
    }
    if (message.cardAuctionPrice !== "") {
      writer.uint32(90).string(message.cardAuctionPrice);
    }
    for (const v of message.councils) {
      Council.encode(v!, writer.uint32(98).fork()).ldelim();
    }
    for (const v of message.RunningAverages) {
      RunningAverage.encode(v!, writer.uint32(106).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): GenesisState {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGenesisState } as GenesisState;
    message.cardRecords = [];
    message.users = [];
    message.addresses = [];
    message.matches = [];
    message.collections = [];
    message.sellOffers = [];
    message.pools = [];
    message.councils = [];
    message.RunningAverages = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32());
          break;
        case 2:
          message.cardRecords.push(Card.decode(reader, reader.uint32()));
          break;
        case 3:
          message.users.push(User.decode(reader, reader.uint32()));
          break;
        case 4:
          message.addresses.push(reader.string());
          break;
        case 6:
          message.matches.push(Match.decode(reader, reader.uint32()));
          break;
        case 7:
          message.collections.push(Collection.decode(reader, reader.uint32()));
          break;
        case 8:
          message.sellOffers.push(SellOffer.decode(reader, reader.uint32()));
          break;
        case 9:
          message.pools.push(Coin.decode(reader, reader.uint32()));
          break;
        case 11:
          message.cardAuctionPrice = reader.string();
          break;
        case 12:
          message.councils.push(Council.decode(reader, reader.uint32()));
          break;
        case 13:
          message.RunningAverages.push(
            RunningAverage.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GenesisState {
    const message = { ...baseGenesisState } as GenesisState;
    message.cardRecords = [];
    message.users = [];
    message.addresses = [];
    message.matches = [];
    message.collections = [];
    message.sellOffers = [];
    message.pools = [];
    message.councils = [];
    message.RunningAverages = [];
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromJSON(object.params);
    } else {
      message.params = undefined;
    }
    if (object.cardRecords !== undefined && object.cardRecords !== null) {
      for (const e of object.cardRecords) {
        message.cardRecords.push(Card.fromJSON(e));
      }
    }
    if (object.users !== undefined && object.users !== null) {
      for (const e of object.users) {
        message.users.push(User.fromJSON(e));
      }
    }
    if (object.addresses !== undefined && object.addresses !== null) {
      for (const e of object.addresses) {
        message.addresses.push(String(e));
      }
    }
    if (object.matches !== undefined && object.matches !== null) {
      for (const e of object.matches) {
        message.matches.push(Match.fromJSON(e));
      }
    }
    if (object.collections !== undefined && object.collections !== null) {
      for (const e of object.collections) {
        message.collections.push(Collection.fromJSON(e));
      }
    }
    if (object.sellOffers !== undefined && object.sellOffers !== null) {
      for (const e of object.sellOffers) {
        message.sellOffers.push(SellOffer.fromJSON(e));
      }
    }
    if (object.pools !== undefined && object.pools !== null) {
      for (const e of object.pools) {
        message.pools.push(Coin.fromJSON(e));
      }
    }
    if (
      object.cardAuctionPrice !== undefined &&
      object.cardAuctionPrice !== null
    ) {
      message.cardAuctionPrice = String(object.cardAuctionPrice);
    } else {
      message.cardAuctionPrice = "";
    }
    if (object.councils !== undefined && object.councils !== null) {
      for (const e of object.councils) {
        message.councils.push(Council.fromJSON(e));
      }
    }
    if (
      object.RunningAverages !== undefined &&
      object.RunningAverages !== null
    ) {
      for (const e of object.RunningAverages) {
        message.RunningAverages.push(RunningAverage.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    message.params !== undefined &&
      (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    if (message.cardRecords) {
      obj.cardRecords = message.cardRecords.map((e) =>
        e ? Card.toJSON(e) : undefined
      );
    } else {
      obj.cardRecords = [];
    }
    if (message.users) {
      obj.users = message.users.map((e) => (e ? User.toJSON(e) : undefined));
    } else {
      obj.users = [];
    }
    if (message.addresses) {
      obj.addresses = message.addresses.map((e) => e);
    } else {
      obj.addresses = [];
    }
    if (message.matches) {
      obj.matches = message.matches.map((e) =>
        e ? Match.toJSON(e) : undefined
      );
    } else {
      obj.matches = [];
    }
    if (message.collections) {
      obj.collections = message.collections.map((e) =>
        e ? Collection.toJSON(e) : undefined
      );
    } else {
      obj.collections = [];
    }
    if (message.sellOffers) {
      obj.sellOffers = message.sellOffers.map((e) =>
        e ? SellOffer.toJSON(e) : undefined
      );
    } else {
      obj.sellOffers = [];
    }
    if (message.pools) {
      obj.pools = message.pools.map((e) => (e ? Coin.toJSON(e) : undefined));
    } else {
      obj.pools = [];
    }
    message.cardAuctionPrice !== undefined &&
      (obj.cardAuctionPrice = message.cardAuctionPrice);
    if (message.councils) {
      obj.councils = message.councils.map((e) =>
        e ? Council.toJSON(e) : undefined
      );
    } else {
      obj.councils = [];
    }
    if (message.RunningAverages) {
      obj.RunningAverages = message.RunningAverages.map((e) =>
        e ? RunningAverage.toJSON(e) : undefined
      );
    } else {
      obj.RunningAverages = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<GenesisState>): GenesisState {
    const message = { ...baseGenesisState } as GenesisState;
    message.cardRecords = [];
    message.users = [];
    message.addresses = [];
    message.matches = [];
    message.collections = [];
    message.sellOffers = [];
    message.pools = [];
    message.councils = [];
    message.RunningAverages = [];
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromPartial(object.params);
    } else {
      message.params = undefined;
    }
    if (object.cardRecords !== undefined && object.cardRecords !== null) {
      for (const e of object.cardRecords) {
        message.cardRecords.push(Card.fromPartial(e));
      }
    }
    if (object.users !== undefined && object.users !== null) {
      for (const e of object.users) {
        message.users.push(User.fromPartial(e));
      }
    }
    if (object.addresses !== undefined && object.addresses !== null) {
      for (const e of object.addresses) {
        message.addresses.push(e);
      }
    }
    if (object.matches !== undefined && object.matches !== null) {
      for (const e of object.matches) {
        message.matches.push(Match.fromPartial(e));
      }
    }
    if (object.collections !== undefined && object.collections !== null) {
      for (const e of object.collections) {
        message.collections.push(Collection.fromPartial(e));
      }
    }
    if (object.sellOffers !== undefined && object.sellOffers !== null) {
      for (const e of object.sellOffers) {
        message.sellOffers.push(SellOffer.fromPartial(e));
      }
    }
    if (object.pools !== undefined && object.pools !== null) {
      for (const e of object.pools) {
        message.pools.push(Coin.fromPartial(e));
      }
    }
    if (
      object.cardAuctionPrice !== undefined &&
      object.cardAuctionPrice !== null
    ) {
      message.cardAuctionPrice = object.cardAuctionPrice;
    } else {
      message.cardAuctionPrice = "";
    }
    if (object.councils !== undefined && object.councils !== null) {
      for (const e of object.councils) {
        message.councils.push(Council.fromPartial(e));
      }
    }
    if (
      object.RunningAverages !== undefined &&
      object.RunningAverages !== null
    ) {
      for (const e of object.RunningAverages) {
        message.RunningAverages.push(RunningAverage.fromPartial(e));
      }
    }
    return message;
  },
};

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
