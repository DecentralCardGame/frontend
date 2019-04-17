export class Inserter {
  IsRetriever(): boolean {
    return true
  }
}

export class IntInserter extends Inserter {
  IsIntRetriever(): boolean {
    return true
  }
}
export class StringInserter extends Inserter {
  IsStringRetriever(): boolean {
    return true
  }
}

export class IntInserterConst extends IntInserter {
  private _Val: number;

  constructor(Val: number) {
    super();
    this._Val = Val;
  }

  get GetIntVal(): number {
    return this._Val;
  }
}

export class StringInserterConst extends StringInserter {
  private _Val: string;

  constructor(Val: string) {
    super();
    this._Val = Val;
  }

  get GetStringVal(): string {
    return this._Val;
  }
}

export class IntInserterPropId extends IntInserter {
  GetIntPropertyId(): IntInserterPropId {
    return this
  }
}

export class StringInserterPropId extends StringInserter {
  GetStringPropertyId(): StringInserterPropId {
    return this
  }
}
