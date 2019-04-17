import {Zone} from "./zone";
import {CardSelectorSafeCond} from "./selector";

export class ZoneChange {
  private _Selection: CardSelectorSafeCond
  private _Destination: Zone

  constructor(Selection: CardSelectorSafeCond, Destination: Zone) {
    this._Selection = Selection;
    this._Destination = Destination;
  }

  get GetSelection(): CardSelectorSafeCond {
    return this._Selection;
  }

  get GetDestination(): Zone {
    return this._Destination;
  }
}
