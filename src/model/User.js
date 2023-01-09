"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor() {
        this.ReportMatches = false;
        this.airDrops = new AirDrops();
        this.alias = "";
        this.biography = "";
        this.boosterPacks = [];
        this.cards = [];
        this.councilParticipation = new CouncilParticipation();
        this.ownedCardSchemes = [];
        this.ownedPrototypes = [];
        this.profileCard = 0;
        this.voteRights = [];
        this.website = "";
    }
    static from(json) {
        let user = Object.assign(new User(), json);
        user.airDrops = AirDrops.from(json.airDrops);
        user.councilParticipation = CouncilParticipation.from(json.councilParticipation);
        return user;
    }
}
exports.User = User;
class AirDrops {
    constructor() {
        this.vote = false;
        this.create = false;
        this.buy = false;
        this.play = false;
        this.user = false;
    }
    static from(json) {
        return Object.assign(new AirDrops(), json);
    }
}
class CouncilParticipation {
    constructor() {
        this.council = 0;
        this.status = "";
    }
    static from(json) {
        return Object.assign(new CouncilParticipation(), json);
    }
}
