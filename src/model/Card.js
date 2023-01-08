"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardClass = exports.Card = exports.ChainCard = void 0;
const Coin_1 = require("./Coin");
class ChainCard {
    static from(json) {
        return Object.assign(new ChainCard(), json);
    }
    toCard() {
        let card = new Card();
        if (this.content) {
            let content = JSON.parse(this.content);
            let cardType = Object.keys(content)[0];
            card.CardName = content[cardType].CardName;
            card.FlavourText = content[cardType].FlavourText;
            card.Tags = content[cardType].Tags;
            card.Class = Object.assign(new CardClass(), content[cardType].Class);
            card.CastingCost = parseInt(content[cardType].CastingCost);
            card.Abilities = content[cardType].Abilities;
            card.AdditionalCost = content[cardType].AdditionalCost;
            card.Health = parseInt(content[cardType].Health);
            card.Attack = parseInt(content[cardType].Attack);
            card.Delay = parseInt(content[cardType].Delay);
            card.RulesTexts = content[cardType].RulesTexts;
            card.Keywords = [];
            content[cardType].Keywords.forEach(keyword => {
                card.Keywords.push(JSON.parse(keyword));
            });
            card.type = cardType;
            card.owner = this.owner;
            card.status = this.status;
            card.artist = this.artist;
            card.Content = content;
            card.image = this.image;
            card.fullArt = this.fullArt;
            card.nerflevel = parseInt(this.nerflevel);
            card.notes = this.notes;
            card.fairEnoughVotes = parseInt(this.fairEnoughVotes);
            card.inappropriateVotes = parseInt(this.inappropriateVotes);
            card.overpoweredVotes = parseInt(this.overpoweredVotes);
            card.underpoweredVotes = parseInt(this.underpoweredVotes);
            card.votePool = Object.assign(new Coin_1.Coin(), this.votePool);
            card.voters = this.voters;
            console.log("parsed card: ", card);
        }
        return card;
    }
}
exports.ChainCard = ChainCard;
class Card {
    constructor() {
        this.notes = "";
        this.type = "";
        this.owner = "";
        this.status = "";
        this.artist = "";
        this.Content = {};
        this.image = "";
        this.voters = [];
        this.tagDummy = "";
        this.fullArt = true;
        this.nerflevel = 0;
        this.fairEnoughVotes = 0;
        this.inappropriateVotes = 0;
        this.overpoweredVotes = 0;
        this.underpoweredVotes = 0;
        this.votePool = new Coin_1.Coin();
        this.Abilities = [];
        this.CardName = "";
        this.FlavourText = "";
        this.Tags = [];
        this.Class = new CardClass();
        this.CastingCost = -1;
        this.AdditionalCost = {};
        this.Health = 0;
        this.Attack = 0;
        this.Delay = 0;
        this.RulesTexts = [];
        this.Keywords = [];
    }
    static from(json) {
        return Object.assign(new Card(), json);
    }
}
exports.Card = Card;
class CardClass {
    constructor(type) {
        this.Culture = false;
        this.Mysticism = false;
        this.Technology = false;
        this.Nature = false;
        if (type) {
            this[type] = true;
        }
    }
    static culture() {
        let obj = new CardClass();
        obj.Culture = true;
        return obj;
    }
    static mysticism() {
        let obj = new CardClass();
        obj.Mysticism = true;
        return obj;
    }
    static technology() {
        let obj = new CardClass();
        obj.Technology = true;
        return obj;
    }
    static nature() {
        let obj = new CardClass();
        obj.Nature = true;
        return obj;
    }
}
exports.CardClass = CardClass;
