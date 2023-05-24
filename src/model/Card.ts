import { Coin } from "./Coin";

export class ChainCard {
  owner: string = "";
  status: string = "";
  artist: string = "";
  content: any;
  image: string = "";
  fullArt: boolean = true;
  nerflevel: string = "";
  notes: string = "";
  fairEnoughVotes: string = "";
  inappropriateVotes: string = "";
  overpoweredVotes: string = "";
  underpoweredVotes: string = "";
  votePool: Coin = new Coin();
  voters: Array<string> = [];
  balanceAnchor: boolean = false;

  static from(json: any) {
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
      card.Effects = content[cardType].Effects;
      card.Keywords = [];
      content[cardType].Keywords.forEach((keyword: string) => {
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
      card.balanceAnchor = this.balanceAnchor

      console.log("parsed card: ", card);
    }
    return card;
  }
}

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
  Keywords: Array<Array<string>> = [];
  Effects: Array<any> = [];
  id: number = -1;
  balanceAnchor: boolean = false;

  static from(json: any) {
    return Object.assign(new Card(), json);
  }

  isEditCard() {
    return this.id != -1
  }

  toChainCard(): ChainCard {
    console.log("trying to parse ", this);
    let cardContent = Object.assign(new CardContent(), {
      CardName: this.CardName,
      Tags: this.Tags.filter(tag => {
        return tag != null || tag != "";
      }),
      FlavourText: this.FlavourText,
      Class: this.Class,
      Keywords: [],
      RulesTexts: this.RulesTexts
    });
    this.Keywords.forEach(keyword => {
      cardContent.Keywords.push(JSON.stringify(keyword));
    });
    // in the following part we check things that are only required for specific card types
    if (this.type !== "Headquarter") {
      cardContent.CastingCost = this.CastingCost;
      if (!this.AdditionalCost) {
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

    let cc = new ChainCard();
    cc.content = {
      [this.type]: cardContent
    };
    cc.image = this.image ? this.image : "if you read this, someone was able to upload a card without proper image...";
    cc.fullArt = this.fullArt;
    cc.notes = this.notes;
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
  Keywords: Array<string> = [];
  Effects: Array<any> = [];
}
