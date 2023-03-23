import { useClient } from "@/composables/useClient";
import { useAddress } from "@/def-composables/useAddress";
import type { Card, ChainCard } from "@/model/Card";
import type { Coin } from "@/model/Coin";
import type { StdFee } from "@cosmjs/launchpad";
import type { DeliverTxResponse } from "@cosmjs/stargate/build/stargateclient";
import {
  Coin as CosmosCoin
} from "DecentralCardGame-Cardchain-client-ts/cosmos.bank.v1beta1/types/cosmos/base/v1beta1/coin";
import { useNotifications } from "@/def-composables/useNotifications";
import { ref, watch, type Ref } from "vue";


const FEE: StdFee = {
  amount: [{ amount: "0", denom: "stake" }],
  gas: "2000000000"
};

const { address } = useAddress();
const { notifyFail, notifyInfo, notifySuccess } = useNotifications();

class UnEvaledMessage {
  message: (content: Content) => Promise<DeliverTxResponse>;
  content: Content;
  then: (res: any) => void;
  err: (res: any) => void;

  constructor(
    message: (content: Content) => Promise<DeliverTxResponse>,
    content: Content,
    then: (res: any) => void,
    err: (res: any) => void
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
    notifyInfo('Sending', 'Sending request to the blockchain.')
    this.blocked.value = true;
    msg.execute().then(res => {
      this.blocked.value = false;
      return res;
    })
      .catch(err => {
        this.blocked.value = false;
        throw err;
      })
      .then(stdHandler)
      .then(msg.then)
      .catch(msg.err);
  }

  schedule(message: (content: Content) => Promise<DeliverTxResponse>, content: Content, then: (res: any) => void,
           err: (res: any) => void) {
    this.messageList.value.push(new UnEvaledMessage(message, content, then, err));
  }
}

class Content {
  fee: StdFee;
  memo: string;
  value: any;

  constructor(value: any = {}) {
    this.value = Object.assign({
      fromAddress: address.value,
      creator: address.value
    }, value);
    this.fee = FEE;
    this.memo = "";
  }
}

const stdHandler = (res: DeliverTxResponse) => {
  console.log(res);
  if (res.code) {
    notifyFail("Failed to broadcast message", res.rawLog ? res.rawLog : "General Error");
    throw new Error("Message Failed: " + res.rawLog);
  }
  let messageName = res.rawLog ? JSON.parse(res.rawLog)[0].events[0].attributes[0].value.split(".").at(-1).replace("Msg", "") : ""
  notifySuccess("EPIC WIN", messageName + " was successfull")
  return res;
};

export const useTxInstance: () => {
  registerForCouncil: (then: (res: any) => void, err: (res: any) => void) => void;
  voteCard: (cardId: number, voteType: string, then: (res: any) => void, err: (res: any) => void) => void;
  rewokeCouncilRegistration: (then: (res: any) => void, err: (res: any) => void) => void;
  buyCardScheme: (coin: Coin, then: (res: any) => void, err: (res: any) => void) => void;
  send: (coins: Coin[], to: string, then: (res: any) => void, err: (res: any) => void) => void;
  saveCardContent: (cardId: number, card: ChainCard, then: (res: any) => void, err: (res: any) => void) => void;
  addArtwork: (cardId: number, image: string, fullArt: boolean, then: (res: any) => void, err: (res: any) => void) => void
} = () => {
  const client = useClient();
  const messageScheduler = new MessageScheduler();

  const send = (coins: Coin[], to: string, then: (res: any) => void, err: (res: any) => void) => {
    messageScheduler.schedule(client.CosmosBankV1Beta1.tx.sendMsgSend,
      new Content({
        amount: coins,
        toAddress: to
      }), then, err);
  };

  const registerForCouncil = (then: (res: any) => void, err: (res: any) => void) => {
    messageScheduler.schedule(client.DecentralCardGameCardchainCardchain.tx.sendMsgRegisterForCouncil, new Content(), then, err);
  };

  const rewokeCouncilRegistration = (then: (res: any) => void, err: (res: any) => void) => {
    messageScheduler.schedule(client.DecentralCardGameCardchainCardchain.tx.sendMsgRewokeCouncilRegistration, new Content(), then, err);
  };

  const buyCardScheme = (coin: Coin, then: (res: any) => void, err: (res: any) => void) => {
    messageScheduler.schedule(
      client.DecentralCardGameCardchainCardchain.tx.sendMsgBuyCardScheme,
      new Content({
        bid: CosmosCoin.fromJSON(coin)
      }), then, err);
  };

  const saveCardContent = (cardId: number, card: ChainCard, then: (res: any) => void,
                           err: (res: any) => void) => {
    messageScheduler.schedule(
      client.DecentralCardGameCardchainCardchain.tx.sendMsgSaveCardContent,
      new Content({
        cardId,
        content: btoa(JSON.stringify(card.content)),
        notes: card.notes,
        artist: card.artist
      }), then, err);
  };

  const addArtwork = (cardId: number, image: string, fullArt: boolean, then: (res: any) => void,
                      err: (res: any) => void) => {
    messageScheduler.schedule(
      client.DecentralCardGameCardchainCardchain.tx.sendMsgAddArtwork,
      new Content({
        cardId,
        image: btoa(image),
        fullArt
      }), then, err);
  };

  const voteCard = (cardId: number, voteType: string, then: (res: any) => void,
                    err: (res: any) => void) => {
    messageScheduler.schedule(
      client.DecentralCardGameCardchainCardchain.tx.sendMsgVoteCard,
      new Content({
        cardId,
        voteType
      }), then, err);
  };

  const transferCard = (cardId: number, receiver: string, then: (res: any) => void,
                    err: (res: any) => void) => {
    messageScheduler.schedule(
            client.DecentralCardGameCardchainCardchain.tx.sendMsgTransferCard,
            new Content({
              cardId,
              receiver
            }), then, err);
  };

  return {
    send,
    registerForCouncil,
    rewokeCouncilRegistration,
    buyCardScheme,
    saveCardContent,
    addArtwork,
    voteCard,
    transferCard
  };
};

let instance: ReturnType<typeof useTxInstance>;

export const useTx = () => {
  if (!instance) {
    instance = useTxInstance();
  }
  return instance;
};