import {DynamicZone, Zone} from "./zone";
import {CardCondition, PlayerCondition} from "./condition";

export enum SelectorMode {
  ALL,
  TARGET,
  OPPONENTCHOICE
}

export enum SimpleSelectorID {
  THIS
}

export class CardSelector {
  IsCardSelector (): boolean {
    return true
  }
}

export class CardSelectorCond extends CardSelector {
  private _PlayerMode: SelectorMode
  private _PlayerCondition: PlayerCondition
  private _CardMode: SelectorMode
  private _CardCondition: CardCondition
  private _Zone: Zone

  constructor (PlayerMode: SelectorMode, PlayerCondition: PlayerCondition, CardMode: SelectorMode, CardCondition: CardCondition, Zone: Zone) {
    super();
    this._PlayerMode = PlayerMode
    this._PlayerCondition = PlayerCondition
    this._CardMode = CardMode
    this._CardCondition = CardCondition
    this._Zone = Zone
  }

  get GetPlayerSelectorMode(): SelectorMode {
    return this._PlayerMode;
  }

  get GetPlayerCondition(): PlayerCondition {
    return this._PlayerCondition;
  }

  get GetCardSelectorMode(): SelectorMode {
    return this._CardMode;
  }

  get GetCardCondition(): CardCondition {
    return this._CardCondition;
  }

  get GetZone(): Zone {
    return this._Zone;
  }
}

export class CardSelectorSafeCond extends CardSelectorCond {
  private _SafeZone: DynamicZone

  constructor(PlayerMode: SelectorMode, PlayerCondition: PlayerCondition, CardMode: SelectorMode, CardCondition: CardCondition, Zone: Zone, SafeZone: DynamicZone) {
    super(PlayerMode, PlayerCondition, CardMode, CardCondition, Zone);
    this._SafeZone = SafeZone;
  }

  get GetDynamicZone(): DynamicZone {
    return this._SafeZone;
  }
}
