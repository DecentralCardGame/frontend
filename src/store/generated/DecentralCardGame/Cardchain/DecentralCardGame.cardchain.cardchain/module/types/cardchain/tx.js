"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MsgBuyCardResponse = exports.MsgBuyCard = exports.MsgCreateSellOfferResponse = exports.MsgCreateSellOffer = exports.MsgSubmitCollectionProposalResponse = exports.MsgSubmitCollectionProposal = exports.MsgAddContributorToCollectionResponse = exports.MsgAddContributorToCollection = exports.MsgRemoveContributorFromCollectionResponse = exports.MsgRemoveContributorFromCollection = exports.MsgRemoveCardFromCollectionResponse = exports.MsgRemoveCardFromCollection = exports.MsgBuyCollectionResponse = exports.MsgBuyCollection = exports.MsgFinalizeCollectionResponse = exports.MsgFinalizeCollection = exports.MsgAddCardToCollectionResponse = exports.MsgAddCardToCollection = exports.MsgCreateCollectionResponse = exports.MsgCreateCollection = exports.MsgApointMatchReporterResponse = exports.MsgApointMatchReporter = exports.MsgSubmitMatchReporterProposalResponse = exports.MsgSubmitMatchReporterProposal = exports.MsgReportMatchResponse = exports.MsgReportMatch = exports.MsgRegisterForCouncilResponse = exports.MsgRegisterForCouncil = exports.MsgChangeArtistResponse = exports.MsgChangeArtist = exports.MsgSubmitCopyrightProposalResponse = exports.MsgSubmitCopyrightProposal = exports.MsgAddArtworkResponse = exports.MsgAddArtwork = exports.MsgDonateToCardResponse = exports.MsgDonateToCard = exports.MsgTransferCardResponse = exports.MsgTransferCard = exports.MsgSaveCardContentResponse = exports.MsgSaveCardContent = exports.MsgVoteCardResponse = exports.MsgVoteCard = exports.MsgBuyCardSchemeResponse = exports.MsgBuyCardScheme = exports.MsgCreateuserResponse = exports.MsgCreateuser = exports.outcomeToJSON = exports.outcomeFromJSON = exports.Outcome = exports.protobufPackage = void 0;
exports.MsgClientImpl = exports.MsgSetProfileCardResponse = exports.MsgSetProfileCard = exports.MsgConfirmMatchResponse = exports.MsgConfirmMatch = exports.MsgRewokeCouncilRegistrationResponse = exports.MsgRewokeCouncilRegistration = exports.MsgRestartCouncilResponse = exports.MsgRestartCouncil = exports.MsgRevealCouncilResponseResponse = exports.MsgRevealCouncilResponse = exports.MsgCommitCouncilResponseResponse = exports.MsgCommitCouncilResponse = exports.MsgCreateCouncilResponse = exports.MsgCreateCouncil = exports.MsgSetCardRarityResponse = exports.MsgSetCardRarity = exports.MsgAddStoryToCollectionResponse = exports.MsgAddStoryToCollection = exports.MsgAddArtworkToCollectionResponse = exports.MsgAddArtworkToCollection = exports.MsgRemoveSellOfferResponse = exports.MsgRemoveSellOffer = void 0;
/* eslint-disable */
const council_1 = require("../cardchain/council");
const minimal_1 = require("protobufjs/minimal");
const Long = require("long");
exports.protobufPackage = "DecentralCardGame.cardchain.cardchain";
var Outcome;
(function (Outcome) {
    Outcome[Outcome["AWon"] = 0] = "AWon";
    Outcome[Outcome["BWon"] = 1] = "BWon";
    Outcome[Outcome["Draw"] = 2] = "Draw";
    Outcome[Outcome["Aborted"] = 3] = "Aborted";
    Outcome[Outcome["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(Outcome = exports.Outcome || (exports.Outcome = {}));
function outcomeFromJSON(object) {
    switch (object) {
        case 0:
        case "AWon":
            return Outcome.AWon;
        case 1:
        case "BWon":
            return Outcome.BWon;
        case 2:
        case "Draw":
            return Outcome.Draw;
        case 3:
        case "Aborted":
            return Outcome.Aborted;
        case -1:
        case "UNRECOGNIZED":
        default:
            return Outcome.UNRECOGNIZED;
    }
}
exports.outcomeFromJSON = outcomeFromJSON;
function outcomeToJSON(object) {
    switch (object) {
        case Outcome.AWon:
            return "AWon";
        case Outcome.BWon:
            return "BWon";
        case Outcome.Draw:
            return "Draw";
        case Outcome.Aborted:
            return "Aborted";
        default:
            return "UNKNOWN";
    }
}
exports.outcomeToJSON = outcomeToJSON;
const baseMsgCreateuser = { creator: "", newUser: "", alias: "" };
exports.MsgCreateuser = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.newUser !== "") {
            writer.uint32(18).string(message.newUser);
        }
        if (message.alias !== "") {
            writer.uint32(26).string(message.alias);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgCreateuser };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.newUser = reader.string();
                    break;
                case 3:
                    message.alias = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgCreateuser };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = "";
        }
        if (object.newUser !== undefined && object.newUser !== null) {
            message.newUser = String(object.newUser);
        }
        else {
            message.newUser = "";
        }
        if (object.alias !== undefined && object.alias !== null) {
            message.alias = String(object.alias);
        }
        else {
            message.alias = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.newUser !== undefined && (obj.newUser = message.newUser);
        message.alias !== undefined && (obj.alias = message.alias);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgCreateuser };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = "";
        }
        if (object.newUser !== undefined && object.newUser !== null) {
            message.newUser = object.newUser;
        }
        else {
            message.newUser = "";
        }
        if (object.alias !== undefined && object.alias !== null) {
            message.alias = object.alias;
        }
        else {
            message.alias = "";
        }
        return message;
    },
};
const baseMsgCreateuserResponse = {};
exports.MsgCreateuserResponse = {
    encode(_, writer = minimal_1.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgCreateuserResponse };
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
        const message = { ...baseMsgCreateuserResponse };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = { ...baseMsgCreateuserResponse };
        return message;
    },
};
const baseMsgBuyCardScheme = { creator: "", bid: "" };
exports.MsgBuyCardScheme = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.bid !== "") {
            writer.uint32(18).string(message.bid);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgBuyCardScheme };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.bid = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgBuyCardScheme };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = "";
        }
        if (object.bid !== undefined && object.bid !== null) {
            message.bid = String(object.bid);
        }
        else {
            message.bid = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.bid !== undefined && (obj.bid = message.bid);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgBuyCardScheme };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = "";
        }
        if (object.bid !== undefined && object.bid !== null) {
            message.bid = object.bid;
        }
        else {
            message.bid = "";
        }
        return message;
    },
};
const baseMsgBuyCardSchemeResponse = {};
exports.MsgBuyCardSchemeResponse = {
    encode(_, writer = minimal_1.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgBuyCardSchemeResponse,
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
            ...baseMsgBuyCardSchemeResponse,
        };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = {
            ...baseMsgBuyCardSchemeResponse,
        };
        return message;
    },
};
const baseMsgVoteCard = { creator: "", cardId: 0, voteType: "" };
exports.MsgVoteCard = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.cardId !== 0) {
            writer.uint32(16).uint64(message.cardId);
        }
        if (message.voteType !== "") {
            writer.uint32(26).string(message.voteType);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgVoteCard };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.cardId = longToNumber(reader.uint64());
                    break;
                case 3:
                    message.voteType = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgVoteCard };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = "";
        }
        if (object.cardId !== undefined && object.cardId !== null) {
            message.cardId = Number(object.cardId);
        }
        else {
            message.cardId = 0;
        }
        if (object.voteType !== undefined && object.voteType !== null) {
            message.voteType = String(object.voteType);
        }
        else {
            message.voteType = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.cardId !== undefined && (obj.cardId = message.cardId);
        message.voteType !== undefined && (obj.voteType = message.voteType);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgVoteCard };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = "";
        }
        if (object.cardId !== undefined && object.cardId !== null) {
            message.cardId = object.cardId;
        }
        else {
            message.cardId = 0;
        }
        if (object.voteType !== undefined && object.voteType !== null) {
            message.voteType = object.voteType;
        }
        else {
            message.voteType = "";
        }
        return message;
    },
};
const baseMsgVoteCardResponse = {};
exports.MsgVoteCardResponse = {
    encode(_, writer = minimal_1.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgVoteCardResponse };
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
        const message = { ...baseMsgVoteCardResponse };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = { ...baseMsgVoteCardResponse };
        return message;
    },
};
const baseMsgSaveCardContent = {
    creator: "",
    cardId: 0,
    notes: "",
    artist: "",
};
exports.MsgSaveCardContent = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.cardId !== 0) {
            writer.uint32(16).uint64(message.cardId);
        }
        if (message.content.length !== 0) {
            writer.uint32(26).bytes(message.content);
        }
        if (message.notes !== "") {
            writer.uint32(34).string(message.notes);
        }
        if (message.artist !== "") {
            writer.uint32(42).string(message.artist);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgSaveCardContent };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.cardId = longToNumber(reader.uint64());
                    break;
                case 3:
                    message.content = reader.bytes();
                    break;
                case 4:
                    message.notes = reader.string();
                    break;
                case 5:
                    message.artist = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgSaveCardContent };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = "";
        }
        if (object.cardId !== undefined && object.cardId !== null) {
            message.cardId = Number(object.cardId);
        }
        else {
            message.cardId = 0;
        }
        if (object.content !== undefined && object.content !== null) {
            message.content = bytesFromBase64(object.content);
        }
        if (object.notes !== undefined && object.notes !== null) {
            message.notes = String(object.notes);
        }
        else {
            message.notes = "";
        }
        if (object.artist !== undefined && object.artist !== null) {
            message.artist = String(object.artist);
        }
        else {
            message.artist = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.cardId !== undefined && (obj.cardId = message.cardId);
        message.content !== undefined &&
            (obj.content = base64FromBytes(message.content !== undefined ? message.content : new Uint8Array()));
        message.notes !== undefined && (obj.notes = message.notes);
        message.artist !== undefined && (obj.artist = message.artist);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgSaveCardContent };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = "";
        }
        if (object.cardId !== undefined && object.cardId !== null) {
            message.cardId = object.cardId;
        }
        else {
            message.cardId = 0;
        }
        if (object.content !== undefined && object.content !== null) {
            message.content = object.content;
        }
        else {
            message.content = new Uint8Array();
        }
        if (object.notes !== undefined && object.notes !== null) {
            message.notes = object.notes;
        }
        else {
            message.notes = "";
        }
        if (object.artist !== undefined && object.artist !== null) {
            message.artist = object.artist;
        }
        else {
            message.artist = "";
        }
        return message;
    },
};
const baseMsgSaveCardContentResponse = {};
exports.MsgSaveCardContentResponse = {
    encode(_, writer = minimal_1.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgSaveCardContentResponse,
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
            ...baseMsgSaveCardContentResponse,
        };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = {
            ...baseMsgSaveCardContentResponse,
        };
        return message;
    },
};
const baseMsgTransferCard = { creator: "", cardId: 0, receiver: "" };
exports.MsgTransferCard = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.cardId !== 0) {
            writer.uint32(16).uint64(message.cardId);
        }
        if (message.receiver !== "") {
            writer.uint32(34).string(message.receiver);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgTransferCard };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.cardId = longToNumber(reader.uint64());
                    break;
                case 4:
                    message.receiver = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgTransferCard };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = "";
        }
        if (object.cardId !== undefined && object.cardId !== null) {
            message.cardId = Number(object.cardId);
        }
        else {
            message.cardId = 0;
        }
        if (object.receiver !== undefined && object.receiver !== null) {
            message.receiver = String(object.receiver);
        }
        else {
            message.receiver = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.cardId !== undefined && (obj.cardId = message.cardId);
        message.receiver !== undefined && (obj.receiver = message.receiver);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgTransferCard };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = "";
        }
        if (object.cardId !== undefined && object.cardId !== null) {
            message.cardId = object.cardId;
        }
        else {
            message.cardId = 0;
        }
        if (object.receiver !== undefined && object.receiver !== null) {
            message.receiver = object.receiver;
        }
        else {
            message.receiver = "";
        }
        return message;
    },
};
const baseMsgTransferCardResponse = {};
exports.MsgTransferCardResponse = {
    encode(_, writer = minimal_1.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgTransferCardResponse,
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
            ...baseMsgTransferCardResponse,
        };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = {
            ...baseMsgTransferCardResponse,
        };
        return message;
    },
};
const baseMsgDonateToCard = { creator: "", cardId: 0, amount: "" };
exports.MsgDonateToCard = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.cardId !== 0) {
            writer.uint32(16).uint64(message.cardId);
        }
        if (message.amount !== "") {
            writer.uint32(26).string(message.amount);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgDonateToCard };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.cardId = longToNumber(reader.uint64());
                    break;
                case 3:
                    message.amount = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgDonateToCard };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = "";
        }
        if (object.cardId !== undefined && object.cardId !== null) {
            message.cardId = Number(object.cardId);
        }
        else {
            message.cardId = 0;
        }
        if (object.amount !== undefined && object.amount !== null) {
            message.amount = String(object.amount);
        }
        else {
            message.amount = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.cardId !== undefined && (obj.cardId = message.cardId);
        message.amount !== undefined && (obj.amount = message.amount);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgDonateToCard };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = "";
        }
        if (object.cardId !== undefined && object.cardId !== null) {
            message.cardId = object.cardId;
        }
        else {
            message.cardId = 0;
        }
        if (object.amount !== undefined && object.amount !== null) {
            message.amount = object.amount;
        }
        else {
            message.amount = "";
        }
        return message;
    },
};
const baseMsgDonateToCardResponse = {};
exports.MsgDonateToCardResponse = {
    encode(_, writer = minimal_1.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgDonateToCardResponse,
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
            ...baseMsgDonateToCardResponse,
        };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = {
            ...baseMsgDonateToCardResponse,
        };
        return message;
    },
};
const baseMsgAddArtwork = { creator: "", cardId: 0, fullArt: false };
exports.MsgAddArtwork = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.cardId !== 0) {
            writer.uint32(16).uint64(message.cardId);
        }
        if (message.image.length !== 0) {
            writer.uint32(26).bytes(message.image);
        }
        if (message.fullArt === true) {
            writer.uint32(32).bool(message.fullArt);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgAddArtwork };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.cardId = longToNumber(reader.uint64());
                    break;
                case 3:
                    message.image = reader.bytes();
                    break;
                case 4:
                    message.fullArt = reader.bool();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgAddArtwork };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = "";
        }
        if (object.cardId !== undefined && object.cardId !== null) {
            message.cardId = Number(object.cardId);
        }
        else {
            message.cardId = 0;
        }
        if (object.image !== undefined && object.image !== null) {
            message.image = bytesFromBase64(object.image);
        }
        if (object.fullArt !== undefined && object.fullArt !== null) {
            message.fullArt = Boolean(object.fullArt);
        }
        else {
            message.fullArt = false;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.cardId !== undefined && (obj.cardId = message.cardId);
        message.image !== undefined &&
            (obj.image = base64FromBytes(message.image !== undefined ? message.image : new Uint8Array()));
        message.fullArt !== undefined && (obj.fullArt = message.fullArt);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgAddArtwork };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = "";
        }
        if (object.cardId !== undefined && object.cardId !== null) {
            message.cardId = object.cardId;
        }
        else {
            message.cardId = 0;
        }
        if (object.image !== undefined && object.image !== null) {
            message.image = object.image;
        }
        else {
            message.image = new Uint8Array();
        }
        if (object.fullArt !== undefined && object.fullArt !== null) {
            message.fullArt = object.fullArt;
        }
        else {
            message.fullArt = false;
        }
        return message;
    },
};
const baseMsgAddArtworkResponse = {};
exports.MsgAddArtworkResponse = {
    encode(_, writer = minimal_1.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgAddArtworkResponse };
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
        const message = { ...baseMsgAddArtworkResponse };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = { ...baseMsgAddArtworkResponse };
        return message;
    },
};
const baseMsgSubmitCopyrightProposal = {
    creator: "",
    cardId: 0,
    description: "",
    link: "",
};
exports.MsgSubmitCopyrightProposal = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.cardId !== 0) {
            writer.uint32(16).uint64(message.cardId);
        }
        if (message.description !== "") {
            writer.uint32(26).string(message.description);
        }
        if (message.link !== "") {
            writer.uint32(34).string(message.link);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgSubmitCopyrightProposal,
        };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.cardId = longToNumber(reader.uint64());
                    break;
                case 3:
                    message.description = reader.string();
                    break;
                case 4:
                    message.link = reader.string();
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
            ...baseMsgSubmitCopyrightProposal,
        };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = "";
        }
        if (object.cardId !== undefined && object.cardId !== null) {
            message.cardId = Number(object.cardId);
        }
        else {
            message.cardId = 0;
        }
        if (object.description !== undefined && object.description !== null) {
            message.description = String(object.description);
        }
        else {
            message.description = "";
        }
        if (object.link !== undefined && object.link !== null) {
            message.link = String(object.link);
        }
        else {
            message.link = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.cardId !== undefined && (obj.cardId = message.cardId);
        message.description !== undefined &&
            (obj.description = message.description);
        message.link !== undefined && (obj.link = message.link);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseMsgSubmitCopyrightProposal,
        };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = "";
        }
        if (object.cardId !== undefined && object.cardId !== null) {
            message.cardId = object.cardId;
        }
        else {
            message.cardId = 0;
        }
        if (object.description !== undefined && object.description !== null) {
            message.description = object.description;
        }
        else {
            message.description = "";
        }
        if (object.link !== undefined && object.link !== null) {
            message.link = object.link;
        }
        else {
            message.link = "";
        }
        return message;
    },
};
const baseMsgSubmitCopyrightProposalResponse = {};
exports.MsgSubmitCopyrightProposalResponse = {
    encode(_, writer = minimal_1.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgSubmitCopyrightProposalResponse,
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
            ...baseMsgSubmitCopyrightProposalResponse,
        };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = {
            ...baseMsgSubmitCopyrightProposalResponse,
        };
        return message;
    },
};
const baseMsgChangeArtist = { creator: "", cardID: 0, artist: "" };
exports.MsgChangeArtist = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.cardID !== 0) {
            writer.uint32(16).uint64(message.cardID);
        }
        if (message.artist !== "") {
            writer.uint32(26).string(message.artist);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgChangeArtist };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.cardID = longToNumber(reader.uint64());
                    break;
                case 3:
                    message.artist = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgChangeArtist };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = "";
        }
        if (object.cardID !== undefined && object.cardID !== null) {
            message.cardID = Number(object.cardID);
        }
        else {
            message.cardID = 0;
        }
        if (object.artist !== undefined && object.artist !== null) {
            message.artist = String(object.artist);
        }
        else {
            message.artist = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.cardID !== undefined && (obj.cardID = message.cardID);
        message.artist !== undefined && (obj.artist = message.artist);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgChangeArtist };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = "";
        }
        if (object.cardID !== undefined && object.cardID !== null) {
            message.cardID = object.cardID;
        }
        else {
            message.cardID = 0;
        }
        if (object.artist !== undefined && object.artist !== null) {
            message.artist = object.artist;
        }
        else {
            message.artist = "";
        }
        return message;
    },
};
const baseMsgChangeArtistResponse = {};
exports.MsgChangeArtistResponse = {
    encode(_, writer = minimal_1.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgChangeArtistResponse,
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
            ...baseMsgChangeArtistResponse,
        };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = {
            ...baseMsgChangeArtistResponse,
        };
        return message;
    },
};
const baseMsgRegisterForCouncil = { creator: "" };
exports.MsgRegisterForCouncil = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgRegisterForCouncil };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgRegisterForCouncil };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgRegisterForCouncil };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = "";
        }
        return message;
    },
};
const baseMsgRegisterForCouncilResponse = {};
exports.MsgRegisterForCouncilResponse = {
    encode(_, writer = minimal_1.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgRegisterForCouncilResponse,
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
            ...baseMsgRegisterForCouncilResponse,
        };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = {
            ...baseMsgRegisterForCouncilResponse,
        };
        return message;
    },
};
const baseMsgReportMatch = {
    creator: "",
    playerA: "",
    playerB: "",
    cardsA: 0,
    cardsB: 0,
    outcome: 0,
};
exports.MsgReportMatch = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.playerA !== "") {
            writer.uint32(18).string(message.playerA);
        }
        if (message.playerB !== "") {
            writer.uint32(26).string(message.playerB);
        }
        writer.uint32(42).fork();
        for (const v of message.cardsA) {
            writer.uint64(v);
        }
        writer.ldelim();
        writer.uint32(50).fork();
        for (const v of message.cardsB) {
            writer.uint64(v);
        }
        writer.ldelim();
        if (message.outcome !== 0) {
            writer.uint32(56).int32(message.outcome);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgReportMatch };
        message.cardsA = [];
        message.cardsB = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.playerA = reader.string();
                    break;
                case 3:
                    message.playerB = reader.string();
                    break;
                case 5:
                    if ((tag & 7) === 2) {
                        const end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2) {
                            message.cardsA.push(longToNumber(reader.uint64()));
                        }
                    }
                    else {
                        message.cardsA.push(longToNumber(reader.uint64()));
                    }
                    break;
                case 6:
                    if ((tag & 7) === 2) {
                        const end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2) {
                            message.cardsB.push(longToNumber(reader.uint64()));
                        }
                    }
                    else {
                        message.cardsB.push(longToNumber(reader.uint64()));
                    }
                    break;
                case 7:
                    message.outcome = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgReportMatch };
        message.cardsA = [];
        message.cardsB = [];
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = "";
        }
        if (object.playerA !== undefined && object.playerA !== null) {
            message.playerA = String(object.playerA);
        }
        else {
            message.playerA = "";
        }
        if (object.playerB !== undefined && object.playerB !== null) {
            message.playerB = String(object.playerB);
        }
        else {
            message.playerB = "";
        }
        if (object.cardsA !== undefined && object.cardsA !== null) {
            for (const e of object.cardsA) {
                message.cardsA.push(Number(e));
            }
        }
        if (object.cardsB !== undefined && object.cardsB !== null) {
            for (const e of object.cardsB) {
                message.cardsB.push(Number(e));
            }
        }
        if (object.outcome !== undefined && object.outcome !== null) {
            message.outcome = outcomeFromJSON(object.outcome);
        }
        else {
            message.outcome = 0;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.playerA !== undefined && (obj.playerA = message.playerA);
        message.playerB !== undefined && (obj.playerB = message.playerB);
        if (message.cardsA) {
            obj.cardsA = message.cardsA.map((e) => e);
        }
        else {
            obj.cardsA = [];
        }
        if (message.cardsB) {
            obj.cardsB = message.cardsB.map((e) => e);
        }
        else {
            obj.cardsB = [];
        }
        message.outcome !== undefined &&
            (obj.outcome = outcomeToJSON(message.outcome));
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgReportMatch };
        message.cardsA = [];
        message.cardsB = [];
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = "";
        }
        if (object.playerA !== undefined && object.playerA !== null) {
            message.playerA = object.playerA;
        }
        else {
            message.playerA = "";
        }
        if (object.playerB !== undefined && object.playerB !== null) {
            message.playerB = object.playerB;
        }
        else {
            message.playerB = "";
        }
        if (object.cardsA !== undefined && object.cardsA !== null) {
            for (const e of object.cardsA) {
                message.cardsA.push(e);
            }
        }
        if (object.cardsB !== undefined && object.cardsB !== null) {
            for (const e of object.cardsB) {
                message.cardsB.push(e);
            }
        }
        if (object.outcome !== undefined && object.outcome !== null) {
            message.outcome = object.outcome;
        }
        else {
            message.outcome = 0;
        }
        return message;
    },
};
const baseMsgReportMatchResponse = { matchId: 0 };
exports.MsgReportMatchResponse = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.matchId !== 0) {
            writer.uint32(8).uint64(message.matchId);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgReportMatchResponse };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.matchId = longToNumber(reader.uint64());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgReportMatchResponse };
        if (object.matchId !== undefined && object.matchId !== null) {
            message.matchId = Number(object.matchId);
        }
        else {
            message.matchId = 0;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.matchId !== undefined && (obj.matchId = message.matchId);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgReportMatchResponse };
        if (object.matchId !== undefined && object.matchId !== null) {
            message.matchId = object.matchId;
        }
        else {
            message.matchId = 0;
        }
        return message;
    },
};
const baseMsgSubmitMatchReporterProposal = {
    creator: "",
    reporter: "",
    deposit: "",
    description: "",
};
exports.MsgSubmitMatchReporterProposal = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.reporter !== "") {
            writer.uint32(18).string(message.reporter);
        }
        if (message.deposit !== "") {
            writer.uint32(26).string(message.deposit);
        }
        if (message.description !== "") {
            writer.uint32(34).string(message.description);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgSubmitMatchReporterProposal,
        };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.reporter = reader.string();
                    break;
                case 3:
                    message.deposit = reader.string();
                    break;
                case 4:
                    message.description = reader.string();
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
            ...baseMsgSubmitMatchReporterProposal,
        };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = "";
        }
        if (object.reporter !== undefined && object.reporter !== null) {
            message.reporter = String(object.reporter);
        }
        else {
            message.reporter = "";
        }
        if (object.deposit !== undefined && object.deposit !== null) {
            message.deposit = String(object.deposit);
        }
        else {
            message.deposit = "";
        }
        if (object.description !== undefined && object.description !== null) {
            message.description = String(object.description);
        }
        else {
            message.description = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.reporter !== undefined && (obj.reporter = message.reporter);
        message.deposit !== undefined && (obj.deposit = message.deposit);
        message.description !== undefined &&
            (obj.description = message.description);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseMsgSubmitMatchReporterProposal,
        };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = "";
        }
        if (object.reporter !== undefined && object.reporter !== null) {
            message.reporter = object.reporter;
        }
        else {
            message.reporter = "";
        }
        if (object.deposit !== undefined && object.deposit !== null) {
            message.deposit = object.deposit;
        }
        else {
            message.deposit = "";
        }
        if (object.description !== undefined && object.description !== null) {
            message.description = object.description;
        }
        else {
            message.description = "";
        }
        return message;
    },
};
const baseMsgSubmitMatchReporterProposalResponse = {};
exports.MsgSubmitMatchReporterProposalResponse = {
    encode(_, writer = minimal_1.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgSubmitMatchReporterProposalResponse,
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
            ...baseMsgSubmitMatchReporterProposalResponse,
        };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = {
            ...baseMsgSubmitMatchReporterProposalResponse,
        };
        return message;
    },
};
const baseMsgApointMatchReporter = { creator: "", reporter: "" };
exports.MsgApointMatchReporter = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.reporter !== "") {
            writer.uint32(18).string(message.reporter);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgApointMatchReporter };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.reporter = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgApointMatchReporter };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = "";
        }
        if (object.reporter !== undefined && object.reporter !== null) {
            message.reporter = String(object.reporter);
        }
        else {
            message.reporter = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.reporter !== undefined && (obj.reporter = message.reporter);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgApointMatchReporter };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = "";
        }
        if (object.reporter !== undefined && object.reporter !== null) {
            message.reporter = object.reporter;
        }
        else {
            message.reporter = "";
        }
        return message;
    },
};
const baseMsgApointMatchReporterResponse = {};
exports.MsgApointMatchReporterResponse = {
    encode(_, writer = minimal_1.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgApointMatchReporterResponse,
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
            ...baseMsgApointMatchReporterResponse,
        };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = {
            ...baseMsgApointMatchReporterResponse,
        };
        return message;
    },
};
const baseMsgCreateCollection = {
    creator: "",
    name: "",
    artist: "",
    storyWriter: "",
    contributors: "",
};
exports.MsgCreateCollection = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.name !== "") {
            writer.uint32(18).string(message.name);
        }
        if (message.artist !== "") {
            writer.uint32(26).string(message.artist);
        }
        if (message.storyWriter !== "") {
            writer.uint32(34).string(message.storyWriter);
        }
        for (const v of message.contributors) {
            writer.uint32(42).string(v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgCreateCollection };
        message.contributors = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.name = reader.string();
                    break;
                case 3:
                    message.artist = reader.string();
                    break;
                case 4:
                    message.storyWriter = reader.string();
                    break;
                case 5:
                    message.contributors.push(reader.string());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgCreateCollection };
        message.contributors = [];
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = "";
        }
        if (object.name !== undefined && object.name !== null) {
            message.name = String(object.name);
        }
        else {
            message.name = "";
        }
        if (object.artist !== undefined && object.artist !== null) {
            message.artist = String(object.artist);
        }
        else {
            message.artist = "";
        }
        if (object.storyWriter !== undefined && object.storyWriter !== null) {
            message.storyWriter = String(object.storyWriter);
        }
        else {
            message.storyWriter = "";
        }
        if (object.contributors !== undefined && object.contributors !== null) {
            for (const e of object.contributors) {
                message.contributors.push(String(e));
            }
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.name !== undefined && (obj.name = message.name);
        message.artist !== undefined && (obj.artist = message.artist);
        message.storyWriter !== undefined &&
            (obj.storyWriter = message.storyWriter);
        if (message.contributors) {
            obj.contributors = message.contributors.map((e) => e);
        }
        else {
            obj.contributors = [];
        }
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgCreateCollection };
        message.contributors = [];
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = "";
        }
        if (object.name !== undefined && object.name !== null) {
            message.name = object.name;
        }
        else {
            message.name = "";
        }
        if (object.artist !== undefined && object.artist !== null) {
            message.artist = object.artist;
        }
        else {
            message.artist = "";
        }
        if (object.storyWriter !== undefined && object.storyWriter !== null) {
            message.storyWriter = object.storyWriter;
        }
        else {
            message.storyWriter = "";
        }
        if (object.contributors !== undefined && object.contributors !== null) {
            for (const e of object.contributors) {
                message.contributors.push(e);
            }
        }
        return message;
    },
};
const baseMsgCreateCollectionResponse = {};
exports.MsgCreateCollectionResponse = {
    encode(_, writer = minimal_1.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgCreateCollectionResponse,
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
            ...baseMsgCreateCollectionResponse,
        };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = {
            ...baseMsgCreateCollectionResponse,
        };
        return message;
    },
};
const baseMsgAddCardToCollection = {
    creator: "",
    collectionId: 0,
    cardId: 0,
};
exports.MsgAddCardToCollection = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.collectionId !== 0) {
            writer.uint32(16).uint64(message.collectionId);
        }
        if (message.cardId !== 0) {
            writer.uint32(24).uint64(message.cardId);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgAddCardToCollection };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.collectionId = longToNumber(reader.uint64());
                    break;
                case 3:
                    message.cardId = longToNumber(reader.uint64());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgAddCardToCollection };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = "";
        }
        if (object.collectionId !== undefined && object.collectionId !== null) {
            message.collectionId = Number(object.collectionId);
        }
        else {
            message.collectionId = 0;
        }
        if (object.cardId !== undefined && object.cardId !== null) {
            message.cardId = Number(object.cardId);
        }
        else {
            message.cardId = 0;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.collectionId !== undefined &&
            (obj.collectionId = message.collectionId);
        message.cardId !== undefined && (obj.cardId = message.cardId);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgAddCardToCollection };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = "";
        }
        if (object.collectionId !== undefined && object.collectionId !== null) {
            message.collectionId = object.collectionId;
        }
        else {
            message.collectionId = 0;
        }
        if (object.cardId !== undefined && object.cardId !== null) {
            message.cardId = object.cardId;
        }
        else {
            message.cardId = 0;
        }
        return message;
    },
};
const baseMsgAddCardToCollectionResponse = {};
exports.MsgAddCardToCollectionResponse = {
    encode(_, writer = minimal_1.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgAddCardToCollectionResponse,
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
            ...baseMsgAddCardToCollectionResponse,
        };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = {
            ...baseMsgAddCardToCollectionResponse,
        };
        return message;
    },
};
const baseMsgFinalizeCollection = { creator: "", collectionId: 0 };
exports.MsgFinalizeCollection = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.collectionId !== 0) {
            writer.uint32(16).uint64(message.collectionId);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgFinalizeCollection };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.collectionId = longToNumber(reader.uint64());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgFinalizeCollection };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = "";
        }
        if (object.collectionId !== undefined && object.collectionId !== null) {
            message.collectionId = Number(object.collectionId);
        }
        else {
            message.collectionId = 0;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.collectionId !== undefined &&
            (obj.collectionId = message.collectionId);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgFinalizeCollection };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = "";
        }
        if (object.collectionId !== undefined && object.collectionId !== null) {
            message.collectionId = object.collectionId;
        }
        else {
            message.collectionId = 0;
        }
        return message;
    },
};
const baseMsgFinalizeCollectionResponse = {};
exports.MsgFinalizeCollectionResponse = {
    encode(_, writer = minimal_1.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgFinalizeCollectionResponse,
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
            ...baseMsgFinalizeCollectionResponse,
        };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = {
            ...baseMsgFinalizeCollectionResponse,
        };
        return message;
    },
};
const baseMsgBuyCollection = { creator: "", collectionId: 0 };
exports.MsgBuyCollection = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.collectionId !== 0) {
            writer.uint32(16).uint64(message.collectionId);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgBuyCollection };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.collectionId = longToNumber(reader.uint64());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgBuyCollection };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = "";
        }
        if (object.collectionId !== undefined && object.collectionId !== null) {
            message.collectionId = Number(object.collectionId);
        }
        else {
            message.collectionId = 0;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.collectionId !== undefined &&
            (obj.collectionId = message.collectionId);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgBuyCollection };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = "";
        }
        if (object.collectionId !== undefined && object.collectionId !== null) {
            message.collectionId = object.collectionId;
        }
        else {
            message.collectionId = 0;
        }
        return message;
    },
};
const baseMsgBuyCollectionResponse = {};
exports.MsgBuyCollectionResponse = {
    encode(_, writer = minimal_1.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgBuyCollectionResponse,
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
            ...baseMsgBuyCollectionResponse,
        };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = {
            ...baseMsgBuyCollectionResponse,
        };
        return message;
    },
};
const baseMsgRemoveCardFromCollection = {
    creator: "",
    collectionId: 0,
    cardId: 0,
};
exports.MsgRemoveCardFromCollection = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.collectionId !== 0) {
            writer.uint32(16).uint64(message.collectionId);
        }
        if (message.cardId !== 0) {
            writer.uint32(24).uint64(message.cardId);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgRemoveCardFromCollection,
        };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.collectionId = longToNumber(reader.uint64());
                    break;
                case 3:
                    message.cardId = longToNumber(reader.uint64());
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
            ...baseMsgRemoveCardFromCollection,
        };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = "";
        }
        if (object.collectionId !== undefined && object.collectionId !== null) {
            message.collectionId = Number(object.collectionId);
        }
        else {
            message.collectionId = 0;
        }
        if (object.cardId !== undefined && object.cardId !== null) {
            message.cardId = Number(object.cardId);
        }
        else {
            message.cardId = 0;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.collectionId !== undefined &&
            (obj.collectionId = message.collectionId);
        message.cardId !== undefined && (obj.cardId = message.cardId);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseMsgRemoveCardFromCollection,
        };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = "";
        }
        if (object.collectionId !== undefined && object.collectionId !== null) {
            message.collectionId = object.collectionId;
        }
        else {
            message.collectionId = 0;
        }
        if (object.cardId !== undefined && object.cardId !== null) {
            message.cardId = object.cardId;
        }
        else {
            message.cardId = 0;
        }
        return message;
    },
};
const baseMsgRemoveCardFromCollectionResponse = {};
exports.MsgRemoveCardFromCollectionResponse = {
    encode(_, writer = minimal_1.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgRemoveCardFromCollectionResponse,
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
            ...baseMsgRemoveCardFromCollectionResponse,
        };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = {
            ...baseMsgRemoveCardFromCollectionResponse,
        };
        return message;
    },
};
const baseMsgRemoveContributorFromCollection = {
    creator: "",
    collectionId: 0,
    user: "",
};
exports.MsgRemoveContributorFromCollection = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.collectionId !== 0) {
            writer.uint32(16).uint64(message.collectionId);
        }
        if (message.user !== "") {
            writer.uint32(26).string(message.user);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgRemoveContributorFromCollection,
        };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.collectionId = longToNumber(reader.uint64());
                    break;
                case 3:
                    message.user = reader.string();
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
            ...baseMsgRemoveContributorFromCollection,
        };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = "";
        }
        if (object.collectionId !== undefined && object.collectionId !== null) {
            message.collectionId = Number(object.collectionId);
        }
        else {
            message.collectionId = 0;
        }
        if (object.user !== undefined && object.user !== null) {
            message.user = String(object.user);
        }
        else {
            message.user = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.collectionId !== undefined &&
            (obj.collectionId = message.collectionId);
        message.user !== undefined && (obj.user = message.user);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseMsgRemoveContributorFromCollection,
        };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = "";
        }
        if (object.collectionId !== undefined && object.collectionId !== null) {
            message.collectionId = object.collectionId;
        }
        else {
            message.collectionId = 0;
        }
        if (object.user !== undefined && object.user !== null) {
            message.user = object.user;
        }
        else {
            message.user = "";
        }
        return message;
    },
};
const baseMsgRemoveContributorFromCollectionResponse = {};
exports.MsgRemoveContributorFromCollectionResponse = {
    encode(_, writer = minimal_1.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgRemoveContributorFromCollectionResponse,
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
            ...baseMsgRemoveContributorFromCollectionResponse,
        };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = {
            ...baseMsgRemoveContributorFromCollectionResponse,
        };
        return message;
    },
};
const baseMsgAddContributorToCollection = {
    creator: "",
    collectionId: 0,
    user: "",
};
exports.MsgAddContributorToCollection = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.collectionId !== 0) {
            writer.uint32(16).uint64(message.collectionId);
        }
        if (message.user !== "") {
            writer.uint32(26).string(message.user);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgAddContributorToCollection,
        };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.collectionId = longToNumber(reader.uint64());
                    break;
                case 3:
                    message.user = reader.string();
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
            ...baseMsgAddContributorToCollection,
        };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = "";
        }
        if (object.collectionId !== undefined && object.collectionId !== null) {
            message.collectionId = Number(object.collectionId);
        }
        else {
            message.collectionId = 0;
        }
        if (object.user !== undefined && object.user !== null) {
            message.user = String(object.user);
        }
        else {
            message.user = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.collectionId !== undefined &&
            (obj.collectionId = message.collectionId);
        message.user !== undefined && (obj.user = message.user);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseMsgAddContributorToCollection,
        };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = "";
        }
        if (object.collectionId !== undefined && object.collectionId !== null) {
            message.collectionId = object.collectionId;
        }
        else {
            message.collectionId = 0;
        }
        if (object.user !== undefined && object.user !== null) {
            message.user = object.user;
        }
        else {
            message.user = "";
        }
        return message;
    },
};
const baseMsgAddContributorToCollectionResponse = {};
exports.MsgAddContributorToCollectionResponse = {
    encode(_, writer = minimal_1.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgAddContributorToCollectionResponse,
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
            ...baseMsgAddContributorToCollectionResponse,
        };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = {
            ...baseMsgAddContributorToCollectionResponse,
        };
        return message;
    },
};
const baseMsgSubmitCollectionProposal = {
    creator: "",
    collectionId: 0,
};
exports.MsgSubmitCollectionProposal = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.collectionId !== 0) {
            writer.uint32(16).uint64(message.collectionId);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgSubmitCollectionProposal,
        };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.collectionId = longToNumber(reader.uint64());
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
            ...baseMsgSubmitCollectionProposal,
        };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = "";
        }
        if (object.collectionId !== undefined && object.collectionId !== null) {
            message.collectionId = Number(object.collectionId);
        }
        else {
            message.collectionId = 0;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.collectionId !== undefined &&
            (obj.collectionId = message.collectionId);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseMsgSubmitCollectionProposal,
        };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = "";
        }
        if (object.collectionId !== undefined && object.collectionId !== null) {
            message.collectionId = object.collectionId;
        }
        else {
            message.collectionId = 0;
        }
        return message;
    },
};
const baseMsgSubmitCollectionProposalResponse = {};
exports.MsgSubmitCollectionProposalResponse = {
    encode(_, writer = minimal_1.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgSubmitCollectionProposalResponse,
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
            ...baseMsgSubmitCollectionProposalResponse,
        };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = {
            ...baseMsgSubmitCollectionProposalResponse,
        };
        return message;
    },
};
const baseMsgCreateSellOffer = { creator: "", card: 0, price: "" };
exports.MsgCreateSellOffer = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.card !== 0) {
            writer.uint32(16).uint64(message.card);
        }
        if (message.price !== "") {
            writer.uint32(26).string(message.price);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgCreateSellOffer };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.card = longToNumber(reader.uint64());
                    break;
                case 3:
                    message.price = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgCreateSellOffer };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = "";
        }
        if (object.card !== undefined && object.card !== null) {
            message.card = Number(object.card);
        }
        else {
            message.card = 0;
        }
        if (object.price !== undefined && object.price !== null) {
            message.price = String(object.price);
        }
        else {
            message.price = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.card !== undefined && (obj.card = message.card);
        message.price !== undefined && (obj.price = message.price);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgCreateSellOffer };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = "";
        }
        if (object.card !== undefined && object.card !== null) {
            message.card = object.card;
        }
        else {
            message.card = 0;
        }
        if (object.price !== undefined && object.price !== null) {
            message.price = object.price;
        }
        else {
            message.price = "";
        }
        return message;
    },
};
const baseMsgCreateSellOfferResponse = {};
exports.MsgCreateSellOfferResponse = {
    encode(_, writer = minimal_1.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgCreateSellOfferResponse,
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
            ...baseMsgCreateSellOfferResponse,
        };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = {
            ...baseMsgCreateSellOfferResponse,
        };
        return message;
    },
};
const baseMsgBuyCard = { creator: "", sellOfferId: 0 };
exports.MsgBuyCard = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.sellOfferId !== 0) {
            writer.uint32(16).uint64(message.sellOfferId);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgBuyCard };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.sellOfferId = longToNumber(reader.uint64());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgBuyCard };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = "";
        }
        if (object.sellOfferId !== undefined && object.sellOfferId !== null) {
            message.sellOfferId = Number(object.sellOfferId);
        }
        else {
            message.sellOfferId = 0;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.sellOfferId !== undefined &&
            (obj.sellOfferId = message.sellOfferId);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgBuyCard };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = "";
        }
        if (object.sellOfferId !== undefined && object.sellOfferId !== null) {
            message.sellOfferId = object.sellOfferId;
        }
        else {
            message.sellOfferId = 0;
        }
        return message;
    },
};
const baseMsgBuyCardResponse = {};
exports.MsgBuyCardResponse = {
    encode(_, writer = minimal_1.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgBuyCardResponse };
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
        const message = { ...baseMsgBuyCardResponse };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = { ...baseMsgBuyCardResponse };
        return message;
    },
};
const baseMsgRemoveSellOffer = { creator: "", sellOfferId: 0 };
exports.MsgRemoveSellOffer = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.sellOfferId !== 0) {
            writer.uint32(16).uint64(message.sellOfferId);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgRemoveSellOffer };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.sellOfferId = longToNumber(reader.uint64());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgRemoveSellOffer };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = "";
        }
        if (object.sellOfferId !== undefined && object.sellOfferId !== null) {
            message.sellOfferId = Number(object.sellOfferId);
        }
        else {
            message.sellOfferId = 0;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.sellOfferId !== undefined &&
            (obj.sellOfferId = message.sellOfferId);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgRemoveSellOffer };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = "";
        }
        if (object.sellOfferId !== undefined && object.sellOfferId !== null) {
            message.sellOfferId = object.sellOfferId;
        }
        else {
            message.sellOfferId = 0;
        }
        return message;
    },
};
const baseMsgRemoveSellOfferResponse = {};
exports.MsgRemoveSellOfferResponse = {
    encode(_, writer = minimal_1.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgRemoveSellOfferResponse,
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
            ...baseMsgRemoveSellOfferResponse,
        };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = {
            ...baseMsgRemoveSellOfferResponse,
        };
        return message;
    },
};
const baseMsgAddArtworkToCollection = { creator: "", collectionId: 0 };
exports.MsgAddArtworkToCollection = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.collectionId !== 0) {
            writer.uint32(16).uint64(message.collectionId);
        }
        if (message.image.length !== 0) {
            writer.uint32(26).bytes(message.image);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgAddArtworkToCollection,
        };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.collectionId = longToNumber(reader.uint64());
                    break;
                case 3:
                    message.image = reader.bytes();
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
            ...baseMsgAddArtworkToCollection,
        };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = "";
        }
        if (object.collectionId !== undefined && object.collectionId !== null) {
            message.collectionId = Number(object.collectionId);
        }
        else {
            message.collectionId = 0;
        }
        if (object.image !== undefined && object.image !== null) {
            message.image = bytesFromBase64(object.image);
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.collectionId !== undefined &&
            (obj.collectionId = message.collectionId);
        message.image !== undefined &&
            (obj.image = base64FromBytes(message.image !== undefined ? message.image : new Uint8Array()));
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseMsgAddArtworkToCollection,
        };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = "";
        }
        if (object.collectionId !== undefined && object.collectionId !== null) {
            message.collectionId = object.collectionId;
        }
        else {
            message.collectionId = 0;
        }
        if (object.image !== undefined && object.image !== null) {
            message.image = object.image;
        }
        else {
            message.image = new Uint8Array();
        }
        return message;
    },
};
const baseMsgAddArtworkToCollectionResponse = {};
exports.MsgAddArtworkToCollectionResponse = {
    encode(_, writer = minimal_1.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgAddArtworkToCollectionResponse,
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
            ...baseMsgAddArtworkToCollectionResponse,
        };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = {
            ...baseMsgAddArtworkToCollectionResponse,
        };
        return message;
    },
};
const baseMsgAddStoryToCollection = {
    creator: "",
    collectionId: 0,
    story: "",
};
exports.MsgAddStoryToCollection = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.collectionId !== 0) {
            writer.uint32(16).uint64(message.collectionId);
        }
        if (message.story !== "") {
            writer.uint32(26).string(message.story);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgAddStoryToCollection,
        };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.collectionId = longToNumber(reader.uint64());
                    break;
                case 3:
                    message.story = reader.string();
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
            ...baseMsgAddStoryToCollection,
        };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = "";
        }
        if (object.collectionId !== undefined && object.collectionId !== null) {
            message.collectionId = Number(object.collectionId);
        }
        else {
            message.collectionId = 0;
        }
        if (object.story !== undefined && object.story !== null) {
            message.story = String(object.story);
        }
        else {
            message.story = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.collectionId !== undefined &&
            (obj.collectionId = message.collectionId);
        message.story !== undefined && (obj.story = message.story);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseMsgAddStoryToCollection,
        };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = "";
        }
        if (object.collectionId !== undefined && object.collectionId !== null) {
            message.collectionId = object.collectionId;
        }
        else {
            message.collectionId = 0;
        }
        if (object.story !== undefined && object.story !== null) {
            message.story = object.story;
        }
        else {
            message.story = "";
        }
        return message;
    },
};
const baseMsgAddStoryToCollectionResponse = {};
exports.MsgAddStoryToCollectionResponse = {
    encode(_, writer = minimal_1.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgAddStoryToCollectionResponse,
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
            ...baseMsgAddStoryToCollectionResponse,
        };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = {
            ...baseMsgAddStoryToCollectionResponse,
        };
        return message;
    },
};
const baseMsgSetCardRarity = {
    creator: "",
    cardId: 0,
    collectionId: 0,
    rarity: "",
};
exports.MsgSetCardRarity = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.cardId !== 0) {
            writer.uint32(16).uint64(message.cardId);
        }
        if (message.collectionId !== 0) {
            writer.uint32(24).uint64(message.collectionId);
        }
        if (message.rarity !== "") {
            writer.uint32(34).string(message.rarity);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgSetCardRarity };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.cardId = longToNumber(reader.uint64());
                    break;
                case 3:
                    message.collectionId = longToNumber(reader.uint64());
                    break;
                case 4:
                    message.rarity = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgSetCardRarity };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = "";
        }
        if (object.cardId !== undefined && object.cardId !== null) {
            message.cardId = Number(object.cardId);
        }
        else {
            message.cardId = 0;
        }
        if (object.collectionId !== undefined && object.collectionId !== null) {
            message.collectionId = Number(object.collectionId);
        }
        else {
            message.collectionId = 0;
        }
        if (object.rarity !== undefined && object.rarity !== null) {
            message.rarity = String(object.rarity);
        }
        else {
            message.rarity = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.cardId !== undefined && (obj.cardId = message.cardId);
        message.collectionId !== undefined &&
            (obj.collectionId = message.collectionId);
        message.rarity !== undefined && (obj.rarity = message.rarity);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgSetCardRarity };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = "";
        }
        if (object.cardId !== undefined && object.cardId !== null) {
            message.cardId = object.cardId;
        }
        else {
            message.cardId = 0;
        }
        if (object.collectionId !== undefined && object.collectionId !== null) {
            message.collectionId = object.collectionId;
        }
        else {
            message.collectionId = 0;
        }
        if (object.rarity !== undefined && object.rarity !== null) {
            message.rarity = object.rarity;
        }
        else {
            message.rarity = "";
        }
        return message;
    },
};
const baseMsgSetCardRarityResponse = {};
exports.MsgSetCardRarityResponse = {
    encode(_, writer = minimal_1.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgSetCardRarityResponse,
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
            ...baseMsgSetCardRarityResponse,
        };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = {
            ...baseMsgSetCardRarityResponse,
        };
        return message;
    },
};
const baseMsgCreateCouncil = { creator: "", cardId: 0 };
exports.MsgCreateCouncil = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.cardId !== 0) {
            writer.uint32(16).uint64(message.cardId);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgCreateCouncil };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.cardId = longToNumber(reader.uint64());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgCreateCouncil };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = "";
        }
        if (object.cardId !== undefined && object.cardId !== null) {
            message.cardId = Number(object.cardId);
        }
        else {
            message.cardId = 0;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.cardId !== undefined && (obj.cardId = message.cardId);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgCreateCouncil };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = "";
        }
        if (object.cardId !== undefined && object.cardId !== null) {
            message.cardId = object.cardId;
        }
        else {
            message.cardId = 0;
        }
        return message;
    },
};
const baseMsgCreateCouncilResponse = {};
exports.MsgCreateCouncilResponse = {
    encode(_, writer = minimal_1.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgCreateCouncilResponse,
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
            ...baseMsgCreateCouncilResponse,
        };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = {
            ...baseMsgCreateCouncilResponse,
        };
        return message;
    },
};
const baseMsgCommitCouncilResponse = {
    creator: "",
    response: "",
    councilId: 0,
    suggestion: "",
};
exports.MsgCommitCouncilResponse = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.response !== "") {
            writer.uint32(18).string(message.response);
        }
        if (message.councilId !== 0) {
            writer.uint32(24).uint64(message.councilId);
        }
        if (message.suggestion !== "") {
            writer.uint32(34).string(message.suggestion);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgCommitCouncilResponse,
        };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.response = reader.string();
                    break;
                case 3:
                    message.councilId = longToNumber(reader.uint64());
                    break;
                case 4:
                    message.suggestion = reader.string();
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
            ...baseMsgCommitCouncilResponse,
        };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = "";
        }
        if (object.response !== undefined && object.response !== null) {
            message.response = String(object.response);
        }
        else {
            message.response = "";
        }
        if (object.councilId !== undefined && object.councilId !== null) {
            message.councilId = Number(object.councilId);
        }
        else {
            message.councilId = 0;
        }
        if (object.suggestion !== undefined && object.suggestion !== null) {
            message.suggestion = String(object.suggestion);
        }
        else {
            message.suggestion = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.response !== undefined && (obj.response = message.response);
        message.councilId !== undefined && (obj.councilId = message.councilId);
        message.suggestion !== undefined && (obj.suggestion = message.suggestion);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseMsgCommitCouncilResponse,
        };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = "";
        }
        if (object.response !== undefined && object.response !== null) {
            message.response = object.response;
        }
        else {
            message.response = "";
        }
        if (object.councilId !== undefined && object.councilId !== null) {
            message.councilId = object.councilId;
        }
        else {
            message.councilId = 0;
        }
        if (object.suggestion !== undefined && object.suggestion !== null) {
            message.suggestion = object.suggestion;
        }
        else {
            message.suggestion = "";
        }
        return message;
    },
};
const baseMsgCommitCouncilResponseResponse = {};
exports.MsgCommitCouncilResponseResponse = {
    encode(_, writer = minimal_1.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgCommitCouncilResponseResponse,
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
            ...baseMsgCommitCouncilResponseResponse,
        };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = {
            ...baseMsgCommitCouncilResponseResponse,
        };
        return message;
    },
};
const baseMsgRevealCouncilResponse = {
    creator: "",
    response: 0,
    secret: "",
    councilId: 0,
};
exports.MsgRevealCouncilResponse = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.response !== 0) {
            writer.uint32(16).int32(message.response);
        }
        if (message.secret !== "") {
            writer.uint32(26).string(message.secret);
        }
        if (message.councilId !== 0) {
            writer.uint32(32).uint64(message.councilId);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgRevealCouncilResponse,
        };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.response = reader.int32();
                    break;
                case 3:
                    message.secret = reader.string();
                    break;
                case 4:
                    message.councilId = longToNumber(reader.uint64());
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
            ...baseMsgRevealCouncilResponse,
        };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = "";
        }
        if (object.response !== undefined && object.response !== null) {
            message.response = (0, council_1.responseFromJSON)(object.response);
        }
        else {
            message.response = 0;
        }
        if (object.secret !== undefined && object.secret !== null) {
            message.secret = String(object.secret);
        }
        else {
            message.secret = "";
        }
        if (object.councilId !== undefined && object.councilId !== null) {
            message.councilId = Number(object.councilId);
        }
        else {
            message.councilId = 0;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.response !== undefined &&
            (obj.response = (0, council_1.responseToJSON)(message.response));
        message.secret !== undefined && (obj.secret = message.secret);
        message.councilId !== undefined && (obj.councilId = message.councilId);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseMsgRevealCouncilResponse,
        };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = "";
        }
        if (object.response !== undefined && object.response !== null) {
            message.response = object.response;
        }
        else {
            message.response = 0;
        }
        if (object.secret !== undefined && object.secret !== null) {
            message.secret = object.secret;
        }
        else {
            message.secret = "";
        }
        if (object.councilId !== undefined && object.councilId !== null) {
            message.councilId = object.councilId;
        }
        else {
            message.councilId = 0;
        }
        return message;
    },
};
const baseMsgRevealCouncilResponseResponse = {};
exports.MsgRevealCouncilResponseResponse = {
    encode(_, writer = minimal_1.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgRevealCouncilResponseResponse,
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
            ...baseMsgRevealCouncilResponseResponse,
        };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = {
            ...baseMsgRevealCouncilResponseResponse,
        };
        return message;
    },
};
const baseMsgRestartCouncil = { creator: "", councilId: 0 };
exports.MsgRestartCouncil = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.councilId !== 0) {
            writer.uint32(16).uint64(message.councilId);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgRestartCouncil };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.councilId = longToNumber(reader.uint64());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgRestartCouncil };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = "";
        }
        if (object.councilId !== undefined && object.councilId !== null) {
            message.councilId = Number(object.councilId);
        }
        else {
            message.councilId = 0;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.councilId !== undefined && (obj.councilId = message.councilId);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgRestartCouncil };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = "";
        }
        if (object.councilId !== undefined && object.councilId !== null) {
            message.councilId = object.councilId;
        }
        else {
            message.councilId = 0;
        }
        return message;
    },
};
const baseMsgRestartCouncilResponse = {};
exports.MsgRestartCouncilResponse = {
    encode(_, writer = minimal_1.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgRestartCouncilResponse,
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
            ...baseMsgRestartCouncilResponse,
        };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = {
            ...baseMsgRestartCouncilResponse,
        };
        return message;
    },
};
const baseMsgRewokeCouncilRegistration = { creator: "" };
exports.MsgRewokeCouncilRegistration = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgRewokeCouncilRegistration,
        };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
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
            ...baseMsgRewokeCouncilRegistration,
        };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseMsgRewokeCouncilRegistration,
        };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = "";
        }
        return message;
    },
};
const baseMsgRewokeCouncilRegistrationResponse = {};
exports.MsgRewokeCouncilRegistrationResponse = {
    encode(_, writer = minimal_1.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgRewokeCouncilRegistrationResponse,
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
            ...baseMsgRewokeCouncilRegistrationResponse,
        };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = {
            ...baseMsgRewokeCouncilRegistrationResponse,
        };
        return message;
    },
};
const baseMsgConfirmMatch = { creator: "", matchId: 0, outcome: 0 };
exports.MsgConfirmMatch = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.matchId !== 0) {
            writer.uint32(16).uint64(message.matchId);
        }
        if (message.outcome !== 0) {
            writer.uint32(24).int32(message.outcome);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgConfirmMatch };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.matchId = longToNumber(reader.uint64());
                    break;
                case 3:
                    message.outcome = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgConfirmMatch };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = "";
        }
        if (object.matchId !== undefined && object.matchId !== null) {
            message.matchId = Number(object.matchId);
        }
        else {
            message.matchId = 0;
        }
        if (object.outcome !== undefined && object.outcome !== null) {
            message.outcome = outcomeFromJSON(object.outcome);
        }
        else {
            message.outcome = 0;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.matchId !== undefined && (obj.matchId = message.matchId);
        message.outcome !== undefined &&
            (obj.outcome = outcomeToJSON(message.outcome));
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgConfirmMatch };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = "";
        }
        if (object.matchId !== undefined && object.matchId !== null) {
            message.matchId = object.matchId;
        }
        else {
            message.matchId = 0;
        }
        if (object.outcome !== undefined && object.outcome !== null) {
            message.outcome = object.outcome;
        }
        else {
            message.outcome = 0;
        }
        return message;
    },
};
const baseMsgConfirmMatchResponse = {};
exports.MsgConfirmMatchResponse = {
    encode(_, writer = minimal_1.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgConfirmMatchResponse,
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
            ...baseMsgConfirmMatchResponse,
        };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = {
            ...baseMsgConfirmMatchResponse,
        };
        return message;
    },
};
const baseMsgSetProfileCard = { creator: "", cardId: 0 };
exports.MsgSetProfileCard = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.cardId !== 0) {
            writer.uint32(16).uint64(message.cardId);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgSetProfileCard };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.cardId = longToNumber(reader.uint64());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgSetProfileCard };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = "";
        }
        if (object.cardId !== undefined && object.cardId !== null) {
            message.cardId = Number(object.cardId);
        }
        else {
            message.cardId = 0;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.cardId !== undefined && (obj.cardId = message.cardId);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgSetProfileCard };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = "";
        }
        if (object.cardId !== undefined && object.cardId !== null) {
            message.cardId = object.cardId;
        }
        else {
            message.cardId = 0;
        }
        return message;
    },
};
const baseMsgSetProfileCardResponse = {};
exports.MsgSetProfileCardResponse = {
    encode(_, writer = minimal_1.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgSetProfileCardResponse,
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
            ...baseMsgSetProfileCardResponse,
        };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = {
            ...baseMsgSetProfileCardResponse,
        };
        return message;
    },
};
class MsgClientImpl {
    constructor(rpc) {
        this.rpc = rpc;
    }
    Createuser(request) {
        const data = exports.MsgCreateuser.encode(request).finish();
        const promise = this.rpc.request("DecentralCardGame.cardchain.cardchain.Msg", "Createuser", data);
        return promise.then((data) => exports.MsgCreateuserResponse.decode(new minimal_1.Reader(data)));
    }
    BuyCardScheme(request) {
        const data = exports.MsgBuyCardScheme.encode(request).finish();
        const promise = this.rpc.request("DecentralCardGame.cardchain.cardchain.Msg", "BuyCardScheme", data);
        return promise.then((data) => exports.MsgBuyCardSchemeResponse.decode(new minimal_1.Reader(data)));
    }
    VoteCard(request) {
        const data = exports.MsgVoteCard.encode(request).finish();
        const promise = this.rpc.request("DecentralCardGame.cardchain.cardchain.Msg", "VoteCard", data);
        return promise.then((data) => exports.MsgVoteCardResponse.decode(new minimal_1.Reader(data)));
    }
    SaveCardContent(request) {
        const data = exports.MsgSaveCardContent.encode(request).finish();
        const promise = this.rpc.request("DecentralCardGame.cardchain.cardchain.Msg", "SaveCardContent", data);
        return promise.then((data) => exports.MsgSaveCardContentResponse.decode(new minimal_1.Reader(data)));
    }
    TransferCard(request) {
        const data = exports.MsgTransferCard.encode(request).finish();
        const promise = this.rpc.request("DecentralCardGame.cardchain.cardchain.Msg", "TransferCard", data);
        return promise.then((data) => exports.MsgTransferCardResponse.decode(new minimal_1.Reader(data)));
    }
    DonateToCard(request) {
        const data = exports.MsgDonateToCard.encode(request).finish();
        const promise = this.rpc.request("DecentralCardGame.cardchain.cardchain.Msg", "DonateToCard", data);
        return promise.then((data) => exports.MsgDonateToCardResponse.decode(new minimal_1.Reader(data)));
    }
    AddArtwork(request) {
        const data = exports.MsgAddArtwork.encode(request).finish();
        const promise = this.rpc.request("DecentralCardGame.cardchain.cardchain.Msg", "AddArtwork", data);
        return promise.then((data) => exports.MsgAddArtworkResponse.decode(new minimal_1.Reader(data)));
    }
    SubmitCopyrightProposal(request) {
        const data = exports.MsgSubmitCopyrightProposal.encode(request).finish();
        const promise = this.rpc.request("DecentralCardGame.cardchain.cardchain.Msg", "SubmitCopyrightProposal", data);
        return promise.then((data) => exports.MsgSubmitCopyrightProposalResponse.decode(new minimal_1.Reader(data)));
    }
    ChangeArtist(request) {
        const data = exports.MsgChangeArtist.encode(request).finish();
        const promise = this.rpc.request("DecentralCardGame.cardchain.cardchain.Msg", "ChangeArtist", data);
        return promise.then((data) => exports.MsgChangeArtistResponse.decode(new minimal_1.Reader(data)));
    }
    RegisterForCouncil(request) {
        const data = exports.MsgRegisterForCouncil.encode(request).finish();
        const promise = this.rpc.request("DecentralCardGame.cardchain.cardchain.Msg", "RegisterForCouncil", data);
        return promise.then((data) => exports.MsgRegisterForCouncilResponse.decode(new minimal_1.Reader(data)));
    }
    ReportMatch(request) {
        const data = exports.MsgReportMatch.encode(request).finish();
        const promise = this.rpc.request("DecentralCardGame.cardchain.cardchain.Msg", "ReportMatch", data);
        return promise.then((data) => exports.MsgReportMatchResponse.decode(new minimal_1.Reader(data)));
    }
    SubmitMatchReporterProposal(request) {
        const data = exports.MsgSubmitMatchReporterProposal.encode(request).finish();
        const promise = this.rpc.request("DecentralCardGame.cardchain.cardchain.Msg", "SubmitMatchReporterProposal", data);
        return promise.then((data) => exports.MsgSubmitMatchReporterProposalResponse.decode(new minimal_1.Reader(data)));
    }
    ApointMatchReporter(request) {
        const data = exports.MsgApointMatchReporter.encode(request).finish();
        const promise = this.rpc.request("DecentralCardGame.cardchain.cardchain.Msg", "ApointMatchReporter", data);
        return promise.then((data) => exports.MsgApointMatchReporterResponse.decode(new minimal_1.Reader(data)));
    }
    CreateCollection(request) {
        const data = exports.MsgCreateCollection.encode(request).finish();
        const promise = this.rpc.request("DecentralCardGame.cardchain.cardchain.Msg", "CreateCollection", data);
        return promise.then((data) => exports.MsgCreateCollectionResponse.decode(new minimal_1.Reader(data)));
    }
    AddCardToCollection(request) {
        const data = exports.MsgAddCardToCollection.encode(request).finish();
        const promise = this.rpc.request("DecentralCardGame.cardchain.cardchain.Msg", "AddCardToCollection", data);
        return promise.then((data) => exports.MsgAddCardToCollectionResponse.decode(new minimal_1.Reader(data)));
    }
    FinalizeCollection(request) {
        const data = exports.MsgFinalizeCollection.encode(request).finish();
        const promise = this.rpc.request("DecentralCardGame.cardchain.cardchain.Msg", "FinalizeCollection", data);
        return promise.then((data) => exports.MsgFinalizeCollectionResponse.decode(new minimal_1.Reader(data)));
    }
    BuyCollection(request) {
        const data = exports.MsgBuyCollection.encode(request).finish();
        const promise = this.rpc.request("DecentralCardGame.cardchain.cardchain.Msg", "BuyCollection", data);
        return promise.then((data) => exports.MsgBuyCollectionResponse.decode(new minimal_1.Reader(data)));
    }
    RemoveCardFromCollection(request) {
        const data = exports.MsgRemoveCardFromCollection.encode(request).finish();
        const promise = this.rpc.request("DecentralCardGame.cardchain.cardchain.Msg", "RemoveCardFromCollection", data);
        return promise.then((data) => exports.MsgRemoveCardFromCollectionResponse.decode(new minimal_1.Reader(data)));
    }
    RemoveContributorFromCollection(request) {
        const data = exports.MsgRemoveContributorFromCollection.encode(request).finish();
        const promise = this.rpc.request("DecentralCardGame.cardchain.cardchain.Msg", "RemoveContributorFromCollection", data);
        return promise.then((data) => exports.MsgRemoveContributorFromCollectionResponse.decode(new minimal_1.Reader(data)));
    }
    AddContributorToCollection(request) {
        const data = exports.MsgAddContributorToCollection.encode(request).finish();
        const promise = this.rpc.request("DecentralCardGame.cardchain.cardchain.Msg", "AddContributorToCollection", data);
        return promise.then((data) => exports.MsgAddContributorToCollectionResponse.decode(new minimal_1.Reader(data)));
    }
    SubmitCollectionProposal(request) {
        const data = exports.MsgSubmitCollectionProposal.encode(request).finish();
        const promise = this.rpc.request("DecentralCardGame.cardchain.cardchain.Msg", "SubmitCollectionProposal", data);
        return promise.then((data) => exports.MsgSubmitCollectionProposalResponse.decode(new minimal_1.Reader(data)));
    }
    CreateSellOffer(request) {
        const data = exports.MsgCreateSellOffer.encode(request).finish();
        const promise = this.rpc.request("DecentralCardGame.cardchain.cardchain.Msg", "CreateSellOffer", data);
        return promise.then((data) => exports.MsgCreateSellOfferResponse.decode(new minimal_1.Reader(data)));
    }
    BuyCard(request) {
        const data = exports.MsgBuyCard.encode(request).finish();
        const promise = this.rpc.request("DecentralCardGame.cardchain.cardchain.Msg", "BuyCard", data);
        return promise.then((data) => exports.MsgBuyCardResponse.decode(new minimal_1.Reader(data)));
    }
    RemoveSellOffer(request) {
        const data = exports.MsgRemoveSellOffer.encode(request).finish();
        const promise = this.rpc.request("DecentralCardGame.cardchain.cardchain.Msg", "RemoveSellOffer", data);
        return promise.then((data) => exports.MsgRemoveSellOfferResponse.decode(new minimal_1.Reader(data)));
    }
    AddArtworkToCollection(request) {
        const data = exports.MsgAddArtworkToCollection.encode(request).finish();
        const promise = this.rpc.request("DecentralCardGame.cardchain.cardchain.Msg", "AddArtworkToCollection", data);
        return promise.then((data) => exports.MsgAddArtworkToCollectionResponse.decode(new minimal_1.Reader(data)));
    }
    AddStoryToCollection(request) {
        const data = exports.MsgAddStoryToCollection.encode(request).finish();
        const promise = this.rpc.request("DecentralCardGame.cardchain.cardchain.Msg", "AddStoryToCollection", data);
        return promise.then((data) => exports.MsgAddStoryToCollectionResponse.decode(new minimal_1.Reader(data)));
    }
    SetCardRarity(request) {
        const data = exports.MsgSetCardRarity.encode(request).finish();
        const promise = this.rpc.request("DecentralCardGame.cardchain.cardchain.Msg", "SetCardRarity", data);
        return promise.then((data) => exports.MsgSetCardRarityResponse.decode(new minimal_1.Reader(data)));
    }
    CreateCouncil(request) {
        const data = exports.MsgCreateCouncil.encode(request).finish();
        const promise = this.rpc.request("DecentralCardGame.cardchain.cardchain.Msg", "CreateCouncil", data);
        return promise.then((data) => exports.MsgCreateCouncilResponse.decode(new minimal_1.Reader(data)));
    }
    CommitCouncilResponse(request) {
        const data = exports.MsgCommitCouncilResponse.encode(request).finish();
        const promise = this.rpc.request("DecentralCardGame.cardchain.cardchain.Msg", "CommitCouncilResponse", data);
        return promise.then((data) => exports.MsgCommitCouncilResponseResponse.decode(new minimal_1.Reader(data)));
    }
    RevealCouncilResponse(request) {
        const data = exports.MsgRevealCouncilResponse.encode(request).finish();
        const promise = this.rpc.request("DecentralCardGame.cardchain.cardchain.Msg", "RevealCouncilResponse", data);
        return promise.then((data) => exports.MsgRevealCouncilResponseResponse.decode(new minimal_1.Reader(data)));
    }
    RestartCouncil(request) {
        const data = exports.MsgRestartCouncil.encode(request).finish();
        const promise = this.rpc.request("DecentralCardGame.cardchain.cardchain.Msg", "RestartCouncil", data);
        return promise.then((data) => exports.MsgRestartCouncilResponse.decode(new minimal_1.Reader(data)));
    }
    RewokeCouncilRegistration(request) {
        const data = exports.MsgRewokeCouncilRegistration.encode(request).finish();
        const promise = this.rpc.request("DecentralCardGame.cardchain.cardchain.Msg", "RewokeCouncilRegistration", data);
        return promise.then((data) => exports.MsgRewokeCouncilRegistrationResponse.decode(new minimal_1.Reader(data)));
    }
    ConfirmMatch(request) {
        const data = exports.MsgConfirmMatch.encode(request).finish();
        const promise = this.rpc.request("DecentralCardGame.cardchain.cardchain.Msg", "ConfirmMatch", data);
        return promise.then((data) => exports.MsgConfirmMatchResponse.decode(new minimal_1.Reader(data)));
    }
    SetProfileCard(request) {
        const data = exports.MsgSetProfileCard.encode(request).finish();
        const promise = this.rpc.request("DecentralCardGame.cardchain.cardchain.Msg", "SetProfileCard", data);
        return promise.then((data) => exports.MsgSetProfileCardResponse.decode(new minimal_1.Reader(data)));
    }
}
exports.MsgClientImpl = MsgClientImpl;
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
