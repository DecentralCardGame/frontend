import {Ressource} from "./ressources";

export class Cost {
  private _RessourceCost: Ressource[]

  constructor(RessourceCost: Ressource[]) {
    this._RessourceCost = RessourceCost;
  }

  get GetRessources(): Ressource[] {
    return this._RessourceCost;
  }
}
