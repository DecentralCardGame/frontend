import {SpeedModifier} from "./Properties";
import {Cost} from "./cost";
import {Effect} from "./effect";

export class Ability {
  private _SpeedModifier: SpeedModifier;
  private _Effect: Effect;

  constructor(SpeedModifier: SpeedModifier, Effect: Effect) {
    this._SpeedModifier = SpeedModifier;
    this._Effect = Effect;
  }

  get SpeedModifier(): SpeedModifier {
    return this._SpeedModifier;
  }

  get Effect(): Effect {
    return this._Effect;
  }
}

export class activatedAbility extends Ability {
  private _Cost: Cost;
  private _MultipleUse: boolean;

  constructor(SpeedModifier: SpeedModifier, Effect: Effect, Cost: Cost, MultipleUse: boolean) {
    super(SpeedModifier, Effect);
    this._Cost = Cost;
    this._MultipleUse = MultipleUse;
  }

  get Cost(): Cost {
    return this._Cost;
  }

  get MultipleUse(): boolean {
    return this._MultipleUse;
  }
}

export class triggeredAbility extends Ability {
  private _Cause: EventListener;

  constructor(SpeedModifier: SpeedModifier, Effect: Effect, Cause: EventListener) {
    super(SpeedModifier, Effect);
    this._Cause = Cause;
  }

  get Cause(): EventListener {
    return this._Cause;
  }
}


