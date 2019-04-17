export enum SimpleZoneID {
  DUSTPILE,
  FIELD,
  HAND,
  QUEUE
}

export enum ProtectedZoneID {
  EXILE
}

export class DeckRange {
  Start: number
  End: number

  constructor(Start: number, End: number) {
    this.Start = Start;
    this.End = End;
  }

  IsZone(): boolean {
    return true
  }
  IsDynamic(): boolean {
    return true
  }
}

export class Zone {
  IsZone(): boolean {
    return true
  }
}

export class DynamicZone extends Zone {
  IsDynamic(): boolean {
    return true
  }
}
