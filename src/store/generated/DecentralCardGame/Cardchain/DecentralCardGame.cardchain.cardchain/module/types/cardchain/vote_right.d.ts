import { Writer, Reader } from "protobufjs/minimal";
export declare const protobufPackage = "DecentralCardGame.cardchain.cardchain";
export interface VoteRight {
    cardId: number;
    expireBlock: number;
}
export declare const VoteRight: {
    encode(message: VoteRight, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): VoteRight;
    fromJSON(object: any): VoteRight;
    toJSON(message: VoteRight): unknown;
    fromPartial(object: DeepPartial<VoteRight>): VoteRight;
};
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};