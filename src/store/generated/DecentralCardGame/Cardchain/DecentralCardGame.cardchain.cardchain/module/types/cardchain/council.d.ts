import { Writer, Reader } from "protobufjs/minimal";
export declare const protobufPackage = "DecentralCardGame.cardchain.cardchain";
export declare enum Response {
    Yes = 0,
    No = 1,
    Suggestion = 2,
    UNRECOGNIZED = -1
}
export declare function responseFromJSON(object: any): Response;
export declare function responseToJSON(object: Response): string;
export declare enum CouncelingStatus {
    councilOpen = 0,
    councilCreated = 1,
    councilClosed = 2,
    commited = 3,
    revealed = 4,
    suggestionsMade = 5,
    UNRECOGNIZED = -1
}
export declare function councelingStatusFromJSON(object: any): CouncelingStatus;
export declare function councelingStatusToJSON(object: CouncelingStatus): string;
export interface Council {
    cardId: number;
    voters: string[];
    hashResponses: WrapHashResponse[];
    clearResponses: WrapClearResponse[];
    treasury: string;
    status: CouncelingStatus;
    trialStart: number;
}
export interface WrapClearResponse {
    user: string;
    response: Response;
    suggestion: string;
}
export interface WrapHashResponse {
    user: string;
    hash: string;
}
export declare const Council: {
    encode(message: Council, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): Council;
    fromJSON(object: any): Council;
    toJSON(message: Council): unknown;
    fromPartial(object: DeepPartial<Council>): Council;
};
export declare const WrapClearResponse: {
    encode(message: WrapClearResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): WrapClearResponse;
    fromJSON(object: any): WrapClearResponse;
    toJSON(message: WrapClearResponse): unknown;
    fromPartial(object: DeepPartial<WrapClearResponse>): WrapClearResponse;
};
export declare const WrapHashResponse: {
    encode(message: WrapHashResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): WrapHashResponse;
    fromJSON(object: any): WrapHashResponse;
    toJSON(message: WrapHashResponse): unknown;
    fromPartial(object: DeepPartial<WrapHashResponse>): WrapHashResponse;
};
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
