import { Writer, Reader } from "protobufjs/minimal";
export declare const protobufPackage = "DecentralCardGame.cardchain.cardchain";
export interface RunningAverage {
    arr: number[];
}
export declare const RunningAverage: {
    encode(message: RunningAverage, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): RunningAverage;
    fromJSON(object: any): RunningAverage;
    toJSON(message: RunningAverage): unknown;
    fromPartial(object: DeepPartial<RunningAverage>): RunningAverage;
};
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
