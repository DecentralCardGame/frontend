import { Coin } from "./Coin";

export class Council {
  cardId: number
  voters: Array<string>
  hashResponses: Array<WrapHashResponse> = []
  clearResponses: Array<WrapClearResponse> = []
  treasury: Coin
  status: CouncelingStatus
  trialStart: number

  static from(json) {
    let council = Object.assign(new Council(), json);
    console.log(json)
    council.hoshResponses = json.hoshResponses?.map(resp => {
      return WrapHashResponse.from(resp)
    })
    council.clearResponses = json.clearResponses?.map(resp => {
      return WrapClearResponse.from(resp)
    })
    council.treasury = Coin.from(json.treasury)
    council.status = CouncelingStatus[json.status]
	return council
  }
}

class WrapClearResponse {
  user: string
  response: Response
  suggestion: string

  static from(json) {
    return Object.assign(new WrapClearResponse(), json);
  }
}

class WrapHashResponse {
  user: string
  hash: string

  static from(json) {
    return Object.assign(new WrapHashResponse(), json);
  }
}

enum Response {
  Yes,
  No,
  Suggestion,
}

enum CouncelingStatus {
  councilDoesNotExist,
  councilOpen,
  councilCreated,
  councilClosed,
  commited,
  revealed,
  suggestionsMade,
}