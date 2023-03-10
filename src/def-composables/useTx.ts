import { useClient } from "@/composables/useClient";
import { useAddress } from "@/def-composables/useAddress";
import type { Card, ChainCard } from "@/model/Card";
import type { Coin } from "@/model/Coin";
import type { StdFee } from "@cosmjs/launchpad";
import type { DeliverTxResponse } from "@cosmjs/stargate/build/stargateclient";
import { Coin as CosmosCoin } from "DecentralCardGame-Cardchain-client-ts/cosmos.bank.v1beta1/types/cosmos/base/v1beta1/coin"

const FEE: StdFee = {
  amount: [{ amount: "0", denom: "stake" }],
  gas: "2000000000"
};

const { address } = useAddress();

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

export const useTxInstance: () => {
  registerForCouncil: () => Promise<DeliverTxResponse>;
  rewokeCouncilRegistration: () => Promise<DeliverTxResponse>;
  buyCardScheme: (coin: Coin) => Promise<DeliverTxResponse>;
  send: (coins: Coin[], to: string) => Promise<DeliverTxResponse>;
  saveCardContent: (cardId: number, card: Card) => Promise<DeliverTxResponse>;
  addArtwork: (cardId: number, image: string, fullArt: boolean) => Promise<DeliverTxResponse>
} = () => {
  const client = useClient();

  const send = (coins: Coin[], to: string) => {
    return client.CosmosBankV1Beta1.tx.sendMsgSend(
      new Content({
        amount: coins,
        toAddress: to
      }));
  };

  const registerForCouncil = () => {
    return client.DecentralCardGameCardchainCardchain.tx.sendMsgRegisterForCouncil(new Content());
  };

  const rewokeCouncilRegistration = () => {
    return client.DecentralCardGameCardchainCardchain.tx.sendMsgRewokeCouncilRegistration(new Content());
  };

  const buyCardScheme = (coin: Coin) => {
    return client.DecentralCardGameCardchainCardchain.tx.sendMsgBuyCardScheme(new Content({
      bid: CosmosCoin.fromJSON(coin)
    }));
  };

  const saveCardContent = (cardId: number, card: ChainCard) => {
    return client.DecentralCardGameCardchainCardchain.tx.sendMsgSaveCardContent(
      new Content({
        cardId,
        content: btoa(JSON.stringify(card.content)),
        notes: card.notes,
        artist: card.artist
      }));
  };

  const addArtwork = (cardId: number, image: string, fullArt: boolean) => {
    return client.DecentralCardGameCardchainCardchain.tx.sendMsgAddArtwork(
      new Content({
        cardId,
        image: btoa(image),
        fullArt
      }));
  };

  return {
    send,
    registerForCouncil,
    rewokeCouncilRegistration,
    buyCardScheme,
    saveCardContent,
    addArtwork
  };
};

let instance: ReturnType<typeof useTxInstance>;

export const useTx = () => {
  if (!instance) {
    instance = useTxInstance();
  }
  return instance;
};