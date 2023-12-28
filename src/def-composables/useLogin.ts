import useKeplr from "@/def-composables/useKeplr";
import {useRouter} from "vue-router";
import {useAddress} from "@/def-composables/useAddress";
import {env} from "@/env";
import {useNotifications} from "@/def-composables/useNotifications";
import type {Key} from "@keplr-wallet/types";
import {useClient} from "@/composables/useClient";
import {useQuery} from "@/def-composables/useQuery";
import {useLoggedIn} from "@/def-composables/useLoggedIn";
import { Client } from "decentralcardgame-cardchain-client-ts";

const useLoginInstance = () => {
  const {connectToKeplr, isKeplrAvailable, getKeplrAccParams} = useKeplr()
  const router = useRouter()
  const {address} = useAddress()
  const {notifyFail, notifyInfo, notifySuccess} = useNotifications()
  const { queryQUser } = useQuery()
  
  const tryLogin = () => {
    signUpRequired().then((required) => {
      console.log(required)
      if (!required) {
        login()
      } else {
        router.push("Login")}
    })
  }
  
  const login = () => {
      console.log("logging in")
      connectToKeplr(console.log, console.log)
  }
  
  const signUpRequired = async () => {
    if (isKeplrAvailable.value) {
      const client = new Client(env);
      await client.useKeplr();
      const [account] = await client.signer!.getAccounts()
      try {
        await queryQUser(account.address)
        return false
      }
      catch(e) {
        return true
      }
    }
    return true
  }
  
  const onVerify = (res: any) => {
    console.log(res)
    return getKeplrAccParams(env.chainId).then((value: Key) => {
      const data = {
        address: value.bech32Address,
        token: res,
        alias: value.name,
      };
      
      console.log(data)

      const request = new Request(env.faucetNode, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });
      
      return fetch(request).then((response) => {
        console.log("response", response);

        if (response.status === 401) {
          notifyFail("Error", "Error captcha. Please reload page.");
          return;
        } else if (response.status === 402) {
          notifyFail("Error", "You have already claimed tokens");
          return;
        } else if (response.status === 403) {
          notifyFail("Error", "Probably the incorrect address");
          return;
        } else {
          notifySuccess("Success", "Registered Account");
          return;
        }
      });
    });
  };
  
  return {login, signUpRequired, tryLogin, onVerify}
}

let loginInstance: ReturnType<typeof useLoginInstance>;

export const useLogin = () => {
  if (!loginInstance) {
    loginInstance = useLoginInstance();
  }
  return loginInstance;
};
