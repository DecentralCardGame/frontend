import { Response } from "../cardchain/council";
import { Reader, Writer } from "protobufjs/minimal";
export declare const protobufPackage = "DecentralCardGame.cardchain.cardchain";
export declare enum Outcome {
    AWon = 0,
    BWon = 1,
    Draw = 2,
    Aborted = 3,
    UNRECOGNIZED = -1
}
export declare function outcomeFromJSON(object: any): Outcome;
export declare function outcomeToJSON(object: Outcome): string;
export interface MsgCreateuser {
    creator: string;
    newUser: string;
    alias: string;
}
export interface MsgCreateuserResponse {
}
export interface MsgBuyCardScheme {
    creator: string;
    bid: string;
}
export interface MsgBuyCardSchemeResponse {
}
export interface MsgVoteCard {
    creator: string;
    cardId: number;
    voteType: string;
}
export interface MsgVoteCardResponse {
}
export interface MsgSaveCardContent {
    creator: string;
    cardId: number;
    content: Uint8Array;
    /**
     * bytes image = 4;
     *  string fullArt = 5;
     */
    notes: string;
    artist: string;
}
export interface MsgSaveCardContentResponse {
}
export interface MsgTransferCard {
    creator: string;
    cardId: number;
    receiver: string;
}
export interface MsgTransferCardResponse {
}
export interface MsgDonateToCard {
    creator: string;
    cardId: number;
    amount: string;
}
export interface MsgDonateToCardResponse {
}
export interface MsgAddArtwork {
    creator: string;
    cardId: number;
    image: Uint8Array;
    fullArt: boolean;
}
export interface MsgAddArtworkResponse {
}
export interface MsgSubmitCopyrightProposal {
    creator: string;
    cardId: number;
    description: string;
    link: string;
}
export interface MsgSubmitCopyrightProposalResponse {
}
export interface MsgChangeArtist {
    creator: string;
    cardID: number;
    artist: string;
}
export interface MsgChangeArtistResponse {
}
export interface MsgRegisterForCouncil {
    creator: string;
}
export interface MsgRegisterForCouncilResponse {
}
export interface MsgReportMatch {
    creator: string;
    playerA: string;
    playerB: string;
    cardsA: number[];
    cardsB: number[];
    outcome: Outcome;
}
export interface MsgReportMatchResponse {
    matchId: number;
}
export interface MsgSubmitMatchReporterProposal {
    creator: string;
    reporter: string;
    deposit: string;
    description: string;
}
export interface MsgSubmitMatchReporterProposalResponse {
}
export interface MsgApointMatchReporter {
    creator: string;
    reporter: string;
}
export interface MsgApointMatchReporterResponse {
}
export interface MsgCreateCollection {
    creator: string;
    name: string;
    artist: string;
    storyWriter: string;
    contributors: string[];
}
export interface MsgCreateCollectionResponse {
}
export interface MsgAddCardToCollection {
    creator: string;
    collectionId: number;
    cardId: number;
}
export interface MsgAddCardToCollectionResponse {
}
export interface MsgFinalizeCollection {
    creator: string;
    collectionId: number;
}
export interface MsgFinalizeCollectionResponse {
}
export interface MsgBuyCollection {
    creator: string;
    collectionId: number;
}
export interface MsgBuyCollectionResponse {
}
export interface MsgRemoveCardFromCollection {
    creator: string;
    collectionId: number;
    cardId: number;
}
export interface MsgRemoveCardFromCollectionResponse {
}
export interface MsgRemoveContributorFromCollection {
    creator: string;
    collectionId: number;
    user: string;
}
export interface MsgRemoveContributorFromCollectionResponse {
}
export interface MsgAddContributorToCollection {
    creator: string;
    collectionId: number;
    user: string;
}
export interface MsgAddContributorToCollectionResponse {
}
export interface MsgSubmitCollectionProposal {
    creator: string;
    collectionId: number;
}
export interface MsgSubmitCollectionProposalResponse {
}
export interface MsgCreateSellOffer {
    creator: string;
    card: number;
    price: string;
}
export interface MsgCreateSellOfferResponse {
}
export interface MsgBuyCard {
    creator: string;
    sellOfferId: number;
}
export interface MsgBuyCardResponse {
}
export interface MsgRemoveSellOffer {
    creator: string;
    sellOfferId: number;
}
export interface MsgRemoveSellOfferResponse {
}
export interface MsgAddArtworkToCollection {
    creator: string;
    collectionId: number;
    image: Uint8Array;
}
export interface MsgAddArtworkToCollectionResponse {
}
export interface MsgAddStoryToCollection {
    creator: string;
    collectionId: number;
    story: string;
}
export interface MsgAddStoryToCollectionResponse {
}
export interface MsgSetCardRarity {
    creator: string;
    cardId: number;
    collectionId: number;
    rarity: string;
}
export interface MsgSetCardRarityResponse {
}
export interface MsgCreateCouncil {
    creator: string;
    cardId: number;
}
export interface MsgCreateCouncilResponse {
}
export interface MsgCommitCouncilResponse {
    creator: string;
    response: string;
    councilId: number;
    suggestion: string;
}
export interface MsgCommitCouncilResponseResponse {
}
export interface MsgRevealCouncilResponse {
    creator: string;
    response: Response;
    secret: string;
    councilId: number;
}
export interface MsgRevealCouncilResponseResponse {
}
export interface MsgRestartCouncil {
    creator: string;
    councilId: number;
}
export interface MsgRestartCouncilResponse {
}
export interface MsgRewokeCouncilRegistration {
    creator: string;
}
export interface MsgRewokeCouncilRegistrationResponse {
}
export declare const MsgCreateuser: {
    encode(message: MsgCreateuser, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgCreateuser;
    fromJSON(object: any): MsgCreateuser;
    toJSON(message: MsgCreateuser): unknown;
    fromPartial(object: DeepPartial<MsgCreateuser>): MsgCreateuser;
};
export declare const MsgCreateuserResponse: {
    encode(_: MsgCreateuserResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgCreateuserResponse;
    fromJSON(_: any): MsgCreateuserResponse;
    toJSON(_: MsgCreateuserResponse): unknown;
    fromPartial(_: DeepPartial<MsgCreateuserResponse>): MsgCreateuserResponse;
};
export declare const MsgBuyCardScheme: {
    encode(message: MsgBuyCardScheme, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgBuyCardScheme;
    fromJSON(object: any): MsgBuyCardScheme;
    toJSON(message: MsgBuyCardScheme): unknown;
    fromPartial(object: DeepPartial<MsgBuyCardScheme>): MsgBuyCardScheme;
};
export declare const MsgBuyCardSchemeResponse: {
    encode(_: MsgBuyCardSchemeResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgBuyCardSchemeResponse;
    fromJSON(_: any): MsgBuyCardSchemeResponse;
    toJSON(_: MsgBuyCardSchemeResponse): unknown;
    fromPartial(_: DeepPartial<MsgBuyCardSchemeResponse>): MsgBuyCardSchemeResponse;
};
export declare const MsgVoteCard: {
    encode(message: MsgVoteCard, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgVoteCard;
    fromJSON(object: any): MsgVoteCard;
    toJSON(message: MsgVoteCard): unknown;
    fromPartial(object: DeepPartial<MsgVoteCard>): MsgVoteCard;
};
export declare const MsgVoteCardResponse: {
    encode(_: MsgVoteCardResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgVoteCardResponse;
    fromJSON(_: any): MsgVoteCardResponse;
    toJSON(_: MsgVoteCardResponse): unknown;
    fromPartial(_: DeepPartial<MsgVoteCardResponse>): MsgVoteCardResponse;
};
export declare const MsgSaveCardContent: {
    encode(message: MsgSaveCardContent, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgSaveCardContent;
    fromJSON(object: any): MsgSaveCardContent;
    toJSON(message: MsgSaveCardContent): unknown;
    fromPartial(object: DeepPartial<MsgSaveCardContent>): MsgSaveCardContent;
};
export declare const MsgSaveCardContentResponse: {
    encode(_: MsgSaveCardContentResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgSaveCardContentResponse;
    fromJSON(_: any): MsgSaveCardContentResponse;
    toJSON(_: MsgSaveCardContentResponse): unknown;
    fromPartial(_: DeepPartial<MsgSaveCardContentResponse>): MsgSaveCardContentResponse;
};
export declare const MsgTransferCard: {
    encode(message: MsgTransferCard, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgTransferCard;
    fromJSON(object: any): MsgTransferCard;
    toJSON(message: MsgTransferCard): unknown;
    fromPartial(object: DeepPartial<MsgTransferCard>): MsgTransferCard;
};
export declare const MsgTransferCardResponse: {
    encode(_: MsgTransferCardResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgTransferCardResponse;
    fromJSON(_: any): MsgTransferCardResponse;
    toJSON(_: MsgTransferCardResponse): unknown;
    fromPartial(_: DeepPartial<MsgTransferCardResponse>): MsgTransferCardResponse;
};
export declare const MsgDonateToCard: {
    encode(message: MsgDonateToCard, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgDonateToCard;
    fromJSON(object: any): MsgDonateToCard;
    toJSON(message: MsgDonateToCard): unknown;
    fromPartial(object: DeepPartial<MsgDonateToCard>): MsgDonateToCard;
};
export declare const MsgDonateToCardResponse: {
    encode(_: MsgDonateToCardResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgDonateToCardResponse;
    fromJSON(_: any): MsgDonateToCardResponse;
    toJSON(_: MsgDonateToCardResponse): unknown;
    fromPartial(_: DeepPartial<MsgDonateToCardResponse>): MsgDonateToCardResponse;
};
export declare const MsgAddArtwork: {
    encode(message: MsgAddArtwork, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgAddArtwork;
    fromJSON(object: any): MsgAddArtwork;
    toJSON(message: MsgAddArtwork): unknown;
    fromPartial(object: DeepPartial<MsgAddArtwork>): MsgAddArtwork;
};
export declare const MsgAddArtworkResponse: {
    encode(_: MsgAddArtworkResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgAddArtworkResponse;
    fromJSON(_: any): MsgAddArtworkResponse;
    toJSON(_: MsgAddArtworkResponse): unknown;
    fromPartial(_: DeepPartial<MsgAddArtworkResponse>): MsgAddArtworkResponse;
};
export declare const MsgSubmitCopyrightProposal: {
    encode(message: MsgSubmitCopyrightProposal, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgSubmitCopyrightProposal;
    fromJSON(object: any): MsgSubmitCopyrightProposal;
    toJSON(message: MsgSubmitCopyrightProposal): unknown;
    fromPartial(object: DeepPartial<MsgSubmitCopyrightProposal>): MsgSubmitCopyrightProposal;
};
export declare const MsgSubmitCopyrightProposalResponse: {
    encode(_: MsgSubmitCopyrightProposalResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgSubmitCopyrightProposalResponse;
    fromJSON(_: any): MsgSubmitCopyrightProposalResponse;
    toJSON(_: MsgSubmitCopyrightProposalResponse): unknown;
    fromPartial(_: DeepPartial<MsgSubmitCopyrightProposalResponse>): MsgSubmitCopyrightProposalResponse;
};
export declare const MsgChangeArtist: {
    encode(message: MsgChangeArtist, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgChangeArtist;
    fromJSON(object: any): MsgChangeArtist;
    toJSON(message: MsgChangeArtist): unknown;
    fromPartial(object: DeepPartial<MsgChangeArtist>): MsgChangeArtist;
};
export declare const MsgChangeArtistResponse: {
    encode(_: MsgChangeArtistResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgChangeArtistResponse;
    fromJSON(_: any): MsgChangeArtistResponse;
    toJSON(_: MsgChangeArtistResponse): unknown;
    fromPartial(_: DeepPartial<MsgChangeArtistResponse>): MsgChangeArtistResponse;
};
export declare const MsgRegisterForCouncil: {
    encode(message: MsgRegisterForCouncil, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgRegisterForCouncil;
    fromJSON(object: any): MsgRegisterForCouncil;
    toJSON(message: MsgRegisterForCouncil): unknown;
    fromPartial(object: DeepPartial<MsgRegisterForCouncil>): MsgRegisterForCouncil;
};
export declare const MsgRegisterForCouncilResponse: {
    encode(_: MsgRegisterForCouncilResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgRegisterForCouncilResponse;
    fromJSON(_: any): MsgRegisterForCouncilResponse;
    toJSON(_: MsgRegisterForCouncilResponse): unknown;
    fromPartial(_: DeepPartial<MsgRegisterForCouncilResponse>): MsgRegisterForCouncilResponse;
};
export declare const MsgReportMatch: {
    encode(message: MsgReportMatch, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgReportMatch;
    fromJSON(object: any): MsgReportMatch;
    toJSON(message: MsgReportMatch): unknown;
    fromPartial(object: DeepPartial<MsgReportMatch>): MsgReportMatch;
};
export declare const MsgReportMatchResponse: {
    encode(message: MsgReportMatchResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgReportMatchResponse;
    fromJSON(object: any): MsgReportMatchResponse;
    toJSON(message: MsgReportMatchResponse): unknown;
    fromPartial(object: DeepPartial<MsgReportMatchResponse>): MsgReportMatchResponse;
};
export declare const MsgSubmitMatchReporterProposal: {
    encode(message: MsgSubmitMatchReporterProposal, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgSubmitMatchReporterProposal;
    fromJSON(object: any): MsgSubmitMatchReporterProposal;
    toJSON(message: MsgSubmitMatchReporterProposal): unknown;
    fromPartial(object: DeepPartial<MsgSubmitMatchReporterProposal>): MsgSubmitMatchReporterProposal;
};
export declare const MsgSubmitMatchReporterProposalResponse: {
    encode(_: MsgSubmitMatchReporterProposalResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgSubmitMatchReporterProposalResponse;
    fromJSON(_: any): MsgSubmitMatchReporterProposalResponse;
    toJSON(_: MsgSubmitMatchReporterProposalResponse): unknown;
    fromPartial(_: DeepPartial<MsgSubmitMatchReporterProposalResponse>): MsgSubmitMatchReporterProposalResponse;
};
export declare const MsgApointMatchReporter: {
    encode(message: MsgApointMatchReporter, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgApointMatchReporter;
    fromJSON(object: any): MsgApointMatchReporter;
    toJSON(message: MsgApointMatchReporter): unknown;
    fromPartial(object: DeepPartial<MsgApointMatchReporter>): MsgApointMatchReporter;
};
export declare const MsgApointMatchReporterResponse: {
    encode(_: MsgApointMatchReporterResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgApointMatchReporterResponse;
    fromJSON(_: any): MsgApointMatchReporterResponse;
    toJSON(_: MsgApointMatchReporterResponse): unknown;
    fromPartial(_: DeepPartial<MsgApointMatchReporterResponse>): MsgApointMatchReporterResponse;
};
export declare const MsgCreateCollection: {
    encode(message: MsgCreateCollection, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgCreateCollection;
    fromJSON(object: any): MsgCreateCollection;
    toJSON(message: MsgCreateCollection): unknown;
    fromPartial(object: DeepPartial<MsgCreateCollection>): MsgCreateCollection;
};
export declare const MsgCreateCollectionResponse: {
    encode(_: MsgCreateCollectionResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgCreateCollectionResponse;
    fromJSON(_: any): MsgCreateCollectionResponse;
    toJSON(_: MsgCreateCollectionResponse): unknown;
    fromPartial(_: DeepPartial<MsgCreateCollectionResponse>): MsgCreateCollectionResponse;
};
export declare const MsgAddCardToCollection: {
    encode(message: MsgAddCardToCollection, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgAddCardToCollection;
    fromJSON(object: any): MsgAddCardToCollection;
    toJSON(message: MsgAddCardToCollection): unknown;
    fromPartial(object: DeepPartial<MsgAddCardToCollection>): MsgAddCardToCollection;
};
export declare const MsgAddCardToCollectionResponse: {
    encode(_: MsgAddCardToCollectionResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgAddCardToCollectionResponse;
    fromJSON(_: any): MsgAddCardToCollectionResponse;
    toJSON(_: MsgAddCardToCollectionResponse): unknown;
    fromPartial(_: DeepPartial<MsgAddCardToCollectionResponse>): MsgAddCardToCollectionResponse;
};
export declare const MsgFinalizeCollection: {
    encode(message: MsgFinalizeCollection, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgFinalizeCollection;
    fromJSON(object: any): MsgFinalizeCollection;
    toJSON(message: MsgFinalizeCollection): unknown;
    fromPartial(object: DeepPartial<MsgFinalizeCollection>): MsgFinalizeCollection;
};
export declare const MsgFinalizeCollectionResponse: {
    encode(_: MsgFinalizeCollectionResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgFinalizeCollectionResponse;
    fromJSON(_: any): MsgFinalizeCollectionResponse;
    toJSON(_: MsgFinalizeCollectionResponse): unknown;
    fromPartial(_: DeepPartial<MsgFinalizeCollectionResponse>): MsgFinalizeCollectionResponse;
};
export declare const MsgBuyCollection: {
    encode(message: MsgBuyCollection, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgBuyCollection;
    fromJSON(object: any): MsgBuyCollection;
    toJSON(message: MsgBuyCollection): unknown;
    fromPartial(object: DeepPartial<MsgBuyCollection>): MsgBuyCollection;
};
export declare const MsgBuyCollectionResponse: {
    encode(_: MsgBuyCollectionResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgBuyCollectionResponse;
    fromJSON(_: any): MsgBuyCollectionResponse;
    toJSON(_: MsgBuyCollectionResponse): unknown;
    fromPartial(_: DeepPartial<MsgBuyCollectionResponse>): MsgBuyCollectionResponse;
};
export declare const MsgRemoveCardFromCollection: {
    encode(message: MsgRemoveCardFromCollection, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgRemoveCardFromCollection;
    fromJSON(object: any): MsgRemoveCardFromCollection;
    toJSON(message: MsgRemoveCardFromCollection): unknown;
    fromPartial(object: DeepPartial<MsgRemoveCardFromCollection>): MsgRemoveCardFromCollection;
};
export declare const MsgRemoveCardFromCollectionResponse: {
    encode(_: MsgRemoveCardFromCollectionResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgRemoveCardFromCollectionResponse;
    fromJSON(_: any): MsgRemoveCardFromCollectionResponse;
    toJSON(_: MsgRemoveCardFromCollectionResponse): unknown;
    fromPartial(_: DeepPartial<MsgRemoveCardFromCollectionResponse>): MsgRemoveCardFromCollectionResponse;
};
export declare const MsgRemoveContributorFromCollection: {
    encode(message: MsgRemoveContributorFromCollection, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgRemoveContributorFromCollection;
    fromJSON(object: any): MsgRemoveContributorFromCollection;
    toJSON(message: MsgRemoveContributorFromCollection): unknown;
    fromPartial(object: DeepPartial<MsgRemoveContributorFromCollection>): MsgRemoveContributorFromCollection;
};
export declare const MsgRemoveContributorFromCollectionResponse: {
    encode(_: MsgRemoveContributorFromCollectionResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgRemoveContributorFromCollectionResponse;
    fromJSON(_: any): MsgRemoveContributorFromCollectionResponse;
    toJSON(_: MsgRemoveContributorFromCollectionResponse): unknown;
    fromPartial(_: DeepPartial<MsgRemoveContributorFromCollectionResponse>): MsgRemoveContributorFromCollectionResponse;
};
export declare const MsgAddContributorToCollection: {
    encode(message: MsgAddContributorToCollection, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgAddContributorToCollection;
    fromJSON(object: any): MsgAddContributorToCollection;
    toJSON(message: MsgAddContributorToCollection): unknown;
    fromPartial(object: DeepPartial<MsgAddContributorToCollection>): MsgAddContributorToCollection;
};
export declare const MsgAddContributorToCollectionResponse: {
    encode(_: MsgAddContributorToCollectionResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgAddContributorToCollectionResponse;
    fromJSON(_: any): MsgAddContributorToCollectionResponse;
    toJSON(_: MsgAddContributorToCollectionResponse): unknown;
    fromPartial(_: DeepPartial<MsgAddContributorToCollectionResponse>): MsgAddContributorToCollectionResponse;
};
export declare const MsgSubmitCollectionProposal: {
    encode(message: MsgSubmitCollectionProposal, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgSubmitCollectionProposal;
    fromJSON(object: any): MsgSubmitCollectionProposal;
    toJSON(message: MsgSubmitCollectionProposal): unknown;
    fromPartial(object: DeepPartial<MsgSubmitCollectionProposal>): MsgSubmitCollectionProposal;
};
export declare const MsgSubmitCollectionProposalResponse: {
    encode(_: MsgSubmitCollectionProposalResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgSubmitCollectionProposalResponse;
    fromJSON(_: any): MsgSubmitCollectionProposalResponse;
    toJSON(_: MsgSubmitCollectionProposalResponse): unknown;
    fromPartial(_: DeepPartial<MsgSubmitCollectionProposalResponse>): MsgSubmitCollectionProposalResponse;
};
export declare const MsgCreateSellOffer: {
    encode(message: MsgCreateSellOffer, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgCreateSellOffer;
    fromJSON(object: any): MsgCreateSellOffer;
    toJSON(message: MsgCreateSellOffer): unknown;
    fromPartial(object: DeepPartial<MsgCreateSellOffer>): MsgCreateSellOffer;
};
export declare const MsgCreateSellOfferResponse: {
    encode(_: MsgCreateSellOfferResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgCreateSellOfferResponse;
    fromJSON(_: any): MsgCreateSellOfferResponse;
    toJSON(_: MsgCreateSellOfferResponse): unknown;
    fromPartial(_: DeepPartial<MsgCreateSellOfferResponse>): MsgCreateSellOfferResponse;
};
export declare const MsgBuyCard: {
    encode(message: MsgBuyCard, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgBuyCard;
    fromJSON(object: any): MsgBuyCard;
    toJSON(message: MsgBuyCard): unknown;
    fromPartial(object: DeepPartial<MsgBuyCard>): MsgBuyCard;
};
export declare const MsgBuyCardResponse: {
    encode(_: MsgBuyCardResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgBuyCardResponse;
    fromJSON(_: any): MsgBuyCardResponse;
    toJSON(_: MsgBuyCardResponse): unknown;
    fromPartial(_: DeepPartial<MsgBuyCardResponse>): MsgBuyCardResponse;
};
export declare const MsgRemoveSellOffer: {
    encode(message: MsgRemoveSellOffer, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgRemoveSellOffer;
    fromJSON(object: any): MsgRemoveSellOffer;
    toJSON(message: MsgRemoveSellOffer): unknown;
    fromPartial(object: DeepPartial<MsgRemoveSellOffer>): MsgRemoveSellOffer;
};
export declare const MsgRemoveSellOfferResponse: {
    encode(_: MsgRemoveSellOfferResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgRemoveSellOfferResponse;
    fromJSON(_: any): MsgRemoveSellOfferResponse;
    toJSON(_: MsgRemoveSellOfferResponse): unknown;
    fromPartial(_: DeepPartial<MsgRemoveSellOfferResponse>): MsgRemoveSellOfferResponse;
};
export declare const MsgAddArtworkToCollection: {
    encode(message: MsgAddArtworkToCollection, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgAddArtworkToCollection;
    fromJSON(object: any): MsgAddArtworkToCollection;
    toJSON(message: MsgAddArtworkToCollection): unknown;
    fromPartial(object: DeepPartial<MsgAddArtworkToCollection>): MsgAddArtworkToCollection;
};
export declare const MsgAddArtworkToCollectionResponse: {
    encode(_: MsgAddArtworkToCollectionResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgAddArtworkToCollectionResponse;
    fromJSON(_: any): MsgAddArtworkToCollectionResponse;
    toJSON(_: MsgAddArtworkToCollectionResponse): unknown;
    fromPartial(_: DeepPartial<MsgAddArtworkToCollectionResponse>): MsgAddArtworkToCollectionResponse;
};
export declare const MsgAddStoryToCollection: {
    encode(message: MsgAddStoryToCollection, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgAddStoryToCollection;
    fromJSON(object: any): MsgAddStoryToCollection;
    toJSON(message: MsgAddStoryToCollection): unknown;
    fromPartial(object: DeepPartial<MsgAddStoryToCollection>): MsgAddStoryToCollection;
};
export declare const MsgAddStoryToCollectionResponse: {
    encode(_: MsgAddStoryToCollectionResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgAddStoryToCollectionResponse;
    fromJSON(_: any): MsgAddStoryToCollectionResponse;
    toJSON(_: MsgAddStoryToCollectionResponse): unknown;
    fromPartial(_: DeepPartial<MsgAddStoryToCollectionResponse>): MsgAddStoryToCollectionResponse;
};
export declare const MsgSetCardRarity: {
    encode(message: MsgSetCardRarity, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgSetCardRarity;
    fromJSON(object: any): MsgSetCardRarity;
    toJSON(message: MsgSetCardRarity): unknown;
    fromPartial(object: DeepPartial<MsgSetCardRarity>): MsgSetCardRarity;
};
export declare const MsgSetCardRarityResponse: {
    encode(_: MsgSetCardRarityResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgSetCardRarityResponse;
    fromJSON(_: any): MsgSetCardRarityResponse;
    toJSON(_: MsgSetCardRarityResponse): unknown;
    fromPartial(_: DeepPartial<MsgSetCardRarityResponse>): MsgSetCardRarityResponse;
};
export declare const MsgCreateCouncil: {
    encode(message: MsgCreateCouncil, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgCreateCouncil;
    fromJSON(object: any): MsgCreateCouncil;
    toJSON(message: MsgCreateCouncil): unknown;
    fromPartial(object: DeepPartial<MsgCreateCouncil>): MsgCreateCouncil;
};
export declare const MsgCreateCouncilResponse: {
    encode(_: MsgCreateCouncilResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgCreateCouncilResponse;
    fromJSON(_: any): MsgCreateCouncilResponse;
    toJSON(_: MsgCreateCouncilResponse): unknown;
    fromPartial(_: DeepPartial<MsgCreateCouncilResponse>): MsgCreateCouncilResponse;
};
export declare const MsgCommitCouncilResponse: {
    encode(message: MsgCommitCouncilResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgCommitCouncilResponse;
    fromJSON(object: any): MsgCommitCouncilResponse;
    toJSON(message: MsgCommitCouncilResponse): unknown;
    fromPartial(object: DeepPartial<MsgCommitCouncilResponse>): MsgCommitCouncilResponse;
};
export declare const MsgCommitCouncilResponseResponse: {
    encode(_: MsgCommitCouncilResponseResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgCommitCouncilResponseResponse;
    fromJSON(_: any): MsgCommitCouncilResponseResponse;
    toJSON(_: MsgCommitCouncilResponseResponse): unknown;
    fromPartial(_: DeepPartial<MsgCommitCouncilResponseResponse>): MsgCommitCouncilResponseResponse;
};
export declare const MsgRevealCouncilResponse: {
    encode(message: MsgRevealCouncilResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgRevealCouncilResponse;
    fromJSON(object: any): MsgRevealCouncilResponse;
    toJSON(message: MsgRevealCouncilResponse): unknown;
    fromPartial(object: DeepPartial<MsgRevealCouncilResponse>): MsgRevealCouncilResponse;
};
export declare const MsgRevealCouncilResponseResponse: {
    encode(_: MsgRevealCouncilResponseResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgRevealCouncilResponseResponse;
    fromJSON(_: any): MsgRevealCouncilResponseResponse;
    toJSON(_: MsgRevealCouncilResponseResponse): unknown;
    fromPartial(_: DeepPartial<MsgRevealCouncilResponseResponse>): MsgRevealCouncilResponseResponse;
};
export declare const MsgRestartCouncil: {
    encode(message: MsgRestartCouncil, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgRestartCouncil;
    fromJSON(object: any): MsgRestartCouncil;
    toJSON(message: MsgRestartCouncil): unknown;
    fromPartial(object: DeepPartial<MsgRestartCouncil>): MsgRestartCouncil;
};
export declare const MsgRestartCouncilResponse: {
    encode(_: MsgRestartCouncilResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgRestartCouncilResponse;
    fromJSON(_: any): MsgRestartCouncilResponse;
    toJSON(_: MsgRestartCouncilResponse): unknown;
    fromPartial(_: DeepPartial<MsgRestartCouncilResponse>): MsgRestartCouncilResponse;
};
export declare const MsgRewokeCouncilRegistration: {
    encode(message: MsgRewokeCouncilRegistration, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgRewokeCouncilRegistration;
    fromJSON(object: any): MsgRewokeCouncilRegistration;
    toJSON(message: MsgRewokeCouncilRegistration): unknown;
    fromPartial(object: DeepPartial<MsgRewokeCouncilRegistration>): MsgRewokeCouncilRegistration;
};
export declare const MsgRewokeCouncilRegistrationResponse: {
    encode(_: MsgRewokeCouncilRegistrationResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgRewokeCouncilRegistrationResponse;
    fromJSON(_: any): MsgRewokeCouncilRegistrationResponse;
    toJSON(_: MsgRewokeCouncilRegistrationResponse): unknown;
    fromPartial(_: DeepPartial<MsgRewokeCouncilRegistrationResponse>): MsgRewokeCouncilRegistrationResponse;
};
/** Msg defines the Msg service. */
export interface Msg {
    Createuser(request: MsgCreateuser): Promise<MsgCreateuserResponse>;
    BuyCardScheme(request: MsgBuyCardScheme): Promise<MsgBuyCardSchemeResponse>;
    VoteCard(request: MsgVoteCard): Promise<MsgVoteCardResponse>;
    SaveCardContent(request: MsgSaveCardContent): Promise<MsgSaveCardContentResponse>;
    TransferCard(request: MsgTransferCard): Promise<MsgTransferCardResponse>;
    DonateToCard(request: MsgDonateToCard): Promise<MsgDonateToCardResponse>;
    AddArtwork(request: MsgAddArtwork): Promise<MsgAddArtworkResponse>;
    SubmitCopyrightProposal(request: MsgSubmitCopyrightProposal): Promise<MsgSubmitCopyrightProposalResponse>;
    ChangeArtist(request: MsgChangeArtist): Promise<MsgChangeArtistResponse>;
    RegisterForCouncil(request: MsgRegisterForCouncil): Promise<MsgRegisterForCouncilResponse>;
    ReportMatch(request: MsgReportMatch): Promise<MsgReportMatchResponse>;
    SubmitMatchReporterProposal(request: MsgSubmitMatchReporterProposal): Promise<MsgSubmitMatchReporterProposalResponse>;
    ApointMatchReporter(request: MsgApointMatchReporter): Promise<MsgApointMatchReporterResponse>;
    CreateCollection(request: MsgCreateCollection): Promise<MsgCreateCollectionResponse>;
    AddCardToCollection(request: MsgAddCardToCollection): Promise<MsgAddCardToCollectionResponse>;
    FinalizeCollection(request: MsgFinalizeCollection): Promise<MsgFinalizeCollectionResponse>;
    BuyCollection(request: MsgBuyCollection): Promise<MsgBuyCollectionResponse>;
    RemoveCardFromCollection(request: MsgRemoveCardFromCollection): Promise<MsgRemoveCardFromCollectionResponse>;
    RemoveContributorFromCollection(request: MsgRemoveContributorFromCollection): Promise<MsgRemoveContributorFromCollectionResponse>;
    AddContributorToCollection(request: MsgAddContributorToCollection): Promise<MsgAddContributorToCollectionResponse>;
    SubmitCollectionProposal(request: MsgSubmitCollectionProposal): Promise<MsgSubmitCollectionProposalResponse>;
    CreateSellOffer(request: MsgCreateSellOffer): Promise<MsgCreateSellOfferResponse>;
    BuyCard(request: MsgBuyCard): Promise<MsgBuyCardResponse>;
    RemoveSellOffer(request: MsgRemoveSellOffer): Promise<MsgRemoveSellOfferResponse>;
    AddArtworkToCollection(request: MsgAddArtworkToCollection): Promise<MsgAddArtworkToCollectionResponse>;
    AddStoryToCollection(request: MsgAddStoryToCollection): Promise<MsgAddStoryToCollectionResponse>;
    SetCardRarity(request: MsgSetCardRarity): Promise<MsgSetCardRarityResponse>;
    CreateCouncil(request: MsgCreateCouncil): Promise<MsgCreateCouncilResponse>;
    CommitCouncilResponse(request: MsgCommitCouncilResponse): Promise<MsgCommitCouncilResponseResponse>;
    RevealCouncilResponse(request: MsgRevealCouncilResponse): Promise<MsgRevealCouncilResponseResponse>;
    RestartCouncil(request: MsgRestartCouncil): Promise<MsgRestartCouncilResponse>;
    /** this line is used by starport scaffolding # proto/tx/rpc */
    RewokeCouncilRegistration(request: MsgRewokeCouncilRegistration): Promise<MsgRewokeCouncilRegistrationResponse>;
}
export declare class MsgClientImpl implements Msg {
    private readonly rpc;
    constructor(rpc: Rpc);
    Createuser(request: MsgCreateuser): Promise<MsgCreateuserResponse>;
    BuyCardScheme(request: MsgBuyCardScheme): Promise<MsgBuyCardSchemeResponse>;
    VoteCard(request: MsgVoteCard): Promise<MsgVoteCardResponse>;
    SaveCardContent(request: MsgSaveCardContent): Promise<MsgSaveCardContentResponse>;
    TransferCard(request: MsgTransferCard): Promise<MsgTransferCardResponse>;
    DonateToCard(request: MsgDonateToCard): Promise<MsgDonateToCardResponse>;
    AddArtwork(request: MsgAddArtwork): Promise<MsgAddArtworkResponse>;
    SubmitCopyrightProposal(request: MsgSubmitCopyrightProposal): Promise<MsgSubmitCopyrightProposalResponse>;
    ChangeArtist(request: MsgChangeArtist): Promise<MsgChangeArtistResponse>;
    RegisterForCouncil(request: MsgRegisterForCouncil): Promise<MsgRegisterForCouncilResponse>;
    ReportMatch(request: MsgReportMatch): Promise<MsgReportMatchResponse>;
    SubmitMatchReporterProposal(request: MsgSubmitMatchReporterProposal): Promise<MsgSubmitMatchReporterProposalResponse>;
    ApointMatchReporter(request: MsgApointMatchReporter): Promise<MsgApointMatchReporterResponse>;
    CreateCollection(request: MsgCreateCollection): Promise<MsgCreateCollectionResponse>;
    AddCardToCollection(request: MsgAddCardToCollection): Promise<MsgAddCardToCollectionResponse>;
    FinalizeCollection(request: MsgFinalizeCollection): Promise<MsgFinalizeCollectionResponse>;
    BuyCollection(request: MsgBuyCollection): Promise<MsgBuyCollectionResponse>;
    RemoveCardFromCollection(request: MsgRemoveCardFromCollection): Promise<MsgRemoveCardFromCollectionResponse>;
    RemoveContributorFromCollection(request: MsgRemoveContributorFromCollection): Promise<MsgRemoveContributorFromCollectionResponse>;
    AddContributorToCollection(request: MsgAddContributorToCollection): Promise<MsgAddContributorToCollectionResponse>;
    SubmitCollectionProposal(request: MsgSubmitCollectionProposal): Promise<MsgSubmitCollectionProposalResponse>;
    CreateSellOffer(request: MsgCreateSellOffer): Promise<MsgCreateSellOfferResponse>;
    BuyCard(request: MsgBuyCard): Promise<MsgBuyCardResponse>;
    RemoveSellOffer(request: MsgRemoveSellOffer): Promise<MsgRemoveSellOfferResponse>;
    AddArtworkToCollection(request: MsgAddArtworkToCollection): Promise<MsgAddArtworkToCollectionResponse>;
    AddStoryToCollection(request: MsgAddStoryToCollection): Promise<MsgAddStoryToCollectionResponse>;
    SetCardRarity(request: MsgSetCardRarity): Promise<MsgSetCardRarityResponse>;
    CreateCouncil(request: MsgCreateCouncil): Promise<MsgCreateCouncilResponse>;
    CommitCouncilResponse(request: MsgCommitCouncilResponse): Promise<MsgCommitCouncilResponseResponse>;
    RevealCouncilResponse(request: MsgRevealCouncilResponse): Promise<MsgRevealCouncilResponseResponse>;
    RestartCouncil(request: MsgRestartCouncil): Promise<MsgRestartCouncilResponse>;
    RewokeCouncilRegistration(request: MsgRewokeCouncilRegistration): Promise<MsgRewokeCouncilRegistrationResponse>;
}
interface Rpc {
    request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};