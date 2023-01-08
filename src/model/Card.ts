import { Coin } from "./Coin";

export class ChainCard {
  owner: string;
  status: string;
  artist: string;
  content: string;
  image: string;
  fullArt: boolean;
  nerflevel: string;
  notes: string;
  fairEnoughVotes: string;
  inappropriateVotes: string;
  overpoweredVotes: string;
  underpoweredVotes: string;
  votePool: Coin;
  voters: Array<string>;

  static from(json) {
    return Object.assign(new ChainCard(), json);
  }

  toCard(): Card {
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
      card.votePool = Object.assign(new Coin(), this.votePool);
      card.voters = this.voters;

      console.log("parsed card: ", card);
    }
    return card;
  }
}

export class Card {
  notes: string = "";
  type: string = "";
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
  CardName: string = "";
  FlavourText: string = "";
  Tags: Array<string> = [];
  Class: CardClass = new CardClass();
  CastingCost: number = -1;
  AdditionalCost: any = {};
  Health: number = 0;
  Attack: number = 0;
  Delay: number = 0;
  RulesTexts: Array<string> = [];
  Keywords: Array<Array<string>> = [];

  static from(json) {
    return Object.assign(new Card(), json);
  }
}

export class CardClass {
  Culture: boolean = false;
  Mysticism: boolean = false;
  Technology: boolean = false;
  Nature: boolean = false;

  constructor(type?: string) {
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
