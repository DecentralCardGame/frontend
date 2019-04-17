export class PropertyId {
  id: number;

  constructor (id: number) {
    this.id = id
  }

  IsPropertyId (): boolean {
    return true
  }
}

export class CardPropertyId extends PropertyId { }
export class PlayerPropertyId extends PropertyId { }
export class IntPropertyId extends PropertyId { }
export class StringPropertyId extends PropertyId { }
export class CardIntPropertyId extends CardPropertyId { }
export class CardStringPropertyId extends CardPropertyId { }
export class PlayerIntPropertyId extends PlayerPropertyId { }
export class PlayerStringPropertyId extends PlayerPropertyId { }

