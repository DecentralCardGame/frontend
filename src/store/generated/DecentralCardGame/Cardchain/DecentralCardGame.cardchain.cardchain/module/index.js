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
    ["/DecentralCardGame.cardchain.cardchain.MsgApointMatchReporter", tx_1.MsgApointMatchReporter],
    ["/DecentralCardGame.cardchain.cardchain.MsgSetProfileCard", tx_2.MsgSetProfileCard],
    ["/DecentralCardGame.cardchain.cardchain.MsgCreateuser", tx_3.MsgCreateuser],
    ["/DecentralCardGame.cardchain.cardchain.MsgRevealCouncilResponse", tx_4.MsgRevealCouncilResponse],
    ["/DecentralCardGame.cardchain.cardchain.MsgBuyCollection", tx_5.MsgBuyCollection],
    ["/DecentralCardGame.cardchain.cardchain.MsgAddArtwork", tx_6.MsgAddArtwork],
    ["/DecentralCardGame.cardchain.cardchain.MsgChangeArtist", tx_7.MsgChangeArtist],
    ["/DecentralCardGame.cardchain.cardchain.MsgRemoveCardFromCollection", tx_8.MsgRemoveCardFromCollection],
    ["/DecentralCardGame.cardchain.cardchain.MsgCreateCollection", tx_9.MsgCreateCollection],
    ["/DecentralCardGame.cardchain.cardchain.MsgSaveCardContent", tx_10.MsgSaveCardContent],
    ["/DecentralCardGame.cardchain.cardchain.MsgAddArtworkToCollection", tx_11.MsgAddArtworkToCollection],
    ["/DecentralCardGame.cardchain.cardchain.MsgFinalizeCollection", tx_12.MsgFinalizeCollection],
    ["/DecentralCardGame.cardchain.cardchain.MsgRewokeCouncilRegistration", tx_13.MsgRewokeCouncilRegistration],
    ["/DecentralCardGame.cardchain.cardchain.MsgSubmitMatchReporterProposal", tx_14.MsgSubmitMatchReporterProposal],
    ["/DecentralCardGame.cardchain.cardchain.MsgRestartCouncil", tx_15.MsgRestartCouncil],
    ["/DecentralCardGame.cardchain.cardchain.MsgSubmitCopyrightProposal", tx_16.MsgSubmitCopyrightProposal],
    ["/DecentralCardGame.cardchain.cardchain.MsgSetCardRarity", tx_17.MsgSetCardRarity],
    ["/DecentralCardGame.cardchain.cardchain.MsgRemoveSellOffer", tx_18.MsgRemoveSellOffer],
    ["/DecentralCardGame.cardchain.cardchain.MsgRegisterForCouncil", tx_19.MsgRegisterForCouncil],
    ["/DecentralCardGame.cardchain.cardchain.MsgCreateCouncil", tx_20.MsgCreateCouncil],
    ["/DecentralCardGame.cardchain.cardchain.MsgReportMatch", tx_21.MsgReportMatch],
    ["/DecentralCardGame.cardchain.cardchain.MsgBuyCardScheme", tx_22.MsgBuyCardScheme],
    ["/DecentralCardGame.cardchain.cardchain.MsgConfirmMatch", tx_23.MsgConfirmMatch],
    ["/DecentralCardGame.cardchain.cardchain.MsgCommitCouncilResponse", tx_24.MsgCommitCouncilResponse],
    ["/DecentralCardGame.cardchain.cardchain.MsgAddContributorToCollection", tx_25.MsgAddContributorToCollection],
    ["/DecentralCardGame.cardchain.cardchain.MsgCreateSellOffer", tx_26.MsgCreateSellOffer],
    ["/DecentralCardGame.cardchain.cardchain.MsgBuyCard", tx_27.MsgBuyCard],
    ["/DecentralCardGame.cardchain.cardchain.MsgVoteCard", tx_28.MsgVoteCard],
    ["/DecentralCardGame.cardchain.cardchain.MsgRemoveContributorFromCollection", tx_29.MsgRemoveContributorFromCollection],
    ["/DecentralCardGame.cardchain.cardchain.MsgAddStoryToCollection", tx_30.MsgAddStoryToCollection],
    ["/DecentralCardGame.cardchain.cardchain.MsgSubmitCollectionProposal", tx_31.MsgSubmitCollectionProposal],
    ["/DecentralCardGame.cardchain.cardchain.MsgDonateToCard", tx_32.MsgDonateToCard],
    ["/DecentralCardGame.cardchain.cardchain.MsgTransferCard", tx_33.MsgTransferCard],
    ["/DecentralCardGame.cardchain.cardchain.MsgAddCardToCollection", tx_34.MsgAddCardToCollection],
];
exports.MissingWalletError = new Error("wallet is required");
exports.registry = new proto_signing_1.Registry(types);
const defaultFee = {
    amount: [],
    gas: "200000",
};
var sequenceInfo = {}
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
        signAndBroadcast: (msgs, { fee, memo } = { fee: defaultFee, memo: "" }) => {
            // code injection to get sequence fast firing working
            client.getSequence = async function (address) {
                const height = await this.getHeight()
                const account = await this.getAccount(address);

                if (!account) {
                    throw new Error("Account does not exist on chain. Send some tokens there before trying to query sequence.");
                }

                if (!sequenceInfo.height) {
                    sequenceInfo = {
                        height: height,
                        sequence: account.sequence
                    }
                }
                else if (sequenceInfo.height < height) {
                    sequenceInfo = {
                        height: height,
                        sequence: account.sequence
                    }
                }

                let returnSequence = sequenceInfo.sequence
                sequenceInfo.sequence++

                return {
                    accountNumber: account.accountNumber,
                    sequence: returnSequence,
                };
            }
            return client.signAndBroadcast(address, msgs, fee, memo)
        },
        msgApointMatchReporter: (data) => ({ typeUrl: "/DecentralCardGame.cardchain.cardchain.MsgApointMatchReporter", value: tx_1.MsgApointMatchReporter.fromPartial(data) }),
        msgSetProfileCard: (data) => ({ typeUrl: "/DecentralCardGame.cardchain.cardchain.MsgSetProfileCard", value: tx_2.MsgSetProfileCard.fromPartial(data) }),
        msgCreateuser: (data) => ({ typeUrl: "/DecentralCardGame.cardchain.cardchain.MsgCreateuser", value: tx_3.MsgCreateuser.fromPartial(data) }),
        msgRevealCouncilResponse: (data) => ({ typeUrl: "/DecentralCardGame.cardchain.cardchain.MsgRevealCouncilResponse", value: tx_4.MsgRevealCouncilResponse.fromPartial(data) }),
        msgBuyCollection: (data) => ({ typeUrl: "/DecentralCardGame.cardchain.cardchain.MsgBuyCollection", value: tx_5.MsgBuyCollection.fromPartial(data) }),
        msgAddArtwork: (data) => ({ typeUrl: "/DecentralCardGame.cardchain.cardchain.MsgAddArtwork", value: tx_6.MsgAddArtwork.fromPartial(data) }),
        msgChangeArtist: (data) => ({ typeUrl: "/DecentralCardGame.cardchain.cardchain.MsgChangeArtist", value: tx_7.MsgChangeArtist.fromPartial(data) }),
        msgRemoveCardFromCollection: (data) => ({ typeUrl: "/DecentralCardGame.cardchain.cardchain.MsgRemoveCardFromCollection", value: tx_8.MsgRemoveCardFromCollection.fromPartial(data) }),
        msgCreateCollection: (data) => ({ typeUrl: "/DecentralCardGame.cardchain.cardchain.MsgCreateCollection", value: tx_9.MsgCreateCollection.fromPartial(data) }),
        msgSaveCardContent: (data) => ({ typeUrl: "/DecentralCardGame.cardchain.cardchain.MsgSaveCardContent", value: tx_10.MsgSaveCardContent.fromPartial(data) }),
        msgAddArtworkToCollection: (data) => ({ typeUrl: "/DecentralCardGame.cardchain.cardchain.MsgAddArtworkToCollection", value: tx_11.MsgAddArtworkToCollection.fromPartial(data) }),
        msgFinalizeCollection: (data) => ({ typeUrl: "/DecentralCardGame.cardchain.cardchain.MsgFinalizeCollection", value: tx_12.MsgFinalizeCollection.fromPartial(data) }),
        msgRewokeCouncilRegistration: (data) => ({ typeUrl: "/DecentralCardGame.cardchain.cardchain.MsgRewokeCouncilRegistration", value: tx_13.MsgRewokeCouncilRegistration.fromPartial(data) }),
        msgSubmitMatchReporterProposal: (data) => ({ typeUrl: "/DecentralCardGame.cardchain.cardchain.MsgSubmitMatchReporterProposal", value: tx_14.MsgSubmitMatchReporterProposal.fromPartial(data) }),
        msgRestartCouncil: (data) => ({ typeUrl: "/DecentralCardGame.cardchain.cardchain.MsgRestartCouncil", value: tx_15.MsgRestartCouncil.fromPartial(data) }),
        msgSubmitCopyrightProposal: (data) => ({ typeUrl: "/DecentralCardGame.cardchain.cardchain.MsgSubmitCopyrightProposal", value: tx_16.MsgSubmitCopyrightProposal.fromPartial(data) }),
        msgSetCardRarity: (data) => ({ typeUrl: "/DecentralCardGame.cardchain.cardchain.MsgSetCardRarity", value: tx_17.MsgSetCardRarity.fromPartial(data) }),
        msgRemoveSellOffer: (data) => ({ typeUrl: "/DecentralCardGame.cardchain.cardchain.MsgRemoveSellOffer", value: tx_18.MsgRemoveSellOffer.fromPartial(data) }),
        msgRegisterForCouncil: (data) => ({ typeUrl: "/DecentralCardGame.cardchain.cardchain.MsgRegisterForCouncil", value: tx_19.MsgRegisterForCouncil.fromPartial(data) }),
        msgCreateCouncil: (data) => ({ typeUrl: "/DecentralCardGame.cardchain.cardchain.MsgCreateCouncil", value: tx_20.MsgCreateCouncil.fromPartial(data) }),
        msgReportMatch: (data) => ({ typeUrl: "/DecentralCardGame.cardchain.cardchain.MsgReportMatch", value: tx_21.MsgReportMatch.fromPartial(data) }),
        msgBuyCardScheme: (data) => ({ typeUrl: "/DecentralCardGame.cardchain.cardchain.MsgBuyCardScheme", value: tx_22.MsgBuyCardScheme.fromPartial(data) }),
        msgConfirmMatch: (data) => ({ typeUrl: "/DecentralCardGame.cardchain.cardchain.MsgConfirmMatch", value: tx_23.MsgConfirmMatch.fromPartial(data) }),
        msgCommitCouncilResponse: (data) => ({ typeUrl: "/DecentralCardGame.cardchain.cardchain.MsgCommitCouncilResponse", value: tx_24.MsgCommitCouncilResponse.fromPartial(data) }),
        msgAddContributorToCollection: (data) => ({ typeUrl: "/DecentralCardGame.cardchain.cardchain.MsgAddContributorToCollection", value: tx_25.MsgAddContributorToCollection.fromPartial(data) }),
        msgCreateSellOffer: (data) => ({ typeUrl: "/DecentralCardGame.cardchain.cardchain.MsgCreateSellOffer", value: tx_26.MsgCreateSellOffer.fromPartial(data) }),
        msgBuyCard: (data) => ({ typeUrl: "/DecentralCardGame.cardchain.cardchain.MsgBuyCard", value: tx_27.MsgBuyCard.fromPartial(data) }),
        msgVoteCard: (data) => ({ typeUrl: "/DecentralCardGame.cardchain.cardchain.MsgVoteCard", value: tx_28.MsgVoteCard.fromPartial(data) }),
        msgRemoveContributorFromCollection: (data) => ({ typeUrl: "/DecentralCardGame.cardchain.cardchain.MsgRemoveContributorFromCollection", value: tx_29.MsgRemoveContributorFromCollection.fromPartial(data) }),
        msgAddStoryToCollection: (data) => ({ typeUrl: "/DecentralCardGame.cardchain.cardchain.MsgAddStoryToCollection", value: tx_30.MsgAddStoryToCollection.fromPartial(data) }),
        msgSubmitCollectionProposal: (data) => ({ typeUrl: "/DecentralCardGame.cardchain.cardchain.MsgSubmitCollectionProposal", value: tx_31.MsgSubmitCollectionProposal.fromPartial(data) }),
        msgDonateToCard: (data) => ({ typeUrl: "/DecentralCardGame.cardchain.cardchain.MsgDonateToCard", value: tx_32.MsgDonateToCard.fromPartial(data) }),
        msgTransferCard: (data) => ({ typeUrl: "/DecentralCardGame.cardchain.cardchain.MsgTransferCard", value: tx_33.MsgTransferCard.fromPartial(data) }),
        msgAddCardToCollection: (data) => ({ typeUrl: "/DecentralCardGame.cardchain.cardchain.MsgAddCardToCollection", value: tx_34.MsgAddCardToCollection.fromPartial(data) }),
    };
};
exports.txClient = txClient;
const queryClient = async ({ addr: addr } = { addr: "http://localhost:1317" }) => {
    return new rest_1.Api({ baseUrl: addr });
};
exports.queryClient = queryClient;
