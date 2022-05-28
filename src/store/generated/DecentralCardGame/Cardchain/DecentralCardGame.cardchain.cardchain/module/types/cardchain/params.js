"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Params = exports.protobufPackage = void 0;
/* eslint-disable */
const Long = require("long");
const minimal_1 = require("protobufjs/minimal");
exports.protobufPackage = "DecentralCardGame.cardchain.cardchain";
const baseParams = {
    votingRightsExpirationTime: 0,
    collectionSize: 0,
    collectionPrice: "",
    activeCollectionsAmount: 0,
    collectionCreationFee: "",
    collateralDeposit: "",
    winnerReward: 0,
    voterReward: 0,
    hourlyFaucet: "",
    inflationRate: "",
    raresPerPack: 0,
    commonsPerPack: 0,
    unCommonsPerPack: 0,
    trialPeriod: 0,
    gameVoteRatio: 0,
    cardAuctionPriceReductionPeriod: 0,
};
exports.Params = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.votingRightsExpirationTime !== 0) {
            writer.uint32(8).int64(message.votingRightsExpirationTime);
        }
        if (message.collectionSize !== 0) {
            writer.uint32(16).uint64(message.collectionSize);
        }
        if (message.collectionPrice !== "") {
            writer.uint32(26).string(message.collectionPrice);
        }
        if (message.activeCollectionsAmount !== 0) {
            writer.uint32(32).uint64(message.activeCollectionsAmount);
        }
        if (message.collectionCreationFee !== "") {
            writer.uint32(42).string(message.collectionCreationFee);
        }
        if (message.collateralDeposit !== "") {
            writer.uint32(50).string(message.collateralDeposit);
        }
        if (message.winnerReward !== 0) {
            writer.uint32(56).int64(message.winnerReward);
        }
        if (message.voterReward !== 0) {
            writer.uint32(64).int64(message.voterReward);
        }
        if (message.hourlyFaucet !== "") {
            writer.uint32(74).string(message.hourlyFaucet);
        }
        if (message.inflationRate !== "") {
            writer.uint32(82).string(message.inflationRate);
        }
        if (message.raresPerPack !== 0) {
            writer.uint32(88).uint64(message.raresPerPack);
        }
        if (message.commonsPerPack !== 0) {
            writer.uint32(96).uint64(message.commonsPerPack);
        }
        if (message.unCommonsPerPack !== 0) {
            writer.uint32(104).uint64(message.unCommonsPerPack);
        }
        if (message.trialPeriod !== 0) {
            writer.uint32(112).uint64(message.trialPeriod);
        }
        if (message.gameVoteRatio !== 0) {
            writer.uint32(120).int64(message.gameVoteRatio);
        }
        if (message.cardAuctionPriceReductionPeriod !== 0) {
            writer.uint32(128).int64(message.cardAuctionPriceReductionPeriod);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseParams };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.votingRightsExpirationTime = longToNumber(reader.int64());
                    break;
                case 2:
                    message.collectionSize = longToNumber(reader.uint64());
                    break;
                case 3:
                    message.collectionPrice = reader.string();
                    break;
                case 4:
                    message.activeCollectionsAmount = longToNumber(reader.uint64());
                    break;
                case 5:
                    message.collectionCreationFee = reader.string();
                    break;
                case 6:
                    message.collateralDeposit = reader.string();
                    break;
                case 7:
                    message.winnerReward = longToNumber(reader.int64());
                    break;
                case 8:
                    message.voterReward = longToNumber(reader.int64());
                    break;
                case 9:
                    message.hourlyFaucet = reader.string();
                    break;
                case 10:
                    message.inflationRate = reader.string();
                    break;
                case 11:
                    message.raresPerPack = longToNumber(reader.uint64());
                    break;
                case 12:
                    message.commonsPerPack = longToNumber(reader.uint64());
                    break;
                case 13:
                    message.unCommonsPerPack = longToNumber(reader.uint64());
                    break;
                case 14:
                    message.trialPeriod = longToNumber(reader.uint64());
                    break;
                case 15:
                    message.gameVoteRatio = longToNumber(reader.int64());
                    break;
                case 16:
                    message.cardAuctionPriceReductionPeriod = longToNumber(reader.int64());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseParams };
        if (object.votingRightsExpirationTime !== undefined &&
            object.votingRightsExpirationTime !== null) {
            message.votingRightsExpirationTime = Number(object.votingRightsExpirationTime);
        }
        else {
            message.votingRightsExpirationTime = 0;
        }
        if (object.collectionSize !== undefined && object.collectionSize !== null) {
            message.collectionSize = Number(object.collectionSize);
        }
        else {
            message.collectionSize = 0;
        }
        if (object.collectionPrice !== undefined &&
            object.collectionPrice !== null) {
            message.collectionPrice = String(object.collectionPrice);
        }
        else {
            message.collectionPrice = "";
        }
        if (object.activeCollectionsAmount !== undefined &&
            object.activeCollectionsAmount !== null) {
            message.activeCollectionsAmount = Number(object.activeCollectionsAmount);
        }
        else {
            message.activeCollectionsAmount = 0;
        }
        if (object.collectionCreationFee !== undefined &&
            object.collectionCreationFee !== null) {
            message.collectionCreationFee = String(object.collectionCreationFee);
        }
        else {
            message.collectionCreationFee = "";
        }
        if (object.collateralDeposit !== undefined &&
            object.collateralDeposit !== null) {
            message.collateralDeposit = String(object.collateralDeposit);
        }
        else {
            message.collateralDeposit = "";
        }
        if (object.winnerReward !== undefined && object.winnerReward !== null) {
            message.winnerReward = Number(object.winnerReward);
        }
        else {
            message.winnerReward = 0;
        }
        if (object.voterReward !== undefined && object.voterReward !== null) {
            message.voterReward = Number(object.voterReward);
        }
        else {
            message.voterReward = 0;
        }
        if (object.hourlyFaucet !== undefined && object.hourlyFaucet !== null) {
            message.hourlyFaucet = String(object.hourlyFaucet);
        }
        else {
            message.hourlyFaucet = "";
        }
        if (object.inflationRate !== undefined && object.inflationRate !== null) {
            message.inflationRate = String(object.inflationRate);
        }
        else {
            message.inflationRate = "";
        }
        if (object.raresPerPack !== undefined && object.raresPerPack !== null) {
            message.raresPerPack = Number(object.raresPerPack);
        }
        else {
            message.raresPerPack = 0;
        }
        if (object.commonsPerPack !== undefined && object.commonsPerPack !== null) {
            message.commonsPerPack = Number(object.commonsPerPack);
        }
        else {
            message.commonsPerPack = 0;
        }
        if (object.unCommonsPerPack !== undefined &&
            object.unCommonsPerPack !== null) {
            message.unCommonsPerPack = Number(object.unCommonsPerPack);
        }
        else {
            message.unCommonsPerPack = 0;
        }
        if (object.trialPeriod !== undefined && object.trialPeriod !== null) {
            message.trialPeriod = Number(object.trialPeriod);
        }
        else {
            message.trialPeriod = 0;
        }
        if (object.gameVoteRatio !== undefined && object.gameVoteRatio !== null) {
            message.gameVoteRatio = Number(object.gameVoteRatio);
        }
        else {
            message.gameVoteRatio = 0;
        }
        if (object.cardAuctionPriceReductionPeriod !== undefined &&
            object.cardAuctionPriceReductionPeriod !== null) {
            message.cardAuctionPriceReductionPeriod = Number(object.cardAuctionPriceReductionPeriod);
        }
        else {
            message.cardAuctionPriceReductionPeriod = 0;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.votingRightsExpirationTime !== undefined &&
            (obj.votingRightsExpirationTime = message.votingRightsExpirationTime);
        message.collectionSize !== undefined &&
            (obj.collectionSize = message.collectionSize);
        message.collectionPrice !== undefined &&
            (obj.collectionPrice = message.collectionPrice);
        message.activeCollectionsAmount !== undefined &&
            (obj.activeCollectionsAmount = message.activeCollectionsAmount);
        message.collectionCreationFee !== undefined &&
            (obj.collectionCreationFee = message.collectionCreationFee);
        message.collateralDeposit !== undefined &&
            (obj.collateralDeposit = message.collateralDeposit);
        message.winnerReward !== undefined &&
            (obj.winnerReward = message.winnerReward);
        message.voterReward !== undefined &&
            (obj.voterReward = message.voterReward);
        message.hourlyFaucet !== undefined &&
            (obj.hourlyFaucet = message.hourlyFaucet);
        message.inflationRate !== undefined &&
            (obj.inflationRate = message.inflationRate);
        message.raresPerPack !== undefined &&
            (obj.raresPerPack = message.raresPerPack);
        message.commonsPerPack !== undefined &&
            (obj.commonsPerPack = message.commonsPerPack);
        message.unCommonsPerPack !== undefined &&
            (obj.unCommonsPerPack = message.unCommonsPerPack);
        message.trialPeriod !== undefined &&
            (obj.trialPeriod = message.trialPeriod);
        message.gameVoteRatio !== undefined &&
            (obj.gameVoteRatio = message.gameVoteRatio);
        message.cardAuctionPriceReductionPeriod !== undefined &&
            (obj.cardAuctionPriceReductionPeriod =
                message.cardAuctionPriceReductionPeriod);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseParams };
        if (object.votingRightsExpirationTime !== undefined &&
            object.votingRightsExpirationTime !== null) {
            message.votingRightsExpirationTime = object.votingRightsExpirationTime;
        }
        else {
            message.votingRightsExpirationTime = 0;
        }
        if (object.collectionSize !== undefined && object.collectionSize !== null) {
            message.collectionSize = object.collectionSize;
        }
        else {
            message.collectionSize = 0;
        }
        if (object.collectionPrice !== undefined &&
            object.collectionPrice !== null) {
            message.collectionPrice = object.collectionPrice;
        }
        else {
            message.collectionPrice = "";
        }
        if (object.activeCollectionsAmount !== undefined &&
            object.activeCollectionsAmount !== null) {
            message.activeCollectionsAmount = object.activeCollectionsAmount;
        }
        else {
            message.activeCollectionsAmount = 0;
        }
        if (object.collectionCreationFee !== undefined &&
            object.collectionCreationFee !== null) {
            message.collectionCreationFee = object.collectionCreationFee;
        }
        else {
            message.collectionCreationFee = "";
        }
        if (object.collateralDeposit !== undefined &&
            object.collateralDeposit !== null) {
            message.collateralDeposit = object.collateralDeposit;
        }
        else {
            message.collateralDeposit = "";
        }
        if (object.winnerReward !== undefined && object.winnerReward !== null) {
            message.winnerReward = object.winnerReward;
        }
        else {
            message.winnerReward = 0;
        }
        if (object.voterReward !== undefined && object.voterReward !== null) {
            message.voterReward = object.voterReward;
        }
        else {
            message.voterReward = 0;
        }
        if (object.hourlyFaucet !== undefined && object.hourlyFaucet !== null) {
            message.hourlyFaucet = object.hourlyFaucet;
        }
        else {
            message.hourlyFaucet = "";
        }
        if (object.inflationRate !== undefined && object.inflationRate !== null) {
            message.inflationRate = object.inflationRate;
        }
        else {
            message.inflationRate = "";
        }
        if (object.raresPerPack !== undefined && object.raresPerPack !== null) {
            message.raresPerPack = object.raresPerPack;
        }
        else {
            message.raresPerPack = 0;
        }
        if (object.commonsPerPack !== undefined && object.commonsPerPack !== null) {
            message.commonsPerPack = object.commonsPerPack;
        }
        else {
            message.commonsPerPack = 0;
        }
        if (object.unCommonsPerPack !== undefined &&
            object.unCommonsPerPack !== null) {
            message.unCommonsPerPack = object.unCommonsPerPack;
        }
        else {
            message.unCommonsPerPack = 0;
        }
        if (object.trialPeriod !== undefined && object.trialPeriod !== null) {
            message.trialPeriod = object.trialPeriod;
        }
        else {
            message.trialPeriod = 0;
        }
        if (object.gameVoteRatio !== undefined && object.gameVoteRatio !== null) {
            message.gameVoteRatio = object.gameVoteRatio;
        }
        else {
            message.gameVoteRatio = 0;
        }
        if (object.cardAuctionPriceReductionPeriod !== undefined &&
            object.cardAuctionPriceReductionPeriod !== null) {
            message.cardAuctionPriceReductionPeriod =
                object.cardAuctionPriceReductionPeriod;
        }
        else {
            message.cardAuctionPriceReductionPeriod = 0;
        }
        return message;
    },
};
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
