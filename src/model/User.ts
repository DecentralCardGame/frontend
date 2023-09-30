export class User {
  ReportMatches: boolean = false;
  airDrops: AirDrops = new AirDrops();
  alias: string = "";
  biography: string = "";
  boosterPacks: Array<any> = [];
  cards: Array<number> = [];
  councilParticipation: CouncilParticipation = new CouncilParticipation();
  ownedCardSchemes: Array<number> = [];
  CouncilStatus: string = "";
  ownedPrototypes: Array<number> = [];
  profileCard: number = 0;
  voteRights: Array<any> = [];
  website: string = "";

  static from(json: any) {
    let user: User = Object.assign(new User(), json);
    user.airDrops = AirDrops.from(json.airDrops);
    //user.councilParticipation = CouncilParticipation.from(json.councilParticipation)
    return user;
  }
}

class AirDrops {
  vote: boolean = false;
  create: boolean = false;
  buy: boolean = false;
  play: boolean = false;
  user: boolean = false;

  static from(json: any) {
    return Object.assign(new AirDrops(), json);
  }
}

class CouncilParticipation {
  council: number = 0;
  status: string = "";

  static from(json: any) {
    let cp = Object.assign(new CouncilParticipation(), json);
    cp.council = parseInt(json.council);
    return cp;
  }
}
