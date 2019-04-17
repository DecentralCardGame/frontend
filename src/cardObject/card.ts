import {Ability} from "./ability";
import {Attack, Health, SpeedModifier, Tag, Text} from "./Properties";
import {Cost} from "./cost";
import {Effect} from "./effect";

export class Card {
  private _Cost: Cost;
  private _Speedmodifier: SpeedModifier;
  private _Tag: Tag[];
  private _Text: Text;

  constructor(Cost: Cost, Speedmodifier: SpeedModifier, Tag: Tag[], Text: Text) {
    this._Cost = Cost;
    this._Speedmodifier = Speedmodifier;
    this._Tag = Tag;
    this._Text = Text;
  }

  get Cost(): Cost {
    return this._Cost;
  }

  get Speedmodifier(): SpeedModifier {
    return this._Speedmodifier;
  }

  get Tag(): Tag[] {
    return this._Tag;
  }

  get Text(): Text {
    return this._Text;
  }
}

export class Action extends Card{
  private _Effect: Effect;

  constructor(Cost: Cost, Speedmodifier: SpeedModifier, Tag: Tag[], Text: Text, Effect: Effect) {
    super(Cost, Speedmodifier, Tag, Text);
    this._Effect = Effect;
  }

  get Effect(): Effect {
    return this._Effect;
  }
}

export class Permanent extends Card{
  private _Ability: Ability;
  private _Health: Health;

  constructor(Cost: Cost, Speedmodifier: SpeedModifier, Tag: Tag[], Text: Text, Ability: Ability, Health: Health) {
    super(Cost, Speedmodifier, Tag, Text);
    this._Ability = Ability;
    this._Health = Health;
  }

  get Ability(): Ability {
    return this._Ability;
  }

  get Health(): Health {
    return this._Health;
  }
}

export class Entity extends Permanent{
  private _Attack: Attack;

  constructor(Cost: Cost, Speedmodifier: SpeedModifier, Tag: Tag[], Text: Text, Ability: Ability, Health: Health, Attack: Attack) {
    super(Cost, Speedmodifier, Tag, Text, Ability, Health);
    this._Attack = Attack;
  }

  get Attack(): Attack {
    return this._Attack;
  }
}

export class Field extends Permanent{
  constructor(Cost: Cost, Speedmodifier: SpeedModifier, Tag: Tag[], Text: Text, Ability: Ability, Health: Health) {
    super(Cost, Speedmodifier, Tag, Text, Ability, Health);
  }
}
