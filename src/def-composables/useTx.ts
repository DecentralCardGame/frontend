import {useClient} from "@/composables/useClient";
import {useAddress} from "@/def-composables/useAddress";
import type {ChainCard} from "@/model/Card";
import {Coin, type CompatCoin} from "@/model/Coin";
import type {StdFee} from "@cosmjs/launchpad";
import type {DeliverTxResponse} from "@cosmjs/stargate/build/stargateclient";
import {
  GenericAuthorization
} from "decentralcardgame-cardchain-client-ts/cosmos.authz.v1beta1/types/cosmos/authz/v1beta1/authz";
import {
  Coin as CosmosCoin
} from "decentralcardgame-cardchain-client-ts/cosmos.bank.v1beta1/types/cosmos/base/v1beta1/coin";
import {useNotifications} from "@/def-composables/useNotifications";
import {ref, watch, type Ref} from "vue";
import {
  msgTypes as CCMsgTypes,
  type SingleVote,
} from "decentralcardgame-cardchain-client-ts/DecentralCardGame.cardchain.cardchain";
import {
  Response as CouncilResponse,
} from "decentralcardgame-cardchain-client-ts/DecentralCardGame.cardchain.cardchain/types/cardchain/cardchain/council";
import {SigningStargateClient} from "@cosmjs/stargate";
import {env} from "@/env";
import {type EncodeObject, Registry} from "@cosmjs/proto-signing";
import {msgTypes as BankMsgTypes} from "decentralcardgame-cardchain-client-ts/cosmos.bank.v1beta1";
import {msgTypes as AuthzMsgTypes} from "decentralcardgame-cardchain-client-ts/cosmos.authz.v1beta1";
import {MsgSend} from "decentralcardgame-cardchain-client-ts/cosmos.bank.v1beta1/module";
import {MsgGrant} from "decentralcardgame-cardchain-client-ts/cosmos.authz.v1beta1/module";

export const registry: Registry = new Registry(
  CCMsgTypes.concat(BankMsgTypes).concat(AuthzMsgTypes),
);

const FEE: StdFee = {
  amount: [{amount: "0", denom: "stake"}],
  gas: "2000000000",
};

const {address} = useAddress();
const {notifyFail, notifyInfo, notifySuccess} = useNotifications();

class UnEvaledMessage {
  message: (content: Content) => Promise<DeliverTxResponse>;
  content: Content;
  then: (res: any) => void;
  err: (res: any) => void;

  constructor(
    message: (content: Content) => Promise<DeliverTxResponse>,
    content: Content,
    then: (res: any) => void,
    err: (res: any) => void,
  ) {
    this.message = message;
    this.content = content;
    this.then = then;
    this.err = err;
  }

  execute(): Promise<DeliverTxResponse> {
    return this.message(this.content);
  }
}

class MessageScheduler {
  messageList: Ref<Array<UnEvaledMessage>>;
  blocked: Ref<Boolean>;

  constructor() {
    this.messageList = ref([]);
    this.blocked = ref(false);

    const checkExec = (_: any, __: any) => {
      if (!this.blocked.value && this.messageList.value.length > 0) {
        this.executeMessage(this.messageList.value[0]);
        this.messageList.value.shift();
      }
    };

    watch(() => [...this.messageList.value], checkExec);
    watch(this.blocked, checkExec);
  }

  executeMessage(msg: UnEvaledMessage) {
    notifyInfo("Sending", "Sending request to the blockchain.");
    this.blocked.value = true;
    msg
      .execute()
      .then((res) => {
        this.blocked.value = false;
        return res;
      })
      .catch((err) => {
        this.blocked.value = false;
        throw err;
      })
      .then(stdHandler)
      .then(msg.then)
      .catch(msg.err);
  }

  schedule(
    message: (content: Content) => Promise<DeliverTxResponse>,
    content: Content,
    then: (res: any) => void,
    err: (res: any) => void,
  ) {
    this.messageList.value.push(
      new UnEvaledMessage(message, content, then, err),
    );
  }
}

class Content {
  fee: StdFee;
  memo: string;
  value: any;

  constructor(value: any = {}) {
    this.value = Object.assign(
      {
        fromAddress: address.value,
        creator: address.value,
      },
      value,
    );
    this.fee = FEE;
    this.memo = "";
  }
}

const stdHandler = (res: DeliverTxResponse) => {
  console.log(res);
  if (res.code) {
    notifyFail(
      "Failed to broadcast message",
      res.rawLog ? res.rawLog : "General Error",
    );
    throw new Error("Message Failed: " + res.rawLog);
  }
  let messageName = res.rawLog
    ? JSON.parse(res.rawLog)[0]
      .events[0].attributes[0].value.split(".")
      .at(-1)
      .replace("Msg", "")
    : "";
  notifySuccess("EPIC WIN", messageName + " was successfull");
  return res;
};

