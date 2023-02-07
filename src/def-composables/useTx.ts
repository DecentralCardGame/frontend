import { useClient } from "@/composables/useClient";
import { useAddress } from "@/def-composables/useAddress";
import type { StdFee } from "@cosmjs/launchpad";
import type { DeliverTxResponse } from "@cosmjs/stargate/build/stargateclient";

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
  send: (coins: any[], to: string) => Promise<DeliverTxResponse>
} = () => {
  const client = useClient();

  const send = (coins: any[], to: string) => {
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

  return { send, registerForCouncil, rewokeCouncilRegistration };
};

let instance: ReturnType<typeof useTxInstance>;

export const useTx = () => {
  if (!instance) {
    instance = useTxInstance();
  }
  return instance;
};