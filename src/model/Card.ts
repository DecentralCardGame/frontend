import * as R from "ramda";
import { Coin } from "./Coin";
import type { QueryCardResponse } from "decentralcardgame-cardchain-client-ts/types/cardchain/cardchain/query";
import { CardWithImage } from "decentralcardgame-cardchain-client-ts/types/cardchain/cardchain/card_with_image";

export class Card {
  notes: string = "";
  type: string = "Entity";
  owner: string = "";
  status: string = "";
  artist: string = "";
  Content: any = {};
  image: string = "";
  voters: Array<string> = [];
  tagDummy: string = "";
  fullArt: boolean = true;
  nerflevel: number = 0;
  fairEnoughVotes: number = 0;
  inappropriateVotes: number = 0;
  overpoweredVotes: number = 0;
  underpoweredVotes: number = 0;
  votePool: Coin = new Coin();

  Abilities: Array<any> = [];
  CardName: string = "Name";
  FlavourText: string = "";
  Tags: Array<string> = [];
  Class: CardClass = CardClass.technology();
  CastingCost: number = -1;
  AdditionalCost: any = {};
  Health: number = 0;
  Attack: number = 0;
  Delay: number = 0;
  RulesTexts: Array<string> = [];
  Effects: Array<any> = [];
  id: number = -1;
  balanceAnchor: boolean = false;
  hash: string = "";
  rarity: string = "";

  // Values used for nerfstatus
  isBanned = false;
  isNerfed = false;
  isBuffed = false;

  static from(json: any): Card {
    return Object.assign(new Card(), json);
  }

  isEditCard() {
    return this.id != -1;
  }

  setNerfStatus(status: NerfStatus) {
    switch (status) {
      case NerfStatus.BANNED:
        this.isBanned = true;
        break;
      case NerfStatus.BUFFED:
        this.isBuffed = true;
        break;
      case NerfStatus.NERFED:
        this.isNerfed = true;
        break;
    }
  }

  static fromCardWithImage(from: CardWithImage): Card {
    let card = new Card();
    if (from.card?.content) {
      let content = JSON.parse(atob(from.card.content.toString()));
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
      card.RulesTexts = [];
      card.Effects = content[cardType].Effects;

      card.type = cardType;
      card.owner = from.card.owner;
      card.rarity = from.card.rarity.toString();
      card.status = from.card.status.toString();
      card.artist = from.card.artist;
      card.Content = content;
      card.image = from.image;
      card.fullArt = from.card.fullArt;
      card.nerflevel = from.card.nerflevel;
      card.notes = from.card.notes;
      card.fairEnoughVotes = from.card.fairEnoughVotes;
      card.inappropriateVotes = from.card.inappropriateVotes;
      card.overpoweredVotes = from.card.overpoweredVotes;
      card.underpoweredVotes = from.card.underpoweredVotes;
      card.votePool = Object.assign(new Coin(), from.card.votePool);
      card.voters = from.card.voters;
      card.balanceAnchor = from.card.balanceAnchor;
      card.hash = from.hash;

      console.log("parsed card: ", card.CardName, card);
    }
    return card;
  }

  toCardWithImage(): CardWithImage {
    console.log("trying to parse ", this);
    let cardContent = Object.assign(new CardContent(), {
      CardName: this.CardName,
      Tags: this.Tags.filter((tag) => {
        return tag != null || tag != "";
      }),
      FlavourText: this.FlavourText,
      Class: this.Class,
    });
    // in the following part we check things that are only required for specific card types
    if (this.type !== "Headquarter") {
      cardContent.CastingCost = this.CastingCost;
      if (
        this.AdditionalCost &&
        R.keys(this.AdditionalCost).length > 0 &&
        R.values(this.AdditionalCost)[0].Amount > 0
      ) {
        cardContent.AdditionalCost = this.AdditionalCost;
      }
    }
    if (this.type !== "Action") {
      cardContent.Health = this.Health;
      cardContent.Abilities = this.Abilities;
    }
    if (this.type === "Entity") {
      cardContent.Attack = this.Attack;
    } else if (this.type === "Action") {
      cardContent.Effects = this.Effects;
    } else if (this.type === "Headquarter") {
      cardContent.Delay = this.Delay;
    }

    let cc: CardWithImage = {
      card: {
        content: Uint8Array.from(
          JSON.stringify({
            [this.type]: cardContent,
          }),
          (c) => c.charCodeAt(0),
        ),
        notes: this.notes,
        fullArt: this.fullArt,
        balanceAnchor: this.balanceAnchor,
        artist: this.artist,
      },
      image: this.image
        ? this.image
        : "if you read this, someone was able to upload a card without proper image...",
    };
    console.log("parsed into:", cc);
    return cc;
  }
}

export class CardClass {
  Culture: boolean = false;
  Mysticism: boolean = false;
  Technology: boolean = false;
  Nature: boolean = false;

  constructor(type?: string) {
    if (type) {
      this[type as keyof CardClass] = true;
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

class CardContent {
  Abilities: Array<any> = [];
  CardName: string = "";
  FlavourText: string = "";
  Tags: Array<string> = [];
  Class: CardClass = new CardClass();
  CastingCost: number = -1;
  AdditionalCost: any = undefined;
  Health: number = 0;
  Attack: number = 0;
  Delay: number = 0;
  RulesTexts: Array<string> = [];
  Effects: Array<any> = [];
}

export enum NerfStatus {
  BANNED = 0,
  BUFFED = 1,
  NERFED = 2,
}

export namespace NerfStatus {
  export function fromString(status: string): NerfStatus | undefined {
    return {
      bann: NerfStatus.BANNED,
      buff: NerfStatus.BUFFED,
      nerf: NerfStatus.NERFED,
    }[status];
  }
}
