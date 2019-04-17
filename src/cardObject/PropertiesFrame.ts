import {
  CardIntPropertyId,
  CardStringPropertyId,
  PlayerIntPropertyId,
  PlayerStringPropertyId,
  PropertyId
} from './PropertyIds';

export class IntProperty {
  private _Val: number;

  constructor(Val: number) {
    this._Val = Val;
  }

  get GetIntVal(): number {
    return this._Val;
  }
}

export class StringProperty {
  private _Val: string;

  constructor(Val: string) {
    this._Val = Val;
  }

  get GetStringVal(): string {
    return this._Val;
  }
}

export class CardIntProperty extends IntProperty {
  private _Id: CardIntPropertyId;

  constructor(Val: number, Id: CardIntPropertyId) {
    super(Val);
    this._Id = Id;
  }

  get PropertyId(): CardIntPropertyId {
    return this._Id;
  }
}

export class CardStringProperty extends StringProperty{
  private _Id: CardStringPropertyId;

  constructor(Val: string, Id: CardStringPropertyId) {
    super(Val);
    this._Id = Id;
  }

  get PropertyId(): CardStringPropertyId {
    return this._Id;
  }
}

export class PlayerIntProperty extends IntProperty{
  private _Id: PlayerIntPropertyId;

  constructor(Val: number, Id: PlayerIntPropertyId) {
    super(Val);
    this._Id = Id;
  }

  get PropertyId(): PlayerIntPropertyId {
    return this._Id;
  }
}

export class PlayerStringProperty extends StringProperty{
  private _Id: PlayerStringPropertyId

  constructor(Val: string, Id: PlayerStringPropertyId) {
    super(Val);
    this._Id = Id;
  }

  get PropertyId(): PlayerStringPropertyId {
    return this._Id;
  }
}