export const useTxInstance: () => {
  commitCouncilResponse: (response: string, councilId: number, suggestion: string, then: (res: any) => void, err: (res: any) => void
  ) => void;
  voteCard: (cardId: number, voteType: string, then: (res: any) => void, err: (res: any) => void) => void;
  inviteEarlyAccess: (invitee: string, then: (res: any) => void, err: (res: any) => void) => void;
  buyCardScheme: (coin: CompatCoin, then: (res: any) => void, err: (res: any) => void) => void;
  disinviteEarlyAccess: (invitee: string, then: (res: any) => void, err: (res: any) => void) => void;
  saveCardContent: (cardId: number, card: ChainCard, then: (res: any) => void, err: (res: any) => void) => void;
  addArtwork: (cardId: number, image: string, fullArt: boolean, then: (res: any) => void, err: (res: any) => void) => void;
  transferCard: (cardId: number, receiver: string, then: (res: any) => void, err: (res: any) => void) => void;
  revokeAuthz: (granter: string, grantee: string, msgTypeUrl: string, then: (res: any) => void, err: (res: any) => void) => void;
  authzGameclient: (gameclientAddr: string, then: (res: any) => void, err: (res: any) => void) => void;
  registerForCouncil: (then: (res: any) => void, err: (res: any) => void) => void;
  grantAuthz: (granter: string, grantee: string, grant: string, then: (res: any) => void, err: (res: any) => void) => void;
  revealCouncilResponse: (response: CouncilResponse, secret: string, councilId: number, then: (res: any) => void, err: (res: any) => void) => void;
  rewokeCouncilRegistration: (then: (res: any) => void, err: (res: any) => void) => void;
  createUser: (newUser: string, alias: string, then: (res: any) => void, err: (res: any) => void) => void;
  restartCouncil: (councilId: number, then: (res: any) => void, err: (res: any) => void) => void;
  multiVoteCard: (votes: SingleVote[], then: (res: any) => void, err: (res: any) => void) => void;
  createCouncil: (cardId: number, then: (res: any) => void, err: (res: any) => void) => void;
  setProfileCard: (cardId: number, then: (res: any) => void, err: (res: any) => void) => void;
  send: (coins: CompatCoin[], to: string, then: (res: any) => void, err: (res: any) => void) => void
} = () => {
  const client = useClient();
  const messageScheduler = new MessageScheduler();

  const multiBroadCast = async (
    msgs: EncodeObject[],
    then: (res: any) => void,
    err: (res: any) => void,
  ) => {
    const b = async (): Promise<DeliverTxResponse> => {
      if (!client.signer) {
        throw new Error(
          "MultiBroadCast: Unable to sign Tx. Signer is not present.",
        );
      }
      try {
        const {address} = (await client.signer.getAccounts())[0];
        const signingClient = await SigningStargateClient.connectWithSigner(
          env.rpcURL,
          client.signer,
          {registry, prefix: env.prefix},
        );
        return await signingClient.signAndBroadcast(address, msgs, FEE, "");
      } catch (e: any) {
        throw new Error("MultiBroadCast: Could not broadcast Tx: " + e.message);
      }
    };

    messageScheduler.schedule(b, new Content({}), then, err);
  };

  const authzGameclient = (
    gameclientAddr: string,
    then: (res: any) => void,
    err: (res: any) => void,
  ) => {
    let date = new Date();
    date.setMonth(date.getMonth() + 12);

    const msgs: EncodeObject[] = [
      client.CosmosBankV1Beta1.tx.msgSend({
        value: MsgSend.fromPartial({
          fromAddress: address.value,
          toAddress: gameclientAddr,
          amount: [new Coin("ucredits", 11).toCompatCoin()],
        }),
      }),
    ].concat(
      [
        "/DecentralCardGame.cardchain.cardchain.MsgBuyBoosterPack",
        "/DecentralCardGame.cardchain.cardchain.MsgOpenBoosterPack",
        "/DecentralCardGame.cardchain.cardchain.MsgVoteCard",
        "/DecentralCardGame.cardchain.cardchain.MsgConfirmMatch",
      ].map((msgPath: string) => {
        return client.CosmosAuthzV1Beta1.tx.msgGrant({
          value: MsgGrant.fromPartial({
            granter: address.value,
            grantee: gameclientAddr,
            grant: {
              authorization: {
                typeUrl: "/cosmos.authz.v1beta1.GenericAuthorization",
                value: GenericAuthorization.encode(
                  GenericAuthorization.fromPartial({
                    msg: msgPath,
                  }),
                ).finish(),
              },
              expiration: date,
            },
          }),
        });
      }),
    );
    multiBroadCast(msgs, then, err);
  };

  const send = (
    coins: CompatCoin[],
    to: string,
    then: (res: any) => void,
    err: (res: any) => void,
  ) => {
    messageScheduler.schedule(
      client.CosmosBankV1Beta1.tx.sendMsgSend,
      new Content({
        amount: coins,
        toAddress: to,
      }),
      then,
      err,
    );
  };

  const revokeAuthz = (
    granter: string,
    grantee: string,
    msgTypeUrl: string,
    then: (res: any) => void,
    err: (res: any) => void,
  ) => {
    messageScheduler.schedule(
      client.CosmosAuthzV1Beta1.tx.sendMsgRevoke,
      new Content({
        granter: granter,
        grantee: grantee,
        msgTypeUrl: msgTypeUrl,
      }),
      then,
      err,
    );
  };

  const grantAuthz = (
    granter: string,
    grantee: string,
    grant: string,
    then: (res: any) => void,
    err: (res: any) => void,
  ) => {
    let date = new Date();
    date.setMonth(date.getMonth() + 1);

    messageScheduler.schedule(
      client.CosmosAuthzV1Beta1.tx.sendMsgGrant,
      new Content({
        granter: granter,
        grantee: grantee,
        grant: {
          authorization: {
            typeUrl: "/cosmos.authz.v1beta1.GenericAuthorization",
            value: GenericAuthorization.encode(
              GenericAuthorization.fromPartial({
                msg: grant,
              }),
            ).finish(),
          },
          expiration: date,
        },
      }),
      then,
      err,
    );
  };

  const registerForCouncil = (
    then: (res: any) => void,
    err: (res: any) => void,
  ) => {
    messageScheduler.schedule(
      client.DecentralCardGameCardchainCardchain.tx.sendMsgRegisterForCouncil,
      new Content(),
      then,
      err,
    );
  };

  const rewokeCouncilRegistration = (
    then: (res: any) => void,
    err: (res: any) => void,
  ) => {
    messageScheduler.schedule(
      client.DecentralCardGameCardchainCardchain.tx
        .sendMsgRewokeCouncilRegistration,
      new Content(),
      then,
      err,
    );
  };

  const buyCardScheme = (
    coin: CompatCoin,
    then: (res: any) => void,
    err: (res: any) => void,
  ) => {
    messageScheduler.schedule(
      client.DecentralCardGameCardchainCardchain.tx.sendMsgBuyCardScheme,
      new Content({
        bid: CosmosCoin.fromJSON(coin),
      }),
      then,
      err,
    );
  };

  const createCouncil = (
    cardId: number,
    then: (res: any) => void,
    err: (res: any) => void,
  ) => {
    messageScheduler.schedule(
      client.DecentralCardGameCardchainCardchain.tx.sendMsgCreateCouncil,
      new Content({
        cardId,
      }),
      then,
      err,
    );
  };

  const commitCouncilResponse = (
    response: string,
    councilId: number,
    suggestion: string,
    then: (res: any) => void,
    err: (res: any) => void,
  ) => {
    messageScheduler.schedule(
      client.DecentralCardGameCardchainCardchain.tx.sendMsgCommitCouncilResponse,
      new Content({
        response, councilId, suggestion
      }),
      then,
      err,
    );
  };

  const revealCouncilResponse = (
    response: CouncilResponse,
    secret: string,
    councilId: number,
    then: (res: any) => void,
    err: (res: any) => void,
  ) => {
    messageScheduler.schedule(
      client.DecentralCardGameCardchainCardchain.tx.sendMsgRevealCouncilResponse,
      new Content({
        response, secret, councilId,
      }),
      then,
      err,
    );
  };

  const restartCouncil = (
    councilId: number,
    then: (res: any) => void,
    err: (res: any) => void,
  ) => {
    messageScheduler.schedule(
      client.DecentralCardGameCardchainCardchain.tx.sendMsgRestartCouncil,
      new Content({
        councilId,
      }),
      then,
      err,
    );
  };

  const saveCardContent = (
    cardId: number,
    card: ChainCard,
    then: (res: any) => void,
    err: (res: any) => void,
  ) => {
    messageScheduler.schedule(
      client.DecentralCardGameCardchainCardchain.tx.sendMsgSaveCardContent,
      new Content({
        cardId,
        content: btoa(JSON.stringify(card.content)),
        notes: card.notes,
        artist: card.artist,
        balanceAnchor: card.balanceAnchor,
      }),
      then,
      err,
    );
  };

  const addArtwork = (
    cardId: number,
    image: string,
    fullArt: boolean,
    then: (res: any) => void,
    err: (res: any) => void,
  ) => {
    messageScheduler.schedule(
      client.DecentralCardGameCardchainCardchain.tx.sendMsgAddArtwork,
      new Content({
        cardId,
        image: btoa(image),
        fullArt,
      }),
      then,
      err,
    );
  };

  const voteCard = (
    cardId: number,
    voteType: string,
    then: (res: any) => void,
    err: (res: any) => void,
  ) => {
    messageScheduler.schedule(
      client.DecentralCardGameCardchainCardchain.tx.sendMsgVoteCard,
      new Content({
        cardId,
        voteType,
      }),
      then,
      err,
    );
  };

  const transferCard = (
    cardId: number,
    receiver: string,
    then: (res: any) => void,
    err: (res: any) => void,
  ) => {
    messageScheduler.schedule(
      client.DecentralCardGameCardchainCardchain.tx.sendMsgTransferCard,
      new Content({
        cardId,
        receiver,
      }),
      then,
      err,
    );
  };

  const setProfileCard = (
    cardId: number,
    then: (res: any) => void,
    err: (res: any) => void,
  ) => {
    messageScheduler.schedule(
      client.DecentralCardGameCardchainCardchain.tx.sendMsgSetProfileCard,
      new Content({
        cardId,
      }),
      then,
      err,
    );
  };

  const multiVoteCard = (
    votes: SingleVote[],
    then: (res: any) => void,
    err: (res: any) => void,
  ) => {
    messageScheduler.schedule(
      client.DecentralCardGameCardchainCardchain.tx.sendMsgMultiVoteCard,
      new Content({
        votes,
      }),
      then,
      err,
    );
  };

  const createUser = (
    newUser: string,
    alias: string,
    then: (res: any) => void,
    err: (res: any) => void,
  ) => {
    messageScheduler.schedule(
      client.DecentralCardGameCardchainCardchain.tx.sendMsgCreateuser,
      new Content({
        newUser,
        alias,
      }),
      then,
      err,
    );
  };

  const inviteEarlyAccess = (
    invitee: string,
    then: (res: any) => void,
    err: (res: any) => void,
  ) => {
    messageScheduler.schedule(
      client.DecentralCardGameCardchainCardchain.tx.sendMsgInviteEarlyAccess,
      new Content({
        user: invitee,
      }),
      then,
      err,
    );
  };

  const disinviteEarlyAccess = (
    invitee: string,
    then: (res: any) => void,
    err: (res: any) => void,
  ) => {
    messageScheduler.schedule(
      client.DecentralCardGameCardchainCardchain.tx.sendMsgDisinviteEarlyAccess,
      new Content({
        user: invitee,
      }),
      then,
      err,
    );
  };

  const encounterCreate = (
    name: string,
    Drawlist: number[],
    parameters: { [key: string]: string },
    image: string,
    then: (res: any) => void,
    err: (res: any) => void,
  ) => {
    messageScheduler.schedule(
      client.DecentralCardGameCardchainCardchain.tx.sendMsgEncounterCreate,
      new Content({
        name,
        Drawlist,
        parameters,
        image: btoa(image)
      }),
      then,
      err,
    );
  };


  const encounterClose = (
    encounterId: number,
    user: string,
    won: boolean,
    then: (res: any) => void,
    err: (res: any) => void,
  ) => {
    messageScheduler.schedule(
      client.DecentralCardGameCardchainCardchain.tx.sendMsgEncounterCreate,
      new Content({
        encounterId,
        user,
        won
      }),
      then,
      err,
    );
  };

  const encounterDo = (
    encounterId: number,
    user: string,
    then: (res: any) => void,
    err: (res: any) => void,
  ) => {
    messageScheduler.schedule(
      client.DecentralCardGameCardchainCardchain.tx.sendMsgEncounterCreate,
      new Content({
        encounterId,
        user
      }),
      then,
      err,
    );
  };

  return {
    send,
    buyCardScheme,
    saveCardContent,
    addArtwork,
    voteCard,
    transferCard,
    setProfileCard,
    multiVoteCard,
    grantAuthz,
    revokeAuthz,
    createUser,
    authzGameclient,
    inviteEarlyAccess,
    disinviteEarlyAccess,
    registerForCouncil,
    rewokeCouncilRegistration,
    createCouncil,
    commitCouncilResponse,
    revealCouncilResponse,
    restartCouncil,
    /*
    changeAlias,
    setUserBiography,
    setUserWebsite,

    removeSellOffer,
    createSellOffer,
    buyBoosterPack,

    changeArtist,

    transferBoosterPack,
    openBoosterPack,

    addContributorToSet,
    removeContributorFromSet,
    addArtworkToSet,
    setCardRarity,
    setSetName,
    addCardToSet,
    setSetArtist,
    createSet,
    removeCardFromSet,
    setSetStoryWriter,
    addStoryToSet,
    finalizeSet,
    */
    encounterDo,
    encounterClose,
    encounterCreate,
  };
};

let instance: ReturnType<typeof useTxInstance>;

export const useTx = () => {
  if (!instance) {
    instance = useTxInstance();
  }
  return instance;
};
