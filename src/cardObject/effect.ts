import {ArithOperator} from "./arith";
import {IntPropertyId, StringPropertyId} from "./PropertyIds";
import {Ressource} from "./ressources";
import {ZoneChange} from "./zoneChange";
import {CardSelector} from "./selector";
import {IntInserter, StringInserter} from "./retriever";

export class Effect {
  private _ZoneChanges: ZoneChange[];
  private _Manipulations: Manipulation[];
  private _Production: Ressource[];

  constructor(ZoneChanges: ZoneChange[], Manipulations: Manipulation[], Production: Ressource[]) {
    this._ZoneChanges = ZoneChanges;
    this._Manipulations = Manipulations;
    this._Production = Production;
  }

  get GetZoneChanges(): ZoneChange[] {
    return this._ZoneChanges;
  }

  get GetManipulations(): Manipulation[] {
    return this._Manipulations;
  }

  get GetProduction(): Ressource[] {
    return this._Production;
  }
}

class Manipulation {
  private _Selector: CardSelector;

  constructor(Selector: CardSelector) {
    this._Selector = Selector;
  }

  get GetCardSelector(): CardSelector {
    return this._Selector;
  }
}

export class IntManipulation extends Manipulation {
  private _Val: IntInserter;
  private _Operator: ArithOperator;
  private _Prop: IntPropertyId;

  constructor(Selector: CardSelector, Val: IntInserter, Operator: ArithOperator, Prop: IntPropertyId) {
    super(Selector);
    this._Val = Val;
    this._Operator = Operator;
    this._Prop = Prop;
  }

  get GetManipulation(): IntInserter {
    return this._Val;
  }

  get GetArithOperator(): ArithOperator {
    return this._Operator;
  }

  get GetTargetPropertyId(): IntPropertyId {
    return this._Prop;
  }
}

export class StringManipulation extends Manipulation {
  private _Val: StringInserter;
  private _Prop: StringPropertyId;

  constructor(Selector: CardSelector, Val: StringInserter, Prop: StringPropertyId) {
    super(Selector);
    this._Val = Val;
    this._Prop = Prop;
  }

  get GetManipulation(): StringInserter {
    return this._Val;
  }

  get GetTargetPropertyId(): StringPropertyId {
    return this._Prop;
  }
}
