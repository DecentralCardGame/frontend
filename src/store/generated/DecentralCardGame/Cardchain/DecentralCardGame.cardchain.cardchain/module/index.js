"use strict";
// THIS FILE IS GENERATED AUTOMATICALLY. DO NOT MODIFY.
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryClient = exports.txClient = exports.registry = exports.MissingWalletError = void 0;
const stargate_1 = require("@cosmjs/stargate");
const proto_signing_1 = require("@cosmjs/proto-signing");
const rest_1 = require("./rest");
const tx_1 = require("./types/cardchain/tx");
const tx_2 = require("./types/cardchain/tx");
const tx_3 = require("./types/cardchain/tx");
const tx_4 = require("./types/cardchain/tx");
const tx_5 = require("./types/cardchain/tx");
const tx_6 = require("./types/cardchain/tx");
const tx_7 = require("./types/cardchain/tx");
const tx_8 = require("./types/cardchain/tx");
const tx_9 = require("./types/cardchain/tx");
const tx_10 = require("./types/cardchain/tx");
const tx_11 = require("./types/cardchain/tx");
const tx_12 = require("./types/cardchain/tx");
const tx_13 = require("./types/cardchain/tx");
const tx_14 = require("./types/cardchain/tx");
const tx_15 = require("./types/cardchain/tx");
const tx_16 = require("./types/cardchain/tx");
const tx_17 = require("./types/cardchain/tx");
const tx_18 = require("./types/cardchain/tx");
const tx_19 = require("./types/cardchain/tx");
const tx_20 = require("./types/cardchain/tx");
const tx_21 = require("./types/cardchain/tx");
const tx_22 = require("./types/cardchain/tx");
const tx_23 = require("./types/cardchain/tx");
const tx_24 = require("./types/cardchain/tx");
const tx_25 = require("./types/cardchain/tx");
const tx_26 = require("./types/cardchain/tx");
const tx_27 = require("./types/cardchain/tx");
const tx_28 = require("./types/cardchain/tx");
const tx_29 = require("./types/cardchain/tx");
const tx_30 = require("./types/cardchain/tx");
const tx_31 = require("./types/cardchain/tx");
const tx_32 = require("./types/cardchain/tx");
const tx_33 = require("./types/cardchain/tx");
const tx_34 = require("./types/cardchain/tx");
const types = [
    ["/DecentralCardGame.cardchain.cardchain.MsgRestartCouncil", tx_1.MsgRestartCouncil],
    ["/DecentralCardGame.cardchain.cardchain.MsgRemoveContributorFromCollection", tx_2.MsgRemoveContributorFromCollection],
    ["/DecentralCardGame.cardchain.cardchain.MsgCreateCouncil", tx_3.MsgCreateCouncil],
    ["/DecentralCardGame.cardchain.cardchain.MsgCreateuser", tx_4.MsgCreateuser],
    ["/DecentralCardGame.cardchain.cardchain.MsgBuyCard", tx_5.MsgBuyCard],
    ["/DecentralCardGame.cardchain.cardchain.MsgSubmitCollectionProposal", tx_6.MsgSubmitCollectionProposal],
    ["/DecentralCardGame.cardchain.cardchain.MsgRewokeCouncilRegistration", tx_7.MsgRewokeCouncilRegistration],
    ["/DecentralCardGame.cardchain.cardchain.MsgSubmitMatchReporterProposal", tx_8.MsgSubmitMatchReporterProposal],
    ["/DecentralCardGame.cardchain.cardchain.MsgAddContributorToCollection", tx_9.MsgAddContributorToCollection],
    ["/DecentralCardGame.cardchain.cardchain.MsgRemoveSellOffer", tx_10.MsgRemoveSellOffer],
    ["/DecentralCardGame.cardchain.cardchain.MsgAddArtwork", tx_11.MsgAddArtwork],
    ["/DecentralCardGame.cardchain.cardchain.MsgApointMatchReporter", tx_12.MsgApointMatchReporter],
    ["/DecentralCardGame.cardchain.cardchain.MsgFinalizeCollection", tx_13.MsgFinalizeCollection],
    ["/DecentralCardGame.cardchain.cardchain.MsgRemoveCardFromCollection", tx_14.MsgRemoveCardFromCollection],
    ["/DecentralCardGame.cardchain.cardchain.MsgChangeArtist", tx_15.MsgChangeArtist],
    ["/DecentralCardGame.cardchain.cardchain.MsgVoteCard", tx_16.MsgVoteCard],
    ["/DecentralCardGame.cardchain.cardchain.MsgTransferCard", tx_17.MsgTransferCard],
    ["/DecentralCardGame.cardchain.cardchain.MsgSubmitCopyrightProposal", tx_18.MsgSubmitCopyrightProposal],
    ["/DecentralCardGame.cardchain.cardchain.MsgCreateCollection", tx_19.MsgCreateCollection],
    ["/DecentralCardGame.cardchain.cardchain.MsgSaveCardContent", tx_20.MsgSaveCardContent],
    ["/DecentralCardGame.cardchain.cardchain.MsgCommitCouncilResponse", tx_21.MsgCommitCouncilResponse],
    ["/DecentralCardGame.cardchain.cardchain.MsgAddCardToCollection", tx_22.MsgAddCardToCollection],
    ["/DecentralCardGame.cardchain.cardchain.MsgReportMatch", tx_23.MsgReportMatch],
    ["/DecentralCardGame.cardchain.cardchain.MsgAddStoryToCollection", tx_24.MsgAddStoryToCollection],
    ["/DecentralCardGame.cardchain.cardchain.MsgRegisterForCouncil", tx_25.MsgRegisterForCouncil],
    ["/DecentralCardGame.cardchain.cardchain.MsgBuyCardScheme", tx_26.MsgBuyCardScheme],
    ["/DecentralCardGame.cardchain.cardchain.MsgConfirmMatch", tx_27.MsgConfirmMatch],
    ["/DecentralCardGame.cardchain.cardchain.MsgSetProfileCard", tx_28.MsgSetProfileCard],
    ["/DecentralCardGame.cardchain.cardchain.MsgBuyCollection", tx_29.MsgBuyCollection],
    ["/DecentralCardGame.cardchain.cardchain.MsgAddArtworkToCollection", tx_30.MsgAddArtworkToCollection],
    ["/DecentralCardGame.cardchain.cardchain.MsgDonateToCard", tx_31.MsgDonateToCard],
    ["/DecentralCardGame.cardchain.cardchain.MsgRevealCouncilResponse", tx_32.MsgRevealCouncilResponse],
    ["/DecentralCardGame.cardchain.cardchain.MsgCreateSellOffer", tx_33.MsgCreateSellOffer],
    ["/DecentralCardGame.cardchain.cardchain.MsgSetCardRarity", tx_34.MsgSetCardRarity],
];
exports.MissingWalletError = new Error("wallet is required");
exports.registry = new proto_signing_1.Registry(types);
const defaultFee = {
    amount: [],
    gas: "200000",
};
const txClient = async (wallet, { addr: addr } = { addr: "http://localhost:26657" }) => {
    if (!wallet)
        throw exports.MissingWalletError;
    let client;
    if (addr) {
        client = await stargate_1.SigningStargateClient.connectWithSigner(addr, wallet, { registry: exports.registry });
    }
    else {
        client = await stargate_1.SigningStargateClient.offline(wallet, { registry: exports.registry });
    }
    const { address } = (await wallet.getAccounts())[0];
    return {
        signAndBroadcast: (msgs, { fee, memo } = { fee: defaultFee, memo: "" }) => client.signAndBroadcast(address, msgs, fee, memo),
        msgRestartCouncil: (data) => ({ typeUrl: "/DecentralCardGame.cardchain.cardchain.MsgRestartCouncil", value: tx_1.MsgRestartCouncil.fromPartial(data) }),
        msgRemoveContributorFromCollection: (data) => ({ typeUrl: "/DecentralCardGame.cardchain.cardchain.MsgRemoveContributorFromCollection", value: tx_2.MsgRemoveContributorFromCollection.fromPartial(data) }),
        msgCreateCouncil: (data) => ({ typeUrl: "/DecentralCardGame.cardchain.cardchain.MsgCreateCouncil", value: tx_3.MsgCreateCouncil.fromPartial(data) }),
        msgCreateuser: (data) => ({ typeUrl: "/DecentralCardGame.cardchain.cardchain.MsgCreateuser", value: tx_4.MsgCreateuser.fromPartial(data) }),
        msgBuyCard: (data) => ({ typeUrl: "/DecentralCardGame.cardchain.cardchain.MsgBuyCard", value: tx_5.MsgBuyCard.fromPartial(data) }),
        msgSubmitCollectionProposal: (data) => ({ typeUrl: "/DecentralCardGame.cardchain.cardchain.MsgSubmitCollectionProposal", value: tx_6.MsgSubmitCollectionProposal.fromPartial(data) }),
        msgRewokeCouncilRegistration: (data) => ({ typeUrl: "/DecentralCardGame.cardchain.cardchain.MsgRewokeCouncilRegistration", value: tx_7.MsgRewokeCouncilRegistration.fromPartial(data) }),
        msgSubmitMatchReporterProposal: (data) => ({ typeUrl: "/DecentralCardGame.cardchain.cardchain.MsgSubmitMatchReporterProposal", value: tx_8.MsgSubmitMatchReporterProposal.fromPartial(data) }),
        msgAddContributorToCollection: (data) => ({ typeUrl: "/DecentralCardGame.cardchain.cardchain.MsgAddContributorToCollection", value: tx_9.MsgAddContributorToCollection.fromPartial(data) }),
        msgRemoveSellOffer: (data) => ({ typeUrl: "/DecentralCardGame.cardchain.cardchain.MsgRemoveSellOffer", value: tx_10.MsgRemoveSellOffer.fromPartial(data) }),
        msgAddArtwork: (data) => ({ typeUrl: "/DecentralCardGame.cardchain.cardchain.MsgAddArtwork", value: tx_11.MsgAddArtwork.fromPartial(data) }),
        msgApointMatchReporter: (data) => ({ typeUrl: "/DecentralCardGame.cardchain.cardchain.MsgApointMatchReporter", value: tx_12.MsgApointMatchReporter.fromPartial(data) }),
        msgFinalizeCollection: (data) => ({ typeUrl: "/DecentralCardGame.cardchain.cardchain.MsgFinalizeCollection", value: tx_13.MsgFinalizeCollection.fromPartial(data) }),
        msgRemoveCardFromCollection: (data) => ({ typeUrl: "/DecentralCardGame.cardchain.cardchain.MsgRemoveCardFromCollection", value: tx_14.MsgRemoveCardFromCollection.fromPartial(data) }),
        msgChangeArtist: (data) => ({ typeUrl: "/DecentralCardGame.cardchain.cardchain.MsgChangeArtist", value: tx_15.MsgChangeArtist.fromPartial(data) }),
        msgVoteCard: (data) => ({ typeUrl: "/DecentralCardGame.cardchain.cardchain.MsgVoteCard", value: tx_16.MsgVoteCard.fromPartial(data) }),
        msgTransferCard: (data) => ({ typeUrl: "/DecentralCardGame.cardchain.cardchain.MsgTransferCard", value: tx_17.MsgTransferCard.fromPartial(data) }),
        msgSubmitCopyrightProposal: (data) => ({ typeUrl: "/DecentralCardGame.cardchain.cardchain.MsgSubmitCopyrightProposal", value: tx_18.MsgSubmitCopyrightProposal.fromPartial(data) }),
        msgCreateCollection: (data) => ({ typeUrl: "/DecentralCardGame.cardchain.cardchain.MsgCreateCollection", value: tx_19.MsgCreateCollection.fromPartial(data) }),
        msgSaveCardContent: (data) => ({ typeUrl: "/DecentralCardGame.cardchain.cardchain.MsgSaveCardContent", value: tx_20.MsgSaveCardContent.fromPartial(data) }),
        msgCommitCouncilResponse: (data) => ({ typeUrl: "/DecentralCardGame.cardchain.cardchain.MsgCommitCouncilResponse", value: tx_21.MsgCommitCouncilResponse.fromPartial(data) }),
        msgAddCardToCollection: (data) => ({ typeUrl: "/DecentralCardGame.cardchain.cardchain.MsgAddCardToCollection", value: tx_22.MsgAddCardToCollection.fromPartial(data) }),
        msgReportMatch: (data) => ({ typeUrl: "/DecentralCardGame.cardchain.cardchain.MsgReportMatch", value: tx_23.MsgReportMatch.fromPartial(data) }),
        msgAddStoryToCollection: (data) => ({ typeUrl: "/DecentralCardGame.cardchain.cardchain.MsgAddStoryToCollection", value: tx_24.MsgAddStoryToCollection.fromPartial(data) }),
        msgRegisterForCouncil: (data) => ({ typeUrl: "/DecentralCardGame.cardchain.cardchain.MsgRegisterForCouncil", value: tx_25.MsgRegisterForCouncil.fromPartial(data) }),
        msgBuyCardScheme: (data) => ({ typeUrl: "/DecentralCardGame.cardchain.cardchain.MsgBuyCardScheme", value: tx_26.MsgBuyCardScheme.fromPartial(data) }),
        msgConfirmMatch: (data) => ({ typeUrl: "/DecentralCardGame.cardchain.cardchain.MsgConfirmMatch", value: tx_27.MsgConfirmMatch.fromPartial(data) }),
        msgSetProfileCard: (data) => ({ typeUrl: "/DecentralCardGame.cardchain.cardchain.MsgSetProfileCard", value: tx_28.MsgSetProfileCard.fromPartial(data) }),
        msgBuyCollection: (data) => ({ typeUrl: "/DecentralCardGame.cardchain.cardchain.MsgBuyCollection", value: tx_29.MsgBuyCollection.fromPartial(data) }),
        msgAddArtworkToCollection: (data) => ({ typeUrl: "/DecentralCardGame.cardchain.cardchain.MsgAddArtworkToCollection", value: tx_30.MsgAddArtworkToCollection.fromPartial(data) }),
        msgDonateToCard: (data) => ({ typeUrl: "/DecentralCardGame.cardchain.cardchain.MsgDonateToCard", value: tx_31.MsgDonateToCard.fromPartial(data) }),
        msgRevealCouncilResponse: (data) => ({ typeUrl: "/DecentralCardGame.cardchain.cardchain.MsgRevealCouncilResponse", value: tx_32.MsgRevealCouncilResponse.fromPartial(data) }),
        msgCreateSellOffer: (data) => ({ typeUrl: "/DecentralCardGame.cardchain.cardchain.MsgCreateSellOffer", value: tx_33.MsgCreateSellOffer.fromPartial(data) }),
        msgSetCardRarity: (data) => ({ typeUrl: "/DecentralCardGame.cardchain.cardchain.MsgSetCardRarity", value: tx_34.MsgSetCardRarity.fromPartial(data) }),
    };
};
exports.txClient = txClient;
const queryClient = async ({ addr: addr } = { addr: "http://localhost:1317" }) => {
    return new rest_1.Api({ baseUrl: addr });
};
exports.queryClient = queryClient;
