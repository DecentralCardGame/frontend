"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Council = void 0;
const Coin_1 = require("./Coin");
class Council {
    constructor() {
        this.hashResponses = [];
        this.clearResponses = [];
    }
    static from(json, id) {
        let council = Object.assign(new Council(), json);
        console.log(json);
        council.hoshResponses = json.hoshResponses?.map(resp => {
            return WrapHashResponse.from(resp);
        });
        council.clearResponses = json.clearResponses?.map(resp => {
            return WrapClearResponse.from(resp);
        });
        council.treasury = Coin_1.Coin.from(json.treasury);
        council.status = CouncelingStatus[json.status];
        council.id = id;
        return council;
    }
}
exports.Council = Council;
class WrapClearResponse {
    static from(json) {
        return Object.assign(new WrapClearResponse(), json);
    }
}
class WrapHashResponse {
    static from(json) {
        return Object.assign(new WrapHashResponse(), json);
    }
}
var Response;
(function (Response) {
    Response[Response["Yes"] = 0] = "Yes";
    Response[Response["No"] = 1] = "No";
    Response[Response["Suggestion"] = 2] = "Suggestion";
})(Response || (Response = {}));
var CouncelingStatus;
(function (CouncelingStatus) {
    CouncelingStatus[CouncelingStatus["councilDoesNotExist"] = 0] = "councilDoesNotExist";
    CouncelingStatus[CouncelingStatus["councilOpen"] = 1] = "councilOpen";
    CouncelingStatus[CouncelingStatus["councilCreated"] = 2] = "councilCreated";
    CouncelingStatus[CouncelingStatus["councilClosed"] = 3] = "councilClosed";
    CouncelingStatus[CouncelingStatus["commited"] = 4] = "commited";
    CouncelingStatus[CouncelingStatus["revealed"] = 5] = "revealed";
    CouncelingStatus[CouncelingStatus["suggestionsMade"] = 6] = "suggestionsMade";
})(CouncelingStatus || (CouncelingStatus = {}));
