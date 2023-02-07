import { useClient } from "@/composables/useClient";
import { useAddress } from "@/def-composables/useAddress";
import type { DeliverTxResponse } from "@cosmjs/stargate/build/stargateclient"

const FEE = {
  amount: [{ amount: "0", denom: "stake" }],
  gas: "2000000000"
};

export const useTx: () => {
  registerForCouncil: () => Promise<DeliverTxResponse>;
  rewokeCouncilRegistration: () => Promise<DeliverTxResponse>;
  send: (coins: any[], to: string) => Promise<DeliverTxResponse>
} = () => {
  const client = useClient();
  const { address } = useAddress();

  const send = (coins: any[], to: string) => {
    return client.CosmosBankV1Beta1.tx.sendMsgSend({
      value: {
        amount: coins,
        fromAddress: address.value,
        toAddress: to,
      },
      fee: FEE,
    });
  }

  const registerForCouncil = () => {
    return client.DecentralCardGameCardchainCardchain.tx.sendMsgRegisterForCouncil({
      value: {
        creator: address.value,
      },
      fee: FEE,
    });
  }

  const rewokeCouncilRegistration = () => {
    return client.DecentralCardGameCardchainCardchain.tx.sendMsgRewokeCouncilRegistration({
      value: {
        creator: address.value,
      },
      fee: FEE,
    });
  }

  return { send, registerForCouncil, rewokeCouncilRegistration };
};