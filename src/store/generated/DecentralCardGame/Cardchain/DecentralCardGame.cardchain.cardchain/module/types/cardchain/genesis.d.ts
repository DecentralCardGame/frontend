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
export declare const protobufPackage = "DecentralCardGame.cardchain.cardchain";
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
export declare const GenesisState: {
    encode(message: GenesisState, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): GenesisState;
    fromJSON(object: any): GenesisState;
    toJSON(message: GenesisState): unknown;
    fromPartial(object: DeepPartial<GenesisState>): GenesisState;
};
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};