import {CardPropertyId} from './PropertyIds'
import {DynamicZone, Zone} from "./zone";
import {TimeEvent} from "./timeEvent";

class EventListener {
  IsEventListener (): boolean {
    return true
  }
}

export class TimeEventListener extends EventListener {
  private _Event: TimeEvent;

  constructor (Event: TimeEvent) {
    super()
    this._Event = Event
  }

  get GetTimeEvent(): TimeEvent {
    return this._Event;
  }
}

export class ManipulationEventListener extends EventListener {
  private _PropertyId: CardPropertyId;

  constructor (PropertyId: CardPropertyId) {
    super()
    this._PropertyId = PropertyId
  }

  ReturnsCardPointerArray (): boolean {
    return true
  }

  get GetPropertyId(): CardPropertyId {
    return this._PropertyId;
  }
}

export class ZoneChangeEventListener extends EventListener {
  private _Source: DynamicZone;
  private _Destination: Zone;

  constructor (Source: DynamicZone, Destination: Zone) {
    super()
    this._Source = Source
    this._Destination = Destination
  }

  ReturnsCardPointerArray (): boolean {
    return true
  }

  get GetSource(): DynamicZone {
    return this._Source;
  }

  get GetDestination(): Zone {
    return this._Destination;
  }
}
