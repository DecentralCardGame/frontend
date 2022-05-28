"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenesisState = exports.protobufPackage = void 0;
/* eslint-disable */
const params_1 = require("../cardchain/params");
const card_1 = require("../cardchain/card");
const user_1 = require("../cardchain/user");
const match_1 = require("../cardchain/match");
const collection_1 = require("../cardchain/collection");
const sell_offer_1 = require("../cardchain/sell_offer");
const coin_1 = require("../cosmos/base/v1beta1/coin");
const council_1 = require("../cardchain/council");
const running_average_1 = require("../cardchain/running_average");
const image_1 = require("../cardchain/image");
const server_1 = require("../cardchain/server");
const minimal_1 = require("protobufjs/minimal");
exports.protobufPackage = "DecentralCardGame.cardchain.cardchain";
const baseGenesisState = { addresses: "", cardAuctionPrice: "" };
exports.GenesisState = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.params !== undefined) {
            params_1.Params.encode(message.params, writer.uint32(10).fork()).ldelim();
        }
        for (const v of message.cardRecords) {
            card_1.Card.encode(v, writer.uint32(18).fork()).ldelim();
        }
        for (const v of message.users) {
            user_1.User.encode(v, writer.uint32(26).fork()).ldelim();
        }
        for (const v of message.addresses) {
            writer.uint32(34).string(v);
        }
        for (const v of message.matches) {
            match_1.Match.encode(v, writer.uint32(50).fork()).ldelim();
        }
        for (const v of message.collections) {
            collection_1.Collection.encode(v, writer.uint32(58).fork()).ldelim();
        }
        for (const v of message.sellOffers) {
            sell_offer_1.SellOffer.encode(v, writer.uint32(66).fork()).ldelim();
        }
        for (const v of message.pools) {
            coin_1.Coin.encode(v, writer.uint32(74).fork()).ldelim();
        }
        if (message.cardAuctionPrice !== "") {
            writer.uint32(90).string(message.cardAuctionPrice);
        }
        for (const v of message.councils) {
            council_1.Council.encode(v, writer.uint32(98).fork()).ldelim();
        }
        for (const v of message.RunningAverages) {
            running_average_1.RunningAverage.encode(v, writer.uint32(106).fork()).ldelim();
        }
        for (const v of message.images) {
            image_1.Image.encode(v, writer.uint32(114).fork()).ldelim();
        }
        for (const v of message.Servers) {
            server_1.Server.encode(v, writer.uint32(122).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseGenesisState };
        message.cardRecords = [];
        message.users = [];
        message.addresses = [];
        message.matches = [];
        message.collections = [];
        message.sellOffers = [];
        message.pools = [];
        message.councils = [];
        message.RunningAverages = [];
        message.images = [];
        message.Servers = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.params = params_1.Params.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.cardRecords.push(card_1.Card.decode(reader, reader.uint32()));
                    break;
                case 3:
                    message.users.push(user_1.User.decode(reader, reader.uint32()));
                    break;
                case 4:
                    message.addresses.push(reader.string());
                    break;
                case 6:
                    message.matches.push(match_1.Match.decode(reader, reader.uint32()));
                    break;
                case 7:
                    message.collections.push(collection_1.Collection.decode(reader, reader.uint32()));
                    break;
                case 8:
                    message.sellOffers.push(sell_offer_1.SellOffer.decode(reader, reader.uint32()));
                    break;
                case 9:
                    message.pools.push(coin_1.Coin.decode(reader, reader.uint32()));
                    break;
                case 11:
                    message.cardAuctionPrice = reader.string();
                    break;
                case 12:
                    message.councils.push(council_1.Council.decode(reader, reader.uint32()));
                    break;
                case 13:
                    message.RunningAverages.push(running_average_1.RunningAverage.decode(reader, reader.uint32()));
                    break;
                case 14:
                    message.images.push(image_1.Image.decode(reader, reader.uint32()));
                    break;
                case 15:
                    message.Servers.push(server_1.Server.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseGenesisState };
        message.cardRecords = [];
        message.users = [];
        message.addresses = [];
        message.matches = [];
        message.collections = [];
        message.sellOffers = [];
        message.pools = [];
        message.councils = [];
        message.RunningAverages = [];
        message.images = [];
        message.Servers = [];
        if (object.params !== undefined && object.params !== null) {
            message.params = params_1.Params.fromJSON(object.params);
        }
        else {
            message.params = undefined;
        }
        if (object.cardRecords !== undefined && object.cardRecords !== null) {
            for (const e of object.cardRecords) {
                message.cardRecords.push(card_1.Card.fromJSON(e));
            }
        }
        if (object.users !== undefined && object.users !== null) {
            for (const e of object.users) {
                message.users.push(user_1.User.fromJSON(e));
            }
        }
        if (object.addresses !== undefined && object.addresses !== null) {
            for (const e of object.addresses) {
                message.addresses.push(String(e));
            }
        }
        if (object.matches !== undefined && object.matches !== null) {
            for (const e of object.matches) {
                message.matches.push(match_1.Match.fromJSON(e));
            }
        }
        if (object.collections !== undefined && object.collections !== null) {
            for (const e of object.collections) {
                message.collections.push(collection_1.Collection.fromJSON(e));
            }
        }
        if (object.sellOffers !== undefined && object.sellOffers !== null) {
            for (const e of object.sellOffers) {
                message.sellOffers.push(sell_offer_1.SellOffer.fromJSON(e));
            }
        }
        if (object.pools !== undefined && object.pools !== null) {
            for (const e of object.pools) {
                message.pools.push(coin_1.Coin.fromJSON(e));
            }
        }
        if (object.cardAuctionPrice !== undefined &&
            object.cardAuctionPrice !== null) {
            message.cardAuctionPrice = String(object.cardAuctionPrice);
        }
        else {
            message.cardAuctionPrice = "";
        }
        if (object.councils !== undefined && object.councils !== null) {
            for (const e of object.councils) {
                message.councils.push(council_1.Council.fromJSON(e));
            }
        }
        if (object.RunningAverages !== undefined &&
            object.RunningAverages !== null) {
            for (const e of object.RunningAverages) {
                message.RunningAverages.push(running_average_1.RunningAverage.fromJSON(e));
            }
        }
        if (object.images !== undefined && object.images !== null) {
            for (const e of object.images) {
                message.images.push(image_1.Image.fromJSON(e));
            }
        }
        if (object.Servers !== undefined && object.Servers !== null) {
            for (const e of object.Servers) {
                message.Servers.push(server_1.Server.fromJSON(e));
            }
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.params !== undefined &&
            (obj.params = message.params ? params_1.Params.toJSON(message.params) : undefined);
        if (message.cardRecords) {
            obj.cardRecords = message.cardRecords.map((e) => e ? card_1.Card.toJSON(e) : undefined);
        }
        else {
            obj.cardRecords = [];
        }
        if (message.users) {
            obj.users = message.users.map((e) => (e ? user_1.User.toJSON(e) : undefined));
        }
        else {
            obj.users = [];
        }
        if (message.addresses) {
            obj.addresses = message.addresses.map((e) => e);
        }
        else {
            obj.addresses = [];
        }
        if (message.matches) {
            obj.matches = message.matches.map((e) => e ? match_1.Match.toJSON(e) : undefined);
        }
        else {
            obj.matches = [];
        }
        if (message.collections) {
            obj.collections = message.collections.map((e) => e ? collection_1.Collection.toJSON(e) : undefined);
        }
        else {
            obj.collections = [];
        }
        if (message.sellOffers) {
            obj.sellOffers = message.sellOffers.map((e) => e ? sell_offer_1.SellOffer.toJSON(e) : undefined);
        }
        else {
            obj.sellOffers = [];
        }
        if (message.pools) {
            obj.pools = message.pools.map((e) => (e ? coin_1.Coin.toJSON(e) : undefined));
        }
        else {
            obj.pools = [];
        }
        message.cardAuctionPrice !== undefined &&
            (obj.cardAuctionPrice = message.cardAuctionPrice);
        if (message.councils) {
            obj.councils = message.councils.map((e) => e ? council_1.Council.toJSON(e) : undefined);
        }
        else {
            obj.councils = [];
        }
        if (message.RunningAverages) {
            obj.RunningAverages = message.RunningAverages.map((e) => e ? running_average_1.RunningAverage.toJSON(e) : undefined);
        }
        else {
            obj.RunningAverages = [];
        }
        if (message.images) {
            obj.images = message.images.map((e) => (e ? image_1.Image.toJSON(e) : undefined));
        }
        else {
            obj.images = [];
        }
        if (message.Servers) {
            obj.Servers = message.Servers.map((e) => e ? server_1.Server.toJSON(e) : undefined);
        }
        else {
            obj.Servers = [];
        }
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseGenesisState };
        message.cardRecords = [];
        message.users = [];
        message.addresses = [];
        message.matches = [];
        message.collections = [];
        message.sellOffers = [];
        message.pools = [];
        message.councils = [];
        message.RunningAverages = [];
        message.images = [];
        message.Servers = [];
        if (object.params !== undefined && object.params !== null) {
            message.params = params_1.Params.fromPartial(object.params);
        }
        else {
            message.params = undefined;
        }
        if (object.cardRecords !== undefined && object.cardRecords !== null) {
            for (const e of object.cardRecords) {
                message.cardRecords.push(card_1.Card.fromPartial(e));
            }
        }
        if (object.users !== undefined && object.users !== null) {
            for (const e of object.users) {
                message.users.push(user_1.User.fromPartial(e));
            }
        }
        if (object.addresses !== undefined && object.addresses !== null) {
            for (const e of object.addresses) {
                message.addresses.push(e);
            }
        }
        if (object.matches !== undefined && object.matches !== null) {
            for (const e of object.matches) {
                message.matches.push(match_1.Match.fromPartial(e));
            }
        }
        if (object.collections !== undefined && object.collections !== null) {
            for (const e of object.collections) {
                message.collections.push(collection_1.Collection.fromPartial(e));
            }
        }
        if (object.sellOffers !== undefined && object.sellOffers !== null) {
            for (const e of object.sellOffers) {
                message.sellOffers.push(sell_offer_1.SellOffer.fromPartial(e));
            }
        }
        if (object.pools !== undefined && object.pools !== null) {
            for (const e of object.pools) {
                message.pools.push(coin_1.Coin.fromPartial(e));
            }
        }
        if (object.cardAuctionPrice !== undefined &&
            object.cardAuctionPrice !== null) {
            message.cardAuctionPrice = object.cardAuctionPrice;
        }
        else {
            message.cardAuctionPrice = "";
        }
        if (object.councils !== undefined && object.councils !== null) {
            for (const e of object.councils) {
                message.councils.push(council_1.Council.fromPartial(e));
            }
        }
        if (object.RunningAverages !== undefined &&
            object.RunningAverages !== null) {
            for (const e of object.RunningAverages) {
                message.RunningAverages.push(running_average_1.RunningAverage.fromPartial(e));
            }
        }
        if (object.images !== undefined && object.images !== null) {
            for (const e of object.images) {
                message.images.push(image_1.Image.fromPartial(e));
            }
        }
        if (object.Servers !== undefined && object.Servers !== null) {
            for (const e of object.Servers) {
                message.Servers.push(server_1.Server.fromPartial(e));
            }
        }
        return message;
    },
};
