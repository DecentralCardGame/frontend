import {
  CardIntPropertyId,
  CardPropertyId,
  CardStringPropertyId,
  PlayerIntPropertyId, PlayerPropertyId,
  PlayerStringPropertyId
} from "./PropertyIds";
import {Comparator} from "./comparators";

export class Condition {
  private _Comparator: Comparator;

  constructor(Comparator: Comparator) {
    this._Comparator = Comparator;
  }

  get GetComparator(): Comparator {
    return this._Comparator;
  }
}

export class CardCondition extends Condition {
  private _CardPropertyId: CardPropertyId;

  constructor(Comparator: Comparator, Cpid: CardIntPropertyId) {
    super(Comparator);
    this._CardPropertyId = Cpid;
  }

  get GetCardPropertyId() {
    return this._CardPropertyId;
  }
}

export class PlayerCondition extends Condition {
  private _PlayerPropertyId: PlayerPropertyId

  constructor(Comparator: Comparator, PlayerPropertyId: PlayerPropertyId) {
    super(Comparator);
    this._PlayerPropertyId = PlayerPropertyId;
  }

  get GetPlayerPropertyId(): PlayerPropertyId {
    return this._PlayerPropertyId;
  }
}

export class IntCondition extends Condition{
  private _Value: number;

  constructor(Comparator: Comparator, Value: number) {
    super(Comparator);
    this._Value = Value;
  }

  get GetCompVal(): number {
    return this._Value;
  }
}

export class StringCondition extends Condition{
  private _Value: string;

  constructor(Comparator: Comparator, Value: string) {
    super(Comparator);
    this._Value = Value;
  }

  get GetCompVal(): string {
    return this._Value;
  }
}

export class CardIntCondition extends IntCondition{
  private _Prop: CardIntPropertyId;

  constructor(Comparator: Comparator, Value: number, Prop: CardIntPropertyId) {
    super(Comparator, Value);
    this._Prop = Prop;
  }

  get GetCardPropertyId(): CardIntPropertyId {
    return this._Prop;
  }
}

export class CardStringCondition extends StringCondition{
  private _Prop: CardStringPropertyId;

  constructor(Value: string, Prop: CardStringPropertyId) {
    super(Comparator.EQUAL, Value);
    this._Prop = Prop;
  }

  get GetCardPropertyId(): CardStringPropertyId {
    return this._Prop;
  }
}

export class PlayerIntCondition extends IntCondition{
  private _Prop: PlayerIntPropertyId;

  constructor(Comparator: Comparator, Value: number, Prop: PlayerIntPropertyId) {
    super(Comparator, Value);
    this._Prop = Prop;
  }

  get GetPlayerPropertyId(): PlayerIntPropertyId {
    return this._Prop;
  }
}

export class PlayerStringCondition extends StringCondition{
  private _Prop: PlayerStringPropertyId;

  constructor(Value: string, Prop: PlayerStringPropertyId) {
    super(Comparator.EQUAL, Value);
    this._Prop = Prop;
  }

  get GetPlayerPropertyId(): PlayerStringPropertyId {
    return this._Prop;
  }
}
